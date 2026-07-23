import { useState, useMemo } from 'react'

const FALLBACK_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23f3f4f6'/%3E%3Cpath d='M85 170h230l-20-40h-30l-25-30H140l-25 30H95l-20 40z' fill='%23d1d5db'/%3E%3Ccircle cx='115' cy='170' r='20' fill='%239ca3af'/%3E%3Ccircle cx='285' cy='170' r='20' fill='%239ca3af'/%3E%3Ctext x='200' y='75' text-anchor='middle' font-family='Arial' font-size='14' fill='%239ca3af'%3ECar Image%3C/text%3E%3Ctext x='200' y='95' text-anchor='middle' font-family='Arial' font-size='12' fill='%23b0b7c3'%3ENot Available%3C/text%3E%3C/svg%3E"

const getAlternatePaths = (path) => {
  if (!path || path.startsWith('data:') || /^https?:\/\//.test(path)) return []
  const match = path.match(/^(.+?)(\.\w+)$/)
  if (!match) return []
  const base = match[1]
  const currentExt = match[2].toLowerCase()
  const exts = ['.jfif', '.jpeg', '.png', '.webp', '.gif']
  return exts.filter(ext => ext !== currentExt).map(ext => base + ext)
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = '/images/car1.jpg',
  className = '',
  ...props
}) {
  const [currentSrc, setCurrentSrc] = useState(() => src || fallbackSrc)
  const [errorCount, setErrorCount] = useState(0)

  const srcAlts = useMemo(() => getAlternatePaths(src), [src])
  const fallbackAlts = useMemo(() => getAlternatePaths(fallbackSrc), [fallbackSrc])
  const allAlts = useMemo(() => [...srcAlts, ...fallbackAlts], [srcAlts, fallbackAlts])

  const handleError = () => {
    const nextErrorCount = errorCount + 1

    if (nextErrorCount === 1) {
      setCurrentSrc(fallbackSrc)
    } else if (nextErrorCount - 2 < allAlts.length) {
      setCurrentSrc(allAlts[nextErrorCount - 2])
    } else {
      setCurrentSrc(FALLBACK_SVG)
    }

    setErrorCount(nextErrorCount)
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  )
}

