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
  whatsapp: "919513636657", // official WhatsApp API number (Gupshup) → EKANI inbox
  whatsappDisplay: "+91 95136 36657",
  phone: "+919513636646", // calls only (owner, 25 Sep 2026); the WhatsApp number above is chat only
  phoneDisplay: "+91 95136 36646",
  email: "hello@thalirone.com",
  hours: "Mon–Fri 9:30 am – 6:30 pm · Sat 9:30 am – 2 pm",
  indexNowKey: "f04e9b12d1b3443596378761fff7280a", // public by design: served at /<key>.txt for IndexNow
  description:
    "Thalir Innovations designs smart homes, home cinemas, acoustics, commercial audio and PA systems across Karnataka, Tamil Nadu, Andhra Pradesh and Telangana, and builds EKANI, the WhatsApp-first CRM for Indian businesses.",
  social: [
    // filled in as accounts go live: ["Instagram", "https://instagram.com/thalirone"]
    ["Facebook", "https://www.facebook.com/profile.php?id=61594497942347"],
    ["YouTube", "https://www.youtube.com/@thalirone"],
  ],
};

export const CATEGORIES = [
  {
    slug: "smart-home-cinema",
    name: "Smart Home & Cinema",
    label: "For your home",
    illustration: "floorplan",
    card: {
      pitch:
        "KNX homes you control by chatting on WhatsApp or Telegram: lights, AC, curtains, scenes, gate and camera alerts. Plus home cinemas calibrated for your room.",
      bullets: [
        "Control from WhatsApp or Telegram in plain English",
        "Designed and programmed in ETS6",
        "Each person gets only the devices you allow",
        "Site survey first, written quote after",
      ],
    },
    composerHint: "e.g. 4-bedroom villa, new build, lights + AC + curtains",
    cta: {
      shortLabel: "Site survey",
      label: "Request a site survey",
      wa: "Hi Thalir Innovations! I'd like a smart home site survey.\nMy area: \nHome type (villa / apartment): \nWhat I'd like to automate: ",
    },
    page: {
      title:
        "Smart Home & Cinema in Karnataka, Tamil Nadu, Andhra Pradesh & Telangana",
      metaDescription:
        "KNX smart home design and programming across Karnataka, Tamil Nadu, Andhra Pradesh and Telangana: lighting, air-conditioning, curtains and scenes, plus home cinemas measured and calibrated with REW. Request a site survey.",
      eyebrow: "Smart Home & Cinema",
      h1: "A home that answers to you.",
      lede: "We design, install and program smart homes on KNX, and you run them by simply messaging your home on WhatsApp or Telegram: lighting, air-conditioning, curtains, scenes, gate and cameras. And we build home cinemas that are measured and calibrated for the room they sit in.",
      usp: {
        eyebrow: "What makes us different",
        title: "Run your home from WhatsApp or Telegram",
        lede: "No new app to learn. Message your home the way you'd message a person: \u201cliving room lights on\u201d, \u201cac cool 22\u201d, \u201con geyser for 30m\u201d. It replies to confirm, and alerts with camera photos come back to the same chat.",
        points: [
          "Works on WhatsApp and Telegram, the apps your family already uses",
          "Plain-English commands, plus quick numbered replies like \u201c2 on\u201d",
          "Each person can use only the rooms and devices you allow",
          "Runs on a controller inside your home, on Home Assistant",
        ],
        chatTitle: "Home",
        chatSub: "example chat",
        chatLabel:
          "Example WhatsApp chat: switching lights and AC, a geyser timer, a gate alert with camera photos",
        chat: [
          ["me", "living room lights on"],
          ["home", "\u2705 Living room: 3 lights on"],
          ["me", "ac cool 22"],
          ["home", "\u2744\ufe0f Bedroom AC: cool, 22\u00b0C"],
          ["me", "on geyser for 30m"],
          ["home", "\u23f1\ufe0f Geyser on. Turns off at 7:45 pm"],
          [
            "home",
            "\ud83d\udea8 Gate opened, 7:31 pm\n\ud83d\udcf7 4 camera photos",
          ],
          ["me", "which lights are on"],
          ["home", "\ud83d\udca1 On: Kitchen, Porch"],
        ],
        chatNote:
          "Example chat. Replies are shortened; what you see depends on your devices.",
        groupsTitle: "Everything you can do from a chat",
        groups: [
          [
            "Lights",
            [
              "On, off and dimming",
              "One light, a whole room or the entire house",
              "\u201cwhich lights are on\u201d in one message",
            ],
          ],
          [
            "Climate & fans",
            [
              "AC on or off, mode, temperature and fan speed",
              "Current temperature, where the AC reports it",
              "Fans on and off",
            ],
          ],
          [
            "Curtains, blinds & gates",
            [
              "Open, close and stop",
              "Set a position where the motor supports it",
              "Gate commands limited by person, time and live location",
            ],
          ],
          [
            "Scenes, timers & schedules",
            [
              "Run a scene such as Movie or Good night",
              "Timers: \u201con geyser for 30m\u201d, \u201coff porch at 9pm\u201d",
              "Pause or remove schedules; holiday mode plays the lights in the evening",
            ],
          ],
          [
            "Cameras & alerts",
            [
              "Ask for a camera photo any time",
              "Photo alerts when the gate opens or the doorbell rings",
              "Door, gate and motion alerts to the people you choose",
            ],
          ],
          [
            "People & access",
            [
              "Per device: allow, ask me first, only when at home, or block",
              "Allowed hours and days for each person",
              "Time-limited guest invite codes; staff \u201con leave\u201d mode",
            ],
          ],
          [
            "TV & music",
            [
              "Play, pause, volume and input on supported TVs, speakers and receivers",
            ],
          ],
          [
            "Reports & history",
            [
              "Today's activity and what changed",
              "A daily morning summary",
              "Undo the last change (admin)",
            ],
          ],
        ],
        footnote:
          "What each device can do depends on the equipment in your home, and we confirm it on the site survey. Commands are in English today; Tamil, Kannada and Hindi, free-form requests and voice notes are on the way.",
      },
      featuresTitle: "What we automate",
      features: [
        [
          "bulb",
          "Lighting",
          "On, off and dimming by room and floor, with scenes that set the whole house in one press.",
        ],
        [
          "snow",
          "Air-conditioning",
          "Mode, set-point and fan control, including VRV systems through KNX gateways.",
        ],
        [
          "curtain",
          "Curtains & blinds",
          "Open, close and stop, and exact position where the motor supports it.",
        ],
        [
          "spark",
          "Scenes & schedules",
          "Welcome, Away, Bedtime and Movie, plus timed routines for lights, AC and curtains.",
        ],
        [
          "globe",
          "Phone & remote access",
          "Check and control your home when you're away, over a secure connection.",
        ],
        [
          "gate",
          "Gates, doors & cameras",
          "Brought into the same system where the hardware allows. We confirm what's possible on the site survey.",
        ],
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
        points: [
          "Room and seating plan",
          "Speaker layout, including Atmos",
          "Supply and installation",
          "REW measurement and calibration",
        ],
        link: [
          "/cinema-revival/",
          "Already have a theatre? See Cinema Revival",
        ],
      },
      process: [
        [
          "Site survey",
          "We visit, understand how your family lives and check the wiring and rooms.",
        ],
        [
          "Written quote",
          "Scope, devices and timeline in writing before any work starts.",
        ],
        [
          "Installation & programming",
          "We install and program every keypad, scene and schedule.",
        ],
        [
          "Handover",
          "We walk your family through the system and support you after handover.",
        ],
      ],
      brands: {
        title: "Brands used in our projects",
        groups: [
          [
            "KNX",
            [
              "ABB",
              "Theben",
              "Zennio",
              "MDT",
              "Intesis",
              "Ekinex",
              "EAE",
              "Blumotix",
              "SATION",
              "INSTA",
            ],
          ],
          [
            "Audio & video",
            ["Denon", "Klipsch", "Jamo", "Epson", "Pure Acoustics"],
          ],
        ],
      },
      faq: [
        [
          "Do you work on existing homes, or only new builds?",
          "Both. KNX is easiest to plan during construction or a renovation. For a finished home, we check the wiring on the site survey and tell you honestly what's practical.",
        ],
        [
          "Which areas do you serve?",
          "Karnataka, Tamil Nadu, Andhra Pradesh and Telangana. We're based in Bengaluru; for sites outside Bengaluru, any travel charges are agreed with you before the visit.",
        ],
        [
          "How much does a smart home cost?",
          "It depends on the number of rooms, the devices and the brands you choose. After the site survey you get a written quote with every item listed.",
        ],
        [
          "Can I control it from my phone?",
          "Yes, by simply messaging your home on WhatsApp or Telegram, alongside the wall keypads. Chat control needs the internet; everyday switching from the keypads runs locally on KNX.",
        ],
        [
          "Do I need to install a new app?",
          "No. You use WhatsApp or Telegram, which your family already has. The system replies to each command and sends alerts to the same chat.",
        ],
        [
          "Can I stop family, staff or guests from using certain things?",
          "Yes. You choose, device by device, what each person may use and at what hours. Anything you don't allow stays off-limits, and guests get time-limited invite codes.",
        ],
      ],
    },
  },
  {
    slug: "cinema-revival",
    name: "Cinema Revival",
    label: "For existing home theatres",
    illustration: "revival",
    card: {
      pitch:
        "Get more from the home theatre you already own: consultation, enhancement, advanced calibration, and help with unwanted smells and eye irritation in the room.",
      bullets: [
        "Consultation on your room and equipment",
        "Enhancement plan around your budget",
        "Advanced calibration scoped to your system",
        "Find and fix causes of smells and eye irritation",
      ],
    },
    composerHint: "e.g. 12×16 ft theatre, 5.1 system, dialogue is hard to hear",
    cta: {
      shortLabel: "Revival consultation",
      label: "Book a revival consultation",
      wa: "Hi Thalir Innovations! I'd like a Home Cinema Revival consultation.\nMy location: \nWhat I want to improve (sound / picture / controls / room comfort): ",
    },
    page: {
      title:
        "Home Cinema Revival in Karnataka, Tamil Nadu, Andhra Pradesh & Telangana",
      metaDescription:
        "Home Cinema Revival for existing home theatres across Karnataka, Tamil Nadu, Andhra Pradesh and Telangana: consultation, theatre enhancement, advanced calibration, and help with unwanted smells and eye irritation in the room. Book on WhatsApp.",
      eyebrow: "Home Cinema Revival",
      h1: "Rediscover your home theatre.",
      lede: "Get more from the theatre you already own. We look at the sound, the picture, the controls and how comfortable the room is to sit in, then agree a practical plan to put it right.",
      featuresTitle: "What Cinema Revival covers",
      features: [
        [
          "chat",
          "Consultation",
          "We review your room, your current equipment and how you watch, and focus on the changes that matter most to you.",
        ],
        [
          "spark",
          "Theatre enhancement",
          "Hard-to-follow dialogue, uneven bass, a disappointing picture or awkward controls: we plan improvements around your equipment and budget.",
        ],
        [
          "dial",
          "Advanced calibration",
          "Calibration scoped to your receiver or processor, your speakers and your display, and to how you like to watch.",
        ],
        [
          "air",
          "Smells & eye irritation",
          "We help find and fix the causes within the theatre, so the room is comfortable to spend an evening in.",
        ],
        [
          "remote",
          "Controls & automation",
          "Simpler everyday controls, with automation that works with the equipment you have.",
        ],
        [
          "plan",
          "New home theatres",
          "Planning a new room? Consultation, design and installation all start with a plan.",
        ],
      ],
      processTitle: "How a revival works",
      process: [
        [
          "Share your setup",
          "Send your location, room size, equipment and a few photos of the room on WhatsApp.",
        ],
        [
          "Consultation",
          "We discuss what you want to improve and what's practical for your room.",
        ],
        [
          "Scope & charges agreed",
          "We confirm the work, the charges and a visit date with you before anything is scheduled.",
        ],
        ["Visit & service", "Our team visits and carries out the agreed work."],
      ],
      faq: [
        [
          "Do you only work on theatres you installed?",
          "No. Cinema Revival is for any existing home theatre. Tell us what equipment you have and we'll discuss what's possible.",
        ],
        [
          "What does advanced calibration include?",
          "It's scoped to your system. Share your receiver or processor model, speaker setup and display, and we'll explain the calibration that suits it.",
        ],
        [
          "Can you help with smells and eye irritation?",
          "We look for causes within the theatre room itself and discuss the work needed to put them right. We don't diagnose health conditions; if irritation continues, please see a doctor.",
        ],
        [
          "Which areas do you cover?",
          "Karnataka, Tamil Nadu, Andhra Pradesh and Telangana. We're based in Bengaluru; for visits outside Bengaluru, travel charges depend on the location and are agreed with you before anything is scheduled.",
        ],
        [
          "How much does it cost?",
          "It depends on the room and the work involved. We agree the scope and charges with you before any visit is booked.",
        ],
      ],
    },
  },
  {
    // Added on the owner's instruction, 25 Sep 2026: acoustic consultation,
    // commercial audio and PA systems, design and implementation.
    slug: "commercial-audio",
    name: "Commercial Audio & Acoustics",
    label: "For businesses and venues",
    illustration: "zones",
    card: {
      pitch:
        "Acoustic consultation, commercial sound and PA systems for offices, shops, restaurants, schools, halls and places of worship: designed for the space, then installed and set up on site.",
      bullets: [
        "Acoustic consultation for rooms and halls",
        "Background music and paging by zone",
        "PA systems for announcements and speech",
        "Design first, then supply, installation and handover",
      ],
    },
    composerHint: "e.g. 3,000 sq ft restaurant, background music in 3 zones",
    cta: {
      shortLabel: "Audio consultation",
      label: "Request an audio consultation",
      wa: "Hi Thalir Innovations! I'd like help with commercial audio / acoustics.\nType of space (office / shop / restaurant / school / hall / other): \nLocation: \nWhat I need (acoustics / background music / PA / other): ",
    },
    page: {
      title: "Acoustic Consultation, Commercial Audio & PA Systems",
      metaDescription:
        "Acoustic consultation, commercial audio and PA system design and installation for offices, shops, restaurants, schools, halls and places of worship across Karnataka, Tamil Nadu, Andhra Pradesh and Telangana. Talk to us on WhatsApp.",
      eyebrow: "Commercial Audio & Acoustics",
      h1: "Sound that suits the space.",
      lede: "From a meeting room that echoes to a hall where announcements must reach the back row, we look at the space first. Then we design the acoustics, the speakers and the PA, install them and set them up on site.",
      featuresTitle: "What we design and install",
      features: [
        [
          "wave",
          "Acoustic consultation",
          "We assess echo, noise and how sound behaves in the room, and recommend the treatment and layout that suit how the space is used.",
        ],
        [
          "plan",
          "Acoustic treatment",
          "Absorber and diffuser layouts planned for the room, then supplied and fitted.",
        ],
        [
          "speaker",
          "Commercial audio",
          "Background music for offices, shops, restaurants and hotels, split into zones with their own source and volume.",
        ],
        [
          "mic",
          "PA systems",
          "Paging, announcements and live speech for schools, halls, places of worship and workplaces, with microphones where they're needed.",
        ],
        [
          "dial",
          "Set up on site",
          "Levels, coverage and settings are checked in the finished space, so every zone sounds even.",
        ],
        [
          "remote",
          "Simple controls",
          "Easy volume and source control for your staff, with automation where your equipment supports it.",
        ],
      ],
      processTitle: "How a project runs",
      process: [
        [
          "Tell us about the space",
          "Share the type of space, its size, a few photos and what you need on WhatsApp.",
        ],
        [
          "Site visit & consultation",
          "We see the space and discuss how it's used and what matters most.",
        ],
        [
          "Design & written quote",
          "Layout, equipment and scope in writing before any work starts.",
        ],
        [
          "Installation & handover",
          "We install, set up and test everything, then show your team how to use it.",
        ],
      ],
      faq: [
        [
          "What kinds of spaces do you work on?",
          "Offices and meeting rooms, shops, restaurants and cafés, schools and colleges, halls and auditoriums, and places of worship. Tell us about your space and we'll say what's practical.",
        ],
        [
          "Can you fix echo in an existing room?",
          "Often, yes. We assess the room on a visit and recommend acoustic treatment that suits the space and your budget.",
        ],
        [
          "Do you supply the equipment too?",
          "Yes. We design the system, supply the equipment and install it. If you already have equipment, we can look at working with it.",
        ],
        [
          "Which areas do you cover?",
          "Karnataka, Tamil Nadu, Andhra Pradesh and Telangana. We're based in Bengaluru; for sites outside Bengaluru, any travel charges are agreed with you before the visit.",
        ],
        [
          "How much does it cost?",
          "It depends on the space and the system. After the site visit you get a written quote with every item listed.",
        ],
      ],
    },
  },
  {
    slug: "business-software",
    name: "Business Software",
    label: "For your business",
    illustration: "ekaniflow",
    card: {
      pitch:
        "EKANI, the WhatsApp-first CRM for Indian businesses: WhatsApp enquiries become leads, GST quotes, projects, service jobs and invoices.",
      bullets: [
        "Shared WhatsApp inbox, leads created automatically",
        "GST quotes and invoices with UPI QR",
        "Projects, service & AMC, inventory, finance",
        "Pay only for the modules you use",
      ],
    },
    composerHint: "e.g. interior firm, 6 people, leads come on WhatsApp",
    cta: {
      shortLabel: "EKANI demo",
      label: "Get an EKANI demo",
      wa: "Hi Thalir Innovations! I'd like a demo of EKANI CRM.\nMy business: \nTeam size: ",
    },
    page: {
      title: "EKANI — WhatsApp-first CRM for Indian businesses",
      metaDescription:
        "EKANI is a WhatsApp-first CRM for Indian SMBs: shared WhatsApp inbox, leads, GST quotes and invoices, projects, service and AMC. Modules from ₹199/month. Get a demo on WhatsApp.",
      eyebrow: "Business Software · EKANI",
      h1: "Run your business from WhatsApp.",
      lede: "Your customers already message you on WhatsApp. EKANI turns every enquiry into a lead, then a GST quote, a project or service job, an invoice and a recorded payment, all in one workspace your whole team shares.",
      productUrl: "https://ekanicrm.com",
      pricingUrl: "https://ekanicrm.com/pricing",
      signInUrl: "https://app.ekanicrm.com/login",
      featuresTitle: "Modules: buy only what you need",
      audience: [
        "Interior & turnkey",
        "AC & cold-room",
        "Electrical & solar",
        "Plumbing",
        "Glass & UPVC",
        "Civil contractors",
        "Brokers",
        "Home automation",
      ],
      languages: [
        "English",
        "Hindi",
        "Bengali",
        "Punjabi",
        "Gujarati",
        "Odia",
        "Tamil",
        "Telugu",
        "Kannada",
        "Malayalam",
      ],
      trust: [
        [
          "Each business's data is kept separate by the database itself (row-level security).",
        ],
        [
          "Two-step sign-in for workspace owners, with a fresh code for sensitive actions.",
        ],
        ["Roles, permissions and an audit log of who changed what."],
        ["Available payment methods are shown before you pay."],
      ],
      faq: [
        [
          "Is there a free trial?",
          "No. EKANI is paid, module by module. Ask for a demo on WhatsApp and we'll walk through it using your own kind of business.",
        ],
        [
          "Does it work in my language?",
          "The WhatsApp bot, reminders and voice notes work in English and nine Indian languages. The web screens are in English.",
        ],
        [
          "Is there a mobile app?",
          "EKANI runs in the browser on any phone or laptop. Native iPhone and Android apps are in beta.",
        ],
        [
          "Can I file GST from EKANI?",
          "EKANI prepares your GSTR-1 as JSON and CSV for you to upload on the GST portal. Direct filing isn't part of EKANI today.",
        ],
      ],
    },
  },
];

