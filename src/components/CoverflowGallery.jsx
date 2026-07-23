import { useState, useEffect, useCallback, useRef } from 'react'

// ─── 3D Coverflow Gallery ─────────────────────────────────
// Adapted from Originkit's Smooth3DSlideshow for React JSX.
// Active card sits upright, neighbours tilt away in perspective.

const PERSPECTIVE = 1600
const SCALE_STEP = 0.16
const MAX_VISIBLE = 2
const DEPTH = 240

const DEFAULT_TRANSITION = {
  duration: 0.6,
  delay: 2.5,
  ease: [0.22, 1, 0.36, 1],
}

function cssTransition(t) {
  const dur = t && typeof t.duration === 'number' ? t.duration : 0.6
  let ease = 'cubic-bezier(0.22, 1, 0.36, 1)'
  const e = t?.ease
  if (Array.isArray(e) && e.length === 4) {
    ease = `cubic-bezier(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`
  } else if (typeof e === 'string') {
    const map = {
      linear: 'linear',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    }
    ease = map[e] || 'ease'
  }
  return { dur, ease }
}

const CoverflowGallery = ({
  slides = [],
  cardWidth = 420,
  cardHeight = 420,
  radius = 3,
  tilt = 12,
  sideTilt = 8,
  gap = 8,
  opacity = 60,
  autoplay = false,
  autoplayDirection = 'rightToLeft',
  showTitle = true,
  titleColor = '#ffffff',
  transition = DEFAULT_TRANSITION,
  onSlideClick,
  style,
}) => {
  const list = slides.length ? slides : []
  const n = list.length
  if (n === 0) return null

  const [active, setActive] = useState(0)
  const [layout, setLayout] = useState({ width: cardWidth, height: cardHeight, gapMultiplier: 30 })

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768
      const maxW = Math.min(window.innerWidth - 48, 300)
      setLayout({
        width: isMobile ? maxW : cardWidth,
        height: isMobile ? Math.round(maxW * 1.05) : cardHeight,
        gapMultiplier: isMobile ? 16 : 30
      })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [cardWidth, cardHeight])

  useEffect(() => {
    setActive(a => Math.max(0, Math.min(n - 1, a)))
  }, [n])

  const moveDur = transition?.duration || 0.6
  const lockRef = useRef(false)
  const lock = useCallback(() => {
    lockRef.current = true
    window.setTimeout(() => { lockRef.current = false }, Math.max(50, moveDur * 1000))
  }, [moveDur])

  const step = useCallback((dir) => {
    if (lockRef.current) return
    lock()
    setActive(a => (((a + dir) % n) + n) % n)
  }, [n, lock])

  // Touch swipe support for mobile
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX
    const touchEndY = e.changedTouches[0].clientY
    const diffX = touchStartX.current - touchEndX
    const diffY = touchStartY.current - touchEndY
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (diffX > 0) step(1)
      else step(-1)
    }
  }

  const handleCardClick = useCallback((i) => {
    if (autoplay || lockRef.current) return
    lock()
    if (i === active) {
      // Clicking the active card - trigger the detail view
      if (onSlideClick) onSlideClick(list[i], i)
    } else {
      setActive(i)
    }
  }, [autoplay, active, n, lock, onSlideClick, list])

  // Autoplay
  const delay = transition?.delay || 2.5
  useEffect(() => {
    if (!autoplay || n < 2) return
    const ms = Math.max(300, delay * 1000)
    const dir = autoplayDirection === 'leftToRight' ? -1 : 1
    const id = window.setInterval(() => step(dir), ms)
    return () => window.clearInterval(id)
  }, [autoplay, autoplayDirection, delay, n, step])

  const onKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1) }
  }, [step])

  const { dur, ease } = cssTransition(transition)
  const transitionCss = `transform ${dur}s ${ease}, opacity ${dur}s ${ease}`

  const effectiveRadius = (Math.max(0, Math.min(20, radius)) / 20) * (Math.min(layout.width, layout.height) / 2)
  const dim = 1 - Math.max(0, Math.min(100, opacity)) / 100

  return (
    <div
      style={{
        ...(style || {}),
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: layout.height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: `${PERSPECTIVE}px`,
        overflow: 'hidden',
        outline: 'none',
        touchAction: 'pan-y pinch-zoom',
      }}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      onKeyDown={onKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          position: 'relative',
          width: layout.width,
          height: layout.height,
          transformStyle: 'preserve-3d',
        }}
      >
        {list.map((slide, i) => {
          let rel = i - active
          if (rel > n / 2) rel -= n
          if (rel < -n / 2) rel += n

          const ax = Math.abs(rel)
          const visible = ax <= MAX_VISIBLE
          const isActive = rel === 0
          const sc = Math.max(0.4, 1 - ax * SCALE_STEP)
          const tx = rel * (gap * layout.gapMultiplier)
          const tz = -ax * DEPTH
          const ry = -rel * tilt
          const rz = rel * sideTilt
          const src = slide.image || ''

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: layout.width,
                height: layout.height,
                borderRadius: effectiveRadius,
                overflow: 'hidden',
                transformStyle: 'preserve-3d',
                transformOrigin: 'center center',
                transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`,
                transition: transitionCss,
                opacity: visible ? 1 : 0,
                cursor: isActive ? 'pointer' : 'pointer',
                pointerEvents: visible ? 'auto' : 'none',
                backgroundColor: '#0a0a0a',
              }}
              onClick={() => handleCardClick(i)}
              aria-label={slide.title}
              aria-hidden={!visible}
            >
              {src && (
                <img
                  src={src}
                  alt={slide.title || ''}
                  draggable={false}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    userSelect: 'none',
                  }}
                />
              )}

              {/* Title overlay for active card */}
              {showTitle && (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)',
                      pointerEvents: 'none',
                      opacity: isActive ? 1 : 0.3,
                      transition: `opacity ${dur}s ${ease}`,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 20,
                      right: 20,
                      bottom: 20,
                      pointerEvents: 'none',
                      opacity: isActive ? 1 : 0,
                      transition: `opacity ${dur}s ${ease}`,
                    }}
                  >
                    {slide.category && (
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.6rem',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: '#901a1d',
                          display: 'block',
                          marginBottom: 6,
                        }}
                      >
                        {slide.category}
                      </span>
                    )}
                    <span
                      style={{
                        color: titleColor,
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 22,
                        fontWeight: 700,
                        lineHeight: '1.15em',
                        letterSpacing: '-0.02em',
                        whiteSpace: 'pre-line',
                        textShadow: '0 2px 12px rgba(0,0,0,0.5)',
                      }}
                    >
                      {slide.title}
                    </span>
                  </div>
                </>
              )}

              {/* Dim overlay for inactive cards */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#000000',
                  opacity: isActive ? 0 : dim,
                  transition: `opacity ${dur}s ${ease}`,
                  pointerEvents: 'none',
                }}
              />

              {/* Crimson border for active card */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  border: isActive ? '1px solid rgba(144, 26, 29, 0.5)' : '1px solid transparent',
                  borderRadius: effectiveRadius,
                  transition: `border-color ${dur}s ${ease}`,
                  pointerEvents: 'none',
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Navigation dots */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 6,
        }}
      >
        {list.map((_, i) => (
          <button
            key={i}
            onClick={() => { if (!lockRef.current) { lock(); setActive(i) } }}
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              background: i === active ? '#901a1d' : 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: 3,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default CoverflowGallery
