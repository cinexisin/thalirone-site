# Services and software shop

The owner requested a separate `/shop/` page on `thalirone.com` for PhonePe onboarding. The catalogue stays off the homepage; a footer link makes the page discoverable. It displays **THALIR INNOVATIONS**, the previously supplied registered address, customer support and links to Terms, Refunds, Shipping/Service Delivery, Privacy, Contact and About.

## Catalogue and pricing

- Cinema Revival consultation, advanced cinema calibration, acoustic consultation and home-automation WABot are listed as **Priced by written quote**. The existing records do not establish approved fixed service prices. A pending owner question asks for actual INR charges, units and GST treatment. Do not convert old customer budget bands, travel charges or test plans into service prices.
- EKANI One and the active business modules reuse the existing public pricing integration. The snapshot includes Leads & CRM at ₹299/month, the EKANI WhatsApp module at ₹599/month and EKANI One from ₹2,099/month. Software GST is extra, as expressly stated by the public feed. [Source snapshot](../evidence/shop/pricing-source.json).
- Home-automation WABot is kept separate from the EKANI WhatsApp business module. The current WABot activation handover labels its catalogue synthetic; no test price was published.
- Software enquiry links request the selected plan and confirmation of limits, extras, tax and total. Service links request project-specific details. All links compose a message to the approved WhatsApp number. No payment is taken by this page.

Every new visitor string is in `SHOP` within `src/config.mjs`; the exact addition is recorded in [SHOP_COPY_CHANGES.md](SHOP_COPY_CHANGES.md). Styling is in a small page-specific `src/assets/shop.css`, loaded only on `/shop/`. No new client JavaScript, checkout, payment credentials, backend, package dependency or tracker was introduced.

## PhonePe evidence and remaining input

The owner-supplied PhonePe screenshot asks for a live functional website, listed products/services, registered business name, prices in INR and a consistent submitted website URL. The intended public catalogue URL is **https://thalirone.com/shop/** under the supplied website **https://thalirone.com/**. It is a preview until the pull request is approved and deployed.

PhonePe's [registration form](https://www.phonepe.com/business-solutions/payment-gateway/register/) asks for the website/app where payments are accepted. Its [online merchant terms](https://terms-and-conditions.phonepe.com/general/merchant-terms-and-conditions-online) address INR transactions (3.5), itemized additional charges (Schedule IV.1.5), published service/support details and refund/cancellation policies (IV.1.6–7). These sources support the disclosures; they do not establish approval of this merchant application.

**Outstanding:** actual INR rates and GST treatment for quote-only services if PhonePe requires fixed public prices for every listing. Publishing a guessed price solely to pass the review would be inaccurate. The existing absence of a named grievance officer was not changed or concealed.

## Validation

- Live and offline builds succeed; 13 generated routes, sitemap entry and CNAME checked. Static release validation covers all internal links and configured WhatsApp messages.
- Shop checked at 360, 390, 768, 1024, 1280 and 1440 content pixels: no overflow, broken images or visible targets below 44px.
- Native anchor navigation checked; with page scripts blocked by CSP, all four service cards, 11 software modules and direct enquiry links remain available.
- Mobile Lighthouse: **98 Performance, 100 Accessibility, 100 Best Practices, 100 SEO**, CLS **0**, no failed or external audit requests. Initial observed non-font transfer **158,927 bytes**. [Audit](../evidence/shop/lighthouse-summary.json).
- [390px screenshot](../evidence/shop/shop-390.jpg) · [1280px screenshot](../evidence/shop/shop-1280.jpg). This is a new route, so there is no before screenshot. Prior architectural screenshots remain a record of commit `e92478c`; the later changes to existing pages are the footer Shop link and its generated markup.

## Asks for Claude Code

- Once the owner supplies service rates, confirm their exact scope, billing unit and tax treatment before publishing them.
- Review this catalogue with the owner's PhonePe application. No gateway status or approval is claimed.
- Actual payment-link creation, gateway integration, payment verification and activation remain backend work. The static shop does not implement these or imply they are connected.
