import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ExternalLink, Quote } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionReveal, { StaggerReveal, StaggerItem } from '../components/ui/SectionReveal'
import StarRating from '../components/ui/StarRating'
import PageTransition from '../components/ui/PageTransition'
import { reviews, ratingStats } from '../data/reviews'

function RatingBar({ stars, percentage }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[rgba(47,29,15,0.52)] w-4 text-right shrink-0">{stars}</span>
      <span className="text-gold-700/60 shrink-0">★</span>
      <div className="flex-1 h-1.5 rounded-full bg-[rgba(127,91,48,0.10)] overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-[rgba(47,29,15,0.38)] w-8 text-right shrink-0">{percentage}%</span>
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <div className="card-base p-7 h-full flex flex-col relative">
      {/* Quote icon */}
      <Quote size={20} className="text-gold-500/20 absolute top-6 right-6" />

      <div className="flex items-start gap-4 mb-4">
        <div className="w-11 h-11 rounded-full bg-gold-500/12 border border-gold-500/22 flex items-center justify-center font-serif text-gold-700 font-semibold text-base shrink-0">
          {review.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[rgba(31,18,9,0.9)] mb-0.5">{review.name}</p>
          <div className="flex items-center gap-2">
            <StarRating rating={review.rating} size={12} />
            <span className="text-xs text-[rgba(47,29,15,0.28)]">·</span>
            <span className="text-xs text-[rgba(47,29,15,0.38)]">{review.date}</span>
            <span className="text-xs text-[rgba(47,29,15,0.28)]">·</span>
            <span className="text-xs text-[rgba(47,29,15,0.38)]">{review.platform}</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-[rgba(47,29,15,0.64)] leading-relaxed flex-1 italic">
        &ldquo;{review.text}&rdquo;
      </p>

      {review.highlight && (
        <div className="mt-5 pt-4 border-t border-[rgba(127,91,48,0.10)]">
          <span className="text-xs text-gold-700 font-medium">✦ {review.highlight}</span>
        </div>
      )}
    </div>
  )
}

export default function Reviews() {
  return (
    <PageTransition>
      <Helmet>
        <title>Αξιολογήσεις | Μεταξύ Μας</title>
        <meta name="description" content={`Μεταξύ Μας — ${ratingStats.average} αστέρια με ${ratingStats.total}+ αξιολογήσεις Google. Διαβάστε τι λένε οι επισκέπτες μας.`} />
      </Helmet>

      <PageHero
        label="Αξιολογήσεις"
        title="Τι λένε οι επισκέπτες μας"
        subtitle="Αληθινές εμπειρίες, αληθινές λέξεις — από ανθρώπους που επέστρεψαν."
      />

      {/* Summary stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container-wide">
          <SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
              {/* Big rating */}
              <div className="card-base p-8 text-center">
                <p className="font-display text-7xl text-gold-700 mb-2">{ratingStats.average}</p>
                <StarRating rating={ratingStats.average} size={22} className="justify-center mb-2" />
                <p className="text-sm text-[rgba(47,29,15,0.56)]">{ratingStats.total}+ αξιολογήσεις στο Google</p>
                <a
                  href="https://g.page/r/" // [PLACEHOLDER: add real Google reviews link]
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-xs mt-4 justify-center"
                >
                  Δείτε στο Google <ExternalLink size={12} />
                </a>
              </div>

              {/* Breakdown */}
              <div className="card-base p-8">
                <h3 className="text-sm font-medium text-[rgba(31,18,9,0.72)] mb-5">Κατανομή Αξιολογήσεων</h3>
                <div className="space-y-3">
                  {Object.entries(ratingStats.breakdown)
                    .sort((a, b) => Number(b[0]) - Number(a[0]))
                    .map(([stars, pct]) => (
                      <RatingBar key={stars} stars={stars} percentage={pct} />
                    ))
                  }
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Highlight stats */}
          <SectionReveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
              {[
                { value: `${ratingStats.average}/5`, label: 'Μέση Βαθμολογία' },
                { value: `${ratingStats.breakdown[5]}%`, label: 'Δίνουν 5 αστέρια' },
                { value: `${ratingStats.total}+`, label: 'Αξιολογήσεις' },
                { value: '#1', label: 'Στην περιοχή [PLACEHOLDER]' },
              ].map(s => (
                <div key={s.label} className="card-base p-5 text-center">
                  <p className="font-display text-3xl text-gold-700 mb-1">{s.value}</p>
                  <p className="text-xs text-[rgba(47,29,15,0.48)]">{s.label}</p>
                </div>
              ))}
            </div>
          </SectionReveal>

          {/* All reviews */}
          <SectionReveal className="mb-10">
            <p className="label-upper mb-2">Τι λένε</p>
            <h2 className="heading-card text-[rgba(31,18,9,0.9)]">Αξιολογήσεις Πελατών</h2>
          </SectionReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
            {reviews.map(review => (
              <StaggerItem key={review.id}>
                <ReviewCard review={review} />
              </StaggerItem>
            ))}
          </StaggerReveal>

          {/* CTA to write review */}
          <SectionReveal>
            <div className="card-base p-8 text-center max-w-xl mx-auto">
              <p className="label-upper mb-3">Ήσασταν εδώ;</p>
              <h3 className="heading-card text-[rgba(31,18,9,0.9)] mb-3">Μοιραστείτε την εμπειρία σας</h3>
              <p className="text-sm text-[rgba(47,29,15,0.56)] mb-6 leading-relaxed">
                Η γνώμη σας μετράει — βοηθά άλλους να μας ανακαλύψουν και εμάς να βελτιωνόμαστε.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://g.page/r/" // [PLACEHOLDER: real Google review link]
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Γράψτε Αξιολόγηση Google
                </a>
                <Link to="/reservations" className="btn-outline">
                  Κλείστε Τραπέζι
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  )
}
