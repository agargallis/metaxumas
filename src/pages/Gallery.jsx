import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'motion/react'
import { Play, X, ExternalLink, Instagram } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionReveal, { StaggerReveal, StaggerItem } from '../components/ui/SectionReveal'
import PageTransition from '../components/ui/PageTransition'
import { videos, instagramPosts, galleryMoods } from '../data/gallery'
import { business } from '../data/business'

function VideoCard({ video, onPlay }) {
  return (
    <div
      className="card-base overflow-hidden group cursor-pointer"
      onClick={() => video.embedId && onPlay(video)}
    >
      {/* Thumbnail / placeholder */}
      <div className="aspect-video bg-charcoal-900 relative flex items-center justify-center overflow-hidden">
        {video.thumbnail ? (
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-charcoal-900 via-charcoal-800/50 to-charcoal-900 flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cream-100/30">
              <Play size={20} />
            </div>
            <span className="text-xs text-cream-100/25 px-4 text-center">
              {video.embedId ? 'Κλικ για αναπαραγωγή' : '[VIDEO PLACEHOLDER] — Προσθέστε YouTube embed ID στο gallery.js'}
            </span>
          </div>
        )}

        {/* Overlay */}
        {video.embedId && (
          <div className="absolute inset-0 bg-charcoal-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
              <Play size={22} fill="currentColor" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium text-cream-100/85 mb-1">{video.title}</h3>
        <p className="text-xs text-cream-100/45">{video.description}</p>
        {video.date && <p className="text-xs text-cream-100/30 mt-2">{video.date}</p>}
      </div>
    </div>
  )
}

function InstagramCard({ post }) {
  return (
    <div className="card-base aspect-square overflow-hidden group relative cursor-pointer">
      {/* Placeholder grid cell */}
      <div className="w-full h-full bg-gradient-to-br from-charcoal-900 to-charcoal-800 flex flex-col items-center justify-center p-4">
        <Instagram size={24} className="text-cream-100/20 mb-3" />
        <p className="text-[10px] text-cream-100/25 text-center leading-relaxed">
          {post.shortcode
            ? 'Instagram post'
            : '[PLACEHOLDER] — Προσθέστε shortcode στο gallery.js'
          }
        </p>
        {post.type === 'reel' && (
          <span className="mt-2 text-[9px] px-2 py-0.5 rounded-full bg-wine-900/30 text-wine-300 border border-wine-700/20">
            Reel
          </span>
        )}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-charcoal-950/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 gap-2">
        <p className="text-xs text-cream-100/80 text-center leading-relaxed">{post.caption}</p>
      </div>
    </div>
  )
}

function VideoModal({ video, onClose }) {
  return (
    <AnimatePresence>
      {video && (
        <motion.div
          key="video-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-950/95 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-3xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg text-cream-100">{video.title}</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-cream-100/60 hover:text-cream-100 hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden bg-charcoal-900">
              <iframe
                src={`https://www.youtube.com/embed/${video.embedId}?autoplay=1&rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Gallery() {
  const [activeVideo, setActiveVideo] = useState(null)

  return (
    <PageTransition>
      <Helmet>
        <title>Gallery & Media | Μεταξύ Μας</title>
        <meta name="description" content="Βίντεο, φωτογραφίες και στιγμές από το Μεταξύ Μας — ζωντανή μουσική, γεύσεις και ατμόσφαιρα." />
      </Helmet>

      <PageHero
        label="Gallery & Media"
        title="Στιγμές από το Μεταξύ Μας"
        subtitle="Βίντεο, ήχοι και εικόνες από τις βραδιές που μένουν."
      />

      {/* Moods / tags */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container-wide">
          <SectionReveal>
            <div className="flex flex-wrap gap-2 justify-center">
              {galleryMoods.map(mood => (
                <span key={mood} className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-cream-100/50 hover:text-gold-400 hover:border-gold-500/25 transition-colors cursor-default">
                  {mood}
                </span>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Videos */}
      <section className="section-padding pt-6">
        <div className="container-wide">
          <SectionReveal className="mb-10">
            <p className="label-upper mb-2">Video</p>
            <h2 className="heading-card text-cream-100">Live Performances</h2>
          </SectionReveal>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {videos.map(v => (
              <StaggerItem key={v.id}>
                <VideoCard video={v} onPlay={setActiveVideo} />
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Instagram */}
      <section className="section-padding bg-charcoal-950/60 border-y border-white/[0.05]">
        <div className="container-wide">
          <SectionReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="label-upper mb-2">Social Media</p>
              <h2 className="heading-card text-cream-100">Instagram & Reels</h2>
            </div>
            {business.social.instagram && (
              <a
                href={business.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-sm shrink-0 self-start sm:self-auto"
              >
                <Instagram size={15} />
                @metaximas <ExternalLink size={12} />
              </a>
            )}
          </SectionReveal>

          <StaggerReveal className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {instagramPosts.map(post => (
              <StaggerItem key={post.id}>
                <InstagramCard post={post} />
              </StaggerItem>
            ))}
          </StaggerReveal>

          {/* Integration note */}
          <SectionReveal className="mt-8">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-dashed border-white/[0.08] text-center">
              <p className="text-xs text-cream-100/35 leading-relaxed">
                Για αυτόματη ανανέωση Instagram posts, μπορείτε να ενσωματώσετε widget
                τρίτου παρόχου (π.χ. EmbedSocial, Elfsight) αντικαθιστώντας τα placeholders.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </PageTransition>
  )
}
