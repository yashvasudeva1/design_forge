import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import MagneticCarousel from '../components/MagneticCarousel'
import SEO from '../components/SEO'

const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  'name': 'Design Forge Work & Portfolio',
  'url': 'https://design-forge-main.vercel.app/portfolio',
  'description': 'Explore Design Forge portfolio showcasing iconic logo designs, brand identity systems, UI/UX designs, and print collateral crafted in Delhi.'
}

const optimizeImage = (url) => url.replace('/upload/', '/upload/f_auto,q_auto,w_700/')

const categories = ['All', 'Branding', 'Logos', 'Digital', 'Print', 'Certificates']

const projects = [
  { id: 1,  title: 'Chocworks Menu',        category: 'Print',        image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770142535/Brown_with_Photo_Chocolate_Dessert_Menu_1_iee62s.jpg'),  client: 'Chocworks', duration: '1 week', desc: 'Warm, indulgent menu design with rich brown tones to evoke chocolate luxury.', what: ['Custom layout with food photography','Warm color palette reflecting the brand','Print-ready files with bleed/trim marks','Visual hierarchy for easy navigation'] },
  { id: 2,  title: 'Story Design',           category: 'Digital',      image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1772371218/Untitled_design_23_t4txfw.jpg'),                              client: 'Elysium',   duration: '2 days', desc: 'Bold Instagram story templates with engaging visual hierarchy.', what: ['Social-first visual design','Brand color consistency','Multiple size exports','Engagement-optimized layouts'] },
  { id: 3,  title: 'Peace Poster',           category: 'Print',        image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770141057/Peace_1_qge5wo.jpg'),                                          client: 'Various',   duration: '2 days', desc: 'High-impact poster with bold typography and striking composition.', what: ['Conceptual visual narrative','Balanced typography/imagery','Emotion-driven color palette','High-res print output'] },
  { id: 4,  title: 'Wedding Invitation',     category: 'Print',        image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770141510/Purple_and_Green_Floral_Illustrated_Indian_Wedding_Ceremony_Invitation_2_qoiprn.jpg'), client: 'Private',  duration: '1 week', desc: 'Floral illustrated invitation suite for an elegant Indian wedding ceremony.', what: ['Hand-illustrated floral elements','Multi-page invitation suite','Digital + print versions','Elegant typography system'] },
  { id: 5,  title: 'T-Shirt Designs',        category: 'Branding',     image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770141045/tshirt_designs_2_ylervv.png'),                                  client: 'Namespace BPIT', duration: '1 week', desc: 'Original streetwear artwork for a tech community collective.', what: ['Original vector illustrations','Screen-print ready files','Multiple colorways','DTG print specifications'] },
  { id: 6,  title: 'Minimalist Post',        category: 'Digital',      image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770141044/Untitled_design_17_umjsaa.jpg'),                                client: 'Opticlick', duration: '3 days', desc: 'Clean, minimal social content with intentional white space and sharp type.', what: ['Minimal design system','Consistent brand voice','Instagram feed optimization','White space-led compositions'] },
  { id: 7,  title: 'Personalised Gifts',     category: 'Branding',     image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770142411/Untitled_design_19_1_ka19lb.jpg'),                              client: 'Various',   duration: '1 day',  desc: 'Custom gift designs for mugs, frames, and personal merchandise.', what: ['Custom illustrations','Photo integration','Multiple merchandise types','Print-ready output'] },
  { id: 8,  title: 'Elysium Logo',           category: 'Logos',        image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770141043/Elysium_Logo_1_l5lcjr.png'),                                    client: 'Elysium',   duration: '1 week', desc: 'Swiss-discipline logo system with industrial clarity and modern appeal.', what: ['Brand discovery session','Multiple concepts refined','Scalable vector mark','Complete brand guidelines'] },
  { id: 9,  title: 'Research Poster',        category: 'Print',        image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770141054/Orange_Blue_and_Yellow_Minimal_Geometry_Landscape_University_Research_Poster_z9rcfh.jpg'), client: 'College Research', duration: '5 days', desc: 'Academic research poster with clear visual hierarchy for complex data.', what: ['Data visualization','Geometric design elements','Academic structure','Large-format print prep'] },
  { id: 10, title: 'Cirola Pamphlet',        category: 'Print',        image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770141509/Cirola_Front_1_qxbppt.jpg'),                                    client: 'Cirola',    duration: '4 days', desc: 'Eye-catching pamphlet with compelling visual flow and brand consistency.', what: ['Strong visual narrative','Brand element integration','Product photography','Print-ready folds & bleeds'] },
  { id: 11, title: 'Aggarwal Living Banner', category: 'Print',        image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770141643/AGGARWAL_LIVING_cjuq9v.jpg'),                                   client: 'Aggarwal Living', duration: '3 days', desc: 'Large-format signage with bold typography and high visual impact.', what: ['Large-format signage design','Distance-readable typography','Multiple banner sizes','High-res outdoor print files'] },
  { id: 12, title: 'Darima Cheese',          category: 'Print',        image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770727329/Darima_1_vqnl6a.jpg'),                                          client: 'Darima',    duration: '1 week', desc: 'Comprehensive pamphlet designs reflecting premium brand values.', what: ['Full pamphlet design system','Color & type system','Visual brand alignment','Print delivery'] },
  { id: 13, title: 'Modern Logo',            category: 'Logos',        image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1772372770/Untitled_design_6_avq1dq.png'),                                  client: 'Various',   duration: '4 days', desc: 'Clean, scalable logo mark with contemporary aesthetic.', what: ['Multiple concept variations','Scalable vector mark','Brand guidelines','All file formats'] },
  { id: 14, title: 'Brand Identity Logo',    category: 'Logos',        image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1772373817/Untitled_design_7_epi36j.png'),                                  client: 'Corporate', duration: '5 days', desc: 'Professional brand identity logo with versatile application system.', what: ['Distinctive identity mark','Logo variations','Color palette','Brand guidelines document'] },
  { id: 15, title: 'Oh Wow Gifts Logo',      category: 'Logos',        image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1772372786/7_afa8xi.png'),                                                  client: 'Startup',   duration: '3 days', desc: 'Playful yet distinctive logo for a personalized gifting brand.', what: ['Unique visual identity','Memorable mark','Scalable across mediums','Multiple file formats'] },
  { id: 16, title: 'Appreciation Cert.',    category: 'Certificates', image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1772372770/Gold_Elegant_Appreciation_Certificate_1_eka2aw.jpg'),             client: 'WCMS',      duration: '2 days', desc: 'Gold-themed elegant certificate design with premium typography.', what: ['Gold design elements','Professional typography','Decorative borders','Print-ready format'] },
  { id: 17, title: 'College Certificate',   category: 'Certificates', image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1772372770/WORLD_COLLEGE_OF_MEDICAL_SCIENCE_ag08sm.jpg'),                    client: 'WCMS',      duration: '3 days', desc: 'Official institutional certificate with formal academic branding.', what: ['Institutional branding','Formal professional layout','Print quality specs','Official mark integration'] },
  { id: 18, title: 'APIs Explained',         category: 'Digital',      image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1772372776/APIs_Explained_Simply_7_mu1zbs.jpg'),                            client: 'Namespace BPIT', duration: '1 day', desc: 'Educational Instagram content simplifying complex tech concepts visually.', what: ['Technical content design','Visual explanation layouts','Platform-optimized sizing','Engagement-focused design'] },
  { id: 19, title: 'Branding Mistakes Post', category: 'Digital',     image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1772372785/Blue_Modern_Branding_Mistakes_Instagram_Post_e2fnue.jpg'),        client: 'Namespace BPIT', duration: '1 day', desc: 'Modern informational social post highlighting branding pitfalls.', what: ['Educational content design','Modern visual language','Strong type hierarchy','Social sharing optimization'] },
  { id: 20, title: 'Education Poster',       category: 'Print',        image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1772372772/tips_to_tackle_lack_of_education_zvpwkq.jpg'),                   client: 'S.D. Public School', duration: '2 days', desc: 'Awareness poster with compelling hierarchy and clear messaging.', what: ['Impactful awareness design','Clear message hierarchy','Compelling visual layout','High-res print output'] },
  { id: 21, title: 'Abstract Poster I',      category: 'Print',        image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1772886346/2_d8tjok.jpg'),                                                   client: 'Personal',  duration: '1 day', desc: 'Experimental abstract poster exploring color and composition.', what: ['Abstract visual concepts','Color gradient exploration','Artistic typography','Print-ready files'] },
  { id: 22, title: 'Abstract Poster II',     category: 'Print',        image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1772886350/7_i5eg9v.jpg'),                                                   client: 'Personal',  duration: '1 day', desc: 'Bold geometric and organic forms with high contrast color.', what: ['Bold abstract compositions','Geometric/organic forms','Eye-catching contrasts','Scalable vector artwork'] },
  { id: 23, title: 'Abstract Poster III',    category: 'Print',        image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1772886353/8_gt73uf.jpg'),                                                   client: 'Personal',  duration: '1 day', desc: 'Contemporary abstract design blending art styles with graphic discipline.', what: ['Striking abstract design','Contemporary art fusion','Unique visual language','Multi-format output'] },
  { id: 24, title: 'Abstract Poster IV',     category: 'Print',        image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1772886355/3_if3tus.jpg'),                                                   client: 'Personal',  duration: '1 day', desc: 'Minimalist abstract with intentional negative space and bold elements.', what: ['Minimalist aesthetics','Intentional negative space','Balanced bold compositions','Digital & print export'] },
  { id: 25, title: 'Abstract Poster V',      category: 'Print',        image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1772886357/4_xsrpfs.jpg'),                                                   client: 'Personal',  duration: '1 day', desc: 'Expressive abstract with texture, color theory, and artistic statement.', what: ['Expressive abstract visuals','Texture & color theory','Cohesive artistic statement','High-quality print output'] },
]

// Featured projects for the coverflow (pick the best visuals)
const featuredSlides = [
  { image: projects[7].image,  title: 'Elysium Logo',           category: 'Logos',    projectIndex: 7 },
  { image: projects[0].image,  title: 'Chocworks Menu',         category: 'Print',    projectIndex: 0 },
  { image: projects[9].image,  title: 'Cirola Pamphlet',        category: 'Print',    projectIndex: 9 },
  { image: projects[10].image, title: 'Aggarwal Living Banner', category: 'Print',    projectIndex: 10 },
  { image: projects[4].image,  title: 'T-Shirt Designs',        category: 'Branding', projectIndex: 4 },
  { image: projects[11].image, title: 'Darima Cheese',          category: 'Print',    projectIndex: 11 },
  { image: projects[2].image,  title: 'Peace Poster',           category: 'Print',    projectIndex: 2 },
  { image: projects[14].image, title: 'Oh Wow Gifts Logo',      category: 'Logos',    projectIndex: 14 },
]

// ─── Project Modal ─────────────────────────────────────────
const ProjectModal = ({ project, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-forge-dark border border-white/10"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center bg-black/60 text-white hover:text-forge-crimson transition-colors"
      >
        <X size={18} />
      </button>

      <div className="grid md:grid-cols-2">
        {/* Image */}
        <div className="relative bg-black flex items-center justify-center min-h-[200px] md:min-h-[300px]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto max-h-[350px] md:max-h-[500px] object-contain"
          />
        </div>

        {/* Info */}
        <div className="p-6 md:p-10">
          <span className="label mb-3 block">{project.category}</span>
          <h2 className="font-display text-xl md:text-3xl font-bold text-white mb-2">{project.title}</h2>
          <p className="text-white/50 text-xs sm:text-sm mb-6">{project.desc}</p>

          <div className="flex gap-6 mb-8 text-sm">
            <div>
              <span className="text-white/30 text-xs font-mono uppercase tracking-widest block mb-1">Client</span>
              <span className="text-white">{project.client}</span>
            </div>
            <div>
              <span className="text-white/30 text-xs font-mono uppercase tracking-widest block mb-1">Duration</span>
              <span className="text-white">{project.duration}</span>
            </div>
          </div>

          <div>
            <span className="text-forge-crimson text-xs font-mono uppercase tracking-widest block mb-4">What I Did</span>
            <ul className="space-y-3">
              {project.what.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/50">
                  <span className="w-1 h-1 rounded-full bg-forge-crimson mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
)

// ─── Main Portfolio Page ────────────────────────────────────
const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter)
  const displayed = showAll ? filtered : filtered.slice(0, 9)
  const hasMore = filtered.length > 9

  const carouselImages = displayed.map(p => ({
    src: p.image,
    title: p.title,
    category: p.category,
    originalId: p.id
  }))

  return (
    <div className="bg-black">
      <SEO
        title="Portfolio & Case Studies | Logo & Brand Identity Work - Design Forge"
        description="Browse selected projects by Design Forge: Logo design, branding suites, UI/UX interfaces, social media graphics, and print collateral created in Delhi."
        keywords="design forge portfolio, logo design showcase, brand identity case studies, delhi design agency work, graphic design examples"
        schema={portfolioSchema}
      />

      {/* ═══════════════════════════════════════════════════ */}
      {/* 3D COVERFLOW SHOWCASE                               */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="pt-32 pb-8 relative overflow-hidden bg-black">
        <div className="grid-overlay opacity-15" />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at 100% 0%, rgba(144,26,29,0.1) 0%, transparent 60%)' }}
        />

        <div className="container-tight relative z-10 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-6 h-px bg-forge-crimson" />
            <span className="label">Our Work</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <div>
              <div className="overflow-hidden mb-3">
                <motion.h1
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                  className="headline-lg text-white"
                >
                  All <span className="text-forge-crimson">Projects.</span>
                </motion.h1>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/40 text-base leading-relaxed max-w-lg"
            >
              Hover to expand a project and click to explore the details. This is just the surface.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="py-4 sm:py-6 bg-forge-dark border-y border-white/5 sticky top-20 z-30">
        <div className="container-tight">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 flex-1">
              {categories.map(cat => (
                <motion.button
                  key={cat}
                  onClick={() => { setActiveFilter(cat); setShowAll(false) }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex-shrink-0 px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all duration-300 border ${
                    activeFilter === cat
                      ? 'bg-forge-crimson text-white border-forge-crimson'
                      : 'bg-transparent text-white/40 border-white/10 hover:text-white hover:border-white/30'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
            <span className="text-white/20 text-xs font-mono hidden md:block flex-shrink-0">
              {filtered.length} project{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </section>

      {/* Magnetic Carousel Showcase */}
      <section className="py-12 bg-black" ref={ref}>
        <div className="w-full h-[380px] md:h-[600px] overflow-y-visible">
          <MagneticCarousel
            images={carouselImages}
            onImageClick={(img) => {
              const project = projects.find(p => p.id === img.originalId);
              if (project) setSelected(project);
            }}
          />
        </div>

        {/* View More */}
        {!showAll && hasMore && (
          <div className="mt-16 text-center">
            <motion.button
              onClick={() => setShowAll(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-outline"
            >
              <span>Load More - {filtered.length - 9} Remaining</span>
            </motion.button>
          </div>
        )}

        <p className="text-center text-white/20 text-xs font-mono tracking-widest uppercase mt-16">
          This is just the tip of the iceberg
        </p>
      </section>

      {/* ─── MODAL ────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Portfolio
