/**
 * Gallery & Media Data
 * ─────────────────────────────────────────────────────────────────
 * videos: YouTube embed IDs or full embed URLs
 * instagram: post shortcodes (from /p/SHORTCODE/)
 * photos: local or remote image URLs
 *
 * Replace placeholders with real media.
 * ─────────────────────────────────────────────────────────────────
 */

export const videos = [
  {
    id: 'v1',
    type: 'youtube',
    embedId: null, // [PLACEHOLDER: e.g., 'dQw4w9WgXcQ']
    title: 'Ζωντανή Βραδιά — Παρασκευή',
    description: 'Στιγμιότυπα από μια αξέχαστη βραδιά ζωντανής μουσικής',
    thumbnail: null, // [PLACEHOLDER: image URL]
    date: '2025-03',
  },
  {
    id: 'v2',
    type: 'youtube',
    embedId: null, // [PLACEHOLDER]
    title: 'Ατμόσφαιρα Σαββατοκύριακου',
    description: 'Μια βραδιά στο «Μεταξύ Μας» — μεζέδες, κρασί, μουσική',
    thumbnail: null, // [PLACEHOLDER]
    date: '2025-02',
  },
  {
    id: 'v3',
    type: 'youtube',
    embedId: null, // [PLACEHOLDER]
    title: 'Πρωινό Κτήμα — Γεύσεις Πρωινού',
    description: 'Τι σου προτείνουμε για ένα τέλειο πρωινό',
    thumbnail: null, // [PLACEHOLDER]
    date: '2025-01',
  },
]

export const instagramPosts = [
  {
    id: 'ig1',
    shortcode: null, // [PLACEHOLDER: e.g., 'CxxxxXXXXxX']
    caption: 'Παρασκευή βράδυ — ζωντανή μουσική & μεζέδες 🎶🫒',
    type: 'reel',
  },
  {
    id: 'ig2',
    shortcode: null, // [PLACEHOLDER]
    caption: 'Freddo espresso για αρχή ☕',
    type: 'photo',
  },
  {
    id: 'ig3',
    shortcode: null, // [PLACEHOLDER]
    caption: 'Χταπόδι στη σχάρα — must try 🐙',
    type: 'photo',
  },
  {
    id: 'ig4',
    shortcode: null, // [PLACEHOLDER]
    caption: 'Σαββατιάτικη βραδιά #metaximas',
    type: 'reel',
  },
  {
    id: 'ig5',
    shortcode: null, // [PLACEHOLDER]
    caption: 'Λουκουμάδες με μέλι 🍯',
    type: 'photo',
  },
  {
    id: 'ig6',
    shortcode: null, // [PLACEHOLDER]
    caption: 'Το πρωί που αγαπάμε ☀️',
    type: 'photo',
  },
]

// Atmosphere keywords for gallery labels
export const galleryMoods = [
  'Πρωινό Καφέ',
  'Μεσημεριανή Ξεκούραση',
  'Βραδινοί Μεζέδες',
  'Ζωντανή Μουσική',
  'Παρέα & Γέλιο',
  'Αυθεντική Ατμόσφαιρα',
]

export default { videos, instagramPosts }
