import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ExternalLink, Sun, Moon } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionReveal, { StaggerReveal, StaggerItem } from '../components/ui/SectionReveal'
import PageTransition from '../components/ui/PageTransition'
import { business } from '../data/business'

function ContactCard({ icon: Icon, label, value, href, isExternal = false }) {
  const content = (
    <div className="card-base p-6 flex items-start gap-4 group transition-all duration-300 hover:border-gold-500/20">
      <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-400 shrink-0 group-hover:bg-gold-500/15 transition-colors">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs text-[rgba(47,29,15,0.42)] mb-0.5">{label}</p>
        <p className="text-sm font-medium text-[rgba(31,18,9,0.84)] group-hover:text-gold-700 transition-colors">
          {value}
        </p>
      </div>
    </div>
  )

  if (!href) return content

  return isExternal ? (
    <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>
  ) : (
    <a href={href}>{content}</a>
  )
}

export default function Contact() {
  return (
    <PageTransition>
      <Helmet>
        <title>Επικοινωνία & Τοποθεσία | Μεταξύ Μας</title>
        <meta name="description" content={`Μεταξύ Μας — ${business.address.street}, ${business.address.area}. Τηλ: ${business.phoneDisplay}. Ωράριο: ${business.hoursSimple}`} />
      </Helmet>

      <PageHero
        label="Επικοινωνία"
        title="Βρείτε μας"
        subtitle="Είμαστε εδώ για εσάς — διαδικτυακά, τηλεφωνικά ή αυτοπροσώπως."
      />

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">

            {/* Left: Map + Address */}
            <div>
              <SectionReveal className="mb-6">
                <p className="label-upper mb-3">Τοποθεσία</p>
                <h2 className="heading-card mb-2 text-[rgba(31,18,9,0.9)]">Πού θα μας βρείτε</h2>
              </SectionReveal>

              {/* Map embed */}
              <SectionReveal>
                <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-[rgba(127,91,48,0.12)] shadow-warm-lg mb-6 relative bg-[rgba(255,250,244,0.92)]">
                  {/*
                    [PLACEHOLDER: Replace the div below with a real Google Maps iframe]
                    Example:
                    <iframe
                      src="https://www.google.com/maps/embed?pb=YOUR_EMBED_ID"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Χάρτης Μεταξύ Μας"
                    />
                    Get your embed URL from: Google Maps > Share > Embed a map
                  */}
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-center px-8">
                    <MapPin size={36} className="text-gold-500/40" />
                    <p className="text-sm text-[rgba(47,29,15,0.48)] leading-relaxed">
                      <strong className="text-[rgba(31,18,9,0.7)]">Χάρτης Placeholder</strong><br />
                      Αντικαταστήστε με πραγματικό Google Maps embed.<br />
                      Δείτε οδηγίες στο αρχείο <code className="text-gold-700 text-xs">Contact.jsx</code>
                    </p>
                    <a
                      href={business.address.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline text-xs"
                    >
                      <ExternalLink size={12} />
                      Άνοιγμα στο Google Maps
                    </a>
                  </div>
                </div>
              </SectionReveal>

              {/* Address details */}
              <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <StaggerItem>
                  <ContactCard
                    icon={MapPin}
                    label="Διεύθυνση"
                    value={`${business.address.street}, ${business.address.area}, ${business.address.city}`}
                    href={business.address.mapsUrl}
                    isExternal
                  />
                </StaggerItem>
                <StaggerItem>
                  <ContactCard
                    icon={Phone}
                    label="Τηλέφωνο"
                    value={business.phoneDisplay}
                    href={`tel:${business.phone}`}
                  />
                </StaggerItem>
                <StaggerItem>
                  <ContactCard
                    icon={Mail}
                    label="Email"
                    value={business.email}
                    href={`mailto:${business.email}`}
                  />
                </StaggerItem>
                <StaggerItem>
                  <ContactCard
                    icon={Clock}
                    label="Ωράριο"
                    value={business.hoursSimple}
                  />
                </StaggerItem>
              </StaggerReveal>
            </div>

            {/* Right: Hours + Social + CTA */}
            <div className="space-y-6">
              {/* Full hours */}
              <SectionReveal>
                <div className="card-base p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <Clock size={16} className="text-gold-400" />
                    <h3 className="font-serif text-lg font-semibold text-[rgba(31,18,9,0.9)]">Ωράριο Λειτουργίας</h3>
                  </div>
                  <div className="space-y-4">
                    {business.hours.map((row, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-4 border-b border-[rgba(127,91,48,0.10)] last:border-0 last:pb-0">
                        <p className="text-sm font-medium text-[rgba(31,18,9,0.72)]">{row.days}</p>
                        <div className="flex gap-3 text-sm text-[rgba(47,29,15,0.58)]">
                          <span className="inline-flex items-center gap-1"><Sun size={11} className="text-gold-400/60" />{row.morning}</span>
                          <span className="text-[rgba(47,29,15,0.26)]">·</span>
                          <span className="inline-flex items-center gap-1"><Moon size={11} className="text-wine-600/60" />{row.evening}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 text-xs text-[rgba(47,29,15,0.42)]">
                    * Το ωράριο ενδέχεται να τροποποιείται σε εορτές και αργίες.
                    Ελέγξτε τα{' '}
                    <a
                      href={business.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-700 hover:text-gold-600 transition-colors"
                    >
                      social μας
                    </a>.
                  </p>
                </div>
              </SectionReveal>

              {/* Social media */}
              <SectionReveal>
                <div className="card-base p-7">
                  <h3 className="font-serif text-lg font-semibold text-[rgba(31,18,9,0.9)] mb-5">Social Media</h3>
                  <div className="space-y-3">
                    {business.social.instagram && (
                      <a
                        href={business.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-[rgba(127,91,48,0.04)] transition-colors group"
                      >
                        <div className="p-2 rounded-lg bg-[rgba(122,30,46,0.10)] text-wine-700">
                          <Instagram size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[rgba(31,18,9,0.8)] group-hover:text-gold-700 transition-colors">
                            Instagram
                          </p>
                          <p className="text-xs text-[rgba(47,29,15,0.42)]">@metaximas {/* [PLACEHOLDER] */}</p>
                        </div>
                        <ExternalLink size={12} className="ml-auto text-[rgba(47,29,15,0.26)] group-hover:text-[rgba(47,29,15,0.46)] transition-colors" />
                      </a>
                    )}
                    {business.social.facebook && (
                      <a
                        href={business.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-[rgba(127,91,48,0.04)] transition-colors group"
                      >
                        <div className="p-2 rounded-lg bg-[rgba(77,103,56,0.10)] text-olive-700">
                          <Facebook size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[rgba(31,18,9,0.8)] group-hover:text-gold-700 transition-colors">
                            Facebook
                          </p>
                          <p className="text-xs text-[rgba(47,29,15,0.42)]">Μεταξύ Μας {/* [PLACEHOLDER] */}</p>
                        </div>
                        <ExternalLink size={12} className="ml-auto text-[rgba(47,29,15,0.26)] group-hover:text-[rgba(47,29,15,0.46)] transition-colors" />
                      </a>
                    )}
                  </div>
                </div>
              </SectionReveal>

              {/* Reservation CTA */}
              <SectionReveal>
                <div className="card-base p-7 border-gold-500/20 bg-gradient-to-br from-[rgba(212,148,26,0.10)] to-transparent">
                  <p className="label-upper mb-3">Ετοιμαστείτε</p>
                  <h3 className="font-serif text-xl font-semibold text-[rgba(31,18,9,0.9)] mb-3">
                    Κλείστε τραπέζι τώρα
                  </h3>
                  <p className="text-sm text-[rgba(47,29,15,0.56)] mb-5 leading-relaxed">
                    Online κράτηση σε λίγα λεπτά — ή τηλεφωνήστε μας για άμεση εξυπηρέτηση.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link to="/reservations" className="btn-primary justify-center">
                      Online Κράτηση
                    </Link>
                    <a href={`tel:${business.phone}`} className="btn-outline justify-center">
                      <Phone size={15} />
                      {business.phoneDisplay}
                    </a>
                  </div>
                </div>
              </SectionReveal>

              {/* FAQ */}
              <SectionReveal>
                <div className="card-base p-7">
                  <h3 className="font-serif text-lg font-semibold text-[rgba(31,18,9,0.9)] mb-5">Συχνές Ερωτήσεις</h3>
                  <div className="space-y-4">
                    {[
                      { q: 'Χρειάζεται κράτηση;', a: 'Για βραδιές ζωντανής μουσικής συνιστάται. Για πρωινό χωρίς κράτηση.' },
                      { q: 'Υπάρχει parking;', a: 'Υπάρχει δημοτικός χώρος στάθμευσης κοντά. [PLACEHOLDER]' },
                      { q: 'Δέχεστε κατοικίδια;', a: 'Στον εξωτερικό χώρο δεχόμαστε φιλικά κατοικίδια. [PLACEHOLDER]' },
                      { q: 'Υπάρχουν vegan/vegetarian επιλογές;', a: 'Ναι! Αρκετά πιάτα στο μενού είναι vegan ή vegetarian.' },
                    ].map(item => (
                      <div key={item.q} className="pb-4 border-b border-[rgba(127,91,48,0.10)] last:border-0 last:pb-0">
                        <p className="text-sm font-medium text-[rgba(31,18,9,0.82)] mb-1">{item.q}</p>
                        <p className="text-xs text-[rgba(47,29,15,0.48)] leading-relaxed">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
