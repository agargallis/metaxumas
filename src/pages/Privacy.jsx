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

export default function Privacy() {
  return (
    <PageTransition>
      <Helmet>
        <title>Πολιτική Απορρήτου | Μεταξύ Μας</title>
        <meta name="description" content="Πολιτική απορρήτου και προστασίας προσωπικών δεδομένων του Μεταξύ Μας." />
      </Helmet>

      <PageHero
        label="Νομικά"
        title="Πολιτική Απορρήτου"
        subtitle="Πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τα προσωπικά σας δεδομένα."
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

          <Section title="1. Υπεύθυνος Επεξεργασίας">
            <p>
              Υπεύθυνος επεξεργασίας των προσωπικών σας δεδομένων είναι η επιχείρηση:
            </p>
            <p>
              <strong style={{ color: 'rgba(31,18,9,0.82)' }}>{business.name}</strong><br />
              Διεύθυνση: {business.address.street}, {business.address.area}, {business.address.city}<br />
              Email: <a href={`mailto:${business.email}`} style={{ color: 'var(--gold)', textDecoration: 'underline' }}>{business.email}</a><br />
              Τηλ: <a href={`tel:${business.phone}`} style={{ color: 'var(--gold)', textDecoration: 'underline' }}>{business.phoneDisplay}</a>
            </p>
          </Section>

          <Section title="2. Ποια Δεδομένα Συλλέγουμε;">
            <p>Συλλέγουμε τα ακόλουθα δεδομένα μόνο όταν μας τα παρέχετε εσείς εθελοντικά:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Ονοματεπώνυμο και στοιχεία επικοινωνίας (για κρατήσεις τραπεζιού)</li>
              <li>Αριθμός τηλεφώνου και email (για επικοινωνία και επιβεβαίωση κράτησης)</li>
              <li>Ημερομηνία και ώρα κράτησης, αριθμός ατόμων</li>
              <li>Τυχόν ειδικές απαιτήσεις ή σημειώσεις που μας αναφέρετε</li>
            </ul>
            <p>
              Δεν συλλέγουμε ευαίσθητα προσωπικά δεδομένα. Δεν αποθηκεύουμε στοιχεία πληρωμών.
            </p>
          </Section>

          <Section title="3. Σκοπός Επεξεργασίας">
            <p>Χρησιμοποιούμε τα δεδομένα σας αποκλειστικά για:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Επιβεβαίωση και διαχείριση των κρατήσεών σας</li>
              <li>Επικοινωνία μαζί σας σχετικά με την κράτησή σας</li>
              <li>Βελτίωση των υπηρεσιών μας</li>
            </ul>
            <p>
              Δεν χρησιμοποιούμε τα δεδομένα σας για διαφημιστικούς σκοπούς χωρίς τη ρητή συγκατάθεσή σας.
            </p>
          </Section>

          <Section title="4. Νομική Βάση Επεξεργασίας">
            <p>
              Η επεξεργασία των δεδομένων σας βασίζεται στη συγκατάθεσή σας (ΓΚΠΔ άρθρο 6 παρ. 1α) και στην
              εκπλήρωση σύμβασης (άρθρο 6 παρ. 1β) — δηλαδή για την εξυπηρέτηση της κράτησής σας.
            </p>
          </Section>

          <Section title="5. Διατήρηση Δεδομένων">
            <p>
              Τα δεδομένα κρατήσεων διατηρούνται για 12 μήνες από την ημερομηνία κράτησης και στη συνέχεια
              διαγράφονται ή ανωνυμοποιούνται.
            </p>
          </Section>

          <Section title="6. Κοινοποίηση σε Τρίτους">
            <p>
              Δεν πωλούμε, εκμισθώνουμε ή κοινοποιούμε τα προσωπικά σας δεδομένα σε τρίτους,
              εκτός εάν αυτό απαιτείται από νόμο ή για την εξυπηρέτηση της κράτησής σας μέσω αξιόπιστων
              επεξεργαστών δεδομένων (π.χ. Formspree για τη διαβίβαση φορμών).
            </p>
          </Section>

          <Section title="7. Τα Δικαιώματά σας">
            <p>Σύμφωνα με τον ΓΚΠΔ, έχετε τα ακόλουθα δικαιώματα:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><strong style={{ color: 'rgba(31,18,9,0.82)' }}>Πρόσβαση:</strong> Δικαίωμα να γνωρίζετε ποια δεδομένα διατηρούμε για εσάς</li>
              <li><strong style={{ color: 'rgba(31,18,9,0.82)' }}>Διόρθωση:</strong> Δικαίωμα διόρθωσης ανακριβών δεδομένων</li>
              <li><strong style={{ color: 'rgba(31,18,9,0.82)' }}>Διαγραφή:</strong> Δικαίωμα «λήθης» — διαγραφής των δεδομένων σας</li>
              <li><strong style={{ color: 'rgba(31,18,9,0.82)' }}>Περιορισμός:</strong> Δικαίωμα περιορισμού της επεξεργασίας</li>
              <li><strong style={{ color: 'rgba(31,18,9,0.82)' }}>Φορητότητα:</strong> Δικαίωμα λήψης των δεδομένων σας σε δομημένη μορφή</li>
              <li><strong style={{ color: 'rgba(31,18,9,0.82)' }}>Εναντίωση:</strong> Δικαίωμα εναντίωσης στην επεξεργασία</li>
            </ul>
            <p>
              Για άσκηση οποιουδήποτε δικαιώματος, επικοινωνήστε μαζί μας στο{' '}
              <a href={`mailto:${business.email}`} style={{ color: 'var(--gold)', textDecoration: 'underline' }}>{business.email}</a>.
              Έχετε επίσης δικαίωμα υποβολής καταγγελίας στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (ΑΠΔΠΧ).
            </p>
          </Section>

          <Section title="8. Ασφάλεια Δεδομένων">
            <p>
              Λαμβάνουμε κατάλληλα τεχνικά και οργανωτικά μέτρα για την προστασία των δεδομένων σας από
              μη εξουσιοδοτημένη πρόσβαση, απώλεια ή καταστροφή.
            </p>
          </Section>

          <Section title="9. Αλλαγές στην Πολιτική">
            <p>
              Ενδέχεται να ενημερώνουμε την παρούσα πολιτική κατά καιρούς. Σε περίπτωση σημαντικών αλλαγών,
              θα ενημερώνουμε τον ιστότοπό μας. Συνιστούμε να επισκέπτεστε περιοδικά τη σελίδα αυτή.
            </p>
          </Section>

        </div>
      </section>
    </PageTransition>
  )
}
