import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Palette, 
  Layers, 
  Share2, 
  Layout, 
  Image, 
  Play 
} from 'lucide-react'

const services = [
  {
    icon: Palette,
    title: 'Logo Design',
    description: 'Distinctive, memorable logos that capture your brand essence and stand the test of time.',
    features: ['Custom Concepts', 'Vector Files', 'Brand Guidelines']
  },
  {
    icon: Layers,
    title: 'Branding',
    description: 'Complete brand identity systems that create cohesive experiences across all touchpoints.',
    features: ['Visual Identity', 'Brand Strategy', 'Style Guides']
  },
  {
    icon: Share2,
    title: 'Social Media Design',
    description: 'Scroll-stopping content that engages your audience and amplifies your message.',
    features: ['Post Templates', 'Story Designs', 'Ad Creatives']
  },
  {
    icon: Layout,
    title: 'UI/UX Design',
    description: 'Intuitive interfaces that delight users and drive conversions with seamless experiences.',
    features: ['Web Design', 'App Design', 'Prototyping']
  },
  {
    icon: Image,
    title: 'Posters & Marketing',
    description: 'Eye-catching print and digital materials that communicate with impact.',
    features: ['Print Design', 'Flyers', 'Brochures']
  },
  {
    icon: Play,
    title: 'Motion Graphics',
    description: 'Dynamic animations that bring your brand to life and captivate audiences.',
    features: ['Logo Animation', 'Video Intros', 'Social Content']
  }
]

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
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
    <section id="services" className="section bg-forge-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(177, 18, 38, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(177, 18, 38, 0.2) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block text-forge-crimson text-sm font-semibold tracking-widest uppercase mb-4"
          >
            What We Do
          </motion.span>
          <h2 className="section-title">
            Services We
            <span className="text-gradient-crimson"> Forge</span>
          </h2>
          <p className="section-subtitle mx-auto mt-6">
            From concept to creation, we offer comprehensive design services 
            tailored to elevate your brand.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="group relative"
            >
              <div className="relative h-full p-8 bg-forge-black/50 backdrop-blur-sm rounded-2xl border border-white/5 
                transition-all duration-500 hover:border-forge-crimson/30 hover:shadow-crimson overflow-hidden">
                
                {/* Hover Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-forge-crimson/5 via-transparent to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Glow Effect */}
                <motion.div
                  className="absolute -top-20 -right-20 w-40 h-40 bg-forge-crimson/20 rounded-full blur-3xl
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-forge-crimson/10 rounded-2xl flex items-center justify-center
                      transition-all duration-500 group-hover:bg-forge-crimson/20 group-hover:scale-110">
                      <service.icon 
                        size={28} 
                        className="text-forge-crimson transition-transform duration-500 group-hover:scale-110" 
                      />
                    </div>
                    
                    {/* Icon Glow */}
                    <div className="absolute inset-0 w-16 h-16 bg-forge-crimson/30 rounded-2xl blur-xl
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-semibold text-white mb-3 
                    transition-colors duration-300 group-hover:text-forge-crimson">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/50 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 text-xs bg-white/5 text-white/60 rounded-full
                          transition-all duration-300 group-hover:bg-forge-crimson/10 group-hover:text-forge-crimson"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Animated Underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-forge-crimson to-transparent"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-forge-crimson/30 rounded-full
                    transition-all duration-500 group-hover:bg-forge-crimson group-hover:scale-150" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-white/50 mb-6">
            Need something specific? We're flexible and love new challenges.
          </p>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white/20 
              text-white font-heading font-semibold rounded-xl transition-all duration-300
              hover:border-forge-crimson hover:text-forge-crimson"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Discuss Your Project
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
