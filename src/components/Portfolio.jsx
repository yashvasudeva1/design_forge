import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const categories = ['All', 'Branding', 'Logos', 'Digital', 'Print']

const projects = [
  {
    id: 1,
    title: 'Menu',
    category: 'Print',
    image: '/portfolio/Brown with Photo Chocolate Dessert Menu.jpg',
    description: 'Elegant menu design for chocolate desserts',
    height: 'min-h-[400px]'
  },
  {
    id: 2,
    title: 'Story Design',
    category: 'Digital',
    image: '/portfolio/Copy of DSA (Your Story).jpg',
    description: 'Creative story design for social media',
    height: 'min-h-[500px]'
  },
  {
    id: 3,
    title: 'Posters',
    category: 'Print',
    image: '/portfolio/Peace (1).jpg',
    description: 'Creative poster design collection',
    height: 'min-h-[350px]'
  },
  {
    id: 4,
    title: 'Wedding Invitation',
    category: 'Print',
    image: '/portfolio/Purple and Green Floral Illustrated Indian Wedding Ceremony Invitation.jpg',
    description: 'Floral illustrated Indian wedding ceremony invitation',
    height: 'min-h-[450px]'
  },
  {
    id: 5,
    title: 'T-Shirt Designs',
    category: 'Branding',
    image: '/portfolio/tshirt designs (2).png',
    description: 'Creative t-shirt design collection',
    height: 'min-h-[350px]'
  },
  {
    id: 6,
    title: 'Minimalist Post',
    category: 'Digital',
    image: '/portfolio/Untitled design (17).jpg',
    description: 'Modern minimalist post design',
    height: 'min-h-[350px]'
  },
  {
    id: 7,
    title: 'Personalised Gifts',
    category: 'Branding',
    image: '/portfolio/Untitled design (19).jpg',
    description: 'Custom personalised gift designs',
    height: 'min-h-[350px]'
  },
  {
    id: 8,
    title: 'Logo Design',
    category: 'Logos',
    image: '/portfolio/Elysium Logo (1).png',
    description: 'Professional logo design',
    height: 'min-h-[300px]'
  },
  {
    id: 9,
    title: 'Research Poster',
    category: 'Print',
    image: '/portfolio/Orange Blue and Yellow Minimal Geometry Landscape University Research Poster.jpg',
    description: 'University research poster design',
    height: 'min-h-[400px]'
  },
  {
    id: 10,
    title: 'Attractive Pamphlets',
    category: 'Print',
    image: '/portfolio/Cirola Front.jpg',
    description: 'Eye-catching pamphlet designs',
    height: 'min-h-[400px]'
  },
  {
    id: 11,
    title: 'Banners & Boards',
    category: 'Print',
    image: '/portfolio/AGGARWAL LIVING.jpg',
    description: 'Professional banners and boards design',
    height: 'min-h-[350px]'
  }
]

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All')

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="portfolio" className="section bg-forge-black relative">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-forge-crimson/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-forge-crimson/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block text-forge-crimson text-sm font-semibold tracking-widest uppercase mb-4"
          >
            Our Work
          </motion.span>
          <h2 className="section-title">
            Featured
            <span className="text-gradient-crimson"> Projects</span>
          </h2>
          <p className="section-subtitle mx-auto mt-6">
            A selection of our finest work across various industries and design disciplines.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                ${activeFilter === category 
                  ? 'bg-forge-crimson text-white shadow-crimson' 
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid - Masonry Style */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative"
              >
                <div className={`relative h-full ${project.height || 'min-h-[300px]'} rounded-2xl overflow-hidden bg-forge-dark`}>
                  {/* Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forge-black via-forge-black/50 to-transparent 
                    opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Crimson Overlay on Hover */}
                  <div className="absolute inset-0 bg-forge-crimson/20 opacity-0 group-hover:opacity-100 
                    transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    {/* Category */}
                    <span className="inline-block px-3 py-1 bg-forge-crimson/80 text-white text-xs font-medium 
                      rounded-full w-fit mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 
                      transform translate-y-4 group-hover:translate-y-0">
                      {project.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-2 
                      transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 
                      transition-all duration-300 delay-100 transform translate-y-4 group-hover:translate-y-0">
                      {project.description}
                    </p>
                  </div>

                  {/* Border Glow */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent 
                    group-hover:border-forge-crimson/50 transition-colors duration-500" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio
