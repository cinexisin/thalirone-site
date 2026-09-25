# Architectural design: Copy changes

Exact comparison of exported string values in `src/config.mjs` against production baseline `304468eaee19ce063b0d7f5cdf3e1b128902dc69`. Working-source SHA-256: `4c4176a05a9c4db2c8294e7bf58fb2e5da8c537e77b6789f5ea159615bee4c68`.

## Authorization and scope

The owner requested a more realistic, clean, professional technology presentation, and explicitly expanded the audience to corporate offices, hospitals, colleges, auditoriums, large halls and marriage halls. The owner confirmed the commercial offering includes **audio, PA, acoustics and building automation**. The changes below use that authorization to update the commercial page, its enquiry message, home positioning and the scope references in existing policies.

Commercial audience names describe the intended market, not previous customers. The illustrative auditorium layout and EKANI workflow are explicitly marked as examples. No certifications, installation history, performance figures, clinical systems or life-safety capabilities are claimed by these copy additions. Payment-policy references add the confirmed commercial services; the existing cancellation, refund and activation time limits are unchanged.

## Comparison method and totals

- **60 added visitor string values**, **62 changed visitor string values**, **0 removed visitor string values**.
- **6 additional presentation identifiers** are listed separately for completeness; these select icons and are not rendered as visitor copy.
- Values are preserved exactly as evaluated from each config revision. JSON escaping represents actual newlines and quotes without changing the underlying wording. `null` means the path did not exist in that revision, not a literal visitor-facing word.
- Paths use exported object names and zero-based array indices. Array insertions can therefore show a moved question as a changed value at its previous index; all old and new strings remain explicit below.
- Reused text is recorded at every changed export path, including `BUSINESS_INFO.aboutIntro`, which references `SITE.description`. Unchanged strings and formatting-only source edits are omitted.

## Added visitor copy

