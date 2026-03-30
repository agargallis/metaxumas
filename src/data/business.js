import thumb1 from '../assets/images/thumb1.png'

export const business = {
  name: 'Μεταξύ Μας',
  tagline: 'Μεζεδοπωλείο & Καφέ',
  shortDescription:
    'Ένας ζεστός χώρος που το πρωί μυρίζει φρέσκο καφέ και το βράδυ γεμίζει με ελληνικούς μεζέδες και ζωντανή μουσική.',
  description:
    'Το «Μεταξύ Μας» είναι ένα μέρος που αλλάζει πρόσωπο από ώρα σε ώρα. Το πρωί είναι ιδανικό για καφέ και πρωινό, το απόγευμα πιο χαλαρό για παρέα, και το βράδυ γεμίζει με μεζέδες, κρασί και μουσική.',

  phone: '+30 210 5758 201',
  phoneDisplay: '210 5758 201',
  email: 'metaxumasouzeri@gmail.com',
  website: 'https://metaxumas.gr',

  address: {
    street: 'Ασκληπιού 20',
    area: 'Περιστέρι',
    city: '',
    postalCode: '121 35',
    country: 'Ελλάδα',
    mapsUrl: 'https://shorturl.at/lbNsJ',
    mapsEmbed: 'https://www.google.com/maps?q=%CE%9C%CE%B5%CF%84%CE%B1%CE%BE%CF%8D+%CE%BC%CE%B1%CF%82+%7C+%CE%9C%CE%B5%CE%B6%CE%B5%CE%B4%CE%BF%CF%80%CF%89%CE%BB%CE%B5%CE%AF%CE%BF+%26+%CE%9A%CE%B1%CF%86%CE%AD&ll=38.0209847,23.6829511&z=17&output=embed',
  },
  googleReviewsUrl: 'https://shorturl.at/KpMJD',
  locationVideoSrc: '/live1.mp4',
  locationVideoPoster: thumb1,

  hours: [
    { days: 'Κυριακή', slots: ['11:00 π.μ.–1:00 π.μ.'] },
    { days: 'Δευτέρα', slots: [], closed: true },
    { days: 'Τρίτη', slots: ['9:00 π.μ.–1:00 μ.μ.', '5:00 μ.μ.–11:00 μ.μ.'] },
    { days: 'Τετάρτη', slots: ['9:00 π.μ.–1:00 μ.μ.', '5:00 μ.μ.–11:00 μ.μ.'] },
    { days: 'Πέμπτη', slots: ['9:00 π.μ.–1:00 μ.μ.', '5:00 μ.μ.–11:00 μ.μ.'] },
    { days: 'Παρασκευή', slots: ['9:00 π.μ.–1:00 μ.μ.', '5:00 μ.μ.–1:00 π.μ.'] },
    { days: 'Σάββατο', slots: ['11:00 π.μ.–1:00 π.μ.'] },
  ],
  hoursSimple: 'Κάθε μέρα ανοιχτά εκτός της Δευτέρας.',
  hoursLocationSummary: 'Κυριακή: 11:00 π.μ.–1:00 π.μ. · Δευτέρα: Κλειστά · Τρίτη - Πέμπτη: 9:00 π.μ.–1:00 μ.μ. | 5:00 μ.μ.–11:00 μ.μ. · Παρασκευή: 9:00 π.μ.–1:00 μ.μ. | 5:00 μ.μ.–1:00 π.μ. · Σάββατο: 11:00 π.μ.–1:00 π.μ.',

  rating: 4.8,
  reviewCount: 180,
  ratingPlatform: 'Google',

  social: {
    instagram: 'https://instagram.com/metaxu.mas',
    facebook: 'https://www.facebook.com/togetherinperisteri',
    tiktok: 'https://www.tiktok.com/@metaxi_mas_kafe_meze',
  },

  formspreeId: 'mwvwkyeq',
}

export default business
