/**
 * Reviews / Testimonials Data
 * ─────────────────────────────────────────────────────────────────
 * Add real customer reviews here.
 * Source: Google Reviews, social media, word-of-mouth.
 * ─────────────────────────────────────────────────────────────────
 */

export const reviews = [
  {
    id: 'rv1',
    name: 'Μαρία Π.',
    avatar: 'Μ',
    rating: 5,
    date: '2024-11',
    platform: 'Google',
    text: 'Ένα από τα αγαπημένα μου μέρη στην πόλη. Το πρωί ο καφές τους είναι τέλειος, και το βράδυ η ατμόσφαιρα αλλάζει εντελώς — μεζέδες, μουσική, και μια ζεστασιά που δύσκολα βρίσκεις αλλού. Θα επιστρέψω σίγουρα!',
    highlight: 'Τέλειος καφές & ζεστή ατμόσφαιρα',
    featured: true,
  },
  {
    id: 'rv2',
    name: 'Νίκος Κ.',
    avatar: 'Ν',
    rating: 5,
    date: '2024-10',
    platform: 'Google',
    text: 'Πήγαμε Παρασκευή βράδυ για ζωντανή μουσική. Τα πάντα ήταν εξαιρετικά — από τον χταπόδι στα σαγανάκια μέχρι το κρασί χύμα. Η μουσική εξαιρετική. Σπάνιο να βρίσκεις τέτοια ποιότητα σε τιμές που δεν τσαντίζουν.',
    highlight: 'Εξαιρετικοί μεζέδες & ζωντανή μουσική',
    featured: true,
  },
  {
    id: 'rv3',
    name: 'Ελένη Τ.',
    avatar: 'Ε',
    rating: 5,
    date: '2024-12',
    platform: 'Google',
    text: 'Χαρακτηριστική ατμόσφαιρα, εξυπηρέτηση με χαμόγελο και φαγητό που νιώθεις ότι το έφτιαχναν με αγάπη. Το γαλακτομπούρεκο τους είναι αξεπέραστο. Ιδανικό και για πρωινό και για βραδινή έξοδο.',
    highlight: 'Αγαπημένο γαλακτομπούρεκο!',
    featured: true,
  },
  {
    id: 'rv4',
    name: 'Γιώργης Δ.',
    avatar: 'Γ',
    rating: 5,
    date: '2024-09',
    platform: 'Google',
    text: 'Παρέα δέκα ατόμων για γενέθλια — ήρθαμε άγνωστοι και φύγαμε σαν οικογένεια. Το προσωπικό ήξερε το όνομά μας ως το τέλος της βραδιάς. Απλά "Μεταξύ Μας" — λέει τα πάντα.',
    highlight: 'Προσωπικό που σε κάνει να νιώθεις ιδιαίτερος',
    featured: true,
  },
  {
    id: 'rv5',
    name: 'Σοφία Α.',
    avatar: 'Σ',
    rating: 5,
    date: '2024-11',
    platform: 'Google',
    text: 'Το πρωί είναι χαλαρωτικό και ιδανικό για δουλειά. Το espresso εξαιρετικό, και τα avocado toast τα καλύτερα που έχω φάει στην πόλη.',
    highlight: 'Best avocado toast στην πόλη!',
    featured: false,
  },
  {
    id: 'rv6',
    name: 'Κώστας Λ.',
    avatar: 'Κ',
    rating: 5,
    date: '2024-10',
    platform: 'Google',
    text: 'Οι λουκουμάδες τους αξίζουν την έξοδο από μόνοι τους. Ζεστοί, αέρινοι, με μέλι και καρύδι. Κλασικό αλλά εκτελεσμένο τέλεια.',
    highlight: 'Λουκουμάδες που δεν ξεχνιούνται',
    featured: false,
  },
  {
    id: 'rv7',
    name: 'Άννα Μ.',
    avatar: 'Α',
    rating: 5,
    date: '2024-12',
    platform: 'Google',
    text: 'Τυχαία το βρήκα, σκόπιμα επιστρέφω. Η ατμόσφαιρα είναι ό,τι καλύτερο — σαν να μπαίνεις σε σπίτι που κάποιος σε περιμένει.',
    highlight: 'Ατμόσφαιρα σαν σπίτι',
    featured: false,
  },
  {
    id: 'rv8',
    name: 'Θεόδωρος Β.',
    avatar: 'Θ',
    rating: 4,
    date: '2024-08',
    platform: 'Google',
    text: 'Πολύ καλή εμπειρία συνολικά. Το φαγητό ήταν νόστιμο και οι τιμές δίκαιες. Η ζωντανή μουσική έδωσε άλλη χροιά στη βραδιά.',
    highlight: 'Δίκαιες τιμές, νόστιμο φαγητό',
    featured: false,
  },
]

export const featuredReviews = reviews.filter(r => r.featured)

export const ratingStats = {
  average: 4.9,
  total: 180, // [PLACEHOLDER: update with real count]
  breakdown: {
    5: 92, // percentage
    4: 6,
    3: 1,
    2: 0,
    1: 1,
  },
}

export default reviews
