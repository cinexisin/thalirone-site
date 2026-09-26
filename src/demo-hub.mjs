// An editorial walkthrough using sample records, not a replica of the CRM UI.
// Every visible label and example is supplied by DEMO in src/config.mjs.
const esc = (value = "") => String(value).replace(/[&<>\"]/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;",
}[char]));
const arrow = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const icon = (kind) => `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${{
  conversation: '<path d="M20 15a3 3 0 0 1-3 3H8l-5 3V6a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v9Z"/><path d="M7 8h9M7 12h6"/>',
  record: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  document: '<path d="M5 3h10l4 4v14H5V3Zm10 0v5h4M8 12h8M8 16h5"/>',
  tasks: '<path d="m3 6 2 2 3-4m-5 9 2 2 3-4m-5 9 2 2 3-4M12 6h9M12 13h9M12 20h9"/>',
}[kind] || ''}</svg>`;

function visual(v, copy) {
  return `<figure class="demo-record demo-record--${esc(v.kind)}">
    <figcaption class="demo-record-top"><span>${esc(v.eyebrow)}</span><span class="demo-example">${esc(copy.exampleLabel)}</span></figcaption>
    <div class="demo-record-heading">${icon(v.kind)}<div><h4>${esc(v.title)}</h4><span class="demo-record-status"><i aria-hidden="true"></i>${esc(v.status)}</span></div></div>
    ${v.message ? `<blockquote>${esc(v.message)}</blockquote>` : ""}
    <dl class="demo-record-rows">${v.rows.map(([label, value], i) => `<div>${v.kind === "tasks" ? `<span class="demo-task-number" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>` : ""}<dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join("")}</dl>
    <div class="demo-record-rule" aria-hidden="true"><span></span><span></span><span></span></div>
  </figure>`;
}

export function demoHub(copy, product, enquiryButton) {
  return `<section class="demo-hero wrap" aria-labelledby="demo-title">
    <div><span class="eyebrow">${esc(copy.eyebrow)}</span><h1 id="demo-title">${esc(copy.heading)}</h1></div>
    <div class="demo-hero-side"><p class="lede">${esc(copy.intro)}</p><a class="demo-text-link" href="${esc(product.signInUrl)}" target="_blank" rel="noopener">${esc(copy.crmLabel)} ${arrow}</a><p class="fine">${esc(copy.crmNote)}</p></div>
  </section>
  <section class="demo-hub wrap" id="walkthrough" data-demo-hub aria-label="${esc(copy.title)}">
    <div class="demo-workbench">
      <div class="demo-toolbar"><div class="demo-toolbar-title"><span class="demo-dot" aria-hidden="true"></span><h2>${esc(copy.journeyLabel)}</h2></div><div class="demo-tools" data-demo-controls hidden>
        <button class="demo-tool" type="button" data-demo-copy data-label="${esc(copy.copyLabel)}" data-success-label="${esc(copy.copiedLabel)}" data-failure-label="${esc(copy.copyFailureLabel)}">${esc(copy.copyLabel)}</button>
        <button class="demo-tool" type="button" data-demo-print>${esc(copy.printLabel)}</button>
        <button class="demo-tool demo-tool--present" type="button" data-demo-present data-enter-label="${esc(copy.presentLabel)}" data-exit-label="${esc(copy.exitPresentLabel)}" aria-pressed="false">${esc(copy.presentLabel)}</button>
        <a class="demo-tool demo-tool--crm" href="${esc(product.signInUrl)}" target="_blank" rel="noopener">${esc(copy.crmLabel)} ${arrow}</a>
      </div></div>
      <div class="demo-share-fallback" data-demo-share-fallback hidden><label>${esc(copy.copyFailureLabel)}<input type="text" readonly></label></div>
      <nav class="demo-scenarios" aria-label="${esc(copy.journeyLabel)}">${copy.scenarios.map((scenario, i) => `<a data-demo-scenario="${esc(scenario.id)}" href="#${esc(scenario.id)}-${esc(scenario.steps[0].id)}"><span class="demo-scenario-number" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><span><strong>${esc(scenario.label)}</strong><small>${esc(scenario.summary)}</small></span>${arrow}</a>`).join("")}</nav>
      ${copy.scenarios.map((scenario) => `<section class="demo-journey" data-demo-journey="${esc(scenario.id)}" aria-label="${esc(scenario.label)}">
        <nav class="demo-step-nav" aria-label="${esc(copy.stepsLabel)}"><p>${esc(scenario.question)}</p><ol>${scenario.steps.map((step, i) => `<li><a data-demo-step="${esc(scenario.id)}-${esc(step.id)}" href="#${esc(scenario.id)}-${esc(step.id)}"><span class="demo-step-number" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><span>${esc(step.label)}</span></a></li>`).join("")}</ol></nav>
        <div class="demo-slide-panels">${scenario.steps.map((step) => `<article id="${esc(scenario.id)}-${esc(step.id)}" data-demo-panel="${esc(scenario.id)}-${esc(step.id)}" data-title="${esc(step.label)}" class="demo-slide-panel">
          <div class="demo-slide"><div class="demo-slide-copy"><span class="eyebrow">${esc(step.module)}</span><h3 tabindex="-1">${esc(step.title)}</h3><p>${esc(step.description)}</p><div class="demo-outcome">${arrow}<p>${esc(step.outcome)}</p></div></div>${visual(step.visual, copy)}</div>
          <details class="demo-notes" data-demo-notes><summary>${esc(copy.notesLabel)}</summary><p>${esc(step.note)}</p></details>
        </article>`).join("")}</div>
      </section>`).join("")}
      <div class="demo-controls-footer"><p class="demo-disclosure">${esc(copy.exampleNote)}</p><div class="demo-playback" data-demo-controls hidden><button type="button" class="demo-tool demo-restart" data-demo-restart>${esc(copy.restartLabel)}</button><p class="demo-progress" data-demo-status role="status" aria-live="polite" aria-atomic="true" data-template="${esc(copy.progressTemplate)}"></p><button type="button" class="demo-prev" data-demo-prev>${arrow}<span>${esc(copy.previousLabel)}</span></button><button type="button" class="demo-next" data-demo-next><span>${esc(copy.nextLabel)}</span>${arrow}</button></div></div>
      <p class="demo-present-hint" data-demo-hint hidden>${esc(copy.presentHint)}</p>
    </div>
  </section>
  <section class="demo-modules wrap" aria-labelledby="demo-modules-heading"><div class="demo-section-heading"><span class="eyebrow">${esc(copy.modulesEyebrow)}</span><h2 id="demo-modules-heading">${esc(copy.modulesTitle)}</h2><p>${esc(copy.modulesIntro)}</p><a class="demo-text-link" href="${esc(product.pricingUrl)}" target="_blank" rel="noopener">${esc(copy.modulesCta)} ${arrow}</a></div><div class="demo-module-groups">${(copy.moduleGroups || []).map((group, i) => `<article><span class="demo-group-number" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><div><h3>${esc(group.title)}</h3><p>${esc(group.description)}</p><ul>${group.modules.map((name) => `<li>${esc(name)}</li>`).join("")}</ul></div></article>`).join("")}</div></section>
  <section class="demo-close wrap"><div><span class="eyebrow">${esc(copy.crmLabel)}</span><h2>${esc(copy.closeTitle)}</h2><p>${esc(copy.closeBody)}</p></div><div class="demo-close-actions"><a class="btn" href="${esc(product.signInUrl)}" target="_blank" rel="noopener">${esc(copy.crmLabel)} ${arrow}</a>${enquiryButton}<p class="fine">${esc(copy.crmNote)}</p></div></section>`;
}
