/**
 * Business Information
 * ─────────────────────────────────────────────────────────────────
 * Edit this file to update all business details across the website.
 * Fields marked [PLACEHOLDER] should be replaced with real data.
 * ─────────────────────────────────────────────────────────────────
 */

export const business = {
  name: 'Μεταξύ Μας',
  tagline: 'Καφέ · Μεζεδοπωλείο · Ζωντανή Μουσική',
  shortDescription:
    'Ένας ζεστός χώρος που το πρωί μυρίζει φρέσκο καφέ και το βράδυ γεμίζει με ελληνικούς μεζέδες και ζωντανή μουσική.',
  description:
    'Το «Μεταξύ Μας» είναι ένα μέρος που αλλάζει πρόσωπο από ώρα σε ώρα — κι αυτό είναι ακριβώς η μαγεία του. Το πρωί, ένα ήσυχο καφέ με αρώματα espresso και σπιτικό πρωινό. Το απόγευμα, ένα απαλό hangout για συνεργάτες και φίλους. Το βράδυ, η ταβέρνα ζωντανεύει — μεζέδες, κρασί, και ζωντανή ελληνική μουσική που σε κρατά ως αργά.',

  // Contact — [PLACEHOLDER: replace with real data]
  phone: '+30 210 5758 201',
  phoneDisplay: '210 5758 201',
  email: 'metaxumasouzeri@gmail.com', // [PLACEHOLDER]
  website: 'https://metaxumas.gr', // [PLACEHOLDER]

  // Location — [PLACEHOLDER: replace with real data]
  address: {
    street: 'Ασκληπιού 20',
    area: 'Περιστέρι',
    city: 'Αθήνα', // [PLACEHOLDER]
    postalCode: '121 35',
    country: 'Ελλάδα',
    mapsUrl: 'https://maps.google.com/?q=Μεταξύ+Μας', // [PLACEHOLDER: use real Google Maps link]
    mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144.9!2d23.7!3d37.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU4JzQ4LjAiTiAyM8KwNDInMDAuMCJF!5e0!3m2!1sel!2sgr!4v1600000000000!5m2!1sel!2sgr', // [PLACEHOLDER: replace with real embed URL]
  },

  // Hours — [PLACEHOLDER: replace with real hours]
  hours: [
    { days: 'Δευτέρα – Παρασκευή', morning: '08:00 – 16:00', evening: '18:00 – 02:00' },
    { days: 'Σάββατο',             morning: '09:00 – 16:00', evening: '18:00 – 03:00' },
    { days: 'Κυριακή',             morning: '10:00 – 16:00', evening: '18:00 – 01:00' },
  ],
  hoursSimple: 'Καθημερινά 08:00 – 02:00', // [PLACEHOLDER]

  // Ratings
  rating: 4.9,       // [PLACEHOLDER: update with real Google rating]
  reviewCount: 180,  // [PLACEHOLDER: update with real review count]
  ratingPlatform: 'Google',

  // Social — [PLACEHOLDER: replace with real profiles]
  social: {
    instagram: 'https://instagram.com/metaxu.mas', // [PLACEHOLDER]
    facebook:  'https://facebook.com/metaxumas',  // [PLACEHOLDER]
    tiktok:    null,
  },

  // Reservation link via Formspree (configured in ReservationForm)
  formspreeId: 'mwvwkyeq',
}

export default business
