import { Helmet } from 'react-helmet-async'
import PageHero from '../components/ui/PageHero'
import SectionReveal from '../components/ui/SectionReveal'
import PageTransition from '../components/ui/PageTransition'
import { business } from '../data/business'

const accentLinkStyle = { color: 'var(--gold)', textDecoration: 'none' }

function Section({ title, children }) {
  return (
    <SectionReveal className="mb-10 text-center">
      <h2 className="heading-card mb-4 text-[rgba(31,18,9,0.88)]">{title}</h2>
      <div className="space-y-3 text-center text-sm leading-relaxed text-[rgba(47,29,15,0.62)]">{children}</div>
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
        minimal
        label="Νομικά"
        title="Πολιτική Απορρήτου"
        subtitle="Πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τα προσωπικά δεδομένα που μας παρέχετε."
      />

      <section className="section-padding pb-10 pt-6 sm:pb-12 sm:pt-8">
        <div className="container-narrow text-center">
          <SectionReveal className="mb-10 text-center">
            <p className="border-y border-[rgba(127,91,48,0.12)] py-3 text-center text-sm text-[rgba(47,29,15,0.62)]">
              Τελευταία ενημέρωση: Μάρτιος 2026
            </p>
          </SectionReveal>

          <Section title="1. Υπεύθυνος Επεξεργασίας">
            <p>Υπεύθυνος επεξεργασίας των προσωπικών δεδομένων είναι η επιχείρηση <strong style={{ color: 'rgba(31,18,9,0.82)' }}>{business.name}</strong>.</p>
            <p>
              Διεύθυνση: {business.address.street}, Περιστέρι
              <br />
              Email: <a href={`mailto:${business.email}`} style={accentLinkStyle}>{business.email}</a>
              <br />
              Τηλ: <a href={`tel:${business.phone}`} style={accentLinkStyle}>{business.phoneDisplay}</a>
            </p>
          </Section>

          <Section title="2. Ποια Δεδομένα Συλλέγουμε">
            <p>Συλλέγουμε μόνο τα δεδομένα που μας δίνετε εσείς μέσα από τις φόρμες επικοινωνίας ή κράτησης, όπως όνομα, τηλέφωνο, email, ημερομηνία κράτησης, ώρα και αριθμό ατόμων.</p>
          </Section>

          <Section title="3. Σκοπός Επεξεργασίας">
            <p>Τα δεδομένα χρησιμοποιούνται αποκλειστικά για την εξυπηρέτηση της κράτησής σας, την επικοινωνία μαζί σας και την ορθή λειτουργία των υπηρεσιών μας.</p>
          </Section>

          <Section title="4. Νομική Βάση">
            <p>Η επεξεργασία βασίζεται στη συγκατάθεσή σας και, όπου απαιτείται, στην ανάγκη εκπλήρωσης της υπηρεσίας που μας ζητάτε.</p>
          </Section>

          <Section title="5. Χρόνος Διατήρησης">
            <p>Τα στοιχεία που σχετίζονται με κρατήσεις διατηρούνται μόνο για όσο είναι εύλογα αναγκαίο για τη διαχείρισή τους και για βασική εσωτερική αρχειοθέτηση.</p>
          </Section>

          <Section title="6. Τα Δικαιώματά σας">
            <p>Έχετε δικαίωμα πρόσβασης, διόρθωσης, διαγραφής, περιορισμού επεξεργασίας και υποβολής αιτήματος σχετικά με τα προσωπικά σας δεδομένα.</p>
          </Section>

          <Section title="7. Επικοινωνία">
            <p>Για οποιοδήποτε ζήτημα σχετίζεται με τα προσωπικά σας δεδομένα, επικοινωνήστε μαζί μας στο <a href={`mailto:${business.email}`} style={accentLinkStyle}>{business.email}</a>.</p>
          </Section>
        </div>
      </section>
    </PageTransition>
  )
}
