# Shop copy changes

All additions are the new SHOP export in src/config.mjs. Existing price descriptions are reused from the established EKANI pricing feed. No previously approved service prices have been changed. Null service price fields explicitly mean a written quote, never free service or a test price.

```json
{
  "nav": "Shop",
  "title": "Shop services & software",
  "description": "Explore Cinema Revival, acoustic consultation, WABot and EKANI business software from THALIR INNOVATIONS. View software prices in INR and request a written service quote.",
  "eyebrow": "Services & software",
  "heading": "Find your next step.",
  "intro": "Improve a room. Connect your home. Organise your business. Explore our services and subscriptions, then talk to us about the right scope for you.",
  "servicesLabel": "Consultations & services",
  "softwareLabel": "Software subscriptions",
  "orderLabel": "Ordering & support",
  "servicesHeading": "Start with your space.",
  "servicesIntro": "Each room and system is different. We agree the work, service charges, any travel costs and a date with you before scheduling or collecting payment.",
  "quotePrice": "Priced by written quote",
  "quoteNote": "Scope and total in INR confirmed before payment.",
  "serviceCta": "Request a quote",
  "detailsCta": "Explore the service",
  "services": [
    {
      "id": "revival-consultation",
      "icon": "chat",
      "label": "Cinema Revival",
      "title": "Home theatre consultation",
      "description": "Review your existing room, equipment, sound, picture and controls, with a practical improvement plan around your priorities and budget.",
      "priceInr": null,
      "href": "/cinema-revival/",
      "wa": "Hi Thalir Innovations! I'd like a quote for a Cinema Revival consultation.\nMy location: \nRoom size and equipment: \nWhat I want to improve: "
    },
    {
      "id": "cinema-calibration",
      "icon": "dial",
      "label": "Cinema Revival",
      "title": "Advanced cinema calibration",
      "description": "Calibration scoped to your receiver or processor, speakers and display. Share your setup so we can confirm the work suitable for your system.",
      "priceInr": null,
      "href": "/cinema-revival/#features",
      "wa": "Hi Thalir Innovations! I'd like a quote for advanced cinema calibration.\nMy location: \nReceiver / processor: \nSpeaker setup and display: "
    },
    {
      "id": "acoustic-consultation",
      "icon": "plan",
      "label": "Homes & commercial spaces",
      "title": "Acoustic consultation",
      "description": "Review echo, noise and how sound behaves in your room, hall or commercial space. Discuss acoustic treatment and a layout suited to its use.",
      "priceInr": null,
      "href": "/commercial-audio/",
      "wa": "Hi Thalir Innovations! I'd like a quote for acoustic consultation.\nMy location: \nSpace type and size: \nSound or noise concern: "
    },
    {
      "id": "wabot",
      "icon": "chat",
      "label": "Home automation",
      "title": "WABot",
      "description": "Discuss messaging control for your home. We confirm equipment compatibility, setup requirements and the applicable subscription before you order.",
      "priceInr": null,
      "href": "/smart-home-cinema/#features",
      "wa": "Hi Thalir Innovations! I'd like details and a quote for WABot.\nMy location: \nCurrent home automation equipment: \nWhat I want to control: "
    }
  ],
  "softwareHeading": "Software that fits your business.",
  "softwareIntro": "Choose individual EKANI modules or the EKANI One bundle. Prices below are monthly subscription prices in Indian rupees (INR).",
  "taxNote": "GST is extra on the listed software prices. Your selected plan, billing cycle, user limits, any usage or setup charges, applicable tax and total are confirmed before payment.",
  "softwareCta": "Request subscription",
  "softwareMessage": "Hi Thalir Innovations! I'm interested in the EKANI {product} subscription listed on your shop.\nPlease confirm the plan, user limits, applicable charges, GST and total before payment.\nBusiness name: ",
  "bundleMessage": "Hi Thalir Innovations! I'm interested in EKANI One listed on your shop.\nTeam size: \nPreferred billing cycle: \nPlease confirm the plan, applicable charges, GST and total before payment.",
  "sourceNote": "Software prices as listed on",
  "sourceLabel": "EKANI pricing",
  "sourceUrl": "https://ekanicrm.com/pricing",
  "monthly": "/month",
  "from": "From",
  "bundleTitle": "EKANI One",
  "bundleDescription": "Every module in one subscription. Price depends on team size.",
  "otherServices": "For smart home installations, new cinemas, audio, PA, acoustic treatment or building automation projects, contact us for a site-specific written quote.",
  "projectCta": "Discuss a project",
  "sellerHeading": "Your seller, clearly identified.",
  "sellerIntro": "Services and subscriptions on this page are offered by THALIR INNOVATIONS.",
  "orderHeading": "From enquiry to order.",
  "steps": [
    [
      "Choose your service or plan",
      "Use its enquiry button to share your requirements with our team on WhatsApp."
    ],
    [
      "Confirm the scope and total",
      "Review the written quote or selected plan, total in INR, tax, any extra charges and service or activation arrangements."
    ],
    [
      "Pay for the agreed order",
      "Use the payment method provided for your confirmed order. An enquiry alone does not take payment or reserve a visit."
    ]
  ],
  "fulfilment": "Consultations and on-site work are scheduled after the scope and charges are agreed. Software activation and access follow the selected plan and the agreed activation arrangements. See our Shipping & Service Delivery Policy for details.",
  "paymentNote": "This shop currently accepts enquiries. It has no online checkout and does not ask for card details, CVV, PIN or one-time passwords.",
  "policiesHeading": "Before you order"
}
```
