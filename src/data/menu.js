/**
 * Menu Data
 * ─────────────────────────────────────────────────────────────────
 * Edit items, prices, and categories here.
 * Set price to null to hide it (e.g., "ρωτήστε μας").
 * Set featured: true for items to appear in the home preview.
 * ─────────────────────────────────────────────────────────────────
 */

export const menuCategories = [
  {
    id: 'cafe',
    label: 'Καφέ & Ροφήματα',
    icon: 'cafe',
    description: 'Η μέρα αρχίζει σωστά',
    timeOfDay: 'morning',
    items: [
      { id: 'c1', name: 'Espresso',           description: 'Single origin, φρεσκοαλεσμένος',   price: 2.5,  featured: false },
      { id: 'c2', name: 'Freddo Espresso',    description: 'Διπλό espresso πάνω σε πάγο',       price: 3.0,  featured: true  },
      { id: 'c3', name: 'Freddo Cappuccino',  description: 'Espresso με αφρό γάλακτος & πάγο', price: 3.5,  featured: true  },
      { id: 'c4', name: 'Flat White',         description: 'Ristretto με βελούδινο γάλα',        price: 3.5,  featured: false },
      { id: 'c5', name: 'Filter Coffee',      description: 'Χειροποίητο pour-over της ημέρας',  price: 3.0,  featured: false },
      { id: 'c6', name: 'Greek Coffee',       description: 'Παραδοσιακός ελληνικός καφές',      price: 2.0,  featured: false },
      { id: 'c7', name: 'Cappuccino',         description: 'Ζεστό, με αφράτη κρέμα',            price: 3.0,  featured: false },
      { id: 'c8', name: 'Latte Macchiato',    description: 'Με oat, soy ή πλήρες γάλα',         price: 3.5,  featured: false },
      { id: 'c9', name: 'Χαμομήλι & Τσάι',   description: 'Επιλογή βοτάνων εποχής',            price: 2.5,  featured: false },
      { id:'c10', name: 'Φρέσκος Χυμός',     description: 'Πορτοκάλι ή μίξη φρούτων',         price: 3.5,  featured: false },
    ],
  },
  {
    id: 'brunch',
    label: 'Πρωινό & Brunch',
    icon: 'brunch',
    description: 'Σπιτικό, φρέσκο, αγαπημένο',
    timeOfDay: 'morning',
    items: [
      { id: 'b1', name: 'Αβγά Βενεδίκτου',    description: 'Αβγά ποσέ, ζαμπόν Parma, hollandaise, τοστ',  price: 9.0,  featured: true  },
      { id: 'b2', name: 'Κλαμπ Σάντουιτς',    description: 'Κοτόπουλο, bacon, αβγό, ντομάτα, μαρούλι',   price: 8.5,  featured: false },
      { id: 'b3', name: 'Avocado Toast',       description: 'Ψωμί sourdough, αβοκάντο, αβγό ποσέ, za\'atar', price: 9.5, featured: true },
      { id: 'b4', name: 'Γαλακτομπούρεκο',    description: 'Φρεσκοψημένο της ημέρας',                       price: 4.5,  featured: false },
      { id: 'b5', name: 'Τυρόπιτα / Σπανακόπιτα', description: 'Χωριάτικη, με χειροποίητο φύλλο',          price: 3.5,  featured: false },
      { id: 'b6', name: 'Granola & Yogurt',    description: 'Στραγγιστό γιαούρτι, μέλι θυμαρίσιο, granola', price: 6.5,  featured: false },
      { id: 'b7', name: 'French Toast',        description: 'Brioche, σφένδαμος, φράουλες, κρέμα',          price: 8.0,  featured: false },
    ],
  },
  {
    id: 'mezedes',
    label: 'Μεζέδες',
    icon: 'mezedes',
    description: 'Για μοίρασμα, για καλή παρέα',
    timeOfDay: 'evening',
    items: [
      { id: 'm1', name: 'Ταραμοσαλάτα',          description: 'Σπιτική, με τριγωνάκια πίτας',              price: 6.5,  featured: true  },
      { id: 'm2', name: 'Τζατζίκι',               description: 'Στραγγιστό γιαούρτι, αγγούρι, σκόρδο',    price: 5.5,  featured: false },
      { id: 'm3', name: 'Χταπόδι στη Σχάρα',     description: 'Με κάπαρη, ρίγανη & ελαιόλαδο',            price: 14.0, featured: true  },
      { id: 'm4', name: 'Κολοκυθοκεφτέδες',       description: 'Με κολοκύθα, φέτα & δυόσμο',               price: 8.0,  featured: false },
      { id: 'm5', name: 'Σαγανάκι',               description: 'Κεφαλοτύρι τηγανητό, λεμόνι, ρίγανη',     price: 8.5,  featured: true  },
      { id: 'm6', name: 'Φάβα Σαντορίνης',        description: 'Με κρεμμύδι, κάπαρη & ωμό λάδι',           price: 7.0,  featured: false },
      { id: 'm7', name: 'Σπανακοτυρόπιτα',        description: 'Χειροποίητο φύλλο, σπανάκι, φέτα',          price: 5.5,  featured: false },
      { id: 'm8', name: 'Τυροκροκέτες',           description: 'Με κεφαλοτύρι, φέτα & καπνιστό τυρί',      price: 8.0,  featured: false },
      { id: 'm9', name: 'Καλαμαράκια',            description: 'Τηγανητά, με σκορδαλιά ή ταρτάρ',          price: 9.5,  featured: false },
      { id:'m10', name: 'Πιατέλα Αλλαντικών',    description: 'Χαλλούμι, προσούτο, ελιές, παξιμάδια',     price: 13.0, featured: false },
    ],
  },
  {
    id: 'tavern',
    label: 'Ταβερνιάτικα',
    icon: 'tavern',
    description: 'Η παράδοση στο πιάτο',
    timeOfDay: 'evening',
    items: [
      { id: 't1', name: 'Μοσχαρίσιο Κοκκινιστό', description: 'Με χυλοπίτες & τυρί κεφαλοτύρι',           price: 17.0, featured: true  },
      { id: 't2', name: 'Μπριζόλα Χοιρινή',       description: 'Στη σχάρα, με ψητές πατάτες & λεμόνι',     price: 14.5, featured: false },
      { id: 't3', name: 'Κεφτέδες Μελιτζάνας',    description: 'Με σάλτσα ντομάτας & σκόρδο',              price: 11.0, featured: false },
      { id: 't4', name: 'Λαχανοντολμάδες',         description: 'Με αυγολέμονο & σπιτική κρέμα',            price: 12.0, featured: true  },
      { id: 't5', name: 'Παϊδάκια Αρνιού',         description: 'Με δεντρολίβανο, σκόρδο & ψητά λαχανικά', price: 22.0, featured: false },
      { id: 't6', name: 'Ψαρονέφρι',               description: 'Με μυρωδικά, κρεμ γλυκόριζας & πατάτα',   price: 18.0, featured: false },
      { id: 't7', name: 'Φασολάδα',                description: 'Παραδοσιακή, με λαδολέμονο & κρεμμύδι',   price: 9.0,  featured: false },
    ],
  },
  {
    id: 'salads',
    label: 'Σαλάτες',
    icon: 'salads',
    description: 'Φρέσκα & εποχιακά',
    timeOfDay: 'all',
    items: [
      { id: 's1', name: 'Χωριάτικη',             description: 'Ντομάτα, αγγούρι, ελιά, φέτα, ρίγανη',     price: 8.5,  featured: false },
      { id: 's2', name: 'Σαλάτα Caesar',          description: 'Κοτόπουλο, parmesan, κρoutons, dressing',   price: 10.0, featured: false },
      { id: 's3', name: 'Σαλάτα Ρόκας',          description: 'Ρόκα, parmigiano, ξηροί καρποί, βαλσαμικό', price: 9.0,  featured: false },
      { id: 's4', name: 'Σαλάτα Εποχής',         description: 'Φρέσκα λαχανικά, quinoa & vinaigrette',     price: 9.5,  featured: false },
    ],
  },
  {
    id: 'desserts',
    label: 'Γλυκά',
    icon: 'desserts',
    description: 'Τέλεια κατάληξη',
    timeOfDay: 'all',
    items: [
      { id: 'd1', name: 'Γαλακτομπούρεκο',       description: 'Της γιαγιάς, με σιρόπι λεμονιού',          price: 5.5,  featured: true  },
      { id: 'd2', name: 'Κρέμα Καραμελέ',         description: 'Βανίλια, καραμέλα, φρούτα εποχής',         price: 5.5,  featured: false },
      { id: 'd3', name: 'Τιραμισού',              description: 'Με μπισκότα σαβαγιάρ & espresso',          price: 6.0,  featured: false },
      { id: 'd4', name: 'Chocolate Lava Cake',    description: 'Ζεστή σοκολάτα, παγωτό βανίλια',           price: 7.0,  featured: false },
      { id: 'd5', name: 'Λουκουμάδες',            description: 'Με μέλι, κανέλα & καρύδι',                 price: 6.0,  featured: true  },
    ],
  },
  {
    id: 'drinks',
    label: 'Ποτά & Κρασί',
    icon: 'drinks',
    description: 'Για κάθε διάθεση',
    timeOfDay: 'evening',
    items: [
      { id: 'w1', name: 'Κρασί Χύμα',            description: 'Λευκό / Κόκκινο / Ροζέ — βαρέλι',          price: 4.5,  featured: false },
      { id: 'w2', name: 'Ασύρτικο Σαντορίνης',   description: 'Ξηρό, εσπεριδοειδή, ορυκτότητα',           price: null, featured: false },
      { id: 'w3', name: 'Αγιωργίτικο',           description: 'Ερυθρό, δαμάσκηνο, βελούδινη τανίνη',      price: null, featured: false },
      { id: 'w4', name: 'Μοσχοφίλερο',           description: 'Λευκό αρωματικό, ροδοπέταλα',              price: null, featured: false },
      { id: 'w5', name: 'Τσίπουρο / Ούζο',       description: 'Με ή χωρίς πάγο',                          price: 3.5,  featured: false },
      { id: 'w6', name: 'Craft Beer',             description: 'Ελληνική μικροζυθοποιία, εποχιακή επιλογή', price: 5.0, featured: false },
      { id: 'w7', name: 'Κοκτέιλ Εποχής',        description: 'Ρωτήστε μας για τα specials',               price: null, featured: true  },
      { id: 'w8', name: 'Non-Alcoholic Mocktail', description: 'Φρέσκα φρούτα, herbs & tonic',             price: 6.5,  featured: false },
    ],
  },
]

// Flat array of all featured items (for homepage preview)
export const featuredItems = menuCategories
  .flatMap(cat => cat.items.map(item => ({ ...item, categoryLabel: cat.label, categoryIcon: cat.icon })))
  .filter(item => item.featured)

export default menuCategories
