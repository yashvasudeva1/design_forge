import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { memo } from 'react'

const Hero = memo(() => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-forge-black">
        {/* Gradient Orbs - Using CSS animations for better performance */}
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 animate-pulse-slow"
          style={{
            background: 'radial-gradient(circle, rgba(144, 26, 29, 0.4) 0%, transparent 70%)',
            willChange: 'transform, opacity'
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-15 animate-pulse-slow-reverse"
          style={{
            background: 'radial-gradient(circle, rgba(144, 26, 29, 0.3) 0%, transparent 70%)',
            willChange: 'transform, opacity'
          }}
        />

        {/* Third orb - hidden on mobile for performance */}
        <div
          className="hidden md:block absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full opacity-10 animate-pulse-slow"
          style={{
            background: 'radial-gradient(circle, rgba(144, 26, 29, 0.35) 0%, transparent 70%)',
          }}
        />

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Metallic Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Main Content - Centered */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center justify-center">

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="text-white">Forging</span>{' '}
          <span className="text-gradient-crimson">Powerful</span>
          <br />
          <span className="text-white">Visual Identities</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-forge-crimson"
          >
            .
          </motion.span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12"
        >
          Crafting logos, brands, and digital experiences that stand out.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <motion.a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group relative overflow-hidden px-8 py-4 bg-forge-crimson text-white font-heading font-semibold rounded-xl
              transition-all duration-300 hover:bg-forge-crimson-light hover:shadow-crimson-lg flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View Our Work</span>
            <ArrowRight size={20} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.a>

          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group px-8 py-4 bg-transparent text-white font-heading font-semibold rounded-xl
              border-2 border-white/20 transition-all duration-300 hover:border-forge-crimson hover:text-forge-crimson
              flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start a Project</span>
            <div className="w-2 h-2 rounded-full bg-forge-crimson animate-pulse" />
          </motion.a>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-forge-black to-transparent z-10" />
    </section>
  )
})

Hero.displayName = 'Hero'

export default Hero
