# Cinema Revival scope correction

The owner explicitly confirmed that Cinema Revival includes odour removal and acoustic corrections where needed. This exact string comparison is against e33db59, covering the home service card, Cinema Revival page, enquiry prompts and example checklist. Shop additions and proposed starter packages are separately recorded in SHOP_COPY_CHANGES.md. No guaranteed treatment outcome or medical capability is added.

```json
[
  {
    "path": "CATEGORIES[1].card.pitch",
    "old": "Get more from the home theatre you already own: consultation, enhancement, advanced calibration, and help with unwanted smells and eye irritation in the room.",
    "new": "Get more from the home theatre you already own: consultation, odour removal, acoustic corrections where needed, theatre enhancement and advanced calibration."
  },
  {
    "path": "CATEGORIES[1].card.bullets[3]",
    "old": "Find and fix causes of smells and eye irritation",
    "new": "Odour removal and room comfort"
  },
  {
    "path": "CATEGORIES[1].card.bullets[4]",
    "old": null,
    "new": "Acoustic corrections where needed"
  },
  {
    "path": "CATEGORIES[1].composerHint",
    "old": "e.g. 12×16 ft theatre, 5.1 system, dialogue is hard to hear",
    "new": "e.g. 12×16 ft theatre, unclear dialogue, echo or unwanted odours"
  },
  {
    "path": "CATEGORIES[1].cta.wa",
    "old": "Hi Thalir Innovations! I'd like a Home Cinema Revival consultation.\nMy location: \nWhat I want to improve (sound / picture / controls / room comfort): ",
    "new": "Hi Thalir Innovations! I'd like a Home Cinema Revival consultation.\nMy location: \nWhat I want to improve (odours / acoustics / sound / picture / controls / room comfort): "
  },
  {
    "path": "CATEGORIES[1].page.metaDescription",
    "old": "Home Cinema Revival for existing home theatres across Karnataka, Tamil Nadu, Andhra Pradesh and Telangana: consultation, theatre enhancement, advanced calibration, and help with unwanted smells and eye irritation in the room. Book on WhatsApp.",
    "new": "Home Cinema Revival across Karnataka, Tamil Nadu, Andhra Pradesh and Telangana: consultation, odour removal, acoustic corrections where needed, theatre enhancement and calibration. Book on WhatsApp."
  },
  {
    "path": "CATEGORIES[1].page.lede",
    "old": "Get more from the theatre you already own. We look at the sound, the picture, the controls and how comfortable the room is to sit in, then agree a practical plan to put it right.",
    "new": "Revive the whole theatre: odour removal, acoustic corrections where needed, better sound and picture, and simpler controls. We assess your room and equipment, then agree the improvements that suit your setup and budget."
  },
  {
    "path": "CATEGORIES[1].page.features[3][1]",
    "old": "Smells & eye irritation",
    "new": "Odour removal & room comfort"
  },
  {
    "path": "CATEGORIES[1].page.features[3][2]",
    "old": "We help find and fix the causes within the theatre, so the room is comfortable to spend an evening in.",
    "new": "We help identify and address the causes of unwanted odours and eye irritation within the theatre room, with the work agreed after assessment."
  },
  {
    "path": "CATEGORIES[1].page.features[4][0]",
    "old": "remote",
    "new": "plan"
  },
  {
    "path": "CATEGORIES[1].page.features[4][1]",
    "old": "Controls & automation",
    "new": "Acoustic corrections"
  },
  {
    "path": "CATEGORIES[1].page.features[4][2]",
    "old": "Simpler everyday controls, with automation that works with the equipment you have.",
    "new": "We assess how sound behaves in the room and recommend acoustic corrections where needed. The treatment and work are scoped to your theatre."
  },
  {
    "path": "CATEGORIES[1].page.features[5][0]",
    "old": "plan",
    "new": "remote"
  },
  {
    "path": "CATEGORIES[1].page.features[5][1]",
    "old": "New home theatres",
    "new": "Controls & automation"
  },
  {
    "path": "CATEGORIES[1].page.features[5][2]",
    "old": "Planning a new room? Consultation, design and installation all start with a plan.",
    "new": "Simpler everyday controls, with automation that works with the equipment you have."
  },
  {
    "path": "CATEGORIES[1].page.features[6][0]",
    "old": null,
    "new": "plan"
  },
  {
    "path": "CATEGORIES[1].page.features[6][1]",
    "old": null,
    "new": "New home theatres"
  },
  {
    "path": "CATEGORIES[1].page.features[6][2]",
    "old": null,
    "new": "Planning a new room? Consultation, design and installation all start with a plan."
  },
  {
    "path": "DRAWING.revivalLabel",
    "old": "Example Cinema Revival checklist: dialogue, bass, picture, controls, room comfort and equipment",
    "new": "Example Cinema Revival checklist: dialogue, bass, acoustics, picture, controls, odours, room comfort and equipment"
  },
  {
    "path": "DRAWING.revivalRows[2][0]",
    "old": "Picture",
    "new": "Acoustics"
  },
  {
    "path": "DRAWING.revivalRows[2][1]",
    "old": "Brightness, colour, screen fit",
    "new": "Echo and room reflections"
  },
  {
    "path": "DRAWING.revivalRows[3][0]",
    "old": "Controls",
    "new": "Picture"
  },
  {
    "path": "DRAWING.revivalRows[3][1]",
    "old": "Too many remotes",
    "new": "Brightness, colour, screen fit"
  },
  {
    "path": "DRAWING.revivalRows[4][0]",
    "old": "Room comfort",
    "new": "Controls"
  },
  {
    "path": "DRAWING.revivalRows[4][1]",
    "old": "Smells, stuffiness, eye irritation",
    "new": "Too many remotes"
  },
  {
    "path": "DRAWING.revivalRows[5][0]",
    "old": "Equipment",
    "new": "Odours & room comfort"
  },
  {
    "path": "DRAWING.revivalRows[5][1]",
    "old": "Receiver, speakers, display, wiring",
    "new": "Unwanted smells, stuffiness, eye irritation"
  },
  {
    "path": "DRAWING.revivalRows[6][0]",
    "old": null,
    "new": "Equipment"
  },
  {
    "path": "DRAWING.revivalRows[6][1]",
    "old": null,
    "new": "Receiver, speakers, display, wiring"
  }
]
```
