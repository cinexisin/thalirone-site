// Static checkout client. The backend owns authorization, amount and verification.
// No merchant credentials, payment creation on page load, or redirect-based success.
const STORAGE_KEY = "thalir.payment-validation.v1";
const codePattern = /^[A-Za-z0-9_-]{32,256}$/;
const referencePattern = /^[A-Za-z0-9_-]{1,128}$/;
const states = new Set(["READY", "PENDING", "COMPLETED", "FAILED", "EXPIRED"]);

export function configurationReady(config) {
  try {
    const api = new URL(config.apiBase);
    return config.enabled === true && config.amountPaise === 100000 &&
      config.currency === "INR" && config.merchant === "THALIR INNOVATIONS" &&
      api.protocol === "https:" && !api.username && !api.password &&
      !api.search && !api.hash && !api.port &&
      Array.isArray(config.checkoutOrigins) && config.checkoutOrigins.length > 0 &&
      config.checkoutOrigins.every((origin) => {
        const url = new URL(origin);
        return url.origin === origin && url.protocol === "https:" && !url.port &&
          url.hostname.endsWith(".phonepe.com") &&
          !/uat|sandbox|preprod/i.test(url.hostname);
      });
  } catch { return false; }
}

export function validateCheckoutUrl(value, config) {
  if (typeof value !== "string") throw new Error("Invalid checkout");
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || url.port ||
      url.hash || !config.checkoutOrigins.includes(url.origin)) {
    throw new Error("Invalid checkout");
  }
  return url.href;
}

export function validateSession(data, config) {
  if (!data || data.environment !== "production" ||
      data.merchant !== config.merchant || data.amountPaise !== config.amountPaise ||
      data.currency !== config.currency || !states.has(data.state)) {
    throw new Error("Unverified payment");
  }
  for (const key of ["orderReference", "transactionReference"]) {
    if (data[key] != null && (typeof data[key] !== "string" || !referencePattern.test(data[key]))) {
      throw new Error("Invalid reference");
    }
  }
  if (["PENDING", "COMPLETED"].includes(data.state) && !data.orderReference) {
    throw new Error("Missing order reference");
  }
  if (data.state === "COMPLETED" && (!data.orderReference ||
      !data.transactionReference || typeof data.verifiedAt !== "string" ||
      !Number.isFinite(Date.parse(data.verifiedAt)))) {
    throw new Error("Incomplete verification");
  }
  return data;
}

