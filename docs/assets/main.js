// Small progressive enhancements. Content and direct enquiry links work without JS.
(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const menu = document.querySelector(".menu");
  if (menu) {
    const summary = menu.querySelector("summary");
    const label = summary.querySelector("span");
    let closeTimer;
    const regions = [
      ...document.querySelectorAll("main, .site-foot, .mobile-action, .brand"),
    ];
    function state(open) {
      summary.setAttribute("aria-expanded", String(open));
      label.textContent = open
        ? summary.dataset.closeLabel
        : summary.dataset.openLabel;
      regions.forEach((el) => {
        el.inert = open;
      });
      document.body.style.overflow = open ? "hidden" : "";
    }
    function close(restore = true) {
      clearTimeout(closeTimer);
      if (!menu.open) return;
      if (restore) summary.focus();
      state(false);
      menu.classList.add("closing");
      closeTimer = setTimeout(
        () => {
          menu.open = false;
          menu.classList.remove("closing");
        },
        reduced.matches ? 0 : 160,
      );
    }
    state(false);
    summary.addEventListener("click", (e) => {
      e.preventDefault();
      if (menu.open) close();
      else {
        clearTimeout(closeTimer);
        menu.classList.remove("closing");
        menu.open = true;
        state(true);
      }
    });
    menu.addEventListener("keydown", (e) => {
      if (!menu.open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
      if (e.key === "Tab") {
        const focusable = [...menu.querySelectorAll("summary, a[href]")];
        const first = focusable[0],
          last = focusable.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
    menu
      .querySelectorAll("a")
      .forEach((a) => a.addEventListener("click", () => close(false)));
    window.matchMedia("(min-width: 1041px)").addEventListener("change", (e) => {
      if (e.matches) close(false);
    });
  }

  const demo = document.querySelector("[data-demo]");
  if (demo) {
    const slots = [...demo.querySelectorAll(".demo-slot")];
    const replay = demo.querySelector(".replay");
    const status = demo.querySelector(".room-status");
    let timers = [];
    function reset() {
      timers.forEach(clearTimeout);
      timers = [];
      slots.forEach((s) =>
        s.classList.remove("is-pending", "is-typing", "is-entering"),
      );
      demo.classList.remove("lights-off");
      status.textContent = status.dataset.on;
      replay.disabled = false;
    }
    function later(fn, delay) {
      timers.push(setTimeout(fn, delay));
    }
    function play() {
      reset();
      if (reduced.matches || document.hidden) return;
      replay.disabled = true;
      demo.classList.add("lights-off");
      status.textContent = status.dataset.off;
      slots.forEach((s) => s.classList.add("is-pending"));
      slots.forEach((slot, i) => {
        later(() => slot.classList.add("is-typing"), i * 850);
        later(
          () => {
            slot.classList.remove("is-pending", "is-typing");
            slot.classList.add("is-entering");
            if (i === 1) {
              demo.classList.remove("lights-off");
              status.textContent = status.dataset.on;
            }
          },
          i * 850 + 600,
        );
      });
      later(reset, 3500);
    }
    replay.hidden = reduced.matches;
    replay.addEventListener("click", play);
    // The complete resting example is the server-rendered initial state. Only
    // after it is visible do we play once; no scroll observer gates visibility.
    if (!reduced.matches) later(play, 1100);
    reduced.addEventListener("change", () => {
      reset();
      replay.hidden = reduced.matches;
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) reset();
    });
  }

  document.querySelectorAll(".faq details").forEach((details) => {
    const summary = details.querySelector("summary");
    const answer = details.querySelector(".faq-answer");
    let animation;
    summary.addEventListener("click", (e) => {
      if (reduced.matches || !answer.animate) return;
      e.preventDefault();
      if (animation) {
        animation.cancel();
        animation = null;
      }
      const opening = !details.open || details.dataset.closing === "true";
      delete details.dataset.closing;
      if (opening) {
        details.open = true;
        animation = answer.animate(
          [{ height: "0px" }, { height: `${answer.scrollHeight}px` }],
          { duration: 220, easing: "ease-out" },
        );
      } else {
        details.dataset.closing = "true";
        animation = answer.animate(
          [{ height: `${answer.scrollHeight}px` }, { height: "0px" }],
          { duration: 180, easing: "ease-in" },
        );
      }
      animation.onfinish = () => {
        if (!opening) details.open = false;
        delete details.dataset.closing;
        animation = null;
      };
    });
  });

  const bar = document.querySelector(".mobile-action");
  const footer = document.querySelector(".site-foot");
  if (bar && footer && "IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      bar.hidden = entries[0].isIntersecting;
    }).observe(footer);
  }

  const form = document.getElementById("composer");
  if (form) {
    const error = form.querySelector("#name-error");
    const result = form.querySelector(".form-result");
    const handoff = result.querySelector("a");
    form.hidden = false;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = (name) => form.elements[name].value.trim();
      if (!value("name")) {
        error.hidden = false;
        form.elements.name.setAttribute("aria-invalid", "true");
        form.elements.name.focus();
        return;
      }
      const lines = [
        form.dataset.greeting,
        form.dataset.namePrefix + value("name"),
      ];
      if (value("area")) lines.push(form.dataset.areaPrefix + value("area"));
      lines.push(form.dataset.topicPrefix + value("topic"));
      if (value("msg")) lines.push("", value("msg"));
      handoff.href = `https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(lines.join("\n"))}`;
      result.hidden = false;
      // Native link activation preserves noopener without the false "blocked"
      // result that window.open(..., 'noopener') can return on a successful open.
      handoff.click();
    });
    form.addEventListener("input", () => {
      result.hidden = true;
    });
    form.elements.name.addEventListener("input", () => {
      error.hidden = true;
      form.elements.name.removeAttribute("aria-invalid");
    });
    form.elements.topic.addEventListener("change", () => {
      form.elements.msg.placeholder =
        form.elements.topic.selectedOptions[0].dataset.hint || "";
      result.hidden = true;
    });
  }
})();

