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

export default function Terms() {
  return (
    <PageTransition>
      <Helmet>
        <title>Όροι Χρήσης | Μεταξύ Μας</title>
        <meta name="description" content="Όροι και προϋποθέσεις χρήσης του ιστότοπου Μεταξύ Μας." />
      </Helmet>

      <PageHero
        label="Νομικά"
        title="Όροι Χρήσης"
        subtitle="Παρακαλούμε διαβάστε προσεκτικά τους όρους χρήσης πριν χρησιμοποιήσετε τον ιστότοπό μας."
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

          <Section title="1. Αποδοχή Όρων">
            <p>
              Με τη χρήση του παρόντος ιστότοπου (<strong style={{ color: 'rgba(31,18,9,0.82)' }}>metaximas.gr</strong>),
              αποδέχεστε πλήρως τους παρόντες Όρους Χρήσης. Εάν διαφωνείτε με οποιονδήποτε όρο, παρακαλούμε
              αποφύγετε τη χρήση του ιστότοπου.
            </p>
          </Section>

          <Section title="2. Υπηρεσίες Ιστότοπου">
            <p>
              Ο ιστότοπος του «{business.name}» παρέχει πληροφορίες σχετικά με τις υπηρεσίες, το μενού,
              τις εκδηλώσεις ζωντανής μουσικής και τη δυνατότητα online κράτησης τραπεζιού.
            </p>
            <p>
              Διατηρούμε το δικαίωμα να τροποποιούμε, αναστέλλουμε ή διακόπτουμε οποιαδήποτε πτυχή
              των υπηρεσιών μας χωρίς προειδοποίηση.
            </p>
          </Section>

          <Section title="3. Κρατήσεις">
            <p>
              Η υποβολή φόρμας κράτησης μέσω του ιστότοπου αποτελεί <strong style={{ color: 'rgba(31,18,9,0.82)' }}>αίτημα κράτησης</strong> και όχι επιβεβαίωση.
              Η κράτηση επιβεβαιώνεται μόνο μετά από επικοινωνία μαζί σας (τηλεφωνικά ή με email).
            </p>
            <p>
              Σε περίπτωση ακύρωσης, παρακαλούμε να μας ενημερώσετε τουλάχιστον 2 ώρες πριν την ώρα
              κράτησης, ώστε να μπορέσουμε να εξυπηρετήσουμε άλλους επισκέπτες.
            </p>
          </Section>

          <Section title="4. Πνευματική Ιδιοκτησία">
            <p>
              Όλο το περιεχόμενο του ιστότοπου (κείμενα, εικόνες, λογότυπο, σχεδιασμός) αποτελεί
              πνευματική ιδιοκτησία του «{business.name}» ή χρησιμοποιείται κατόπιν αδείας.
            </p>
            <p>
              Απαγορεύεται η αναπαραγωγή, διανομή ή τροποποίηση οποιουδήποτε τμήματος του ιστότοπου
              χωρίς προηγούμενη γραπτή άδεια.
            </p>
          </Section>

          <Section title="5. Περιορισμός Ευθύνης">
            <p>
              Ο ιστότοπος παρέχεται «ως έχει». Δεν παρέχουμε εγγυήσεις για την αδιάλειπτη ή αλάνθαστη
              λειτουργία του. Δεν φέρουμε ευθύνη για τυχόν ζημίες που προκύπτουν από τη χρήση ή
              την αδυναμία χρήσης του ιστότοπου.
            </p>
            <p>
              Τα δεδομένα τιμών και ωραρίων ενδέχεται να μεταβάλλονται. Παρακαλούμε επικοινωνήστε
              μαζί μας για τις πιο ενημερωμένες πληροφορίες.
            </p>
          </Section>

          <Section title="6. Σύνδεσμοι σε Εξωτερικούς Ιστότοπους">
            <p>
              Ο ιστότοπός μας ενδέχεται να περιέχει συνδέσμους προς εξωτερικούς ιστότοπους (π.χ. Google Maps,
              Instagram, Facebook). Δεν φέρουμε ευθύνη για το περιεχόμενο ή τις πρακτικές απορρήτου
              αυτών των ιστότοπων.
            </p>
          </Section>

          <Section title="7. Εφαρμοστέο Δίκαιο">
            <p>
              Οι παρόντες όροι διέπονται από το ελληνικό δίκαιο και για οποιαδήποτε διαφορά αρμόδια
              είναι τα δικαστήρια της Ελλάδας.
            </p>
          </Section>

          <Section title="8. Τροποποιήσεις Όρων">
            <p>
              Διατηρούμε το δικαίωμα να τροποποιούμε τους παρόντες όρους ανά πάσα στιγμή.
              Οι αλλαγές τίθενται σε ισχύ από τη δημοσίευσή τους. Συνιστούμε να επισκέπτεστε
              περιοδικά τη σελίδα αυτή.
            </p>
          </Section>

          <Section title="9. Επικοινωνία">
            <p>
              Για οποιαδήποτε απορία σχετικά με τους όρους χρήσης:
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
