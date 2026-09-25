# Payment policies — owner-directed terms

The owner supplied **THALIR INNOVATIONS**, the registered address at **65, 5th Cross, Amruthnagar, B Sector, Byatarayanyapura, Bangalore, Karnataka 560092, India**, confirmed that payments cover all services, and instructed us to design cancellation/refund terms using standard practices. Those instructions supersede the earlier missing-identity and missing-policy placeholders. No certificate or GST identifier is claimed to have been verified.

The change updates the same PR, adds the supplied identity to all six information pages and organization metadata, and covers Smart Home & Cinema, Cinema Revival, equipment supplied with those services, and EKANI subscriptions and related services. PhonePe is the intended initial gateway; the public wording permits future providers. The existing gateway-specific EKANI marketing line becomes “Available payment methods are shown before you pay.” No backend gateway migration is claimed.

## Commercial choices drafted for Thalir

There is no single mandatory seven-day refund rule for these different products. The periods below are merchant policy choices made under the owner's instruction, not representations of a universal legal or PhonePe standard.

| Situation | Drafted policy |
| --- | --- |
| Project cancelled before work/procurement | Full refund; no standalone cancellation or processing fee |
| Project already underway | Itemised satisfactory work at agreed rates and equipment delivered/retained; unused advance refunded |
| Custom/special-order equipment | Restriction and maximum non-recoverable commitment accepted before procurement; seek supplier recovery, provide records and credit recovered amounts; paid equipment available to the customer |
| Rescheduling | Request 24 hours notice where possible; no separate rescheduling fee; previously agreed services/travel already performed may be payable |
| Thalir cancels an undelivered service | New date or full refund for that service; Thalir bears its cancellation costs |
| Standard equipment, change of mind | Request within 7 calendar days; unused, uninstalled, complete packaging/accessories; actual pre-agreed return transport cost; no restocking fee |
| Fault, misdescription, incorrect supply or non-delivery | Applicable refund/return remedy preserved; no forced repair-only path; reasonable collection/return costs borne by Thalir for its faulty/incorrect supply |
| First EKANI purchase | 7 calendar days from paid access being made available; first monthly or annual subscription charge refundable |
| Separate consumed charges/completed setup | Excluded from change-of-mind refund only if separately disclosed and accepted; itemised deductions |
| Later subscription periods | No change-of-mind prorating after the first window or on renewals; future renewal cancellable; paid access continues; billing-error/non-provision/statutory remedies unaffected |
| Wrong/duplicate renewal | Verified duplicate, excess or renewal after a received cancellation request refunded |
| Requests and complaints | Acknowledge within 48 hours; normally determine eligibility within 7 business days after essential information; complaints resolved within one month |
| Approved refund | Initiate within 5 business days to original source; no refund/gateway fee withheld; communicate reference; bank credit estimate separately explained |
| Digital activation | Standard subscription access within 2 business days after successful payment confirmation and required account details; revised date only by agreement or refund for non-delivery |
| Hardware/project delivery | Written dispatch/delivery date or latest delivery window before payment; project milestones and charges explicit; no invented universal hardware lead time |

These are operational commitments that the support and billing teams must implement. Quotes may offer more favourable rights but cannot silently remove the website policy protections. New versions do not retrospectively reduce rights for existing orders.

## Publication authorization and remaining onboarding detail

On 25 September 2026, the owner explicitly authorized publication: “ok upload it, for now i dont have a grievance officer”. This supersedes the earlier instruction to leave the PR unmerged. Publish through the existing PR into `main`; do not push directly to `main`.

`BUSINESS_INFO.grievanceName` remains intentionally empty. The Contact page provides the complaint route, role-independent process, existing email/WhatsApp support and National Consumer Helpline link without inventing an officer. A named grievance contact remains an outstanding onboarding detail; publication does not establish gateway approval or complete readiness for gateway submission.

No checkout is activated in this static-site change. The owner authorized publication of the current policies; backend billing and support operations still need the alignment listed below.

## Primary sources checked on 25 September 2026

- [Department of Consumer Affairs, Lok Sabha answer dated 25 March 2026](https://fcainfoweb.nic.in/PMS/writereaddata/2026_LS_B_5415.pdf), page 2: named grievance contact, acknowledgment within 48 hours, redress within one month, transparent seller and policy information.
- [Government explanation of cancellation-charge protections](https://www.pib.gov.in/PressReleasePage.aspx?PRID=1784185&lang=2&reg=48): cancellation restrictions are part of the e-commerce consumer rules. The policy does not introduce a flat penalty.
- [Government explanation of accepted-refund obligations](https://www.pib.gov.in/PressReleasePage.aspx?PRID=1784582&lang=2&reg=48), e-commerce regulations section: accepted refunds must be made within the applicable legal timeframe/reasonable period. Thalir's five-business-day initiation promise is a drafted commercial commitment.
- [PhonePe grievance policy](https://www.phonepe.com/grievance-policy/), sections 5.1 and 7: initiation and bank-credit timing differ; disputes include delayed/non-delivery, faulty supply and unhonoured merchant refund policies. PhonePe's own grievance SLA is not copied as Thalir's.
- [Government notice of the 2026 amendment](https://www.pib.gov.in/newsite/erelcontent.aspx?lang=2&reg=48&relid=294532): the announced amendments commence on **1 January 2027**, so they are not described as already effective on the review date. Recheck before that date.

These checks inform the draft; they are not legal certification or a guarantee of gateway acceptance. The public EKANI policy pages returned HTTP 403 to the research client. The owner's instruction authorizes a new unified draft; the application terms still need operational alignment before collecting payments under it.

## Asks for Claude Code

1. **TODO — merchant onboarding:** configure PhonePe for the owner-confirmed seller identity, address and all-service scope; add the final policy URLs and named grievance contact; reconcile the actual account-specific checklist and KYC documents.
2. **TODO — checkout and refunds:** implement payment verification, authenticated callbacks, idempotency, receipts, original-source refunds and tracking of approval/initiation/settlement. Never place gateway credentials in this static repo.
3. **TODO — EKANI billing:** align checkout and existing public product terms with first-purchase refunds, monthly/annual renewal cancellation, consumed-charge disclosure, activation periods and pro-rata refunds when Thalir discontinues access. Verify tax display and explicit recurring-payment consent. The existing integration is not migrated by changing marketing text.
4. **TODO — operations:** make order-specific equipment availability/delivery windows, warranty coverage, disclosed custom-order commitments and return costs explicit before payment. Implement the 48-hour/one-month grievance process and refund SLAs; retain records and refund references.
5. **TODO — policy activation:** complete the grievance officer name and review operational readiness before gateway submission. Recheck the amendments that take effect on 1 January 2027. If checkout is later embedded on this domain, update the no-payment-form statements in Terms and Privacy to match the implementation.

## Verification and copy review

See [evidence](../evidence/payment-policies/README.md), [browser audit](../evidence/payment-policies/audit.json), [link audit](../evidence/payment-policies/static-audit.json), [Lighthouse scores](../evidence/payment-policies/lighthouse-summary.json), and [exact copy](PAYMENT_COPY_CHANGES.md).

Before screenshots remain the deployed baseline `c3772a8afbee33871d3a61d40b96f41302cd750e`. After screenshots show the current revision at 390px and 1280px. The four new pages have no before route. All visitor-facing words remain in config; the logo, photographic assets, pricing feed and zero-dependency build remain intact.
