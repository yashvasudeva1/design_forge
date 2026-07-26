import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import CoverflowGallery from '../components/CoverflowGallery'
import LogoParticle from '../components/LogoParticle'
import SEO from '../components/SEO'

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  'name': 'Design Forge',
  'url': 'https://design-forge-main.vercel.app',
  'logo': 'https://the-design-forge.vercel.app/Graphic%20(11).png',
  'image': 'https://the-design-forge.vercel.app/Graphic%20(11).png',
  'description': 'Design Forge is a Delhi-based design studio specializing in logo design, brand identity systems, UI/UX design, and digital experiences.',
  'telephone': ['+91-9318378900', '+91-9910695553', '+91-8368763677'],
  'email': 'designforge250@gmail.com',
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Delhi',
    'addressCountry': 'IN'
  },
  'priceRange': '$$',
  'areaServed': ['Delhi', 'India', 'Worldwide'],
  'serviceType': ['Visual Identity Design', 'Logo Design', 'Branding', 'UI/UX Design', 'Poster Design', 'Social Media Design'],
  'aggregateRating': {
    '@type': 'AggregateRating',
    'ratingValue': '4.9',
    'reviewCount': '150'
  }
}


const clientLogos = [
  '/logos/1.png',
  '/logos/2.png',
  '/logos/3.png',
  '/logos/4.png',
  '/logos/5.png',
  '/logos/6.png',
]

// ─── Stats ───────────────────────────────────────────────
const stats = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '95%',  label: 'Client Retention' },
  { value: '6+',   label: 'Years Active' },
  { value: '4.5★',   label: 'Average Rating' },
]

// ─── Featured Work (3 items for homepage) ────────────────
const optimizeImage = (url) => url.replace('/upload/', '/upload/f_auto,q_auto,w_800/')

