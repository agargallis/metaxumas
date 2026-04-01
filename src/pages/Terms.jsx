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

export default function Terms() {
  return (
    <PageTransition>
      <Helmet>
        <title>Όροι Χρήσης | Μεταξύ Μας</title>
        <meta name="description" content="Όροι και προϋποθέσεις χρήσης του ιστοτόπου του Μεταξύ Μας." />
      </Helmet>

      <PageHero
        minimal
        label="Νομικά"
        title="Όροι Χρήσης"
        subtitle="Παρακαλούμε διαβάστε τους όρους χρήσης πριν χρησιμοποιήσετε τον ιστότοπο του Μεταξύ Μας."
      />

      <section className="section-padding pb-10 pt-6 sm:pb-12 sm:pt-8">
        <div className="container-narrow text-center">
          <SectionReveal className="mb-10 text-center">
            <p className="border-y border-[rgba(127,91,48,0.12)] py-3 text-center text-sm text-[rgba(47,29,15,0.62)]">
              Τελευταία ενημέρωση: Μάρτιος 2026
            </p>
          </SectionReveal>

          <Section title="1. Αποδοχή Όρων">
            <p>Με τη χρήση του ιστοτόπου αποδέχεστε τους παρόντες όρους χρήσης. Αν δεν συμφωνείτε, παρακαλούμε να μη χρησιμοποιείτε τον ιστότοπο.</p>
          </Section>

          <Section title="2. Πληροφορίες Ιστοτόπου">
            <p>Ο ιστότοπος του <strong style={{ color: 'rgba(31,18,9,0.82)' }}>{business.name}</strong> παρέχει πληροφορίες για το μενού, τις μουσικές βραδιές, τις κρατήσεις και τα στοιχεία επικοινωνίας του χώρου.</p>
            <p>Κάνουμε προσπάθεια ώστε οι πληροφορίες να είναι σωστές και ενημερωμένες, αλλά ενδέχεται να αλλάξουν χωρίς προηγούμενη ειδοποίηση.</p>
          </Section>

          <Section title="3. Κρατήσεις">
            <p>Η αποστολή φόρμας κράτησης αποτελεί αίτημα και όχι οριστική επιβεβαίωση. Η κράτηση θεωρείται έγκυρη μόνο μετά από επιβεβαίωση από την επιχείρηση.</p>
            <p>Για κρατήσεις τελευταίας στιγμής ή για μεγάλες παρέες προτείνεται τηλεφωνική επικοινωνία στο <a href={`tel:${business.phone}`} style={accentLinkStyle}>{business.phoneDisplay}</a>.</p>
          </Section>

          <Section title="4. Πνευματική Ιδιοκτησία">
            <p>Το περιεχόμενο του ιστοτόπου, όπως κείμενα, εικόνες, λογότυπα και ο σχεδιασμός του, ανήκουν στο {business.name} ή χρησιμοποιούνται νόμιμα από αυτόν.</p>
            <p>Απαγορεύεται η αντιγραφή, αναπαραγωγή ή εμπορική χρήση του περιεχομένου χωρίς προηγούμενη έγγραφη άδεια.</p>
          </Section>

          <Section title="5. Περιορισμός Ευθύνης">
            <p>Ο ιστότοπος παρέχεται ως έχει. Η επιχείρηση δεν ευθύνεται για προσωρινή μη διαθεσιμότητα, τεχνικά σφάλματα ή έμμεση ζημία που μπορεί να προκύψει από τη χρήση του.</p>
          </Section>

          <Section title="6. Σύνδεσμοι Τρίτων">
            <p>Ο ιστότοπος μπορεί να περιλαμβάνει συνδέσμους προς τρίτες υπηρεσίες, όπως Google Maps ή social media. Το {business.name} δεν ευθύνεται για το περιεχόμενο ή τις πολιτικές αυτών των υπηρεσιών.</p>
          </Section>

          <Section title="7. Επικοινωνία">
            <p>Για οποιαδήποτε απορία σχετικά με τους όρους χρήσης, επικοινωνήστε μαζί μας:</p>
            <p>
              <strong style={{ color: 'rgba(31,18,9,0.82)' }}>{business.name}</strong>
              <br />
              {business.address.street}, Περιστέρι
              <br />
              Email: <a href={`mailto:${business.email}`} style={accentLinkStyle}>{business.email}</a>
              <br />
              Τηλ: <a href={`tel:${business.phone}`} style={accentLinkStyle}>{business.phoneDisplay}</a>
            </p>
          </Section>
        </div>
      </section>
    </PageTransition>
  )
}
