import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Target, Lightbulb, Award, Heart } from 'lucide-react'
import SEO from '../components/SEO'

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  'name': 'About Design Forge Studio',
  'url': 'https://design-forge-main.vercel.app/about',
  'description': 'Learn about Design Forge - a Delhi-based creative studio driven by 6+ years of expertise in visual identity, logo design, and brand craftsmanship.',
  'mainEntity': {
    '@type': 'Organization',
    'name': 'Design Forge',
    'url': 'https://design-forge-main.vercel.app',
    'foundingDate': '2020',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Delhi',
      'addressCountry': 'IN'
    }
  }
}

const values = [
  {
    icon: Target,
    num: '01',
    title: 'Mission',
    desc: 'To forge meaningful visual identities that empower brands to stand out, connect authentically, and leave lasting impressions.',
  },
  {
    icon: Lightbulb,
    num: '02',
    title: 'Philosophy',
    desc: 'Great design emerges from the fusion of creative fire and disciplined precision. Every pixel is intentional, every choice deliberate.',
  },
  {
    icon: Award,
    num: '03',
    title: 'Approach',
    desc: 'We dive deep into your brand\'s essence, understanding your vision before crafting solutions that are both stunning and strategic.',
  },
  {
    icon: Heart,
    num: '04',
    title: 'Commitment',
    desc: 'Excellence is non-negotiable. We pour passion into every project, ensuring each deliverable exceeds your expectations.',
  },
]

const process = [
  { num: '01', title: 'Research',  desc: 'Brand audit, market analysis, competitor research.' },
  { num: '02', title: 'Sketch',    desc: 'Rapid ideation, mood boards, concept exploration.' },
  { num: '03', title: 'Forge',     desc: 'Precision crafting, digital refinement, color systems.' },
  { num: '04', title: 'Polish',    desc: 'Iteration, client review, quality assurance.' },
  { num: '05', title: 'Deliver',   desc: 'Final files, brand guidelines, ongoing support.' },
]

const About = () => {
  return (
    <div className="bg-black">
      <SEO
        title="About Us | Design Forge - Creative Studio in Delhi"
        description="Learn about Design Forge: Delhi's visual identity studio. 6+ years of crafting iconic brand identities, logos, and UI/UX experiences."
        keywords="about design forge, delhi design studio team, brand designers delhi, logo designer profile, visual identity agency india"
        schema={aboutSchema}
      />

      {/* ── PAGE HEADER ─────────────────────────────────── */}
      <section className="pt-36 pb-20 relative overflow-hidden border-b border-white/5">
        <div className="grid-overlay opacity-15" />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(144,26,29,0.08) 0%, transparent 70%)' }}
        />
        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-6 h-px bg-forge-crimson" />
            <span className="label">About Design Forge</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <div className="overflow-hidden mb-4">
                <motion.h1
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                  className="headline-lg text-white"
                >
                  Where Fire <span className="text-forge-crimson">Meets Precision.</span>
                </motion.h1>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <p className="text-white/50 text-base leading-relaxed mb-6">
                Design Forge was born from a simple belief: great design is forged, not found. Like skilled blacksmiths transforming raw metal into refined masterpieces, we take your ideas and shape them into powerful visual identities.
              </p>
              <p className="text-white/50 text-base leading-relaxed">
                Our team combines artistic vision with strategic thinking, ensuring every project we undertake is not just beautiful, but effective. We don't just design - we forge brands that stand the test of time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── LOGO VISUAL + STATS ─────────────────────────── */}
      <section className="py-24 border-b border-white/5 bg-forge-dark">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative pb-6 sm:pb-8"
            >
              <div className="aspect-square relative overflow-hidden bg-forge-gray border border-white/5">
                <img
                  src="/chatgpt_image.png"
                  alt="Design Forge Artwork"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
              {/* Year badge */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-forge-crimson px-4 py-3 sm:px-6 sm:py-4">
                <div className="font-display text-2xl sm:text-3xl font-bold text-white">6+</div>
                <div className="text-white/70 text-xs uppercase tracking-widest font-mono">Years Active</div>
              </div>
            </motion.div>

            {/* Stats + copy */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="headline-md text-white mb-8">
                Crafting Excellence<br />
                <span className="text-forge-crimson">Since Day One</span>
              </h2>

              <div className="grid grid-cols-3 gap-px border border-white/5 mb-10">
                {[
                  { v: '150+', l: 'Projects' },
                  { v: '95%',  l: 'Retention' },
                  { v: '★★★★★', l: 'Rating' },
                ].map((s, i) => (
                  <div key={i} className="bg-forge-gray p-6 text-center">
                    <div className={`font-display font-bold text-forge-crimson mb-1 ${s.v.includes('★') ? 'text-sm' : 'text-2xl'}`}>{s.v}</div>
                    <div className="text-white/30 text-xs font-mono uppercase tracking-widest">{s.l}</div>
                  </div>
                ))}
              </div>

              <Link to="/contact" className="btn btn-primary">
                <span>Work With Us</span>
                <ArrowRight size={13} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUES ──────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-black border-b border-white/5">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-16"
          >
            <div className="w-6 h-px bg-forge-crimson" />
            <span className="label">Our Values</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-white/5 bg-white/5">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="bg-black p-6 sm:p-10 group hover:bg-forge-dark transition-colors duration-500"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 mt-0.5">
                    <v.icon size={20} className="text-forge-crimson" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white mb-3">{v.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-forge-dark border-b border-white/5">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-6 h-px bg-forge-crimson" />
                <span className="label">How We Work</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="headline-md text-white"
              >
                Our<br />
                <span className="text-forge-crimson">Process</span>
              </motion.h2>
            </div>

            <div className="lg:col-span-8">
              {process.map((step, i) => (
                <div
                  key={step.num}
                  className="process-step flex items-start gap-8 py-8 border-b border-white/5 last:border-0 group"
                >
                  <div className="process-number flex-shrink-0 text-[3rem] sm:text-[5rem]">{step.num}</div>
                  <div className="pt-3">
                    <h3 className="font-display text-xl font-semibold text-white/80 group-hover:text-white transition-colors mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/30 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="bg-forge-crimson py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.2) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="container-tight relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="headline-md text-white">
            Ready to start<br />forging your brand?
          </h2>
          <Link to="/contact" className="btn bg-black text-white hover:bg-forge-dark transition-colors px-10 py-4 flex-shrink-0">
            <span>Get In Touch</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default About
