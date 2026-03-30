import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ExternalLink } from 'lucide-react'
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
        <title>Ξ•Ο€ΞΉΞΊΞΏΞΉΞ½Ο‰Ξ½Ξ―Ξ± & Ξ¤ΞΏΟ€ΞΏΞΈΞµΟƒΞ―Ξ± | ΞΞµΟ„Ξ±ΞΎΟ ΞΞ±Ο‚</title>
        <meta name="description" content={`ΞΞµΟ„Ξ±ΞΎΟ ΞΞ±Ο‚ β€” ${business.address.street}, ${business.address.area}. Ξ¤Ξ·Ξ»: ${business.phoneDisplay}. Ξ©ΟΞ¬ΟΞΉΞΏ: ${business.hoursSimple}`} />
      </Helmet>

      <PageHero
        label="Ξ•Ο€ΞΉΞΊΞΏΞΉΞ½Ο‰Ξ½Ξ―Ξ±"
        title="Ξ’ΟΞµΞ―Ο„Ξµ ΞΌΞ±Ο‚"
        subtitle="Ξ•Ξ―ΞΌΞ±ΟƒΟ„Ξµ ΞµΞ΄Ο Ξ³ΞΉΞ± ΞµΟƒΞ¬Ο‚ β€” Ξ΄ΞΉΞ±Ξ΄ΞΉΞΊΟ„Ο…Ξ±ΞΊΞ¬, Ο„Ξ·Ξ»ΞµΟ†Ο‰Ξ½ΞΉΞΊΞ¬ Ξ® Ξ±Ο…Ο„ΞΏΟ€ΟΞΏΟƒΟΟ€Ο‰Ο‚."
      />

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">

            {/* Left: Map + Address */}
            <div>
              <SectionReveal className="mb-6">
                <p className="label-upper mb-3">Ξ¤ΞΏΟ€ΞΏΞΈΞµΟƒΞ―Ξ±</p>
                <h2 className="heading-card mb-2 text-[rgba(31,18,9,0.9)]">Ξ ΞΏΟ ΞΈΞ± ΞΌΞ±Ο‚ Ξ²ΟΞµΞ―Ο„Ξµ</h2>
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
                      title="Ξ§Ξ¬ΟΟ„Ξ·Ο‚ ΞΞµΟ„Ξ±ΞΎΟ ΞΞ±Ο‚"
                    />
                    Get your embed URL from: Google Maps > Share > Embed a map
                  */}
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-center px-8">
                    <MapPin size={36} className="text-gold-500/40" />
                    <p className="text-sm text-[rgba(47,29,15,0.48)] leading-relaxed">
                      <strong className="text-[rgba(31,18,9,0.7)]">Ξ§Ξ¬ΟΟ„Ξ·Ο‚ Placeholder</strong><br />
                      Ξ‘Ξ½Ο„ΞΉΞΊΞ±Ο„Ξ±ΟƒΟ„Ξ®ΟƒΟ„Ξµ ΞΌΞµ Ο€ΟΞ±Ξ³ΞΌΞ±Ο„ΞΉΞΊΟ Google Maps embed.<br />
                      Ξ”ΞµΞ―Ο„Ξµ ΞΏΞ΄Ξ·Ξ³Ξ―ΞµΟ‚ ΟƒΟ„ΞΏ Ξ±ΟΟ‡ΞµΞ―ΞΏ <code className="text-gold-700 text-xs">Contact.jsx</code>
                    </p>
                    <a
                      href={business.address.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline text-xs"
                    >
                      <ExternalLink size={12} />
                      Ξ†Ξ½ΞΏΞΉΞ³ΞΌΞ± ΟƒΟ„ΞΏ Google Maps
                    </a>
                  </div>
                </div>
              </SectionReveal>

              {/* Address details */}
              <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <StaggerItem>
                  <ContactCard
                    icon={MapPin}
                    label="Ξ”ΞΉΞµΟΞΈΟ…Ξ½ΟƒΞ·"
                    value={`${business.address.street}, ${business.address.area}, ${business.address.city}`}
                    href={business.address.mapsUrl}
                    isExternal
                  />
                </StaggerItem>
                <StaggerItem>
                  <ContactCard
                    icon={Phone}
                    label="Ξ¤Ξ·Ξ»Ξ­Ο†Ο‰Ξ½ΞΏ"
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
                    label="Ξ©ΟΞ¬ΟΞΉΞΏ"
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
                    <h3 className="font-serif text-lg font-semibold text-[rgba(31,18,9,0.9)]">Ξ©ΟΞ¬ΟΞΉΞΏ Ξ›ΞµΞΉΟ„ΞΏΟ…ΟΞ³Ξ―Ξ±Ο‚</h3>
                  </div>
                  <div className="space-y-4">
                    {business.hours.map((row, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 pb-4 border-b border-[rgba(127,91,48,0.10)] last:border-0 last:pb-0">
                        <p className="text-sm font-medium text-[rgba(31,18,9,0.72)]">{row.days}</p>
                        {row.closed ? (
                          <p className="text-sm font-medium text-[rgba(122,30,46,0.78)]">Κλειστά</p>
                        ) : (
                          <div className="flex flex-col items-start gap-1 text-sm text-[rgba(47,29,15,0.58)] sm:text-right">
                            {row.slots.map(slot => (
                              <span key={slot}>{slot}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 text-xs text-[rgba(47,29,15,0.42)]">
                    * Ξ¤ΞΏ Ο‰ΟΞ¬ΟΞΉΞΏ ΞµΞ½Ξ΄Ξ­Ο‡ΞµΟ„Ξ±ΞΉ Ξ½Ξ± Ο„ΟΞΏΟ€ΞΏΟ€ΞΏΞΉΞµΞ―Ο„Ξ±ΞΉ ΟƒΞµ ΞµΞΏΟΟ„Ξ­Ο‚ ΞΊΞ±ΞΉ Ξ±ΟΞ³Ξ―ΞµΟ‚.
                    Ξ•Ξ»Ξ­Ξ³ΞΎΟ„Ξµ Ο„Ξ±{' '}
                    <a
                      href={business.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-700 hover:text-gold-600 transition-colors"
                    >
                      social ΞΌΞ±Ο‚
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
                          <p className="text-xs text-[rgba(47,29,15,0.42)]">ΞΞµΟ„Ξ±ΞΎΟ ΞΞ±Ο‚ {/* [PLACEHOLDER] */}</p>
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
                  <p className="label-upper mb-3">Ξ•Ο„ΞΏΞΉΞΌΞ±ΟƒΟ„ΞµΞ―Ο„Ξµ</p>
                  <h3 className="font-serif text-xl font-semibold text-[rgba(31,18,9,0.9)] mb-3">
                    ΞΞ»ΞµΞ―ΟƒΟ„Ξµ Ο„ΟΞ±Ο€Ξ­Ξ¶ΞΉ Ο„ΟΟΞ±
                  </h3>
                  <p className="text-sm text-[rgba(47,29,15,0.56)] mb-5 leading-relaxed">
                    Online ΞΊΟΞ¬Ο„Ξ·ΟƒΞ· ΟƒΞµ Ξ»Ξ―Ξ³Ξ± Ξ»ΞµΟ€Ο„Ξ¬ β€” Ξ® Ο„Ξ·Ξ»ΞµΟ†Ο‰Ξ½Ξ®ΟƒΟ„Ξµ ΞΌΞ±Ο‚ Ξ³ΞΉΞ± Ξ¬ΞΌΞµΟƒΞ· ΞµΞΎΟ…Ο€Ξ·ΟΞ­Ο„Ξ·ΟƒΞ·.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link to="/reservations" className="btn-primary justify-center">
                      Online ΞΟΞ¬Ο„Ξ·ΟƒΞ·
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
                  <h3 className="font-serif text-lg font-semibold text-[rgba(31,18,9,0.9)] mb-5">Ξ£Ο…Ο‡Ξ½Ξ­Ο‚ Ξ•ΟΟ‰Ο„Ξ®ΟƒΞµΞΉΟ‚</h3>
                  <div className="space-y-4">
                    {[
                      { q: 'Ξ§ΟΞµΞΉΞ¬Ξ¶ΞµΟ„Ξ±ΞΉ ΞΊΟΞ¬Ο„Ξ·ΟƒΞ·;', a: 'Ξ“ΞΉΞ± Ξ²ΟΞ±Ξ΄ΞΉΞ­Ο‚ Ξ¶Ο‰Ξ½Ο„Ξ±Ξ½Ξ®Ο‚ ΞΌΞΏΟ…ΟƒΞΉΞΊΞ®Ο‚ ΟƒΟ…Ξ½ΞΉΟƒΟ„Ξ¬Ο„Ξ±ΞΉ. Ξ“ΞΉΞ± Ο€ΟΟ‰ΞΉΞ½Ο Ο‡Ο‰ΟΞ―Ο‚ ΞΊΟΞ¬Ο„Ξ·ΟƒΞ·.' },
                      { q: 'Ξ¥Ο€Ξ¬ΟΟ‡ΞµΞΉ parking;', a: 'Ξ¥Ο€Ξ¬ΟΟ‡ΞµΞΉ Ξ΄Ξ·ΞΌΞΏΟ„ΞΉΞΊΟΟ‚ Ο‡ΟΟΞΏΟ‚ ΟƒΟ„Ξ¬ΞΈΞΌΞµΟ…ΟƒΞ·Ο‚ ΞΊΞΏΞ½Ο„Ξ¬. [PLACEHOLDER]' },
                      { q: 'Ξ”Ξ­Ο‡ΞµΟƒΟ„Ξµ ΞΊΞ±Ο„ΞΏΞΉΞΊΞ―Ξ΄ΞΉΞ±;', a: 'Ξ£Ο„ΞΏΞ½ ΞµΞΎΟ‰Ο„ΞµΟΞΉΞΊΟ Ο‡ΟΟΞΏ Ξ΄ΞµΟ‡ΟΞΌΞ±ΟƒΟ„Ξµ Ο†ΞΉΞ»ΞΉΞΊΞ¬ ΞΊΞ±Ο„ΞΏΞΉΞΊΞ―Ξ΄ΞΉΞ±. [PLACEHOLDER]' },
                      { q: 'Ξ¥Ο€Ξ¬ΟΟ‡ΞΏΟ…Ξ½ vegan/vegetarian ΞµΟ€ΞΉΞ»ΞΏΞ³Ξ­Ο‚;', a: 'ΞΞ±ΞΉ! Ξ‘ΟΞΊΞµΟ„Ξ¬ Ο€ΞΉΞ¬Ο„Ξ± ΟƒΟ„ΞΏ ΞΌΞµΞ½ΞΏΟ ΞµΞ―Ξ½Ξ±ΞΉ vegan Ξ® vegetarian.' },
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

