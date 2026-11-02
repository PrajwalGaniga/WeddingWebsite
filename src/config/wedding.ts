import { WeddingConfig } from "./types";

export const BRIDE_WEDDING_CONFIG: WeddingConfig = {
  side: "bride",

  // ── Couple ────────────────────────────────────────────────────────────────
  bride: "Neslin",
  groom: "Gaywin",
  brideFull: "Neslin Priya",
  groomFull: "Gaywin Cristan",
  couple: "Neslin & Gaywin",
  coupleFull: "Neslin Priya & Gaywin Cristan",
  firstFlapName: "Neslin",
  secondFlapName: "Gaywin",
  firstFlapDate: "21 Dec 2026",
  monogram: "N & G",
  hashtag: "#NeslinWedsGaywin",

  // ── Wedding Date ──────────────────────────────────────────────────────────
  date: "Monday, 21st December 2026",
  dateShort: "21 Dec 2026",
  dateNum: 21,
  month: "December",
  year: 2026,
  dayName: "Monday",
  weddingTime: "4:30 P.M.",
  location: "Mangalore, Karnataka, India",

  // ── Scripture ─────────────────────────────────────────────────────────────
  scripture: {
    verse:
      "and now these three remain: Faith, Hope and Love, But the greatest of these is love",
    reference: "1 Corinthians 13:13",
  },

  // ── Invitation Text ───────────────────────────────────────────────────────
  invitation: {
    hostessText: "I, Mrs. Florin D’souza and with the blessings of my husband late Mark Gregory D’souza",
    inviteText: "cordially invite you and your family to witness and bless the nuptials of my daughter",
    primaryRole: "bride",
    primaryName: "Neslin Priya",
    secondaryRole: "groom",
    secondaryName: "Gaywin Cristan",
    secondarySubtext: "(S/o Clement Lasrado and Felcy Rodrigues)",
  },

  // ── Events ────────────────────────────────────────────────────────────────
  events: [
    {
      id: "roce",
      title: "Roce Ceremony",
      day: "Saturday",
      date: "December 19, 2026",
      time: "6:45 P.M.",
      venue: "St. Thomas Church Hall, Nirkan",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=St.+Thomas+Church+Hall+Nirkan",
      calendarUrl:
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Roce+Ceremony+-+Neslin+%26+Gaywin&dates=20261219T131500Z/20261219T171500Z&location=St.+Thomas+Church+Hall,+Nirkan",
      frameImage: "/assets/floral_frame_roce.jpg",
      iconType: "church",
    },
    {
      id: "nuptials",
      title: "Nuptial Mass",
      day: "Monday",
      date: "December 21, 2026",
      time: "4:30 P.M.",
      venue: "Holy Spirit Church, Bajal, Mangalore",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Holy+Spirit+Church+Bajal+Mangalore",
      calendarUrl:
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Nuptial+Mass+-+Neslin+%26+Gaywin&dates=20261221T110000Z/20261221T130000Z&location=Holy+Spirit+Church,+Bajal,+Mangalore",
      frameImage: "/assets/floral_frame_church.jpg",
      iconType: "church",
    },
    {
      id: "reception",
      title: "Wedding Reception",
      day: "Monday",
      date: "December 21, 2026",
      time: "6:45 P.M.",
      venue: "St. Sebastian Centenary Auditorium, Bendoor, Mangalore",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=St.+Sebastian+Centenary+Auditorium+Bendoor+Mangalore",
      calendarUrl:
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+Reception+-+Neslin+%26+Gaywin&dates=20261221T131500Z/20261221T171500Z&location=St.+Sebastian+Centenary+Auditorium,+Bendoor,+Mangalore",
      frameImage: "/assets/floral_frame_reception.jpg",
      iconType: "wine",
    },
  ],

  // ── Calendar Highlight ────────────────────────────────────────────────────
  roceDayNum: 19,
  calendarRoceNote: "(Roce Ceremony on Saturday, December 19)",
  googleCalendarUrl:
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+of+Neslin+%26+Gaywin&dates=20261221T110000Z/20261221T171500Z&details=Nuptial+Mass+at+Holy+Spirit+Church,+Bajal,+Mangalore+at+4:30+P.M.+followed+by+Wedding+Reception+at+St.+Sebastian+Centenary+Auditorium,+Bendoor,+Mangalore+at+6:45+P.M.&location=Holy+Spirit+Church,+Bajal,+Mangalore",

  // ── Contacts ──────────────────────────────────────────────────────────────
  contacts: [
    { label: "Wedding Coordination", phone: "+91 9741715635", clean: "919741715635" },
    { label: "Family RSVP & Enquiries", phone: "+91 9686129315", clean: "919686129315" },
  ],

  // ── Closing Blessings ─────────────────────────────────────────────────────
  closingBlessing: "Your presence and blessings will be our treasured gift",
  bestWishesFrom: "Preetham Manil & Marsiya Preema",
};

export const WEDDING_CONFIG = BRIDE_WEDDING_CONFIG;
