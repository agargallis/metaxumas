/**
 * Live Music Events Data
 * ─────────────────────────────────────────────────────────────────
 * Add upcoming live nights here.
 * recurring: true = weekly/regular event (no specific date needed)
 * date: ISO string for one-time events
 * ─────────────────────────────────────────────────────────────────
 */

export const recurringEvents = [
  {
    id: 'r1',
    day: 'Παρασκευή',
    dayShort: 'Παρ',
    title: 'Ζωντανή Μουσική Βραδιά',
    description: 'Κάθε Παρασκευή βράδυ, ζωντανό σχήμα και μεζέδες — η καλύτερη παρέα για να τελειώσεις την εβδομάδα.',
    time: '21:30',
    genre: 'Ελληνική Λαϊκή',
    vibe: 'Χαλαρό & Ζεστό',
    artist: null, // [PLACEHOLDER: add artist name when confirmed]
    reservationRequired: true,
    highlight: true,
  },
  {
    id: 'r2',
    day: 'Σάββατο',
    dayShort: 'Σαβ',
    title: 'Σαββατιάτικη Βραδιά',
    description: 'Το Σάββατο το «Μεταξύ Μας» γίνεται ταβέρνα στα καλά: ζωντανή μουσική, πάθος, και τραπέζι που δεν θέλεις να αφήσεις.',
    time: '21:00',
    genre: 'Ελληνικό Λαϊκό / Ρεμπέτικο',
    vibe: 'Γιορτινό & Ζωντανό',
    artist: null, // [PLACEHOLDER]
    reservationRequired: true,
    highlight: true,
  },
  {
    id: 'r3',
    day: 'Τετάρτη',
    dayShort: 'Τετ',
    title: 'Acoustic Βραδιά',
    description: 'Μεσοβδόμαδα ανάσα — ήχοι acoustic, ατμόσφαιρα καφενείου, και το τέλειο κρασί για συντροφιά.',
    time: '20:30',
    genre: 'Acoustic / Indie Greek',
    vibe: 'Ήπιο & Ατμοσφαιρικό',
    artist: null, // [PLACEHOLDER]
    reservationRequired: false,
    highlight: false,
  },
]

export const upcomingEvents = [
  {
    id: 'u1',
    date: '2025-04-18', // [PLACEHOLDER: update date]
    title: 'Βραδιά Ρεμπέτικου',
    description: 'Μια ξεχωριστή βραδιά αφιερωμένη στο ρεμπέτικο — με παραδοσιακά όργανα, ιστορίες και ψυχή.',
    time: '21:00',
    genre: 'Ρεμπέτικο',
    artist: '[Καλλιτέχνης]', // [PLACEHOLDER]
    capacity: 60,
    price: 'Ελεύθερη Είσοδος',
    reservationRequired: true,
    tags: ['Ρεμπέτικο', 'Παράδοση', 'Ξεχωριστό'],
  },
  {
    id: 'u2',
    date: '2025-04-25', // [PLACEHOLDER: update date]
    title: 'Ιδιαίτερη Βραδιά — Εθνικό Εορτασμός',
    description: 'Στις 25 Απριλίου, μια βραδιά γεμάτη ελληνικές μελωδίες, μεζέδες και ζεστή συντροφιά.',
    time: '20:00',
    genre: 'Ελληνική Λαϊκή',
    artist: '[Καλλιτέχνης]', // [PLACEHOLDER]
    capacity: 80,
    price: 'Ελεύθερη Είσοδος',
    reservationRequired: true,
    tags: ['Εθνική Επέτειος', 'Ειδική Βραδιά'],
  },
  {
    id: 'u3',
    date: '2025-05-03', // [PLACEHOLDER: update date]
    title: 'Jazz & Greek Fusion Νύχτα',
    description: 'Σύγχρονοι Έλληνες μουσικοί παντρεύουν jazz με ελληνικές μελωδίες — μια πρωτότυπη ακουστική εμπειρία.',
    time: '21:30',
    genre: 'Jazz Fusion / Greek',
    artist: '[Καλλιτέχνης]', // [PLACEHOLDER]
    capacity: 50,
    price: 'Ελεύθερη Είσοδος',
    reservationRequired: true,
    tags: ['Jazz', 'Fusion', 'Πρωτότυπο'],
  },
]

export const allEvents = [...upcomingEvents]

export default { recurringEvents, upcomingEvents }
