import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Target, Lightbulb, Award, Heart } from 'lucide-react'

const aboutCards = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To forge meaningful visual identities that empower brands to stand out, connect authentically, and leave lasting impressions in an ever-evolving digital landscape.',
    accent: 'from-forge-crimson to-red-600'
  },
  {
    icon: Lightbulb,
    title: 'Our Philosophy',
    description: 'Like master craftsmen at the forge, we believe great design emerges from the fusion of creative fire and disciplined precision. Every pixel is intentional.',
    accent: 'from-orange-500 to-forge-crimson'
  },
  {
    icon: Award,
    title: 'Our Approach',
    description: 'We dive deep into your brand\'s essence, understanding your vision and audience before crafting solutions that are both visually stunning and strategically sound.',
    accent: 'from-forge-crimson to-pink-600'
  },
  {
    icon: Heart,
    title: 'Our Commitment',
    description: 'Excellence is non-negotiable. We pour passion into every project, ensuring each deliverable meets our exacting standards and exceeds your expectations.',
    accent: 'from-red-600 to-forge-crimson'
  }
]

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="about" className="section bg-forge-black relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-forge-crimson/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-forge-crimson/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block text-forge-crimson text-sm font-semibold tracking-widest uppercase mb-4"
          >
            About Us
          </motion.span>
          <h2 className="section-title">
            Crafting Excellence
            <br />
            <span className="text-gradient-crimson">Since Day One</span>
          </h2>
          <p className="section-subtitle mx-auto mt-6">
            We're a passionate team of designers, strategists, and creative thinkers 
            dedicated to forging brands that resonate and endure.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          {/* Left - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative Frame */}
              <div className="absolute inset-4 border-2 border-forge-crimson/20 rounded-2xl" />
              
              {/* Main Image Container */}
              <div className="relative h-full rounded-2xl overflow-hidden bg-forge-dark">
                <img
                  src="/assets/Graphic (11).png"
                  alt="Design Forge Logo"
                  className="absolute inset-0 w-full h-full object-contain p-16 opacity-90"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-forge-crimson/10 via-transparent to-forge-black/50" />
                
                {/* Animated Glow */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    boxShadow: [
                      'inset 0 0 60px rgba(177, 18, 38, 0.1)',
                      'inset 0 0 100px rgba(177, 18, 38, 0.2)',
                      'inset 0 0 60px rgba(177, 18, 38, 0.1)'
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-forge-crimson text-white px-6 py-4 rounded-xl shadow-crimson-lg"
              >
                <div className="font-heading text-3xl font-bold">6+</div>
                <div className="text-sm text-white/80">Years of Excellence</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-white">
              Where Fire Meets
              <span className="text-forge-crimson"> Precision</span>
            </h3>
            
            <p className="text-white/60 text-lg leading-relaxed">
              Design Forge was born from a simple belief: great design is forged, not found. 
              Like skilled blacksmiths transforming raw metal into refined masterpieces, 
              we take your ideas and shape them into powerful visual identities.
            </p>
            
            <p className="text-white/60 text-lg leading-relaxed">
              Our team combines artistic vision with strategic thinking, ensuring every 
              project we undertake is not just beautiful, but effective. We don't just 
              design – we forge brands that stand the test of time.
            </p>

            {/* Key Points */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { label: 'Projects Delivered', value: '150+' },
                { label: 'Client Retention', value: '95%' },
                { label: 'Team Members', value: '12+' }
              ].map((item) => (
                <div key={item.label} className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="font-heading text-2xl font-bold text-forge-crimson">
                    {item.value}
                  </div>
                  <div className="text-sm text-white/50">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Values Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {aboutCards.map((card, index) => (
            <motion.div
              key={card.title}
              variants={itemVariants}
              className="group relative"
            >
              <div className="card h-full hover:border-forge-crimson/50 transition-all duration-500">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.accent} p-0.5 mb-6`}>
                  <div className="w-full h-full bg-forge-dark rounded-xl flex items-center justify-center">
                    <card.icon size={24} className="text-forge-crimson" />
                  </div>
                </div>

                {/* Content */}
                <h4 className="font-heading text-xl font-semibold text-white mb-3 group-hover:text-forge-crimson transition-colors">
                  {card.title}
                </h4>
                <p className="text-white/50 text-sm leading-relaxed">
                  {card.description}
                </p>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-forge-crimson/5 to-transparent rounded-2xl" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About