const featuredWork = [
  { id: 1, title: 'Elysium Logo', category: 'Logo Design', image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770141043/Elysium_Logo_1_l5lcjr.png') },
  { id: 2, title: 'Chocworks Menu', category: 'Print Design', image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770142535/Brown_with_Photo_Chocolate_Dessert_Menu_1_iee62s.jpg') },
  { id: 3, title: 'Cirola Pamphlet', category: 'Print Design', image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770141509/Cirola_Front_1_qxbppt.jpg') },
  { id: 4, title: 'Aggarwal Living Banner', category: 'Signage', image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770141643/AGGARWAL_LIVING_cjuq9v.jpg') },
  { id: 5, title: 'T-Shirt Designs', category: 'Branding', image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770141045/tshirt_designs_2_ylervv.png') },
  { id: 6, title: 'Darima Cheese', category: 'Print Design', image: optimizeImage('https://res.cloudinary.com/dfxvrqxkh/image/upload/v1770727329/Darima_1_vqnl6a.jpg') },
]

// ─── Services Teaser ─────────────────────────────────────
const servicesList = [
  { num: '01', name: 'Logo Design',         desc: 'Distinctive marks that define who you are.' },
  { num: '02', name: 'Brand Identity',      desc: 'Complete visual systems for modern brands.' },
  { num: '03', name: 'Social Media',        desc: 'Scroll-stopping content that converts.' },
  { num: '04', name: 'UI/UX Design',        desc: 'Interfaces that feel intuitive and alive.' },
  { num: '05', name: 'Poster & Print',      desc: 'Bold print work that commands attention.' },
  { num: '06', name: 'Design Consultancy',  desc: 'Strategy and direction for your creative vision.' },
]

// ─── Testimonials ─────────────────────────────────────────
const testimonials = [
  {
    id: 1,
    quote: 'Absolutely thrilled with the service. The team was professional, creative and attentive to every detail. They delivered ahead of time.',
    from: 'Client - Branding Project',
  },
  {
    id: 2,
    quote: 'Highly recommend their work to anyone looking for unique and high quality designs. They exceeded every expectation.',
    from: 'Client - Logo Design',
  },
  {
    id: 3,
    quote: "Design Forge doesn't just create designs - they forge experiences. Our rebrand has completely elevated how customers perceive us.",
    from: 'Client - Full Rebrand',
  },
]

const Home = () => {
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroY       = useTransform(scrollYProgress, [0, 0.6], [0, -80])

  return (
    <div>
      <SEO
        title="Design Forge | Visual Identity & Logo Design Studio in Delhi"
        description="Design Forge is a premier Delhi-based design studio crafting iconic logos, brand identity systems, UI/UX designs, and digital experiences."
        keywords="design studio delhi, logo design delhi, brand identity studio delhi, UI UX design studio delhi, visual identity design agency"
        schema={homeSchema}
      />

      {/* ═══════════════════════════════════════════════ */}
      {/* HERO SECTION                                    */}
      {/* ═══════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-black">
        {/* Grid */}
        <div className="grid-overlay opacity-20" />

        {/* Crimson glow orb */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(700px,90vw)] h-[min(700px,90vw)] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(144,26,29,0.12) 0%, transparent 70%)' }}
        />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="container-tight relative z-10 pt-28 pb-20 sm:pt-40 sm:pb-28"
        >
          {/* Two-column hero layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
            {/* Left — headline + CTA */}
            <div className="lg:col-span-7 relative z-10">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
                className="headline-lg text-white mb-6"
              >
                We forge brands<br />
                that <span className="text-forge-crimson">ignite</span><br />
                and endure.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="text-white/40 text-base max-w-md leading-relaxed mb-10"
              >
                Design Forge shapes logos, brand identities, and digital experiences - precise, original work built to last.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap items-center gap-3 sm:gap-4"
              >
                <Link to="/portfolio" className="btn btn-primary">
                  <span>View Work</span>
                  <ArrowRight size={14} />
                </Link>
                <Link to="/contact" className="btn btn-outline">
                  <span>Start a Project</span>
                </Link>
              </motion.div>
            </div>

            {/* Right — Particle Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 hidden lg:flex items-center justify-center self-stretch"
            >
              <LogoParticle
                width="100%"
                height="100%"
                imageConfig={{
                  image: "/Graphic (11).png",
                  mode: "fit",
                  sizeUnit: "%",
                  widthPct: 100,
                  heightPct: 100,
                  scale: 11,
                }}
                particleCount={180}
                particleSize={3}
                particleShape="circle"
                particleColor="original"
                hoverEnabled={false}
                repulsionEnabled={true}
                repulsionConfig={{
                  repulsionForce: 8,
                  repulsionRadius: 60,
                  repulsionMode: "outside"
                }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="label text-white/20">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown size={14} className="text-white/20" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* MARQUEE                                         */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="border-y border-white/5 py-10 overflow-hidden bg-forge-dark">
        <div className="marquee-wrapper">
          <div className="marquee-track flex items-center gap-16 md:gap-24">
            {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((logo, i) => (
              <img
                key={i}
                src={logo}
                alt="Client Logo"
                className="h-14 md:h-20 w-auto object-contain opacity-40 hover:opacity-100 transition-opacity duration-300 mx-8 filter grayscale hover:grayscale-0"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* STATS                                           */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="bg-black border-b border-white/5">
        <div className="container-tight">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`py-8 px-4 sm:py-14 sm:px-8 ${i % 2 === 0 ? 'border-r border-white/5' : ''} ${i < 2 ? 'border-b lg:border-b-0 border-white/5' : ''}`}
              >
                <div className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/30 text-[10px] sm:text-xs uppercase tracking-widest font-mono">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* FEATURED WORK                                   */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="bg-black py-24 md:py-32">
        <div className="container-tight">
          {/* Header */}
          <div className="flex items-end justify-between mb-16">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-6 h-px bg-forge-crimson" />
                <span className="label">Selected Work</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="headline-lg text-white"
              >
                Featured<br />Projects
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link to="/portfolio" className="border border-white/10 hover:border-forge-crimson text-white text-[10px] sm:text-xs font-mono uppercase tracking-widest px-4 py-3 flex items-center justify-center gap-2 transition-colors rounded-sm text-center leading-none">
                <span>View All</span>
                <ArrowRight size={13} />
              </Link>
            </motion.div>
          </div>

          {/* Coverflow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 w-full mt-4 h-[350px] md:h-[500px]"
          >
            <CoverflowGallery
              slides={featuredWork}
              cardWidth={420}
              cardHeight={420}
              radius={3}
              tilt={12}
              sideTilt={8}
              gap={8}
              opacity={60}
              autoplay={false}
              showTitle={true}
              titleColor="#ffffff"
              onSlideClick={() => navigate('/portfolio')}
              transition={{ duration: 0.6, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          <div className="text-center mt-6">
            <p className="text-white/20 text-xs font-mono tracking-widest">
              ← SWIPE OR ARROW KEYS → &nbsp;&nbsp;|&nbsp;&nbsp; CLICK TO VIEW DETAILS
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SERVICES TEASER                                 */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="bg-forge-dark border-t border-white/5 py-24 md:py-32">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Left label */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-6 h-px bg-forge-crimson" />
                <span className="label">What We Do</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="headline-md text-white mb-6"
              >
                Services We<br />
                <span className="text-forge-crimson">Forge</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/40 text-sm leading-relaxed mb-10"
              >
                From concept to creation, comprehensive design services tailored to elevate your brand.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link to="/services" className="btn btn-primary">
                  <span>All Services</span>
                  <ArrowRight size={13} />
                </Link>
              </motion.div>
            </div>

            {/* Right - service list */}
            <div className="lg:col-span-8">
              {servicesList.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="service-row group"
                >
                  <Link to="/services" className="flex items-center justify-between py-5 px-1">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-display text-base font-semibold text-white/80 group-hover:text-white transition-colors">
                          {s.name}
                        </h3>
                        <p className="text-white/30 text-xs mt-0.5 group-hover:text-white/50 transition-colors">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-white/20 group-hover:text-forge-crimson group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* TESTIMONIALS                                    */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="bg-black border-t border-white/5 py-24 md:py-32 overflow-hidden">
        <div className="container-tight">
          {/* Sparse label — no dash+line decoration to break the repeated pattern */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <span className="label">Client Voices</span>
          </motion.div>

          {/* Asymmetric: one dominant featured quote + two secondary stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

            {/* Featured quote — thicker crimson top border, display-weight type */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="lg:col-span-7 border-t-2 border-forge-crimson pt-10"
            >
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, si) => (
                  <span key={si} className="text-forge-crimson text-base">★</span>
                ))}
              </div>
              <blockquote className="font-display text-xl sm:text-2xl font-medium italic text-white leading-relaxed mb-8">
                &ldquo;{testimonials[0].quote}&rdquo;
              </blockquote>
              <p className="font-mono text-xs text-forge-crimson tracking-widest uppercase">{testimonials[0].from}</p>
            </motion.div>

            {/* Two secondary quotes — smaller, italic, dimmer */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 flex flex-col gap-10 pt-0 lg:pt-10"
            >
              {testimonials.slice(1).map((t, i) => (
                <div key={t.id} className="border-t border-white/10 pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, si) => (
                      <span key={si} className="text-forge-crimson text-xs">★</span>
                    ))}
                  </div>
                  <blockquote className="text-white/50 text-sm leading-relaxed mb-4 italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <p className="font-mono text-xs text-white/25 tracking-widest uppercase">{t.from}</p>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* CTA SECTION                                     */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="bg-forge-crimson relative overflow-hidden py-24 md:py-32">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="container-tight relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

            {/* Left — large headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="lg:col-span-7"
            >
              <h2 className="headline-lg text-white">
                Ready to forge<br />your brand?
              </h2>
            </motion.div>

            {/* Right — copy + CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-5 flex flex-col items-start gap-8"
            >
              <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                Let's transform your vision into a visual identity that endures.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-black text-white btn text-sm px-10 py-4 hover:bg-forge-dark transition-colors"
              >
                <span>Start a Project</span>
                <ArrowRight size={14} />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
