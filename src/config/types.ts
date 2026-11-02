export interface WeddingEvent {
  id: string;
  title: string;
  day: string;
  date: string;
  time: string;
  venue: string;
  mapsUrl: string;
  calendarUrl: string;
  frameImage?: string;
  iconType?: "church" | "wine" | "calendar";
}

export interface WeddingContact {
  label: string;
  phone: string;
  clean: string;
}

export interface WeddingInvitationDetails {
  hostessText: string; // e.g. "I, Mrs. Florin D’souza and with the blessings of my husband late Mark Gregory D’souza" vs "We, Mr. Clement Lasrado and Mrs. Felcy Rodrigues"
  inviteText: string;  // e.g. "cordially invite you and your family to witness and bless the nuptials of my daughter" vs "...of our son"
  primaryRole: "bride" | "groom"; // Which person is primary on this side
  primaryName: string;
  primarySubtext?: string;
  secondaryRole: "bride" | "groom";
  secondaryName: string;
  secondarySubtext?: string;
}

export interface WeddingConfig {
  side: "bride" | "groom";
  bride: string;
  groom: string;
  brideFull: string;
  groomFull: string;
  couple: string; // "Neslin & Gaywin" vs "Gaywin & Neslin"
  coupleFull: string; // "Neslin Priya & Gaywin Cristan" vs "Gaywin Cristan & Neslin Priya"
  firstFlapName: string; // for envelope flaps
  secondFlapName: string;
  firstFlapDate: string;
  monogram: string; // "N & G" vs "G & N"
  hashtag: string; // "#NeslinWedsGaywin" vs "#GaywinWedsNeslin"

  // Wedding Date & Time
  date: string;
  dateShort: string;
  dateNum: number;
  month: string;
  year: number;
  dayName: string;
  weddingTime: string;
  location: string;

  // Scripture
  scripture: {
    verse: string;
    reference: string;
  };

  // Invitation
  invitation: WeddingInvitationDetails;

  // Events
  events: WeddingEvent[];

  // Calendar Highlight
  roceDayNum: number;
  calendarRoceNote: string;
  googleCalendarUrl: string;

  // Contacts & Blessings
  contacts: WeddingContact[];
  closingBlessing: string;
  bestWishesFrom: string;
}

