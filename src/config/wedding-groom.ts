import { WeddingConfig } from "./types";

export const GROOM_WEDDING_CONFIG: WeddingConfig = {
  side: "groom",

  // ── Couple ────────────────────────────────────────────────────────────────
  bride: "Neslin",
  groom: "Gaywin",
  brideFull: "Neslin Priya",
  groomFull: "Gaywin Cristan",
  couple: "Gaywin & Neslin",
  coupleFull: "Gaywin Cristan & Neslin Priya",
  firstFlapName: "Gaywin",
  secondFlapName: "Neslin",
  firstFlapDate: "21 Dec 2026",
  monogram: "G & N",
  hashtag: "#GaywinWedsNeslin",

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
    hostessText: "We, Mr. Clement Lasrado and Mrs. Felcy Rodrigues",
    inviteText: "cordially invite you and your family to witness and bless the nuptials of our son",
    primaryRole: "groom",
    primaryName: "Gaywin Cristan",
    secondaryRole: "bride",
    secondaryName: "Neslin Priya",
    secondarySubtext: "(D/o late Mark Gregory D’souza and Mrs. Florin D’souza)",
  },

  // ── Events ────────────────────────────────────────────────────────────────
  events: [
    {
      id: "roce",
      title: "Roce Ceremony",
      day: "Friday",
      date: "December 18, 2026",
      time: "6:45 P.M.",
      venue: "Holy Spirit Church Ground, Bajal",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Holy+Spirit+Church+Ground+Bajal+Mangalore",
      calendarUrl:
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Roce+Ceremony+-+Gaywin+%26+Neslin&dates=20261218T131500Z/20261218T171500Z&location=Holy+Spirit+Church+Ground,+Bajal",
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
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Nuptial+Mass+-+Gaywin+%26+Neslin&dates=20261221T110000Z/20261221T130000Z&location=Holy+Spirit+Church,+Bajal,+Mangalore",
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
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+Reception+-+Gaywin+%26+Neslin&dates=20261221T131500Z/20261221T171500Z&location=St.+Sebastian+Centenary+Auditorium,+Bendoor,+Mangalore",
      frameImage: "/assets/floral_frame_reception.jpg",
      iconType: "wine",
    },
  ],

  // ── Calendar Highlight ────────────────────────────────────────────────────
  roceDayNum: 18,
  calendarRoceNote: "(Roce Ceremony on Friday, December 18)",
  googleCalendarUrl:
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+of+Gaywin+%26+Neslin&dates=20261221T110000Z/20261221T171500Z&details=Nuptial+Mass+at+Holy+Spirit+Church,+Bajal,+Mangalore+at+4:30+P.M.+followed+by+Wedding+Reception+at+St.+Sebastian+Centenary+Auditorium,+Bendoor,+Mangalore+at+6:45+P.M.&location=Holy+Spirit+Church,+Bajal,+Mangalore",

  // ── Contacts ──────────────────────────────────────────────────────────────
  contacts: [
    { label: "Wedding Coordination", phone: "+91 8296940803", clean: "918296940803" },
    { label: "Family RSVP & Enquiries", phone: "+91 97315 35116", clean: "919731535116" },
  ],

  // ── Closing Blessings ─────────────────────────────────────────────────────
  closingBlessing: "Your presence and blessings will be our treasured gift",
  bestWishesFrom: "Joswin and Nickshan",
};

