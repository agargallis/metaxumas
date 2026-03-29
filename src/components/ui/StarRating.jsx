import { Star } from 'lucide-react'
import { cn } from '../../lib/utils'

export default function StarRating({ rating = 5, max = 5, size = 16, className = '' }) {
  return (
    <div className={cn('flex items-center gap-0.5', className)} aria-label={`${rating} από ${max} αστέρια`}>
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          size={size}
          className={cn(
            'transition-colors',
            i < Math.floor(rating)
              ? 'fill-gold-400 text-gold-400'
              : i < rating
              ? 'fill-gold-400/50 text-gold-400/50'
              : 'fill-transparent text-[rgba(184,122,14,0.24)]'
          )}
        />
      ))}
    </div>
  )
}
