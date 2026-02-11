import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const categories = ['All', 'Branding', 'Logos', 'Digital', 'Print']

// Cloudinary optimization: auto format, quality, and resize
const optimizeImage = (url) => {
  return url.replace('/upload/', '/upload/f_auto,q_auto,w_600/')
}

const projects = [
  {
    id: 1,
    title: 'Menu',
    category: 'Print',
    image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770142535/Brown_with_Photo_Chocolate_Dessert_Menu_1_iee62s.jpg'),
    description: 'Elegant menu design for chocolate desserts',
    height: 'min-h-[400px]',
    details: {
      client: 'Chocworks',
      duration: '1 week',
      whatIDid: [
        'Designed a warm, inviting layout with rich brown tones to evoke chocolate indulgence',
        'Created custom food photography compositions and styling',
        'Developed hierarchy for easy menu navigation',
        'Designed print-ready files with bleed and trim marks'
      ]
    }
  },
  {
    id: 2,
    title: 'Story Design',
    category: 'Digital',
    image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770141058/Copy_of_DSA_Your_Story_xmgjeg.jpg'),
    description: 'Creative story design for social media',
    height: 'min-h-[500px]',
    details: {
      client: 'Namespace BPIT',
      duration: '2 days',
      whatIDid: [
        'Created engaging Instagram story templates with bold typography',
        'Designed attention-grabbing visual hierarchy for mobile viewing',
        'Incorporated brand colors and consistent styling elements',
        'Optimized dimensions for multiple social platforms'
      ]
    }
  },
  {
    id: 3,
    title: 'Posters',
    category: 'Print',
    image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770141057/Peace_1_qge5wo.jpg'),
    description: 'Creative poster design collection',
    height: 'min-h-[350px]',
    details: {
      client: 'Various Clients',
      duration: '2 days',
      whatIDid: [
        'Conceptualized unique visual narratives for each poster theme',
        'Created striking compositions with balanced typography and imagery',
        'Developed color palettes that evoke specific emotions',
        'Prepared high-resolution files for large-format printing'
      ]
    }
  },
  {
    id: 4,
    title: 'Wedding Invitation',
    category: 'Print',
    image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770141510/Purple_and_Green_Floral_Illustrated_Indian_Wedding_Ceremony_Invitation_2_qoiprn.jpg'),
    description: 'Floral illustrated Indian wedding ceremony invitation',
    height: 'min-h-[450px]',
    details: {
      client: 'Private Client',
      duration: '1 week',
      whatIDid: [
        'Hand-illustrated custom floral elements inspired by Indian motifs',
        'Developed elegant purple and green color scheme per client brief',
        'Designed multi-page invitation suite with RSVP and details cards',
        'Created both digital and print-ready versions'
      ]
    }
  },
  {
    id: 5,
    title: 'T-Shirt Designs',
    category: 'Branding',
    image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770141045/tshirt_designs_2_ylervv.png'),
    description: 'Creative t-shirt design collection',
    height: 'min-h-[350px]',
    details: {
      client: 'Namespace BPIT',
      duration: '1 week',
      whatIDid: [
        'Created original artwork and graphics for streetwear collection',
        'Designed vector-based illustrations for clean print output',
        'Developed mockups to visualize designs on various shirt colors',
        'Prepared print-ready files for screen printing and DTG'
      ]
    }
  },
  {
    id: 6,
    title: 'Minimalist Post',
    category: 'Digital',
    image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770141044/Untitled_design_17_umjsaa.jpg'),
    description: 'Modern minimalist post design',
    height: 'min-h-[350px]',
    details: {
      client: 'Opticlick',
      duration: '3 days',
      whatIDid: [
        'Designed clean, modern social media templates with ample white space',
        'Created cohesive visual identity with minimal color palette',
        'Developed typography system for brand consistency',
        'Optimized designs for Instagram feed aesthetics'
      ]
    }
  },
  {
    id: 7,
    title: 'Personalised Gifts',
    category: 'Branding',
    image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770142411/Untitled_design_19_1_ka19lb.jpg'),
    description: 'Custom personalised gift designs',
    height: 'min-h-[350px]',
    details: {
      client: 'Various Clients',
      duration: '1 day',
      whatIDid: [
        'Created custom illustrations and designs for personalized gifts',
        'Developed artwork for mugs, frames, and merchandise',
        'Incorporated personal photos and messages into designs',
        'Prepared files for various printing methods and materials'
      ]
    }
  },
  {
    id: 8,
    title: 'Logo Design',
    category: 'Logos',
    image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770141043/Elysium_Logo_1_l5lcjr.png'),
    description: 'Professional logo design',
    height: 'min-h-[300px]',
    details: {
      client: 'Elysium',
      duration: '1 week',
      whatIDid: [
        'Conducted brand discovery session to understand client vision',
        'Sketched multiple concepts and refined top directions',
        'Developed final vector logo with scalable components',
        'Created brand guidelines with color codes and usage rules'
      ]
    }
  },
  {
    id: 9,
    title: 'Research Poster',
    category: 'Print',
    image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770141054/Orange_Blue_and_Yellow_Minimal_Geometry_Landscape_University_Research_Poster_z9rcfh.jpg'),
    description: 'College research poster design',
    height: 'min-h-[400px]',
    details: {
      client: 'College Research Team',
      duration: '5 days',
      whatIDid: [
        'Designed clear visual hierarchy for complex research data',
        'Created geometric design elements with modern color palette',
        'Developed infographics and data visualization components',
        'Ensured readability and structure for academic presentation'
      ]
    }
  },
  {
    id: 10,
    title: 'Attractive Pamphlets',
    category: 'Print',
    image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770141509/Cirola_Front_1_qxbppt.jpg'),
    description: 'Eye-catching pamphlet designs',
    height: 'min-h-[400px]',
    details: {
      client: 'Cirola',
      duration: '4 days',
      whatIDid: [
        'Designed pamphlets with compelling visual flow',
        'Created engaging layouts that guide reader through information',
        'Incorporated brand elements and product photography',
        'Prepared print-ready files with proper folds and bleeds'
      ]
    }
  },
  {
    id: 11,
    title: 'Banners & Boards',
    category: 'Print',
    image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770141643/AGGARWAL_LIVING_cjuq9v.jpg'),
    description: 'Professional banners and boards design',
    height: 'min-h-[350px]',
    details: {
      client: 'Aggarwal Living',
      duration: '3 days',
      whatIDid: [
        'Designed large-format signage with high visual impact',
        'Created bold typography readable from distance',
        'Developed cohesive brand presence across multiple banner sizes',
        'Prepared high-resolution files for outdoor printing'
      ]
    }
  },
  {
    id: 12,
    title: 'Darima Cheese',
    category: 'Print',
    image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770727329/Darima_1_vqnl6a.jpg'),
    description: 'Pamphlet design for Darima Cheese',
    height: 'min-h-[400px]',
    details: {
      client: 'Darima',
      duration: '1 week',
      whatIDid: [
        'Developed comprehensive pamphlet designs from scratch',
        'Created compeling designs and visual elements reflecting brand values',
        'Designed cohesive color palette and typography system',
        'Delivered brand guidelines for consistent application'
      ]
    }
  }
]

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

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
                className="group relative cursor-pointer"
                onClick={() => setSelectedProject(project)}
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

                    {/* Click hint */}
                    <span className="text-forge-crimson text-xs mt-3 opacity-0 group-hover:opacity-100 
                      transition-all duration-300 delay-150 transform translate-y-4 group-hover:translate-y-0">
                      Click to view details →
                    </span>
                  </div>

                  {/* Border Glow */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent 
                    group-hover:border-forge-crimson/50 transition-colors duration-500" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Tip of the iceberg tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-white/50 text-sm md:text-base italic">
            This is just the tip of the iceberg - there's so much more where this came from 
          </p>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-forge-dark rounded-2xl 
                border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center 
                  bg-forge-black/80 hover:bg-forge-crimson rounded-full transition-colors duration-300"
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Content */}
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-64 md:h-full min-h-[300px]">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-forge-dark via-transparent to-transparent" />
                </div>

                {/* Details Section */}
                <div className="p-6 md:p-8">
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 bg-forge-crimson/20 text-forge-crimson text-xs 
                    font-semibold rounded-full mb-4">
                    {selectedProject.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
                    {selectedProject.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 mb-6">
                    {selectedProject.description}
                  </p>

                  {/* Project Info */}
                  {selectedProject.details && (
                    <div className="space-y-4">
                      {/* Client & Duration */}
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="text-white/50">Client:</span>
                          <span className="text-white ml-2">{selectedProject.details.client}</span>
                        </div>
                        <div>
                          <span className="text-white/50">Duration:</span>
                          <span className="text-white ml-2">{selectedProject.details.duration}</span>
                        </div>
                      </div>

                      {/* Tools */}
                      {selectedProject.details.tools && selectedProject.details.tools.length > 0 && (
                        <div>
                          <span className="text-white/50 text-sm">Tools Used:</span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {selectedProject.details.tools.map((tool, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-white/5 text-white/80 text-xs rounded-full 
                                  border border-white/10"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* What I Did */}
                      <div>
                        <span className="text-forge-crimson text-sm font-semibold">What I Did:</span>
                        <ul className="mt-3 space-y-2">
                          {selectedProject.details.whatIDid.map((item, index) => (
                            <li key={index} className="flex items-start gap-3 text-sm text-white/70">
                              <span className="w-1.5 h-1.5 bg-forge-crimson rounded-full mt-2 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Portfolio
