import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ExternalLink, Quote } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionReveal, { StaggerReveal, StaggerItem } from '../components/ui/SectionReveal'
import StarRating from '../components/ui/StarRating'
import PageTransition from '../components/ui/PageTransition'
import { reviews, ratingStats } from '../data/reviews'
import { business } from '../data/business'

function RatingBar({ stars, percentage }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-4 shrink-0 text-right text-xs text-[rgba(47,29,15,0.52)]">{stars}</span>
      <span className="shrink-0 text-gold-700/60">★</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[rgba(127,91,48,0.10)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-8 shrink-0 text-right text-xs text-[rgba(47,29,15,0.38)]">{percentage}%</span>
    </div>
  )
}

function ReviewCard({ review }) {
  const reviewUrl = review.url || business.googleReviewsUrl || business.address.mapsUrl

  return (
    <a
      href={reviewUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="card-base relative flex h-full flex-col p-7 transition-colors hover:text-gold-700"
    >
      <Quote size={20} className="absolute right-6 top-6 text-gold-500/20" />

      <div className="mb-4 flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-500/22 bg-gold-500/12 font-serif text-base font-semibold text-gold-700">
          {review.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-0.5 text-sm font-medium text-[rgba(31,18,9,0.9)]">{review.name}</p>
          <div className="flex items-center gap-2">
            <StarRating rating={review.rating} size={12} />
            <span className="text-xs text-[rgba(47,29,15,0.28)]">·</span>
            <span className="text-xs text-[rgba(47,29,15,0.38)]">{review.date}</span>
            <span className="text-xs text-[rgba(47,29,15,0.28)]">·</span>
            <span className="text-xs text-[rgba(47,29,15,0.38)]">{review.platform}</span>
          </div>
        </div>
      </div>

      <p className="flex-1 text-sm italic leading-relaxed text-[rgba(47,29,15,0.64)]">
        &ldquo;{review.text}&rdquo;
      </p>

      {review.highlight ? (
        <div className="mt-5 border-t border-[rgba(127,91,48,0.10)] pt-4">
          <span className="text-xs font-medium text-gold-700">✦ {review.highlight}</span>
        </div>
      ) : null}
    </a>
  )
}

export default function Reviews() {
  const reviewsUrl = business.googleReviewsUrl || business.address.mapsUrl

  return (
    <PageTransition>
      <Helmet>
        <title>Αξιολογήσεις | Μεταξύ Μας</title>
        <meta
          name="description"
          content={`Μεταξύ Μας - ${ratingStats.average} αστέρια με ${ratingStats.total}+ αξιολογήσεις Google. Διαβάστε τι λένε οι επισκέπτες μας.`}
        />
      </Helmet>

      <PageHero
        imageSrc="/4.png"
        imageAlt="Μεταξύ Μας"
        label="Αξιολογήσεις"
        title="Τι λένε οι επισκέπτες μας"
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="container-wide">
          <SectionReveal>
            <div className="mx-auto mb-16 grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
              <div className="card-base p-8 text-center">
                <p className="font-display mb-2 text-7xl text-gold-700">{ratingStats.average}</p>
                <StarRating rating={ratingStats.average} size={22} className="mb-2 justify-center" />
                <p className="text-sm text-[rgba(47,29,15,0.56)]">{ratingStats.total}+ αξιολογήσεις στο Google</p>
                <a href={reviewsUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-4 justify-center text-xs">
                  Δείτε στο Google <ExternalLink size={12} />
                </a>
              </div>

              <div className="card-base p-8">
                <h3 className="mb-5 text-sm font-medium text-[rgba(31,18,9,0.72)]">Κατανομή αξιολογήσεων</h3>
                <div className="space-y-3">
                  {Object.entries(ratingStats.breakdown)
                    .sort((a, b) => Number(b[0]) - Number(a[0]))
                    .map(([stars, pct]) => (
                      <RatingBar key={stars} stars={stars} percentage={pct} />
                    ))}
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: `${ratingStats.average}/5`, label: 'Μέση βαθμολογία' },
                { value: `${ratingStats.breakdown[5]}%`, label: 'Δίνουν 5 αστέρια' },
                { value: `${ratingStats.total}+`, label: 'Αξιολογήσεις' },
                { value: 'Google', label: 'Κύρια πλατφόρμα' },
              ].map(stat => (
                <div key={stat.label} className="card-base p-5 text-center">
                  <p className="font-display mb-1 text-3xl text-gold-700">{stat.value}</p>
                  <p className="text-xs text-[rgba(47,29,15,0.48)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal className="mb-10">
            <p className="label-upper mb-2">Τι λένε</p>
            <h2 className="heading-card text-[rgba(31,18,9,0.9)]">Αξιολογήσεις πελατών</h2>
          </SectionReveal>

          <StaggerReveal className="mb-14 grid grid-cols-1 gap-5 md:grid-cols-2">
            {reviews.map(review => (
              <StaggerItem key={review.id}>
                <ReviewCard review={review} />
              </StaggerItem>
            ))}
          </StaggerReveal>

          <SectionReveal>
            <div className="card-base mx-auto max-w-xl p-8 text-center">
              <p className="label-upper mb-3">Ήσασταν εδώ;</p>
              <h3 className="heading-card mb-3 text-[rgba(31,18,9,0.9)]">Μοιραστείτε την εμπειρία σας</h3>
              <p className="mb-6 text-sm leading-relaxed text-[rgba(47,29,15,0.56)]">
                Η γνώμη σας μετράει. Βοηθά άλλους να μας ανακαλύψουν και εμάς να βελτιωνόμαστε.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <a href={reviewsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Γράψτε αξιολόγηση Google
                </a>
                <Link to="/reservations" className="btn-outline">
                  Κλείστε τραπέζι
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  )
}
