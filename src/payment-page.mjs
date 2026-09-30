// Static payment presentation only. The separate controller owns readiness and
// payment state. Every control is disabled in HTML, including enabled builds.
export function paymentPage({ copy, business, site, esc, enabled = false }) {
  const arrow = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';

  return `<section class="payment-page" id="payment-validation" aria-labelledby="payment-heading">
  <div class="payment-wrap">
    <header class="payment-heading">
      <span class="payment-eyebrow">${esc(copy.eyebrow)}</span>
      <h1 id="payment-heading">${esc(copy.title)}</h1>
      <p>${esc(copy.intro)}</p>
    </header>

    <div class="payment-panel">
      <section class="payment-summary" aria-labelledby="payment-amount-label">
        <div class="payment-amount">
          <span id="payment-amount-label" class="payment-label">${esc(copy.amountLabel)}</span>
          <p class="payment-total">${esc(copy.amountDisplay)}</p>
          <p class="payment-currency">${esc(copy.currencyLabel)}</p>
        </div>
        <dl class="payment-details">
          <div><dt>${esc(copy.purposeLabel)}</dt><dd>${esc(copy.purpose)}</dd></div>
          <div><dt>${esc(copy.merchantLabel)}</dt><dd class="payment-merchant">${esc(business.registeredName)}</dd></div>
          <div><dt>${esc(copy.contactLabel)}</dt><dd>${esc(copy.contactName)}<a href="mailto:${esc(site.email)}">${esc(site.email)}</a><a href="tel:${esc(site.phone)}">${esc(site.phoneDisplay)}</a></dd></div>
        </dl>
        <p class="payment-purpose-note">${esc(copy.purposeNote)}</p>
      </section>

      <div class="payment-checkout">
        <div class="payment-status" id="payment-status" role="status" aria-live="polite" aria-atomic="true">
          <span class="payment-status-marker" aria-hidden="true"></span>
          <div><h2 data-payment-title>${esc(enabled ? copy.accessTitle : copy.disabledTitle)}</h2><p data-payment-message>${esc(enabled ? copy.accessBody : copy.disabledBody)}</p></div>
        </div>
        <dl class="payment-receipt" id="payment-receipt" hidden>
          <div><dt>${esc(copy.orderLabel)}</dt><dd id="payment-order"></dd></div>
          <div><dt>${esc(copy.referenceLabel)}</dt><dd id="payment-reference"></dd></div>
        </dl>
        <form id="payment-access-form" class="payment-access" method="dialog"${enabled ? "" : " hidden"}>
          <label for="payment-access-code">${esc(copy.accessLabel)}</label>
          <input id="payment-access-code" name="accessCode" type="password" autocomplete="off" spellcheck="false" minlength="32" maxlength="256" pattern="[A-Za-z0-9_-]{32,256}" aria-describedby="payment-access-help" required disabled>
          <p id="payment-access-help">${esc(copy.accessHelp)}</p>
          <button id="payment-access-submit" class="payment-secondary" type="submit" disabled>${esc(copy.accessButton)}</button>
        </form>
        <form id="payment-form" class="payment-form" method="dialog">
          <label class="payment-consent" for="payment-consent"><input id="payment-consent" name="consent" type="checkbox" required disabled><span>${esc(copy.consent)}</span></label>
          <button id="payment-submit" class="payment-button" type="submit" disabled><span>${esc(copy.payLabel)}</span>${arrow}</button>
        </form>
        <div class="payment-actions">
          <button id="payment-refresh" class="payment-secondary" type="button" hidden>${esc(copy.refreshLabel)}</button>
          <button id="payment-forget" class="payment-secondary" type="button" hidden>${esc(copy.forgetLabel)}</button>
        </div>
        <noscript><p class="payment-noscript">${esc(copy.noscript)}</p></noscript>
        ${enabled ? `<p class="payment-privacy-note">${esc(copy.privacyNote)}</p>` : ""}
        <nav class="payment-policies" aria-label="${esc(copy.policiesLabel)}"><a href="/privacy/">${esc(copy.privacyLabel)}</a><a href="/terms/">${esc(copy.termsLabel)}</a><a href="/refunds/">${esc(copy.refundsLabel)}</a><a href="/contact/">${esc(copy.contactLinkLabel)}</a></nav>
      </div>
    </div>

    <ol class="payment-steps" aria-label="${esc(copy.processLabel)}">${copy.steps.map(([title, description], i) => `<li><span class="payment-step-number" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><div><h2>${esc(title)}</h2><p>${esc(description)}</p></div></li>`).join("")}</ol>
  </div>
</section>`;
}
