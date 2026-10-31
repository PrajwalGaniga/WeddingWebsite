// ─────────────────────────────────────────────────────────────────────────────
// WEDDING CONFIG — Single source of truth for all wedding details.
// Edit this file to update names, dates, venues, links, and contacts.
// ─────────────────────────────────────────────────────────────────────────────

export const WEDDING_CONFIG = {
  // ── Couple ────────────────────────────────────────────────────────────────
  bride: "Neslin",
  groom: "Gaywin",
  brideFull: "Neslin D'souza",
  groomFull: "Gaywin Lasrado",
  monogram: "N & G",
  hashtag: "#NeslinWedsGaywin",

  // ── Wedding Date ──────────────────────────────────────────────────────────
  date: "Monday, 21st December 2026",
  dateShort: "21 Dec 2026",
  dateNum: 21,
  month: "December",
  year: 2026,
  dayName: "Monday",
  weddingTime: "3:30 P.M.",
  location: "Mangalore, Karnataka, India",

  // ── Scripture ─────────────────────────────────────────────────────────────
  scripture: {
    verse:
      "and now these three remain: Faith, Hope and Love, But the greatest of these is love",
    reference: "1 Corinthians 13:13",
  },

  // ── Invitation Text ───────────────────────────────────────────────────────
  invitation: {
    hostess: "Mrs. Florin D'souza",
    blessedBy: "late Mark Gregory D'souza",
    groomParents: "Clement Lasrado and Felcy Rodrigues",
  },

  // ── Events ────────────────────────────────────────────────────────────────
  events: [
    {
      id: "roce",
      title: "Roce Ceremony",
      date: "Saturday, 19th December, 2026",
      time: "6:30 P.M.",
      venue: "St. Thomas Church Hall",
      address: "Nirkan, Bantwal Taluk, Karnataka",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=St.+Thomas+Church+Hall+Nirkan",
      calendarUrl:
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Roce+Ceremony+-+Neslin+%26+Gaywin&dates=20261219T130000Z/20261219T170000Z&location=St.+Thomas+Church+Hall,+Nirkan",
    },
    {
      id: "nuptials",
      title: "Nuptial Mass",
      date: "Monday, 21st December, 2026",
      time: "3:30 P.M.",
      venue: "Holy Spirit Church",
      address: "Bajal, Mangalore, Karnataka 575007",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Holy+Spirit+Church+Bajal+Mangalore",
      calendarUrl:
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Nuptial+Mass+-+Neslin+%26+Gaywin&dates=20261221T100000Z/20261221T123000Z&location=Holy+Spirit+Church,+Bajal,+Mangalore",
    },
    {
      id: "reception",
      title: "Wedding Reception",
      date: "Monday, 21st December, 2026",
      time: "6:30 P.M.",
      venue: "St. Sebastian Centenary Auditorium",
      address: "Bendoor, Mangalore, Karnataka 575002",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=St.+Sebastian+Centenary+Auditorium+Bendoor+Mangalore",
      calendarUrl:
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+Reception+-+Neslin+%26+Gaywin&dates=20261221T130000Z/20261221T170000Z&location=St.+Sebastian+Centenary+Auditorium,+Bendoor,+Mangalore",
    },
  ],

  // ── Contacts ──────────────────────────────────────────────────────────────
  contacts: [
    { label: "Wedding Coordination", phone: "+91 9741715635", clean: "919741715635" },
    { label: "Family RSVP & Enquiries", phone: "+91 9686129315", clean: "919686129315" },
  ],

  // ── Closing Blessings ─────────────────────────────────────────────────────
  closingBlessing: "Your presence and blessings will be our treasured gift",
  bestWishesFrom: "Preetham Manil & Marsiya Preema",
} as const;
