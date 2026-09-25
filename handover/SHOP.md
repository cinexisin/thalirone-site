# Services and software shop

The owner requested a separate `/shop/` page on `thalirone.com` for PhonePe onboarding. The catalogue stays off the homepage; a footer link makes the page discoverable. It displays **THALIR INNOVATIONS**, the previously supplied registered address, customer support and links to Terms, Refunds, Shipping/Service Delivery, Privacy, Contact and About.

## Catalogue and pricing

- The owner subsequently asked us to finish the shop with basic Cinema Revival and consultation prices. Three **newly proposed starter packages** are prepared for owner review in the unmerged PR: ₹999 for one 30-minute phone consultation; ₹2,999 for an on-site assessment of one theatre in Bengaluru, up to 90 minutes; ₹4,999 for basic audio calibration of one compatible, working system up to 5.1. These are proposed offers, not sourced historical charges. Applicable GST and any travel are separately confirmed before payment. Each card states inclusions and exclusions.
- **Odour removal and acoustic corrections where needed** are explicitly part of Cinema Revival. Corrective work and materials are separately quoted after assessment; they are not silently bundled into a consultation or calibration fee. The home card, dedicated service page, enquiry prompts and example checklist now carry the broader scope. [Exact scope changes](REVIVAL_SCOPE_COPY_CHANGES.md).
- Broader acoustic consultation and home-automation WABot remain **Priced by written quote**. No customer budget band, historical travel charge or synthetic WABot plan has been represented as an approved service price.
- EKANI One and the active business modules reuse the existing public pricing integration. The snapshot includes Leads & CRM at ₹299/month, the EKANI WhatsApp module at ₹599/month and EKANI One from ₹2,099/month. Software GST is extra, as expressly stated by the public feed. [Source snapshot](../evidence/shop/pricing-source.json).
- Home-automation WABot is kept separate from the EKANI WhatsApp business module. The current WABot activation handover labels its catalogue synthetic; no test price was published.
- Software enquiry links request the selected plan and confirmation of limits, extras, tax and total. Service links request project-specific details. All links compose a message to the approved WhatsApp number. No payment is taken by this page.

Every new visitor string is in `SHOP` within `src/config.mjs`; the exact addition is recorded in [SHOP_COPY_CHANGES.md](SHOP_COPY_CHANGES.md). Styling is in a small page-specific `src/assets/shop.css`, loaded only on `/shop/`. No new client JavaScript, checkout, payment credentials, backend, package dependency or tracker was introduced.

## PhonePe evidence and remaining input

The owner-supplied PhonePe screenshot asks for a live functional website, listed products/services, registered business name, prices in INR and a consistent submitted website URL. The intended public catalogue URL is **https://thalirone.com/shop/** under the supplied website **https://thalirone.com/**. It is a preview until the pull request is approved and deployed.

PhonePe's [registration form](https://www.phonepe.com/business-solutions/payment-gateway/register/) asks for the website/app where payments are accepted. Its [online merchant terms](https://terms-and-conditions.phonepe.com/general/merchant-terms-and-conditions-online) address INR transactions (3.5), itemized additional charges (Schedule IV.1.5), published service/support details and refund/cancellation policies (IV.1.6–7). These sources support the disclosures; they do not establish approval of this merchant application.

**Before publication:** the owner should review the proposed package fees, durations, service area, inclusions, exclusions and applicable GST treatment as actual commercial offers. If PhonePe requires fixed public prices for every listing, the remaining quote-only services also need agreed rates. The existing absence of a named grievance officer was not changed or concealed.

## Validation

- Live and offline builds succeed; 13 generated routes, sitemap entry and CNAME checked. Static release validation covers all internal links and configured WhatsApp messages.
- Shop checked at 360, 390, 768, 1024, 1280 and 1440 content pixels: no overflow, broken images or visible targets below 44px.
- Native anchor navigation checked; all six service cards, 11 software modules and direct enquiry links are static HTML and remain available with page scripts blocked by CSP.
- Mobile Lighthouse: **97 Performance, 100 Accessibility, 100 Best Practices, 100 SEO**, CLS **0**, no failed or external audit requests. Initial observed non-font transfer **165,616 bytes**. [Audit](../evidence/shop/lighthouse-summary.json). Cinema Revival's updated page also passes at **98 / 100 / 100 / 100**, CLS **0**.
- [390px screenshot](../evidence/shop/shop-390.jpg) · [1280px screenshot](../evidence/shop/shop-1280.jpg). This is a new route, so there is no before screenshot. Prior architectural screenshots remain a record of commit `e92478c`. The later scope correction also updates home/Revival copy and the shared service schema; its page audit is in [Revival scope evidence](../evidence/revival-scope/).

## Asks for Claude Code

- Confirm the proposed service rates, exact scope, billing unit and tax treatment with the owner before publishing the packages. Obtain rates for any further quote-only service that needs a fixed-price listing.
- Review this catalogue with the owner's PhonePe application. No gateway status or approval is claimed.
- Actual payment-link creation, gateway integration, payment verification and activation remain backend work. The static shop does not implement these or imply they are connected.
