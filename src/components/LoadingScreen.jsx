import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LoadingScreen = ({ onComplete }) => {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let frame
    let start = null
    const duration = 1800

    const animate = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * 100))

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      } else {
        setTimeout(() => {
          setDone(true)
          setTimeout(onComplete, 600)
        }, 200)
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Grid overlay */}
          <div className="grid-overlay" />

          {/* Logo area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center"
          >
            <img
              src="/Add a subheading (1).png"
              alt="Design Forge"
              className="h-20 object-contain mb-12 opacity-90"
            />

            {/* Loading bar */}
            <div className="w-48 h-px bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-forge-crimson"
                initial={{ width: '0%' }}
                animate={{ width: `${count}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>

            {/* Counter */}
            <div className="mt-4 font-mono text-xs text-forge-muted tracking-widest">
              {String(count).padStart(3, '0')}
            </div>
          </motion.div>

          {/* Bottom label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <span className="label">Loading Design Forge</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