function startPaymentPage(root, config) {
  if (!configurationReady(config)) return; // Fail closed, including no storage/network.
  const copy = config.copy;
  const title = root.querySelector("[data-payment-title]");
  const message = root.querySelector("[data-payment-message]");
  const status = root.querySelector("#payment-status");
  const accessForm = root.querySelector("#payment-access-form");
  const accessInput = root.querySelector("#payment-access-code");
  const accessButton = root.querySelector("#payment-access-submit");
  const form = root.querySelector("#payment-form");
  const consent = root.querySelector("#payment-consent");
  const pay = root.querySelector("#payment-submit");
  const refresh = root.querySelector("#payment-refresh");
  const forget = root.querySelector("#payment-forget");
  const receipt = root.querySelector("#payment-receipt");
  let session = null;
  let running = false;
  let currentState = "";

  function announce(key) {
    title.textContent = copy[key + "Title"];
    message.textContent = copy[key + "Body"];
    status.dataset.state = key;
    consent.disabled = true;
    pay.disabled = true;
  }
  function save() {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }
  function showAccess() {
    accessForm.hidden = false;
    accessInput.disabled = false;
    accessButton.disabled = false;
    refresh.hidden = true;
    forget.hidden = !session;
  }
  function clear() {
    session = null;
    currentState = "";
    try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* No payment starts. */ }
    accessInput.value = "";
    consent.checked = false;
    receipt.hidden = true;
    announce("access");
    showAccess();
  }
  async function request(path, method = "GET") {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(config.apiBase.replace(/\/$/, "") + path, {
        method, mode: "cors", credentials: "omit", cache: "no-store", redirect: "error",
        referrerPolicy: "no-referrer", signal: controller.signal,
        headers: {
          Accept: "application/json", Authorization: "Bearer " + session.code,
          ...(method === "POST" ? {
            "Content-Type": "application/json", "Idempotency-Key": session.key,
          } : {}),
        },
        ...(method === "POST" ? { body: "{}" } : {}),
      });
      if (response.status === 401 || response.status === 403) {
        const error = new Error("Access expired"); error.access = true; throw error;
      }
      if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) {
        throw new Error("Status unavailable");
      }
      return validateSession(await response.json(), config);
    } finally { clearTimeout(timer); }
  }
  function display(data) {
    currentState = data.state;
    accessForm.hidden = true;
    accessInput.value = "";
    forget.hidden = false;
    refresh.hidden = !["PENDING", "READY"].includes(data.state);
    announce(data.state.toLowerCase());
    // A timed-out creation is never retried automatically, even if a stale read
    // claims READY. Claude's backend must reconcile its durable order first.
    if (data.state === "READY" && session.attempted) {
      announce("unknown");
    } else if (data.state === "READY") {
      consent.disabled = false;
      pay.disabled = !consent.checked;
      refresh.hidden = true;
    }
    const order = root.querySelector("#payment-order");
    const reference = root.querySelector("#payment-reference");
    order.textContent = data.orderReference || "";
    reference.textContent = data.transactionReference || "";
    order.parentElement.hidden = !data.orderReference;
    reference.parentElement.hidden = !data.transactionReference;
    receipt.hidden = !data.orderReference && !data.transactionReference;
  }
  function handleError(error) {
    if (error.access) {
      clear(); announce("accessError");
    } else {
      announce("unknown");
      refresh.hidden = false;
      forget.hidden = false;
    }
  }
  async function check() {
    if (running || !session) return;
    running = true;
    accessButton.disabled = refresh.disabled = forget.disabled = true;
    announce("checking");
    try { display(await request("/session")); }
    catch (error) { handleError(error); }
    finally {
      running = false;
      accessButton.disabled = refresh.disabled = forget.disabled = false;
    }
  }

  accessForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (running) return;
    const code = accessInput.value.trim();
    if (!codePattern.test(code)) { announce("accessError"); return; }
    try {
      if (session?.code !== code) session = { code, key: crypto.randomUUID(), attempted: false };
      save(); // Must be recoverable on return before any checkout can start.
    } catch { announce("storage"); return; }
    await check();
  });
  consent.addEventListener("change", () => {
    pay.disabled = running || currentState !== "READY" || session?.attempted || !consent.checked;
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (running || !session || session.attempted || currentState !== "READY") return;
    if (!consent.checked) { announce("consentError"); consent.disabled = false; return; }
    try { session.attempted = true; save(); }
    catch { announce("storage"); return; }
    running = true;
    refresh.disabled = forget.disabled = true;
    announce("starting");
    try {
      const data = await request("/checkout", "POST");
      display(data);
      if (data.state === "PENDING") {
        const destination = validateCheckoutUrl(data.checkoutUrl, config);
        window.location.assign(destination);
      } else if (data.state !== "COMPLETED") {
        announce("unknown"); refresh.hidden = false;
      }
    } catch (error) { handleError(error); }
    finally { running = false; refresh.disabled = forget.disabled = false; }
  });
  refresh.addEventListener("click", check);
  forget.addEventListener("click", () => { if (!running) { clear(); accessInput.focus(); } });

  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");
    if (stored && codePattern.test(stored.code) &&
        /^[a-f0-9-]{36}$/.test(stored.key) && typeof stored.attempted === "boolean") session = stored;
  } catch { /* Manual access still works if storage becomes available. */ }
  showAccess();
  announce("access");
  if (session) check();
}

if (typeof document !== "undefined") {
  const root = document.getElementById("payment-validation");
  const json = document.getElementById("payment-config");
  if (root && json) {
    try { startPaymentPage(root, JSON.parse(json.textContent)); }
    catch { /* Server-rendered disabled controls remain safe. */ }
  }
}
