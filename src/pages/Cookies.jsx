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

export default function Cookies() {
  return (
    <PageTransition>
      <Helmet>
        <title>Πολιτική Cookies | Μεταξύ Μας</title>
        <meta name="description" content="Πολιτική χρήσης cookies του Μεταξύ Μας." />
      </Helmet>

      <PageHero
        minimal
        label="Νομικά"
        title="Πολιτική Cookies"
        subtitle="Πώς χρησιμοποιούνται τα cookies στον ιστότοπο του Μεταξύ Μας."
      />

      <section className="section-padding pt-6 sm:pt-8">
        <div className="container-narrow text-center">
          <SectionReveal className="mb-10 text-center">
            <p className="border-y border-[rgba(127,91,48,0.12)] py-3 text-center text-sm text-[rgba(47,29,15,0.62)]">
              Τελευταία ενημέρωση: Μάρτιος 2026
            </p>
          </SectionReveal>

          <Section title="1. Τι είναι τα Cookies">
            <p>Τα cookies είναι μικρά αρχεία κειμένου που αποθηκεύονται στη συσκευή σας όταν επισκέπτεστε έναν ιστότοπο και βοηθούν στη σωστή λειτουργία και βελτίωση της εμπειρίας χρήσης.</p>
          </Section>

          <Section title="2. Ποια Cookies Χρησιμοποιούμε">
            <p>Χρησιμοποιούμε μόνο απολύτως απαραίτητα cookies και, όπου χρειάζεται, cookies προτιμήσεων ώστε ο ιστότοπος να θυμάται βασικές επιλογές σας.</p>
          </Section>

          <Section title="3. Διαχείριση Cookies">
            <p>Μπορείτε να ρυθμίσετε ή να διαγράψετε τα cookies μέσα από τις ρυθμίσεις του browser σας. Η απενεργοποίηση ορισμένων cookies ενδέχεται να επηρεάσει τμήματα της λειτουργίας του ιστοτόπου.</p>
          </Section>

          <Section title="4. Επικοινωνία">
            <p>Για απορίες σχετικά με τη χρήση cookies, επικοινωνήστε μαζί μας στο <a href={`mailto:${business.email}`} style={accentLinkStyle}>{business.email}</a>.</p>
          </Section>
        </div>
      </section>
    </PageTransition>
  )
}
