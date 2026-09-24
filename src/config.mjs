// Thalir Innovations — thalirone.com
// Everything a visitor reads lives here. To add a business category, append one
// object to CATEGORIES (copy an existing one) and run `node build.mjs`.
// Every claim must pass ~/ThalirInnovations/docs/CLAIMS_RULEBOOK.md.

export const SITE = {
  name: "Thalir Innovations",
  domain: "thalirone.com",
  url: "https://thalirone.com",
  tagline: "Technology that grows with you.",
  city: "Bengaluru",
  // Where we take projects (owner, 24 Sep 2026). Based in Bengaluru.
  states: ["Karnataka", "Tamil Nadu", "Andhra Pradesh", "Telangana"],
  serviceArea: "Karnataka, Tamil Nadu, Andhra Pradesh and Telangana",
  whatsapp: "919513636657",          // official WhatsApp API number (Gupshup) → EKANI inbox
  whatsappDisplay: "+91 95136 36657",
  email: "hello@thalirone.com",
  hours: "Mon–Sat, 10 am – 7 pm",
  description:
    "Thalir Innovations designs smart homes and home cinemas and revives existing home theatres across Karnataka, Tamil Nadu, Andhra Pradesh and Telangana, and builds EKANI, the WhatsApp-first CRM for Indian businesses.",
  social: [
    // filled in as accounts go live: ["Instagram", "https://instagram.com/thalirone"]
  ],
};

