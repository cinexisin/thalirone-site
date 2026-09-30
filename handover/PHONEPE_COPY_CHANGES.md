# PhonePe validation — copy changes

The owner approved a real ₹1,000 API website verification payment. These words describe a restricted verification payment, not a new service, subscription or gateway approval. Existing shop prices and product copy are unchanged.

## New validation page

All text is maintained in `PAYMENT.copy` in `src/config.mjs`. Dynamic order and transaction references come only from the verified backend response.

```json
{
  "eyebrow": "Payment verification",
  "title": "One payment. Clearly confirmed.",
  "description": "A restricted, one-time payment verification for THALIR INNOVATIONS.",
  "intro": "A dedicated checkout for the agreed payment gateway verification. Review the details before continuing.",
  "amountLabel": "Total payment",
  "amountDisplay": "₹1,000",
  "currencyLabel": "INR · one-time payment",
  "purposeLabel": "Payment purpose",
  "purpose": "PhonePe gateway verification",
  "purposeNote": "This is a real payment for gateway verification. It does not purchase a service, start a subscription or activate software.",
  "merchantLabel": "Paid to",
  "contactLabel": "Business contact",
  "contactName": "Jawahar E",
  "steps": [
    [
      "Review",
      "Confirm the purpose, seller and ₹1,000 total."
    ],
    [
      "Pay",
      "Complete your payment on PhonePe’s checkout."
    ],
    [
      "Verify",
      "Return here to check the confirmed payment record."
    ]
  ],
  "consent": "I understand that this is a real, one-time ₹1,000 payment for gateway verification.",
  "payLabel": "Continue to pay ₹1,000",
  "refreshLabel": "Check payment status",
  "forgetLabel": "Clear this payment session",
  "privacyLabel": "Privacy",
  "termsLabel": "Terms",
  "refundsLabel": "Refund policy",
  "contactLinkLabel": "Contact us about this payment",
  "policiesLabel": "Payment policies and support",
  "processLabel": "How this payment works",
  "noscript": "JavaScript is required to verify and start this payment. No payment is taken by this page without it. You can still review the details and contact us.",
  "disabledTitle": "Payment setup in progress",
  "disabledBody": "This checkout is not accepting payments yet. Contact us for an update before making a payment.",
  "readyTitle": "Ready for your confirmation",
  "readyBody": "Your payment access has been verified. Confirm the details and continue when you are ready.",
  "accessLabel": "Payment access code",
  "accessHelp": "Enter the temporary code supplied for this verification. This is not your PhonePe password, API secret, PIN or OTP.",
  "accessButton": "Verify payment access",
  "accessTitle": "For the invited payer",
  "accessBody": "Use your temporary payment access code to open this one-time verification.",
  "accessErrorTitle": "Check your payment access",
  "accessErrorBody": "The code is invalid, expired or unavailable. Contact us for the correct payment access code.",
  "checkingTitle": "Checking with our payment server",
  "checkingBody": "Please wait while we verify this payment session.",
  "startingTitle": "Preparing your payment",
  "startingBody": "Please wait. Do not open another payment while this request is being checked.",
  "pendingTitle": "Payment is not confirmed yet",
  "pendingBody": "If money has been debited, do not pay again. Check the status here or contact us with your payment reference.",
  "completedTitle": "Payment confirmed",
  "completedBody": "Our server has verified your ₹1,000 payment with PhonePe. Keep the references below for your records.",
  "failedTitle": "Payment was not completed",
  "failedBody": "Contact us before starting another payment. If money was debited, share the payment reference so we can check it.",
  "expiredTitle": "This payment session has expired",
  "expiredBody": "No new payment can be started with this access code. If money was debited, contact us before trying again.",
  "unknownTitle": "We could not confirm the payment status",
  "unknownBody": "Do not pay again if you have already attempted payment. Check the status again or contact us; a connection error does not mean a payment failed.",
  "storageTitle": "Payment session could not be saved",
  "storageBody": "Your browser must allow temporary storage for this tab so we can check the payment when you return. No payment has been started here.",
  "consentErrorTitle": "Confirm the payment details",
  "consentErrorBody": "Select the confirmation before continuing to the real ₹1,000 payment.",
  "orderLabel": "Order reference",
  "referenceLabel": "Transaction reference",
  "privacyNote": "This page keeps a temporary payment access code in this browser tab to retrieve your payment status. Clearing the session removes this access from the tab; it does not cancel or refund a payment. Card details, UPI PINs and OTPs are entered only with the payment provider."
}
```

## Conditional policy copy

These changes render only when `PAYMENT.enabled` becomes true. With this draft disabled, all existing pages remain unchanged.

### Privacy: website storage

Before: thalirone.com doesn't use cookies, analytics or advertising trackers. Fonts are hosted on this website; no font requests are sent to Google Fonts. The contact form doesn't send anything to us by itself. It prepares a WhatsApp message on your device, and nothing is sent unless you press send in WhatsApp.

After activation: thalirone.com doesn't use cookies, analytics or advertising trackers. Fonts are hosted on this website; no font requests are sent to Google Fonts. The contact form doesn't send anything to us by itself. It prepares a WhatsApp message on your device, and nothing is sent unless you press send in WhatsApp. The restricted payment verification page uses this browser tab’s session storage for its temporary access code and request reference so you can check the payment when you return. You can clear that session on the payment page; it is not used for advertising or analytics.

### Privacy: payment enquiries

Before: If you send us an invoice, transaction reference or payment issue, we use those details to identify your order and respond to your request. Please do not send full card details, CVVs, PINs, passwords or one-time passwords through the contact form, email or WhatsApp. This website has no payment form and does not collect payment credentials.

After activation: If you send us an invoice, transaction reference or payment issue, we use those details to identify your order and respond to your request. The invited payment verification page contacts our server to create a payment request and retrieve its status. We use the payment amount, order and transaction references, and verified status to reconcile the payment. Card details, CVVs, PINs and one-time passwords are entered only with the payment provider, never in our enquiry form. Do not send those credentials by email or WhatsApp.

### Terms: website scope

Before: thalirone.com is an information and enquiry website. Its contact form prepares a WhatsApp message; it has no checkout or payment-credential form. Sending an enquiry does not confirm an order or reserve a visit.

After activation: thalirone.com provides service information and enquiries. Its contact form prepares a WhatsApp message. A separate, invited payment verification page starts an agreed one-time ₹1,000 PhonePe payment; it does not purchase a service, start a subscription or activate software. Payment credentials are entered on the provider’s checkout. Sending an enquiry does not confirm an order or reserve a visit.
