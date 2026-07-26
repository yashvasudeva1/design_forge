import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Palette, Layers, Share2, Layout, Image, MessageSquare } from 'lucide-react'

const services = [
  {
    num: '01',
    icon: Palette,
    title: 'Logo Design',
    tagline: 'Marks that define you.',
    desc: 'Distinctive, memorable logos that capture your brand essence and stand the test of time. We explore multiple concepts, refine until perfect.',
    deliverables: ['Custom Vector Concepts', 'Primary & Secondary Marks', 'Brand Usage Guidelines', 'All File Formats (AI, EPS, SVG, PNG)'],
    timeline: '1–2 weeks',
  },
  {
    num: '02',
    icon: Layers,
    title: 'Brand Identity',
    tagline: 'Complete visual systems.',
    desc: 'End-to-end brand identity systems that create cohesive experiences across every touchpoint - digital and physical.',
    deliverables: ['Logo Suite', 'Color Palette', 'Typography System', 'Brand Guidelines Document'],
    timeline: '3–4 weeks',
  },
  {
    num: '03',
    icon: Share2,
    title: 'Social Media Design',
    tagline: 'Content that stops the scroll.',
    desc: 'Engaging social media graphics, post templates, and ad creatives designed to amplify your brand message and drive interaction.',
    deliverables: ['Post Templates', 'Story Designs', 'Ad Creatives', 'Profile Kit'],
    timeline: '1–2 weeks',
  },
  {
    num: '04',
    icon: Layout,
    title: 'UI/UX Design',
    tagline: 'Interfaces that feel alive.',
    desc: 'Intuitive, beautiful interfaces designed for conversion. From web apps to mobile - we design experiences people love to use.',
    deliverables: ['Wireframes', 'High-Fidelity Designs', 'Prototype', 'Design System'],
    timeline: '4–6 weeks',
  },
  {
    num: '05',
    icon: Image,
    title: 'Poster & Print',
    tagline: 'Bold work that commands attention.',
    desc: 'Eye-catching print and digital materials - posters, flyers, brochures, banners - designed for maximum visual impact.',
    deliverables: ['Print-Ready Files', 'Digital Versions', 'Multiple Sizes', 'Bleed & Trim Setup'],
    timeline: '3–5 days',
  },
  {
    num: '06',
    icon: MessageSquare,
    title: 'Design Consultancy',
    tagline: 'Strategic creative direction.',
    desc: 'Not sure where to start? We guide you through your brand\'s visual landscape with strategic audits and creative direction sessions.',
    deliverables: ['Brand Audit', 'Competitor Analysis', 'Design Strategy', 'Creative Brief'],
    timeline: '1 week',
  },
]

const Services = () => {
  return (
    <div className="bg-black">
      {/* ── PAGE HEADER ─────────────────────────────────── */}
      <section className="pt-36 pb-20 relative overflow-hidden border-b border-white/5">
        <div className="grid-overlay opacity-15" />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(144,26,29,0.08) 0%, transparent 60%)' }}
        />
        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-6 h-px bg-forge-crimson" />
            <span className="label">What We Offer</span>
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
                  Services We
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.12 }}
                  className="headline-lg text-forge-crimson"
                >
                  Forge.
                </motion.h1>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/40 text-base leading-relaxed max-w-lg"
            >
              From concept to creation - comprehensive design services crafted to elevate your brand to its full potential.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── SERVICES LIST ────────────────────────────────── */}
      <section className="py-8 bg-black">
        <div className="container-tight">
          <div className="divide-y divide-white/5">
            {services.map((service, i) => (
              <div
                key={service.num}
                className="group py-16"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16">
                  {/* Left */}
                  <div className="lg:col-span-5 flex items-start gap-6">
                    <span className="font-mono text-xs text-forge-crimson mt-1.5 flex-shrink-0">{service.num}</span>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <service.icon size={18} className="text-forge-crimson" />
                        <h2 className="font-display text-2xl font-bold text-white group-hover:text-forge-crimson transition-colors duration-300">
                          {service.title}
                        </h2>
                      </div>
                      <p className="text-forge-crimson text-xs font-mono uppercase tracking-widest mb-4">{service.tagline}</p>
                      <p className="text-white/40 text-sm leading-relaxed">{service.desc}</p>
                    </div>
                  </div>

                  {/* Middle - deliverables */}
                  <div className="lg:col-span-4 border-t border-white/5 pt-6 lg:border-0 lg:pt-0">
                    <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-5">Deliverables</p>
                    <ul className="space-y-3">
                      {service.deliverables.map((d, di) => (
                        <li key={di} className="flex items-center gap-3 text-sm text-white/50">
                          <span className="w-1 h-1 rounded-full bg-forge-crimson flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right - timeline + CTA */}
                  <div className="lg:col-span-3 flex flex-col justify-between border-t border-white/5 pt-6 lg:border-0 lg:pt-0">
                    <div>
                      <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-3">Timeline</p>
                      <p className="font-display text-lg font-semibold text-white">{service.timeline}</p>
                    </div>
                    <Link
                      to="/contact"
                      className="mt-8 lg:mt-0 flex items-center gap-2 text-sm font-display font-semibold text-white/30 group-hover:text-forge-crimson transition-colors"
                    >
                      Start This Project
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="py-20 bg-forge-dark border-t border-white/5">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          >
            <div>
              <p className="text-white/30 text-sm mb-3">Need something specific?</p>
              <h2 className="headline-md text-white">Let's discuss<br />your project.</h2>
            </div>
            <Link to="/contact" className="btn btn-primary flex-shrink-0">
              <span>Start a Conversation</span>
              <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services