export const CATEGORIES = [
  {
    slug: "smart-home-cinema",
    name: "Smart Home & Cinema",
    label: "For your home",
    illustration: "floorplan",
    card: {
      pitch: "KNX automation for lighting, air-conditioning, curtains and scenes, plus home cinemas measured and calibrated for your room.",
      bullets: ["Designed and programmed in ETS6", "Scenes: Welcome, Away, Bedtime, Movie", "Home cinema with REW-measured calibration", "Site survey first, written quote after"],
    },
    composerHint: "e.g. 4-bedroom villa, new build, lights + AC + curtains",
    cta: { label: "Request a site survey", wa: "Hi Thalir Innovations! I'd like a smart home site survey.\nMy area: \nHome type (villa / apartment): \nWhat I'd like to automate: " },
    page: {
      title: "Smart Home & Cinema in Karnataka, Tamil Nadu, Andhra Pradesh & Telangana",
      metaDescription: "KNX smart home design and programming across Karnataka, Tamil Nadu, Andhra Pradesh and Telangana: lighting, air-conditioning, curtains and scenes, plus home cinemas measured and calibrated with REW. Request a site survey.",
      eyebrow: "Smart Home & Cinema",
      h1: "A home that answers to you.",
      lede: "We design, install and program smart homes on KNX: lighting, air-conditioning, curtains and scenes that work from the wall, your phone or a single touch. And we build home cinemas that are measured and calibrated for the room they sit in.",
      featuresTitle: "What we automate",
      features: [
        ["bulb", "Lighting", "On, off and dimming by room and floor, with scenes that set the whole house in one press."],
        ["snow", "Air-conditioning", "Mode, set-point and fan control, including VRV systems through KNX gateways."],
        ["curtain", "Curtains & blinds", "Open, close and stop, and exact position where the motor supports it."],
        ["spark", "Scenes & schedules", "Welcome, Away, Bedtime and Movie, plus timed routines for lights, AC and curtains."],
        ["globe", "Phone & remote access", "Check and control your home when you're away, over a secure connection."],
        ["gate", "Gates, doors & cameras", "Brought into the same system where the hardware allows. We confirm what's possible on the site survey."],
      ],
      spotlight: {
        eyebrow: "Why KNX",
        title: "Built on the open standard for buildings",
        body: [
          "KNX is a worldwide standard for building control. Keypads, dimmers, actuators and sensors from many manufacturers share one bus, so your home isn't locked to a single brand.",
          "Switches, scenes and schedules run locally on that bus and don't depend on the internet. Remote access and phone control do need a connection, and we tell you exactly which is which.",
        ],
      },
      cinema: {
        eyebrow: "Home cinema",
        title: "Measured, not guessed",
        body: "A great room is designed before it's bought. We plan the seating and speaker layout, including Dolby Atmos height channels, then install and measure the finished room with a calibrated microphone and REW. Speaker levels, distances and crossovers are set from those measurements, not by ear.",
        points: ["Room and seating plan", "Speaker layout, including Atmos", "Supply and installation", "REW measurement and calibration"],
        link: ["/cinema-revival/", "Already have a theatre? See Cinema Revival"],
      },
      process: [
        ["Site survey", "We visit, understand how your family lives and check the wiring and rooms."],
        ["Written quote", "Scope, devices and timeline in writing before any work starts."],
        ["Installation & programming", "We install and program every keypad, scene and schedule."],
        ["Handover", "We walk your family through the system and support you after handover."],
      ],
      brands: {
        title: "Brands used in our projects",
        groups: [["KNX", ["ABB", "Theben", "Zennio", "MDT", "Intesis", "Ekinex", "EAE", "Blumotix", "SATION", "INSTA"]], ["Audio & video", ["Denon", "Klipsch", "Jamo", "Epson", "Pure Acoustics"]]],
      },
      faq: [
        ["Do you work on existing homes, or only new builds?", "Both. KNX is easiest to plan during construction or a renovation. For a finished home, we check the wiring on the site survey and tell you honestly what's practical."],
        ["Which areas do you serve?", "Karnataka, Tamil Nadu, Andhra Pradesh and Telangana. We're based in Bengaluru; for sites outside Bengaluru, any travel charges are agreed with you before the visit."],
        ["How much does a smart home cost?", "It depends on the number of rooms, the devices and the brands you choose. After the site survey you get a written quote with every item listed."],
        ["Can I control it from my phone?", "Yes. Along with wall keypads we set up phone control and secure remote access. Everyday switching keeps working locally even when the internet is down."],
      ],
    },
  },
  {
    slug: "cinema-revival",
    name: "Cinema Revival",
    label: "For existing home theatres",
    illustration: "revival",
    card: {
      pitch: "Get more from the home theatre you already own: consultation, enhancement, advanced calibration, and help with unwanted smells and eye irritation in the room.",
      bullets: ["Consultation on your room and equipment", "Enhancement plan around your budget", "Advanced calibration scoped to your system", "Find and fix causes of smells and eye irritation"],
    },
    composerHint: "e.g. 12×16 ft theatre, 5.1 system, dialogue is hard to hear",
    cta: { label: "Book a revival consultation", wa: "Hi Thalir Innovations! I'd like a Home Cinema Revival consultation.\nMy location: \nWhat I want to improve (sound / picture / controls / room comfort): " },
    page: {
      title: "Home Cinema Revival in Karnataka, Tamil Nadu, Andhra Pradesh & Telangana",
      metaDescription: "Home Cinema Revival for existing home theatres across Karnataka, Tamil Nadu, Andhra Pradesh and Telangana: consultation, theatre enhancement, advanced calibration, and help with unwanted smells and eye irritation in the room. Book on WhatsApp.",
      eyebrow: "Home Cinema Revival",
      h1: "Rediscover your home theatre.",
      lede: "Get more from the theatre you already own. We look at the sound, the picture, the controls and how comfortable the room is to sit in, then agree a practical plan to put it right.",
      featuresTitle: "What Cinema Revival covers",
      features: [
        ["chat", "Consultation", "We review your room, your current equipment and how you watch, and focus on the changes that matter most to you."],
        ["spark", "Theatre enhancement", "Hard-to-follow dialogue, uneven bass, a disappointing picture or awkward controls: we plan improvements around your equipment and budget."],
        ["dial", "Advanced calibration", "Calibration scoped to your receiver or processor, your speakers and your display, and to how you like to watch."],
        ["air", "Smells & eye irritation", "We help find and fix the causes within the theatre, so the room is comfortable to spend an evening in."],
        ["remote", "Controls & automation", "Simpler everyday controls, with automation that works with the equipment you have."],
        ["plan", "New home theatres", "Planning a new room? Consultation, design and installation all start with a plan."],
      ],
      processTitle: "How a revival works",
      process: [
        ["Share your setup", "Send your location, room size, equipment and a few photos of the room on WhatsApp."],
        ["Consultation", "We discuss what you want to improve and what's practical for your room."],
        ["Scope & charges agreed", "We confirm the work, the charges and a visit date with you before anything is scheduled."],
        ["Visit & service", "Our team visits and carries out the agreed work."],
      ],
      faq: [
        ["Do you only work on theatres you installed?", "No. Cinema Revival is for any existing home theatre. Tell us what equipment you have and we'll discuss what's possible."],
        ["What does advanced calibration include?", "It's scoped to your system. Share your receiver or processor model, speaker setup and display, and we'll explain the calibration that suits it."],
        ["Can you help with smells and eye irritation?", "We look for causes within the theatre room itself and discuss the work needed to put them right. We don't diagnose health conditions; if irritation continues, please see a doctor."],
        ["Which areas do you cover?", "Karnataka, Tamil Nadu, Andhra Pradesh and Telangana. We're based in Bengaluru; for visits outside Bengaluru, travel charges depend on the location and are agreed with you before anything is scheduled."],
        ["How much does it cost?", "It depends on the room and the work involved. We agree the scope and charges with you before any visit is booked."],
      ],
    },
  },
  {
    slug: "business-software",
    name: "Business Software",
    label: "For your business",
    illustration: "ekaniflow",
    card: {
      pitch: "EKANI, the WhatsApp-first CRM for Indian businesses: WhatsApp enquiries become leads, GST quotes, projects, service jobs and invoices.",
      bullets: ["Shared WhatsApp inbox, leads created automatically", "GST quotes and invoices with UPI QR", "Projects, service & AMC, inventory, finance", "Pay only for the modules you use"],
    },
    composerHint: "e.g. interior firm, 6 people, leads come on WhatsApp",
    cta: { label: "Get an EKANI demo", wa: "Hi Thalir Innovations! I'd like a demo of EKANI CRM.\nMy business: \nTeam size: " },
    page: {
      title: "EKANI — WhatsApp-first CRM for Indian businesses",
      metaDescription: "EKANI is a WhatsApp-first CRM for Indian SMBs: shared WhatsApp inbox, leads, GST quotes and invoices, projects, service and AMC. Modules from ₹199/month. Get a demo on WhatsApp.",
      eyebrow: "Business Software · EKANI",
      h1: "Run your business from WhatsApp.",
      lede: "Your customers already message you on WhatsApp. EKANI turns every enquiry into a lead, then a GST quote, a project or service job, an invoice and a recorded payment, all in one workspace your whole team shares.",
      productUrl: "https://ekanicrm.com",
      pricingUrl: "https://ekanicrm.com/pricing",
      signInUrl: "https://app.ekanicrm.com/login",
      featuresTitle: "Modules: buy only what you need",
      audience: ["Interior & turnkey", "AC & cold-room", "Electrical & solar", "Plumbing", "Glass & UPVC", "Civil contractors", "Brokers", "Home automation"],
      languages: ["English", "Hindi", "Bengali", "Punjabi", "Gujarati", "Odia", "Tamil", "Telugu", "Kannada", "Malayalam"],
      trust: [
        ["Each business's data is kept separate by the database itself (row-level security)."],
        ["Two-step sign-in for workspace owners, with a fresh code for sensitive actions."],
        ["Roles, permissions and an audit log of who changed what."],
        ["Payments through Razorpay: UPI, cards and netbanking."],
      ],
      faq: [
        ["Is there a free trial?", "No. EKANI is paid, module by module. Ask for a demo on WhatsApp and we'll walk through it using your own kind of business."],
        ["Does it work in my language?", "The WhatsApp bot, reminders and voice notes work in English and nine Indian languages. The web screens are in English."],
        ["Is there a mobile app?", "EKANI runs in the browser on any phone or laptop. Native iPhone and Android apps are in beta."],
        ["Can I file GST from EKANI?", "EKANI prepares your GSTR-1 as JSON and CSV for you to upload on the GST portal. Direct filing isn't part of EKANI today."],
      ],
    },
  },
];

// Fallback EKANI pricing used only if the live feed can't be reached at build time.
export const EKANI_PRICING_FALLBACK = {
  bundleFrom: 2099,
  moduleFrom: 199,
  modules: [
    ["Leads & CRM", "Capture, track and close leads: pipeline, contacts, referrers", 299],
    ["WhatsApp", "Shared inbox, campaigns and bot on the official WhatsApp API", 599],
    ["Books", "Quotes, invoices, payments and GST billing", 449],
    ["Projects", "Stages, stage payments and project P&L", 399],
    ["Service & AMC", "Tickets, engineers, AMC renewals and warranty", 349],
    ["Inventory", "Stock, movements and low-stock alerts", 349],
    ["Purchasing", "Purchase orders, vendors and goods receipt", 249],
    ["Finance", "Expenses, accounts, ledger and statements", 349],
    ["Planner", "Reminders and your day on WhatsApp or Telegram", 199],
    ["AI Suite", "Receipt reading, reply drafts and catalogue extraction", 599],
  ],
};