// The guided demo is an optional layer over complete, linked example journeys.
(() => {
  const hub = document.querySelector("[data-demo-hub]");
  if (!hub) return;

  const journeys = [...hub.querySelectorAll("[data-demo-journey]")]
    .map((element) => ({
      element,
      id: element.dataset.demoJourney,
      panels: [...element.querySelectorAll("[data-demo-panel]")],
    }))
    .filter((journey) => journey.panels.length);
  if (!journeys.length) return;

  const scenarios = [...hub.querySelectorAll("[data-demo-scenario]")];
  const steps = [...hub.querySelectorAll("[data-demo-step]")];
  const previous = hub.querySelector("[data-demo-prev]");
  const next = hub.querySelector("[data-demo-next]");
  const restart = hub.querySelector("[data-demo-restart]");
  const present = hub.querySelector("[data-demo-present]");
  const copy = hub.querySelector("[data-demo-copy]");
  const print = hub.querySelector("[data-demo-print]");
  const status = hub.querySelector("[data-demo-status]");
  const fallback = hub.querySelector("[data-demo-share-fallback]");
  const fallbackInput = fallback?.querySelector("input");
  const copyLabel = copy?.dataset.label || copy?.textContent;
  let activeJourney = journeys[0];
  let activeIndex = 0;
  let presenting = false;
  let copyAttempt = 0;

  function findPanel(id) {
    for (const journey of journeys) {
      const index = journey.panels.findIndex(
        (panel) => panel.dataset.demoPanel === id,
      );
      if (index !== -1) return { journey, index };
    }
    return { journey: journeys[0], index: 0 };
  }

  function fromHash() {
    try {
      return findPanel(decodeURIComponent(window.location.hash.slice(1)));
    } catch {
      return { journey: journeys[0], index: 0 };
    }
  }

  function activePanel() {
    return activeJourney.panels[activeIndex];
  }

  function focusPanel(reveal = true) {
    const heading = activePanel().querySelector("h3");
    if (!heading) return;
    heading.focus({ preventScroll: true });
    const bounds = heading.getBoundingClientRect();
    const headerBottom = presenting
      ? 0
      : document.querySelector(".site-head")?.getBoundingClientRect().bottom || 0;
    const readableTop = Math.max(24, headerBottom + 12);
    if (
      reveal &&
      (bounds.top < readableTop || bounds.bottom > window.innerHeight - 24)
    ) {
      heading.scrollIntoView({ behavior: "instant", block: "center" });
    }
  }

  function render() {
    const panel = activePanel();
    journeys.forEach((journey) => {
      journey.element.hidden = journey !== activeJourney;
      journey.panels.forEach((item) => {
        item.hidden = item !== panel;
      });
    });
    scenarios.forEach((anchor) => {
      if (anchor.dataset.demoScenario === activeJourney.id) {
        anchor.setAttribute("aria-current", "true");
      } else {
        anchor.removeAttribute("aria-current");
      }
    });
    steps.forEach((anchor) => {
      if (anchor.dataset.demoStep === panel.dataset.demoPanel) {
        anchor.setAttribute("aria-current", "step");
      } else {
        anchor.removeAttribute("aria-current");
      }
    });
    if (previous) previous.disabled = activeIndex === 0;
    if (next) next.disabled = activeIndex === activeJourney.panels.length - 1;
    if (status) {
      const values = {
        current: String(activeIndex + 1),
        total: String(activeJourney.panels.length),
        title: panel.dataset.title || "",
      };
      status.textContent = (status.dataset.template || "").replace(
        /\{(current|total|title)\}/g,
        (_, key) => values[key],
      );
    }
    copyAttempt += 1;
    if (copy) copy.textContent = copyLabel;
    if (fallback) fallback.hidden = true;
  }

  function navigate(journey, index, updateHistory = true) {
    activeJourney = journey;
    activeIndex = Math.max(0, Math.min(index, journey.panels.length - 1));
    const hash = `#${encodeURIComponent(activePanel().dataset.demoPanel)}`;
    if (updateHistory && window.location.hash !== hash) {
      // pushState avoids the browser's automatic fragment jump on every step.
      window.history.pushState(null, "", hash);
    }
    render();
    focusPanel();
  }

  function plainClick(event) {
    return (
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    );
  }

  scenarios.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      if (!plainClick(event)) return;
      const journey = journeys.find(
        (item) => item.id === anchor.dataset.demoScenario,
      );
      if (!journey) return;
      event.preventDefault();
      navigate(journey, 0);
    });
  });
  steps.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      if (!plainClick(event)) return;
      event.preventDefault();
      const { journey, index } = findPanel(anchor.dataset.demoStep);
      navigate(journey, index);
    });
  });
  previous?.addEventListener("click", () =>
    navigate(activeJourney, activeIndex - 1),
  );
  next?.addEventListener("click", () => navigate(activeJourney, activeIndex + 1));
  restart?.addEventListener("click", () => navigate(activeJourney, 0));

  function setPresentation(enabled) {
    presenting = enabled;
    hub.classList.toggle("is-presenting", enabled);
    document.body.classList.toggle("demo-presenting", enabled);
    hub.querySelectorAll("[data-demo-hint]").forEach((hint) => {
      hint.hidden = !enabled;
    });
    if (present) {
      present.setAttribute("aria-pressed", String(enabled));
      present.textContent = enabled
        ? present.dataset.exitLabel
        : present.dataset.enterLabel;
    }
    if (enabled) {
      hub.scrollIntoView({ behavior: "instant", block: "start" });
      focusPanel();
    } else {
      present?.focus({ preventScroll: true });
    }
  }
  present?.addEventListener("click", () => setPresentation(!presenting));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && presenting) {
      event.preventDefault();
      setPresentation(false);
    }
  });
  hub.addEventListener("keydown", (event) => {
    if (
      event.defaultPrevented ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.target.closest(
        "input, textarea, select, button, a[href], summary, [contenteditable], [role='textbox'], [role='slider']",
      )
    ) {
      return;
    }
    const indexes = {
      ArrowLeft: activeIndex - 1,
      ArrowRight: activeIndex + 1,
      Home: 0,
      End: activeJourney.panels.length - 1,
    };
    if (!(event.key in indexes)) return;
    event.preventDefault();
    const index = indexes[event.key];
    if (index >= 0 && index < activeJourney.panels.length && index !== activeIndex) {
      navigate(activeJourney, index);
    }
  });

  if (copy) {
    copy.setAttribute("aria-live", "polite");
    copy.addEventListener("click", async () => {
      const attempt = ++copyAttempt;
      const url = new URL(window.location.href);
      url.hash = activePanel().dataset.demoPanel;
      try {
        await navigator.clipboard.writeText(url.href);
        if (attempt !== copyAttempt) return;
        copy.textContent = copy.dataset.successLabel || copyLabel;
        if (fallback) fallback.hidden = true;
      } catch {
        if (attempt !== copyAttempt) return;
        copy.textContent = copyLabel;
        if (fallback && fallbackInput) {
          fallbackInput.value = url.href;
          fallbackInput.readOnly = true;
          fallback.hidden = false;
          fallbackInput.focus({ preventScroll: true });
          fallbackInput.select();
          fallbackInput.scrollIntoView({ behavior: "instant", block: "nearest" });
        }
      }
    });
  }
  print?.addEventListener("click", () => window.print());

  function restoreHistory() {
    const { journey, index } = fromHash();
    // Traversal can fire both popstate and hashchange; render and focus once.
    if (journey !== activeJourney || index !== activeIndex) {
      navigate(journey, index, false);
    }
  }
  window.addEventListener("popstate", restoreHistory);
  window.addEventListener("hashchange", restoreHistory);

  const initial = fromHash();
  activeJourney = initial.journey;
  activeIndex = initial.index;
  status?.setAttribute("aria-live", "off");
  render();
  hub.classList.add("is-enhanced");
  hub.querySelectorAll("[data-demo-controls]").forEach((controls) => {
    controls.hidden = false;
  });
  requestAnimationFrame(() => status?.setAttribute("aria-live", "polite"));
})();