// Fallback EKANI pricing used only if the live feed can't be reached at build time.
export const EKANI_PRICING_FALLBACK = {
  bundleFrom: 2099,
  moduleFrom: 199,
  modules: [
    [
      "Leads & CRM",
      "Capture, track and close leads: pipeline, contacts, referrers",
      299,
    ],
    [
      "WhatsApp",
      "Shared inbox, campaigns and bot on the official WhatsApp API",
      599,
    ],
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

// Interface copy. New functional labels are listed for approval in the PR.
export const UI = {
  generalEnquiry: "Hi Thalir Innovations! I have an enquiry.",
  whatsapp: "WhatsApp us",
  menu: "Menu",
  closeMenu: "Close menu",
  mainNav: "Main",
  mobileNav: "Mobile navigation",
  pageNav: "On this page",
  features: "Features",
  how: "How it works",
  faq: "FAQ",
  pricing: "Pricing",
  contact: "Contact",
  explore: "Explore",
  example: "Example",
  exampleRoom: "Example room: living room lights respond to the chat command",
  examplePlan: "Example floor plan",
  exampleCinema: "Example speaker layout",
  room: "Living room",
  roomState: "3 lights on",
  roomStateOff: "Lights off",
  demoLabel: "WhatsApp / Telegram",
  replay: "Replay example",
  heroEyebrow: "Smart Home & Cinema",
  heroTitle: ["Run your home from", "WhatsApp or Telegram"],
  heroDetail: "See everything your home can do",
  heroLede:
    "No new app to learn. Message your home the way you'd message a person.",
  homeLede:
    "We design smart homes and home cinemas, bring existing home theatres back to their best, and build EKANI, the WhatsApp-first CRM for Indian businesses. One team, engineering for your home and your business.",
  survey: "Site survey",
  consultation: "Revival consultation",
  demo: "EKANI demo",
  nameError: "Please enter your name to prepare your message.",
  handoff: "Your message is ready. Review it in WhatsApp, then press send.",
  openMessage: "Open prepared message",
  noScript:
    "To enquire without JavaScript, use the WhatsApp link. The message composer needs JavaScript.",
  formGreeting: "Hi Thalir Innovations!",
  namePrefix: "Name: ",
  areaPrefix: "Area: ",
  topicPrefix: "Interested in: ",
  nameLabel: "Your name",
  areaLabel: "Area / city",
  areaPlaceholder: "e.g. Whitefield, Bengaluru or Coimbatore",
  topicLabel: "I'm interested in",
  otherTopic: "Something else",
  messageLabel: "Tell us a little",
  continue: "Continue on WhatsApp",
  formNote: "This opens WhatsApp with your message ready to send to",
  formNoteEnd: ". Nothing is sent until you press send.",
  privacyWebsite:
    "thalirone.com doesn't use cookies, analytics or advertising trackers. Fonts are hosted on this website; no font requests are sent to Google Fonts. The contact form doesn't send anything to us by itself. It prepares a WhatsApp message on your device, and nothing is sent unless you press send in WhatsApp.",
  moduleEyebrow: "EKANI modules",
  moduleNote:
    "Each module includes up to 3 users. Or get every module with EKANI One.",
  bundleTitle: "EKANI One",
  bundleNote: "Every module",
  from: "from",
  month: "/month",
  pricingSource: "Prices as listed on",
  pricingSourceLabel: "ekanicrm.com/pricing",
  annualNote: "Yearly plans cost 10× the monthly price.",
};

// Existing shared copy moved from templates without rewriting its claims.
export const COPY = {
  call: "Call",
  skip: "Skip to content",
  contact: "Contact",
  whatWeDo: "What we do",
  talk: "Talk to us",
  privacy: "Privacy",
  reachTitle: "Tell us what you're planning.",
  reachIntro:
    "Message us on WhatsApp and our team replies. No call centre, no forms that vanish.",
  whatsapp: "WhatsApp",
  email: "Email",
  hours: "Hours",
  cover: "We cover",
  based: "Based in",
  categoriesTitle: "One standard of work, for your home and your business",
  why: "Why Thalir",
  whyTitle: "Engineered properly, explained plainly",
  why1: "Programmed, not just installed",
  why1Body:
    "We design and program KNX systems in ETS6, and we measure cinema rooms with REW before we tune them.",
  why2: "We build our own software",
  why2Body:
    "EKANI is built by our team in Bengaluru, so you talk to the people who make it, not a reseller.",
  why3: "Reach us on WhatsApp",
  why3Body:
    "Enquiries, quotes and support all happen where you already are, with no call-centre queue.",
  seePricing: "See pricing",
  signIn: "Sign in to EKANI",
  builtFor: "Built for",
  audienceTitle: "Businesses that sell on WhatsApp",
  audienceBody:
    "Trades and service businesses that quote, install and maintain, with a team in the field.",
  languages: "Languages",
  languagesTitle: "The bot, reminders and voice notes work in ten languages",
  webLanguage: "Web screens are in English.",
  data: "Your data",
  dataTitle: "Kept separate and protected",
  how: "How it works",
  questions: "Questions",
  questionsTitle: "What people ask us",
  contactTitle: "Let's talk.",
  contactIntro:
    "The fastest way to reach us is WhatsApp. Tell us a little about your home or business and we'll take it from there.",
  privacyTitle: "How we handle your information",
  privacySite: "This website",
  privacyMessage: "When you message us",
  privacyShare: "Sharing",
  privacySharing:
    "We don't sell your information. We share it only with the service providers we need to run our business, such as WhatsApp and our messaging provider, or when the law requires it.",
  privacyChoices: "Your choices",
  notFoundTitle: "This page isn't here.",
  notFoundBody: "The link may be old. Here's where to go instead:",
  home: "Home",
  notFoundNumber: "404",
  alreadyTheatre: "Already have a home theatre?",
  alreadyCustomer: "Already a customer?",
  serving: "Serving",
  lastUpdated: "Last updated",
  processTitle: "From first visit to handover",
  notFoundMeta: "Page not found",
  privacyMessagePrefix: "Messages you send to",
  privacyMessageBody:
    "reach us through WhatsApp (Meta) and our messaging provider, and are recorded in our customer system so our team can reply and follow up. We use your name, number, area and what you tell us only to answer your enquiry, prepare quotes and serve you as a customer.",
  privacyChoicesPrefix:
    "To see, correct or delete what we hold about you, email",
  privacyChoicesBody:
    "or message us on WhatsApp. If you ask us to stop messaging you, we will.",
  footerBased: "Based in",
  footerServing: "serving",
  location: "Karnataka, India",
  homeMetaSuffix:
    "smart homes, home cinema, commercial audio & EKANI CRM · Karnataka, Tamil Nadu, AP & Telangana",
};

// Seller details and all-service scope supplied by the owner, 25 September 2026.
// Cancellation/refund terms drafted at the owner's request; see the PR for review.
// TODO(owner): name the grievance officer before gateway submission.
// TODO(Claude Code): align the actual billing and fulfilment workflows with these terms.
export const BUSINESS_INFO = {
  registeredName: "THALIR INNOVATIONS",
  postalAddress: [
    "65, 5th Cross, Amruthnagar, B Sector",
    "Byatarayanyapura, Bangalore",
    "Karnataka 560092, India",
  ],
  structuredAddress: {
    streetAddress: "65, 5th Cross, Amruthnagar, B Sector, Byatarayanyapura",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560092",
    addressCountry: "IN",
  },
  grievanceName: "",
  grievanceRole: "Grievance Officer",
  grievanceTitle: "Complaints & grievance redressal",
  grievanceBody:
    "Send a complaint to hello@thalirone.com with the subject 'Grievance' or message our WhatsApp number. Include your order reference and the outcome you are requesting. We acknowledge complaints within 48 hours and resolve them within one month of receipt.",
  grievanceEscalation:
    "You may also use the National Consumer Helpline or other remedies available under applicable law. Contacting us does not restrict those rights.",
  grievanceLink: "National Consumer Helpline",
  scope:
    "These policies cover payments collected by THALIR INNOVATIONS for Smart Home & Cinema, Cinema Revival, equipment supplied with those services, and EKANI subscriptions and related services.",
  updated: "2026-09-25",
  updatedLabel: "25 September 2026",
  nav: "Business information and policies",
  onPage: "On this page",
  about: "About us",
  policies: "Customer policies",
  seller: "Registered seller",
  address: "Registered address",
  helpTitle: "Questions about an order or payment?",
  helpBody:
    "Email us or message us on WhatsApp with your quote, invoice or transaction reference, payment date and a short description of the issue. Please do not share a card number, CVV, PIN, password or one-time password.",
  emailLabel: "Email customer support",
  emailSupport: "Email support",
  paymentTitle: "Order & payment support",
  paymentBody:
    "For any Smart Home & Cinema, Cinema Revival or EKANI order, contact us about cancellations, refunds, delivery or payment issues. Include your quote, invoice or transaction reference so we can identify it.",
  privacyPaymentsTitle: "Order and payment enquiries",
  privacyPaymentsBody:
    "If you send us an invoice, transaction reference or payment issue, we use those details to identify your order and respond to your request. Please do not send full card details, CVVs, PINs, passwords or one-time passwords through the contact form, email or WhatsApp. This website has no payment form and does not collect payment credentials.",
  privacyExternalTitle: "Other websites and payment services",
  privacyExternalBody:
    "Links to EKANI and messaging or payment services take you to separate websites or apps. Their privacy notices explain how they handle information you provide there. This notice describes thalirone.com and the enquiries you send to Thalir Innovations.",
  aboutIntro: SITE.description,
  aboutProcessTitle: "A clear scope before work begins",
  aboutProcess:
    "For a smart home or cinema project, we start with a site survey and a written quote. For an existing theatre, share your setup with us; the scope, charges and visit date are agreed before scheduling. EKANI features and current module prices are listed on our Business Software page.",
  aboutLocationTitle: "Based in Bengaluru",
  aboutLocation:
    "We take home and cinema projects across Karnataka, Tamil Nadu, Andhra Pradesh and Telangana. Travel charges outside Bengaluru are agreed before the visit.",
};

// Commercial policy choices drafted under the owner's express instruction.
// No gateway approval or legal certification is implied.
export const POLICIES = [
  {
    slug: "terms",
    title: "Terms & Conditions",
    description:
      "Terms for Thalir Innovations home and cinema projects, equipment supply and EKANI subscriptions.",
    intro:
      "These terms apply to orders and payments for all our services. Read them with your written quote or selected subscription plan before paying.",
    sections: [
      {
        id: "scope",
        title: "Who you are buying from",
        paragraphs: [
          "THALIR INNOVATIONS is the seller for the services covered by these terms. Our registered address and support contacts appear on this page and on Contact.",
          "These policies cover Smart Home & Cinema, Cinema Revival, equipment we supply with those services, and EKANI subscriptions and related services. They apply whether you pay by a payment link, within EKANI or through another payment method we offer.",
          "thalirone.com is an information and enquiry website. Its contact form prepares a WhatsApp message; it has no checkout or payment-credential form. Sending an enquiry does not confirm an order or reserve a visit.",
        ],
      },
      {
        id: "project-orders",
        title: "Quotes, prices and orders",
        paragraphs: [
          "Smart Home & Cinema projects begin with a site survey and a written quote. For Cinema Revival, the scope, charges and visit date are agreed before scheduling. Equipment compatibility and the capabilities of your system are confirmed for your project.",
          "Before payment, your quote or checkout must show the total payable in Indian rupees, including any applicable taxes and separately identified delivery, travel or other charges. Project milestones, equipment specifications and delivery or service dates are agreed in writing. We do not add unapproved work or charges.",
          "An advance is credited towards the order and is subject to our Cancellation & Refund Policy. A quote cannot remove the protections in that policy or your rights under applicable law. Any more favourable written terms agreed for your order will be honoured.",
        ],
      },
      {
        id: "software",
        title: "EKANI subscriptions and renewal",
        paragraphs: [
          "EKANI plan prices, included modules, user limits and billing cycle are shown before purchase. Review the total for a monthly or annual plan in EKANI before paying. Enquiring about a demo does not activate a paid subscription.",
          "Any recurring payment requires your consent. Where auto-renewal is enabled, you may cancel future renewal through the available billing controls or by emailing support before the renewal is processed. Access continues until the paid period ends unless you request a refund and cancellation of access.",
          "Deleting an app, logging out or no longer using the service does not itself cancel an authorised recurring payment. Our refund policy explains first-purchase refunds, renewals and billing errors.",
        ],
        links: [
          ["/business-software/#pricing", "Explore EKANI pricing"],
          ["/refunds/#subscriptions", "EKANI cancellation and refund terms"],
        ],
      },
      {
        id: "payment-records",
        title: "Payments and billing problems",
        paragraphs: [
          "Pay only against the agreed quote, invoice or subscription selection. Payment methods and the provider processing your payment are shown when you pay; providers may change. Keep your receipt and transaction reference.",
          "If a payment is pending, duplicated, debited without confirmation or for an incorrect amount, contact us before retrying. We verify the payment record and refund confirmed duplicate or excess amounts under our refund process. Failed-payment reversals are handled by the bank or payment provider and do not confirm an order.",
        ],
      },
      {
        id: "responsibilities",
        title: "Service scope and customer information",
        paragraphs: [
          "Provide accurate billing, delivery and site-access information and tell us about changes that affect the agreed work. We confirm any resulting changes to scope, dates or charges with you before proceeding.",
          "Equipment warranty coverage and exclusions are stated with the relevant product or order. A manufacturer warranty does not replace our responsibility for goods or services that are defective, not as agreed or not delivered. No statement on this website removes a remedy available under applicable law.",
        ],
      },
      {
        id: "related-policies",
        title: "Policies, changes and applicable law",
        paragraphs: [
          "The policy version supplied or displayed when you place an order applies to that order. Later changes do not retrospectively reduce your agreed rights. Indian law applies, without limiting your right to approach a consumer forum or other authority having jurisdiction.",
          "Use our Contact page for order support or to raise a grievance. The linked policies explain cancellation, returns, refunds, delivery and privacy.",
        ],
        links: [
          ["/refunds/", "Cancellation & Refund Policy"],
          ["/shipping/", "Shipping & Service Delivery Policy"],
          ["/privacy/", "Privacy Policy"],
          ["/contact/#grievance", "Complaints and grievance contact"],
        ],
      },
    ],
  },
  {
    slug: "refunds",
    title: "Cancellation & Refund Policy",
    description:
      "Cancellation, returns and refund terms for all Thalir Innovations services, equipment and EKANI subscriptions.",
    intro:
      "Clear terms for changing an order, returning eligible equipment or requesting a refund. This policy covers all payments collected by THALIR INNOVATIONS for our home, cinema and EKANI services.",
    sections: [
      {
        id: "request",
        title: "How to make a request",
        paragraphs: [
          "Email hello@thalirone.com or message our WhatsApp number with your name, quote or invoice reference, payment date, transaction reference and the reason for the request. Include your account email for EKANI, or the agreed date for a service visit. The time we receive your message is the request time.",
          "We acknowledge requests within 48 hours and normally confirm eligibility and the refund calculation within 7 business days of receiving the information needed to assess them. If inspection is required, we explain the steps and expected date. Complaints are resolved within one month of receipt.",
          "A business day in this policy means Monday to Friday, excluding public holidays in Karnataka. The time limits for making a request are calendar days unless stated otherwise.",
        ],
      },
      {
        id: "projects",
        title: "Cancelling home and cinema work",
        paragraphs: [
          "Before we begin any agreed work or place an equipment order with your approval, you may cancel for a full refund of the amount paid. We do not charge a separate cancellation or payment-processing fee.",
          "If work has started, you pay only for satisfactorily completed work at the agreed rates and equipment you have received or choose to retain. We provide an itemised statement and refund the unused balance of your advance.",
          "Customised, made-to-order or specially procured equipment may not be cancellable for a change of mind once production or an irrevocable supplier order has begun. Any such restriction and maximum non-recoverable commitment must be disclosed and accepted in writing before procurement. We first seek cancellation or recovery from the supplier, credit any recovered amount to you and provide supporting records. Equipment you pay for remains available for delivery to you. A generic statement that every advance is non-refundable is not part of this policy.",
          "These provisions do not allow deductions for defective or incorrect goods, deficient work or our failure to deliver. No cancellation charge is imposed contrary to applicable law.",
        ],
      },
      {
        id: "visits",
        title: "Rescheduling surveys and service visits",
        paragraphs: [
          "Please give at least 24 hours notice when possible. We reschedule subject to availability and do not charge a separate rescheduling fee. Only services or travel already carried out at previously agreed rates may be payable; we explain any such amount before collecting it.",
          "If we cancel a visit or cannot carry out the agreed service for reasons within our control, you may choose a new date or a full refund for the undelivered service. We bear the costs of our cancellation.",
        ],
      },
      {
        id: "returns",
        title: "Equipment returns and faults",
        paragraphs: [
          "For standard equipment, request a change-of-mind return within 7 days of delivery. It must be unused, uninstalled and complete with its original packaging and accessories. Contact us for return instructions; you pay only the actual return transport cost agreed with you in advance. There is no separate restocking fee.",
          "Change-of-mind returns do not apply to equipment that has been installed, used, customised or specially ordered under a restriction you accepted before purchase. This does not exclude returns or refunds for faults, damage, incorrect supply, misdescription or non-delivery.",
          "Report damaged, missing or incorrect items promptly, preferably within 7 days, with the invoice and photographs where practical. This reporting request does not shorten your statutory or warranty rights. An unboxing video is not a condition for a valid claim.",
          "Where goods or services are defective, deficient, not as agreed or not delivered as promised, you may request the applicable return, refund or other remedy. Repair or replacement is available with your agreement and does not remove a right to a refund. We bear reasonable return or collection costs for our incorrect or defective supply and refund the affected amount, including taxes and delivery charges paid for it where applicable.",
        ],
      },
      {
        id: "subscriptions",
        title: "EKANI subscriptions",
        paragraphs: [
          "Your first paid EKANI subscription, whether monthly or annual, has a 7-day refund window starting when paid access is first made available. Request cancellation within that period for a full refund of that first subscription charge. This is a paid-purchase refund policy, not a free trial.",
          "Separately agreed setup, migration or training work already completed, and separately billed usage or third-party charges already consumed, are excluded from a change-of-mind subscription refund only if disclosed and accepted before payment. Unused refundable balances are returned, and any deduction is itemised.",
          "After the first-purchase refund window, and for subsequent renewals, subscription fees are not refunded solely because you change your mind or stop using the service. Cancel future renewal before it is processed; access remains available until the end of the paid period. This applies to both monthly and annual billing. Refunds for non-provision, defects, incorrect billing or other legal entitlements remain available.",
          "A renewal processed after we received your cancellation request, a duplicate charge or an unauthorised excess charge is refunded in full once verified. If we discontinue paid access without a breach by you, we refund the unused prepaid period. If paid access cannot be provided, you may request a refund for the undelivered subscription.",
        ],
      },
      {
        id: "refund-status",
        title: "Refund method and timing",
        paragraphs: [
          "We initiate an approved refund within 5 business days of approval and send the amount and refund reference to you. Refunds go back to the original payment method; we do not substitute store credit unless you choose it. We do not deduct a payment-gateway or refund-processing fee from the refundable amount.",
          "Banks and payment providers commonly take a further 5–10 business days to display the credit after initiation. This is an estimate, not a guaranteed bank settlement time. Any shorter timeline required by applicable law or payment rules takes precedence. Contact us with the refund reference if the credit has not appeared after 10 business days.",
          "If the original method cannot receive the refund, we verify the issue with the provider and agree an alternative payment to the verified original payer. We never ask for a PIN, CVV, password or one-time password to issue a refund.",
          "For a failed or pending payment, a bank reversal may follow a different schedule. We help trace the transaction and refund any confirmed duplicate or excess payment we received; a pending transaction is not treated as a completed order.",
        ],
      },
      {
        id: "rights",
        title: "Your rights and complaints",
        paragraphs: [
          "This policy does not limit rights or remedies under applicable consumer law. More favourable terms expressly agreed for your order continue to apply. Contact us if you disagree with a refund decision; we provide the reason and calculation in writing.",
        ],
        links: [
          ["/contact/#grievance", "Complaints and grievance contact"],
          ["/shipping/", "Shipping & Service Delivery Policy"],
        ],
      },
    ],
  },
  {
    slug: "shipping",
    title: "Shipping & Service Delivery Policy",
    description:
      "Equipment delivery, installation schedules and EKANI digital activation for Thalir Innovations customers.",
    intro:
      "We confirm the delivery or service schedule and any associated charges before payment. Project work, equipment supply and digital subscriptions each have a different fulfilment process.",
    sections: [
      {
        id: "service-area",
        title: "Where we work",
        paragraphs: [
          "We are based in Bengaluru and take home and cinema projects across Karnataka, Tamil Nadu, Andhra Pradesh and Telangana. Visits outside Bengaluru are by prior confirmation, with travel charges agreed before the visit. Equipment delivery is arranged to the address agreed for your project.",
        ],
      },
      {
        id: "equipment",
        title: "Equipment delivery and installation",
        paragraphs: [
          "Before you pay, the written quote or order specifies the equipment, delivery address, estimated dispatch date, expected delivery date or latest delivery window, installation milestones and any transport or handling charges. Equipment lead times depend on availability and any custom work; there is no single dispatch period for every project.",
          "We confirm readiness, site access and installation requirements with you. Delivery of equipment and completion of installation may take place on different dates. Where a carrier is used, we provide tracking or delivery coordination details when dispatched.",
          "If availability or a delay changes the promised schedule, we inform you and seek your agreement to a revised date. You do not have to accept an indefinite extension. Cancellation and refund remedies for an undelivered order are described in our refund policy.",
        ],
      },
      {
        id: "visits",
        title: "Surveys, installation and service visits",
        paragraphs: [
          "Smart Home & Cinema work follows a site survey, written quote, installation and programming, then handover. Cinema Revival scope, charges and the visit date are agreed before scheduling. Sending an enquiry does not reserve a date.",
          "Tell us promptly if site access, readiness or your availability changes. Any revised work, dates or charges must be agreed with you. Our cancellation policy explains rescheduling and refunds for services not delivered.",
        ],
      },
      {
        id: "digital-delivery",
        title: "EKANI digital access",
        paragraphs: [
          "EKANI is supplied digitally; there is no physical shipment for a software subscription. Standard paid access is provided within 2 business days after successful payment confirmation and receipt of the account details needed for activation. Business days are Monday to Friday, excluding public holidays in Karnataka.",
          "Any separately purchased setup, migration, training or integration work has its own delivery schedule stated before payment and does not silently extend the subscription activation period. The paid subscription period begins when the purchased access is available.",
          "If access is not available within that period, contact us with your account email and payment reference. You may accept a revised activation date or request a full refund of the undelivered subscription. Do not send passwords or one-time passwords.",
        ],
      },
      {
        id: "delivery-issues",
        title: "Missing, damaged or delayed deliveries",
        paragraphs: [
          "Contact us with your order reference if the agreed date has passed, equipment is damaged or missing, or the service differs from the agreed scope. Preserve packaging and photographs where practical so we can investigate and arrange the applicable remedy.",
          "Return and collection arrangements depend on the reason for the return. We cover reasonable return costs for incorrect or defective supply; change-of-mind returns follow the conditions in our refund policy. These arrangements do not limit your statutory rights.",
        ],
        links: [
          ["/refunds/", "Cancellation & Refund Policy"],
          ["/contact/#grievance", "Order support and complaints"],
        ],
      },
    ],
  },
];

// Existing illustrative example text, centralized unchanged.
export const DRAWING = {
  floorplanTitle: "Example floor plan with KNX devices and group addresses",
  speakersTitle: "Top view of a 7.2.4 home cinema speaker layout",
  living: "LIVING",
  kitchen: "KITCHEN · DINING",
  bedroom: "BEDROOM",
  cinema: "HOME THEATRE",
  livingLight: "1/0/1 · Living ceiling",
  livingAC: "2/0/1 · Living AC",
  bedroomCurtain: "3/1/0 · Bedroom curtain",
  movie: "0/0/4 · Scene: Movie",
  ac: "AC",
  knx: "KNX",
  screen: "SCREEN",
  sub: "SUB",
  speakerLegend: "7.2.4 · seven ear-level, two subs, four heights",
  zonesTitle:
    "Example plan: a restaurant with three music zones, a PA for announcements and acoustic panels",
  zoneDining: "DINING · ZONE 1",
  zoneBar: "BAR · ZONE 2",
  zoneOutdoor: "OUTDOOR · ZONE 3",
  zoneRack: "AMP",
  zoneMic: "MIC",
  zonePanels: "Acoustic panels",
  zonePaging: "Paging: all zones",
  zoneLegend: "Example · ceiling speakers by zone, one amplifier, one paging mic",
  flowLabel:
    "Example: a WhatsApp enquiry becomes a lead, a GST quote, an invoice and a recorded payment in EKANI",
  flowChat: "WhatsApp",
  flowEnquiry: "Hi, need a quote for 3 split ACs in Whitefield",
  flowLead: "Lead created",
  flowName: "Priya S.",
  flowArea: "Whitefield",
  flowSource: "Source: WhatsApp · follow up today",
  flowQuote: "GST quote",
  flowItem: "3 × split AC installation",
  flowSubtotal: "Subtotal",
  flowSubtotalAmount: "₹42,000",
  flowTax: "CGST 9% ₹3,780 · SGST 9% ₹3,780",
  flowTotal: "Total",
  flowTotalAmount: "₹49,560",
  flowInvoice: "Invoice",
  flowInvoiceSent: "INV-0142 sent on WhatsApp",
  flowUPI: "with a UPI QR to pay",
  flowPaid: "Paid",
  flowReceived: "received by UPI",
  flowRecorded: "recorded against the job",
  flowNote: "Example only: the name and amounts are made up.",
  revivalLabel:
    "Example Cinema Revival checklist: dialogue, bass, picture, controls, room comfort and equipment",
  revivalTitle: "Revival checklist",
  example: "Example",
  revivalNote: "What we look at on a revival consultation.",
  revivalRows: [
    ["Dialogue clarity", "Hard to follow at normal volume"],
    ["Bass", "Boomy at the sofa, thin at the back"],
    ["Picture", "Brightness, colour, screen fit"],
    ["Controls", "Too many remotes"],
    ["Room comfort", "Smells, stuffiness, eye irritation"],
    ["Equipment", "Receiver, speakers, display, wiring"],
  ],
};

// The owner requested natural photographic imagery on 24 September 2026.
// These are generated concepts, never customers or completed project evidence.
export const ART_COPY = {
  homeAlt:
    "AI-generated concept: a couple using a phone together in a naturally lit living room",
  cinemaAlt:
    "AI-generated concept: two people watching a film in a home cinema",
  businessAlt:
    "AI-generated concept: two business owners working with a phone and laptop",
  concept: "AI-generated concept",
};
