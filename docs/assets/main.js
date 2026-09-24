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
    window.matchMedia("(min-width: 851px)").addEventListener("change", (e) => {
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
          [
            { height: "0px" },
            { height: `${answer.scrollHeight}px` },
          ],
          { duration: 220, easing: "ease-out" },
        );
      } else {
        details.dataset.closing = "true";
        animation = answer.animate(
          [
            { height: `${answer.scrollHeight}px` },
            { height: "0px" },
          ],
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