```json
[
  {
    "path": "CATEGORIES[2].page.faq[5][0]",
    "old": null,
    "new": "How is the project priced?"
  },
  {
    "path": "CATEGORIES[2].page.faq[5][1]",
    "old": null,
    "new": "Pricing depends on the space, systems and agreed scope. We provide a written quote following consultation; no project is priced from a generic package."
  },
  {
    "path": "CATEGORIES[2].page.sectorsIntro",
    "old": null,
    "new": "Start with how the building is used. The system follows."
  },
  {
    "path": "CATEGORIES[2].page.sectorsTitle",
    "old": null,
    "new": "Different spaces. Different requirements."
  },
  {
    "path": "CATEGORIES[2].page.sectors[0][0]",
    "old": null,
    "new": "Corporate offices"
  },
  {
    "path": "CATEGORIES[2].page.sectors[0][1]",
    "old": null,
    "new": "Meeting rooms, workplaces and shared areas."
  },
  {
    "path": "CATEGORIES[2].page.sectors[1][0]",
    "old": null,
    "new": "Hospitals"
  },
  {
    "path": "CATEGORIES[2].page.sectors[1][1]",
    "old": null,
    "new": "Public areas, administration and shared spaces."
  },
  {
    "path": "CATEGORIES[2].page.sectors[2][0]",
    "old": null,
    "new": "Colleges & campuses"
  },
  {
    "path": "CATEGORIES[2].page.sectors[2][1]",
    "old": null,
    "new": "Classrooms, lecture halls and gathering spaces."
  },
  {
    "path": "CATEGORIES[2].page.sectors[3][0]",
    "old": null,
    "new": "Auditoriums"
  },
  {
    "path": "CATEGORIES[2].page.sectors[3][1]",
    "old": null,
    "new": "Speech, presentations and performances."
  },
  {
    "path": "CATEGORIES[2].page.sectors[4][0]",
    "old": null,
    "new": "Marriage & event halls"
  },
  {
    "path": "CATEGORIES[2].page.sectors[4][1]",
    "old": null,
    "new": "Ceremonies, speeches, music and everyday operation."
  },
  {
    "path": "CATEGORIES[2].page.sectors[5][0]",
    "old": null,
    "new": "Hospitality & other spaces"
  },
  {
    "path": "CATEGORIES[2].page.sectors[5][1]",
    "old": null,
    "new": "Hotels, restaurants, retail and places of worship."
  },
  {
    "path": "DESIGN.brandsIntro",
    "old": null,
    "new": "Selected manufacturers used in our projects. Equipment is specified around the requirements of each space."
  },
  {
    "path": "DESIGN.commercialBody",
    "old": null,
    "new": "From corporate offices and hospitals to colleges, auditoriums and marriage halls. Plan audio, PA, acoustics and building automation around the whole space."
  },
  {
    "path": "DESIGN.commercialEyebrow",
    "old": null,
    "new": "For organisations & institutions"
  },
  {
    "path": "DESIGN.commercialPlan.adjoiningRoom[0]",
    "old": null,
    "new": "Adjoining"
  },
  {
    "path": "DESIGN.commercialPlan.adjoiningRoom[1]",
    "old": null,
    "new": "room"
  },
  {
    "path": "DESIGN.commercialPlan.alt",
    "old": null,
    "new": "Example auditorium plan with a main hall, stage, foyer, adjoining room, audio speakers, acoustic treatment and building automation controls."
  },
  {
    "path": "DESIGN.commercialPlan.control[0]",
    "old": null,
    "new": "Control"
  },
  {
    "path": "DESIGN.commercialPlan.control[1]",
    "old": null,
    "new": "point"
  },
  {
    "path": "DESIGN.commercialPlan.foyer",
    "old": null,
    "new": "Foyer"
  },
  {
    "path": "DESIGN.commercialPlan.label",
    "old": null,
    "new": "Example system plan"
  },
  {
    "path": "DESIGN.commercialPlan.legend.acoustics",
    "old": null,
    "new": "Acoustics"
  },
  {
    "path": "DESIGN.commercialPlan.legend.audio",
    "old": null,
    "new": "Audio & PA"
  },
  {
    "path": "DESIGN.commercialPlan.legend.automation",
    "old": null,
    "new": "Building automation"
  },
  {
    "path": "DESIGN.commercialPlan.mainHall",
    "old": null,
    "new": "Main hall"
  },
  {
    "path": "DESIGN.commercialPlan.markers[0]",
    "old": null,
    "new": "01"
  },
  {
    "path": "DESIGN.commercialPlan.markers[1]",
    "old": null,
    "new": "02"
  },
  {
    "path": "DESIGN.commercialPlan.markers[2]",
    "old": null,
    "new": "03"
  },
  {
    "path": "DESIGN.commercialPlan.stage",
    "old": null,
    "new": "Stage"
  },
  {
    "path": "DESIGN.commercialTitle",
    "old": null,
    "new": "Think beyond the room."
  },
  {
    "path": "DESIGN.explore",
    "old": null,
    "new": "Explore our services"
  },
  {
    "path": "DESIGN.homeDemoIntro",
    "old": null,
    "new": "Run your home from WhatsApp or Telegram."
  },
  {
    "path": "DESIGN.homeDemoNote",
    "old": null,
    "new": "No new app to learn. Message your home the way you'd message a person."
  },
  {
    "path": "DESIGN.homeDemoTitle",
    "old": null,
    "new": "Your home. One conversation."
  },
  {
    "path": "DESIGN.introduction",
    "old": null,
    "new": "Technology, with purpose"
  },
  {
    "path": "DESIGN.location",
    "old": null,
    "new": "Bengaluru, India"
  },
  {
    "path": "DESIGN.product.brand",
    "old": null,
    "new": "EKANI"
  },
  {
    "path": "DESIGN.product.enquiry.label",
    "old": null,
    "new": "WhatsApp enquiry"
  },
  {
    "path": "DESIGN.product.enquiry.message",
    "old": null,
    "new": "I'd like a quote."
  },
  {
    "path": "DESIGN.product.label",
    "old": null,
    "new": "Example workflow"
  },
  {
    "path": "DESIGN.product.steps[0].detail",
    "old": null,
    "new": "Capture the enquiry."
  },
  {
    "path": "DESIGN.product.steps[0].title",
    "old": null,
    "new": "Lead"
  },
  {
    "path": "DESIGN.product.steps[1].detail",
    "old": null,
    "new": "Prepare and share a quote."
  },
  {
    "path": "DESIGN.product.steps[1].title",
    "old": null,
    "new": "GST quote"
  },
  {
    "path": "DESIGN.product.steps[2].detail",
    "old": null,
    "new": "Bill the agreed work."
  },
  {
    "path": "DESIGN.product.steps[2].title",
    "old": null,
    "new": "Invoice"
  },
  {
    "path": "DESIGN.product.steps[3].detail",
    "old": null,
    "new": "Keep the payment record."
  },
  {
    "path": "DESIGN.product.steps[3].title",
    "old": null,
    "new": "Recorded payment"
  },
  {
    "path": "DESIGN.product.summary",
    "old": null,
    "new": "From the first enquiry to a recorded payment."
  },
  {
    "path": "DESIGN.project",
    "old": null,
    "new": "Discuss your project"
  },
  {
    "path": "DESIGN.projectMessage",
    "old": null,
    "new": "Hi Thalir Innovations! I'd like to discuss a project.\nType of space: \nLocation: \nWhat I need: "
  },
  {
    "path": "DESIGN.projectShort",
    "old": null,
    "new": "Project enquiry"
  },
  {
    "path": "DESIGN.sectors",
    "old": null,
    "new": "Spaces we work with"
  },
  {
    "path": "DESIGN.services",
    "old": null,
    "new": "Our services"
  },
  {
    "path": "DESIGN.systemNote",
    "old": null,
    "new": "Illustrative layout. The final system is designed for your space."
  }
]
```

