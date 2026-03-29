import { Helmet } from 'react-helmet-async'
import PageHero from '../components/ui/PageHero'
import SectionReveal from '../components/ui/SectionReveal'
import PageTransition from '../components/ui/PageTransition'
import { business } from '../data/business'

function Section({ title, children }) {
  return (
    <SectionReveal className="mb-10">
      <h2
        className="heading-card mb-4 text-[rgba(31,18,9,0.88)]"
      >
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-[rgba(47,29,15,0.62)]">
        {children}
      </div>
    </SectionReveal>
  )
}

export default function Cookies() {
  return (
    <PageTransition>
      <Helmet>
        <title>Πολιτική Cookies | Μεταξύ Μας</title>
        <meta name="description" content="Πολιτική χρήσης cookies του Μεταξύ Μας." />
      </Helmet>

      <PageHero
        label="Νομικά"
        title="Πολιτική Cookies"
        subtitle="Πώς χρησιμοποιούμε τα cookies στον ιστότοπό μας."
      />

      <section className="section-padding">
        <div className="container-narrow">

          <SectionReveal className="mb-10">
            <div
              className="p-5 rounded-2xl text-sm"
              style={{ background: 'rgba(212,148,26,0.08)', border: '1px solid rgba(212,148,26,0.16)', color: 'rgba(47,29,15,0.62)' }}
            >
              Τελευταία ενημέρωση: Μάρτιος 2026
            </div>
          </SectionReveal>

          <Section title="Τι είναι τα Cookies;">
            <p>
              Τα cookies είναι μικρά αρχεία κειμένου που αποθηκεύονται στη συσκευή σας όταν επισκέπτεστε έναν ιστότοπο.
              Χρησιμοποιούνται ευρέως για να κάνουν τους ιστότοπους να λειτουργούν αποτελεσματικότερα και για να παρέχουν
              πληροφορίες στους ιδιοκτήτες του ιστότοπου.
            </p>
          </Section>

          <Section title="Ποια Cookies Χρησιμοποιούμε;">
            <p><strong style={{ color: 'rgba(31,18,9,0.82)' }}>Απαραίτητα Cookies:</strong> Αυτά τα cookies είναι απαραίτητα για τη βασική λειτουργία του ιστότοπου.
            Χωρίς αυτά, ορισμένες υπηρεσίες δεν μπορούν να παρασχεθούν. Δεν αποθηκεύουν
            προσωπικά αναγνωρίσιμες πληροφορίες.</p>
            <p><strong style={{ color: 'rgba(31,18,9,0.82)' }}>Cookies Προτιμήσεων:</strong> Επιτρέπουν στον ιστότοπο να θυμάται τις επιλογές σας (π.χ. αποδοχή ή
            απόρριψη cookies) για να σας προσφέρει μια καλύτερη, πιο προσωποποιημένη εμπειρία.</p>
            <p><strong style={{ color: 'rgba(31,18,9,0.82)' }}>Cookies Ανάλυσης:</strong> Μας βοηθούν να κατανοήσουμε πώς οι επισκέπτες αλληλεπιδρούν με τον ιστότοπό μας,
            συλλέγοντας και αναφέροντας ανώνυμα πληροφορίες.</p>
          </Section>

          <Section title="Διάρκεια Ζωής Cookies;">
            <p>
              Τα cookies που χρησιμοποιούμε μπορεί να είναι «session cookies» (διαγράφονται όταν κλείσετε τον περιηγητή σας)
              ή «persistent cookies» (παραμένουν στη συσκευή σας για καθορισμένο χρονικό διάστημα).
            </p>
            <p>
              Το cookie συναίνεσης που αποθηκεύει την επιλογή σας παραμένει για 12 μήνες.
            </p>
          </Section>

          <Section title="Πώς να Διαχειριστείτε τα Cookies;">
            <p>
              Μπορείτε να ελέγξετε ή να διαγράψετε τα cookies ανά πάσα στιγμή μέσω των ρυθμίσεων του περιηγητή σας.
              Σημειώστε ότι η απενεργοποίηση ορισμένων cookies ενδέχεται να επηρεάσει τη λειτουργικότητα του ιστότοπου.
            </p>
            <p>
              Για περισσότερες πληροφορίες σχετικά με τη διαχείριση cookies στον περιηγητή σας, επισκεφτείτε τις σελίδες
              βοήθειας του εκάστοτε περιηγητή (Chrome, Firefox, Safari, Edge).
            </p>
          </Section>

          <Section title="Επικοινωνία;">
            <p>
              Για οποιαδήποτε απορία σχετικά με την πολιτική cookies μας, επικοινωνήστε μαζί μας:
            </p>
            <p>
              <strong style={{ color: 'rgba(31,18,9,0.82)' }}>{business.name}</strong><br />
              {business.address.street}, {business.address.area}, {business.address.city}<br />
              Email: <a href={`mailto:${business.email}`} style={{ color: 'var(--gold)', textDecoration: 'underline' }}>{business.email}</a><br />
              Τηλ: <a href={`tel:${business.phone}`} style={{ color: 'var(--gold)', textDecoration: 'underline' }}>{business.phoneDisplay}</a>
            </p>
          </Section>

        </div>
      </section>
    </PageTransition>
  )
}