## Changed visitor copy

```json
[
  {
    "path": "BUSINESS_INFO.aboutIntro",
    "old": "Thalir Innovations designs smart homes, home cinemas, acoustics, commercial audio and PA systems across Karnataka, Tamil Nadu, Andhra Pradesh and Telangana, and builds EKANI, the WhatsApp-first CRM for Indian businesses.",
    "new": "Thalir Innovations designs smart homes, home cinemas, commercial audio, PA, acoustics and building automation across Karnataka, Tamil Nadu, Andhra Pradesh and Telangana, and builds EKANI, the WhatsApp-first CRM for Indian businesses."
  },
  {
    "path": "BUSINESS_INFO.aboutLocation",
    "old": "We take home and cinema projects across Karnataka, Tamil Nadu, Andhra Pradesh and Telangana. Travel charges outside Bengaluru are agreed before the visit.",
    "new": "We take home, cinema and commercial projects across Karnataka, Tamil Nadu, Andhra Pradesh and Telangana. Travel charges outside Bengaluru are agreed before the visit."
  },
  {
    "path": "BUSINESS_INFO.aboutProcess",
    "old": "For a smart home or cinema project, we start with a site survey and a written quote. For an existing theatre, share your setup with us; the scope, charges and visit date are agreed before scheduling. EKANI features and current module prices are listed on our Business Software page.",
    "new": "For a smart home, cinema or commercial project, we start with a site survey and a written quote. For an existing theatre, share your setup with us; the scope, charges and visit date are agreed before scheduling. EKANI features and current module prices are listed on our Business Software page."
  },
  {
    "path": "BUSINESS_INFO.paymentBody",
    "old": "For any Smart Home & Cinema, Cinema Revival or EKANI order, contact us about cancellations, refunds, delivery or payment issues. Include your quote, invoice or transaction reference so we can identify it.",
    "new": "For any Smart Home & Cinema, Cinema Revival, Commercial Spaces or EKANI order, contact us about cancellations, refunds, delivery or payment issues. Include your quote, invoice or transaction reference so we can identify it."
  },
  {
    "path": "BUSINESS_INFO.scope",
    "old": "These policies cover payments collected by THALIR INNOVATIONS for Smart Home & Cinema, Cinema Revival, equipment supplied with those services, and EKANI subscriptions and related services.",
    "new": "These policies cover payments collected by THALIR INNOVATIONS for Smart Home & Cinema, Cinema Revival, Commercial Spaces (audio, PA, acoustics and building automation), equipment supplied with those services, and EKANI subscriptions and related services."
  },
  {
    "path": "CATEGORIES[2].card.bullets[0]",
    "old": "Acoustic consultation for rooms and halls",
    "new": "Commercial audio and PA systems"
  },
  {
    "path": "CATEGORIES[2].card.bullets[1]",
    "old": "Background music and paging by zone",
    "new": "Acoustic consultation and treatment"
  },
  {
    "path": "CATEGORIES[2].card.bullets[2]",
    "old": "PA systems for announcements and speech",
    "new": "Building automation and everyday controls"
  },
  {
    "path": "CATEGORIES[2].card.bullets[3]",
    "old": "Design first, then supply, installation and handover",
    "new": "Design, supply, installation and handover"
  },
  {
    "path": "CATEGORIES[2].card.pitch",
    "old": "Acoustic consultation, commercial sound and PA systems for offices, shops, restaurants, schools, halls and places of worship: designed for the space, then installed and set up on site.",
    "new": "Audio, PA systems, acoustics and building automation for corporate offices, hospitals, colleges, auditoriums and halls. Planned around the building and the people who use it."
  },
  {
    "path": "CATEGORIES[2].composerHint",
    "old": "e.g. 3,000 sq ft restaurant, background music in 3 zones",
    "new": "e.g. college auditorium; location, hall dimensions, seating layout, audio and automation needs"
  },
  {
    "path": "CATEGORIES[2].cta.label",
    "old": "Request an audio consultation",
    "new": "Discuss a commercial project"
  },
  {
    "path": "CATEGORIES[2].cta.shortLabel",
    "old": "Audio consultation",
    "new": "Commercial project"
  },
  {
    "path": "CATEGORIES[2].cta.wa",
    "old": "Hi Thalir Innovations! I'd like help with commercial audio / acoustics.\nType of space (office / shop / restaurant / school / hall / other): \nLocation: \nWhat I need (acoustics / background music / PA / other): ",
    "new": "Hi Thalir Innovations! I'd like to discuss a commercial project.\nOrganisation / type of space: \nLocation: \nProject stage (new build / renovation / existing space): \nWhat I need (audio / PA / acoustics / building automation): "
  },
  {
    "path": "CATEGORIES[2].label",
    "old": "For businesses and venues",
    "new": "For organisations and institutions"
  },
  {
    "path": "CATEGORIES[2].name",
    "old": "Commercial Audio & Acoustics",
    "new": "Commercial Spaces"
  },
  {
    "path": "CATEGORIES[2].page.eyebrow",
    "old": "Commercial Audio & Acoustics",
    "new": "Commercial spaces"
  },
  {
    "path": "CATEGORIES[2].page.faq[0][1]",
    "old": "Offices and meeting rooms, shops, restaurants and cafés, schools and colleges, halls and auditoriums, and places of worship. Tell us about your space and we'll say what's practical.",
    "new": "Corporate offices, hospitals, colleges and campuses, auditoriums, marriage halls and other large halls, along with hospitality, retail and places of worship. We confirm the proposed system and its suitability during consultation."
  },
  {
    "path": "CATEGORIES[2].page.faq[1][0]",
    "old": "Can you fix echo in an existing room?",
    "new": "Can audio and building automation be planned together?"
  },
  {
    "path": "CATEGORIES[2].page.faq[1][1]",
    "old": "Often, yes. We assess the room on a visit and recommend acoustic treatment that suits the space and your budget.",
    "new": "Yes. Tell us which audio, PA, acoustic and automation requirements belong to the project. We confirm the compatible equipment, controls and scope in the proposal."
  },
  {
    "path": "CATEGORIES[2].page.faq[2][0]",
    "old": "Do you supply the equipment too?",
    "new": "Can you work with an existing building or system?"
  },
  {
    "path": "CATEGORIES[2].page.faq[2][1]",
    "old": "Yes. We design the system, supply the equipment and install it. If you already have equipment, we can look at working with it.",
    "new": "We can review an existing space and its equipment, then explain what can be retained and what needs to change. The recommendation follows a consultation."
  },
  {
    "path": "CATEGORIES[2].page.faq[3][0]",
    "old": "Which areas do you cover?",
    "new": "What should we share before a consultation?"
  },
  {
    "path": "CATEGORIES[2].page.faq[3][1]",
    "old": "Karnataka, Tamil Nadu, Andhra Pradesh and Telangana. We're based in Bengaluru; for sites outside Bengaluru, any travel charges are agreed with you before the visit.",
    "new": "Your organisation and location, the type and size of the space, whether this is a new build or an upgrade, and your audio, acoustic and automation requirements. Plans, dimensions and equipment details help us understand the brief."
  },
  {
    "path": "CATEGORIES[2].page.faq[4][0]",
    "old": "How much does it cost?",
    "new": "Which areas do you cover?"
  },
  {
    "path": "CATEGORIES[2].page.faq[4][1]",
    "old": "It depends on the space and the system. After the site visit you get a written quote with every item listed.",
    "new": "Karnataka, Tamil Nadu, Andhra Pradesh and Telangana. We're based in Bengaluru; for sites outside Bengaluru, any travel charges are agreed before the visit."
  },
  {
    "path": "CATEGORIES[2].page.featuresTitle",
    "old": "What we design and install",
    "new": "One brief. A coordinated system."
  },
  {
    "path": "CATEGORIES[2].page.features[0][2]",
    "old": "We assess echo, noise and how sound behaves in the room, and recommend the treatment and layout that suit how the space is used.",
    "new": "We assess echo, noise and how sound behaves in the room, and recommend treatment and a layout suited to its use."
  },
  {
    "path": "CATEGORIES[2].page.features[2][2]",
    "old": "Background music for offices, shops, restaurants and hotels, split into zones with their own source and volume.",
    "new": "Music and sound systems planned by space and zone, with source and volume control for the way the building is used."
  },
  {
    "path": "CATEGORIES[2].page.features[3][1]",
    "old": "PA systems",
    "new": "PA & speech"
  },
  {
    "path": "CATEGORIES[2].page.features[3][2]",
    "old": "Paging, announcements and live speech for schools, halls, places of worship and workplaces, with microphones where they're needed.",
    "new": "Paging, announcements and live speech, with microphones and speaker layouts planned around your rooms and halls."
  },
  {
    "path": "CATEGORIES[2].page.features[4][1]",
    "old": "Set up on site",
    "new": "Building automation"
  },
  {
    "path": "CATEGORIES[2].page.features[4][2]",
    "old": "Levels, coverage and settings are checked in the finished space, so every zone sounds even.",
    "new": "Automation and controls planned around the building's systems and daily operation. Equipment compatibility and the scope are confirmed during consultation."
  },
  {
    "path": "CATEGORIES[2].page.features[5][1]",
    "old": "Simple controls",
    "new": "On-site setup & handover"
  },
  {
    "path": "CATEGORIES[2].page.features[5][2]",
    "old": "Easy volume and source control for your staff, with automation where your equipment supports it.",
    "new": "We check levels, coverage, settings and agreed controls on site, then show your team how to use the system."
  },
  {
    "path": "CATEGORIES[2].page.h1",
    "old": "Sound that suits the space.",
    "new": "A considered system. For the whole space."
  },
  {
    "path": "CATEGORIES[2].page.lede",
    "old": "From a meeting room that echoes to a hall where announcements must reach the back row, we look at the space first. Then we design the acoustics, the speakers and the PA, install them and set them up on site.",
    "new": "Audio, PA, acoustics and building automation for the places where people work, learn and come together. We plan around your building, its users and the way your team needs to operate it."
  },
  {
    "path": "CATEGORIES[2].page.metaDescription",
    "old": "Acoustic consultation, commercial audio and PA system design and installation for offices, shops, restaurants, schools, halls and places of worship across Karnataka, Tamil Nadu, Andhra Pradesh and Telangana. Talk to us on WhatsApp.",
    "new": "Audio, PA, acoustics and building automation for corporate offices, hospitals, colleges, auditoriums and marriage halls across Karnataka, Tamil Nadu, Andhra Pradesh and Telangana."
  },
  {
    "path": "CATEGORIES[2].page.processTitle",
    "old": "How a project runs",
    "new": "From the project brief to handover"
  },
  {
    "path": "CATEGORIES[2].page.process[0][0]",
    "old": "Tell us about the space",
    "new": "Share the brief"
  },
  {
    "path": "CATEGORIES[2].page.process[0][1]",
    "old": "Share the type of space, its size, a few photos and what you need on WhatsApp.",
    "new": "Send your organisation, location, project stage, plans or dimensions, and the systems you need."
  },
  {
    "path": "CATEGORIES[2].page.process[1][0]",
    "old": "Site visit & consultation",
    "new": "Site consultation"
  },
  {
    "path": "CATEGORIES[2].page.process[1][1]",
    "old": "We see the space and discuss how it's used and what matters most.",
    "new": "We review the space, how it is used, the existing equipment and the requirements of your team."
  },
  {
    "path": "CATEGORIES[2].page.process[2][1]",
    "old": "Layout, equipment and scope in writing before any work starts.",
    "new": "The proposed layout, equipment, scope and charges are agreed in writing before work starts."
  },
  {
    "path": "CATEGORIES[2].page.process[3][1]",
    "old": "We install, set up and test everything, then show your team how to use it.",
    "new": "We supply, install and set up the agreed system, then demonstrate its operation to your team."
  },
  {
    "path": "CATEGORIES[2].page.title",
    "old": "Acoustic Consultation, Commercial Audio & PA Systems",
    "new": "Commercial Audio, PA, Acoustics & Building Automation"
  },
  {
    "path": "COPY.categoriesTitle",
    "old": "One standard of work, for your home and your business",
    "new": "The right technology. In the right place."
  },
  {
    "path": "COPY.contactIntro",
    "old": "The fastest way to reach us is WhatsApp. Tell us a little about your home or business and we'll take it from there.",
    "new": "The fastest way to reach us is WhatsApp. Tell us about your home, commercial space or software needs and we'll take it from there."
  },
  {
    "path": "COPY.homeMetaSuffix",
    "old": "smart homes, home cinema, commercial audio & EKANI CRM · Karnataka, Tamil Nadu, AP & Telangana",
    "new": "smart homes, commercial systems & EKANI CRM · Karnataka, Tamil Nadu, AP & Telangana"
  },
  {
    "path": "POLICIES[0].description",
    "old": "Terms for Thalir Innovations home and cinema projects, equipment supply and EKANI subscriptions.",
    "new": "Terms for Thalir Innovations home, cinema and commercial projects, equipment supply and EKANI subscriptions."
  },
  {
    "path": "POLICIES[0].sections[0].paragraphs[1]",
    "old": "These policies cover Smart Home & Cinema, Cinema Revival, equipment we supply with those services, and EKANI subscriptions and related services. They apply whether you pay by a payment link, within EKANI or through another payment method we offer.",
    "new": "These policies cover Smart Home & Cinema, Cinema Revival, Commercial Spaces (audio, PA, acoustics and building automation), equipment we supply with those services, and EKANI subscriptions and related services. They apply whether you pay by a payment link, within EKANI or through another payment method we offer."
  },
  {
    "path": "POLICIES[0].sections[1].paragraphs[0]",
    "old": "Smart Home & Cinema projects begin with a site survey and a written quote. For Cinema Revival, the scope, charges and visit date are agreed before scheduling. Equipment compatibility and the capabilities of your system are confirmed for your project.",
    "new": "Smart Home & Cinema and Commercial Spaces projects begin with a site survey and a written quote. For Cinema Revival, the scope, charges and visit date are agreed before scheduling. Equipment compatibility and the capabilities of your system are confirmed for your project."
  },
  {
    "path": "POLICIES[1].intro",
    "old": "Clear terms for changing an order, returning eligible equipment or requesting a refund. This policy covers all payments collected by THALIR INNOVATIONS for our home, cinema and EKANI services.",
    "new": "Clear terms for changing an order, returning eligible equipment or requesting a refund. This policy covers all payments collected by THALIR INNOVATIONS for our home, cinema, commercial and EKANI services."
  },
  {
    "path": "POLICIES[1].sections[1].title",
    "old": "Cancelling home and cinema work",
    "new": "Cancelling project work"
  },
  {
    "path": "POLICIES[2].sections[0].paragraphs[0]",
    "old": "We are based in Bengaluru and take home and cinema projects across Karnataka, Tamil Nadu, Andhra Pradesh and Telangana. Visits outside Bengaluru are by prior confirmation, with travel charges agreed before the visit. Equipment delivery is arranged to the address agreed for your project.",
    "new": "We are based in Bengaluru and take home, cinema and commercial projects across Karnataka, Tamil Nadu, Andhra Pradesh and Telangana. Visits outside Bengaluru are by prior confirmation, with travel charges agreed before the visit. Equipment delivery is arranged to the address agreed for your project."
  },
  {
    "path": "POLICIES[2].sections[2].paragraphs[0]",
    "old": "Smart Home & Cinema work follows a site survey, written quote, installation and programming, then handover. Cinema Revival scope, charges and the visit date are agreed before scheduling. Sending an enquiry does not reserve a date.",
    "new": "Smart Home & Cinema and Commercial Spaces work follows a site survey, written quote, installation and programming, then handover. Cinema Revival scope, charges and the visit date are agreed before scheduling. Sending an enquiry does not reserve a date."
  },
  {
    "path": "SITE.description",
    "old": "Thalir Innovations designs smart homes, home cinemas, acoustics, commercial audio and PA systems across Karnataka, Tamil Nadu, Andhra Pradesh and Telangana, and builds EKANI, the WhatsApp-first CRM for Indian businesses.",
    "new": "Thalir Innovations designs smart homes, home cinemas, commercial audio, PA, acoustics and building automation across Karnataka, Tamil Nadu, Andhra Pradesh and Telangana, and builds EKANI, the WhatsApp-first CRM for Indian businesses."
  },
  {
    "path": "UI.heroEyebrow",
    "old": "Smart Home & Cinema",
    "new": "Homes · Commercial spaces · Software"
  },
  {
    "path": "UI.heroLede",
    "old": "No new app to learn. Message your home the way you'd message a person.",
    "new": "Smart homes, cinema, commercial audio and building automation. Thoughtfully designed for the way you live, work and gather."
  },
  {
    "path": "UI.heroTitle[0]",
    "old": "Run your home from",
    "new": "Intelligent spaces."
  },
  {
    "path": "UI.heroTitle[1]",
    "old": "WhatsApp or Telegram",
    "new": "Connected business."
  },
  {
    "path": "UI.homeLede",
    "old": "We design smart homes and home cinemas, bring existing home theatres back to their best, and build EKANI, the WhatsApp-first CRM for Indian businesses. One team, engineering for your home and your business.",
    "new": "From the room you come home to, to the buildings your organisation depends on. Explore our home, commercial and software services."
  }
]
```

## Removed visitor copy

None.

## Presentation identifiers (not visitor copy)

```json
[
  {
    "path": "CATEGORIES[2].page.features[4][0]",
    "old": "dial",
    "new": "remote"
  },
  {
    "path": "CATEGORIES[2].page.features[5][0]",
    "old": "remote",
    "new": "dial"
  },
  {
    "path": "DESIGN.product.steps[0].kind",
    "old": null,
    "new": "lead"
  },
  {
    "path": "DESIGN.product.steps[1].kind",
    "old": null,
    "new": "quote"
  },
  {
    "path": "DESIGN.product.steps[2].kind",
    "old": null,
    "new": "invoice"
  },
  {
    "path": "DESIGN.product.steps[3].kind",
    "old": null,
    "new": "payment"
  }
]
```
