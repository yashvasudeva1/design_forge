import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, CheckCircle, AlertCircle, Phone, Mail, Clock } from 'lucide-react'
import SEO from '../components/SEO'

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  'name': 'Contact Design Forge Studio',
  'url': 'https://the-design-forge.vercel.app/contact',
  'description': 'Contact Design Forge design studio in Delhi for logo design, brand identity, and UI/UX project inquiries.',
  'mainEntity': {
    '@type': 'ProfessionalService',
    'name': 'Design Forge',
    'telephone': ['+91-9318378900', '+91-9910695553', '+91-8368763677'],
    'email': 'designforge250@gmail.com',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Delhi',
      'addressCountry': 'IN'
    }
  }
}

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address'
    if (!form.message.trim()) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      const res = await fetch('https://formspree.io/f/mgozjwpg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setSubmitted(true)
      else throw new Error('Submission failed')
    } catch {
      setErrors({ submit: 'Failed to send. Please email us directly.' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  return (
    <div className="bg-black">
      <SEO
        title="Contact Us | Hire Design Forge Studio in Delhi"
        description="Get in touch with Design Forge studio in Delhi. Phone: +91 93183 78900, Email: designforge250@gmail.com. Let's discuss your brand identity project."
        keywords="contact design forge, hire logo designer delhi, design agency contact delhi, brand consultant phone number, graphic design quote delhi"
        schema={contactSchema}
      />

      {/* ── PAGE HEADER ─────────────────────────────────── */}
      <section className="pt-36 pb-20 relative overflow-hidden border-b border-white/5">
        <div className="grid-overlay opacity-15" />
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 100% 100%, rgba(144,26,29,0.1) 0%, transparent 60%)' }}
        />
        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-6 h-px bg-forge-crimson" />
            <span className="label">Get In Touch</span>
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
                  Let's Forge <span className="text-forge-crimson">Your Brand.</span>
                </motion.h1>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/40 text-base leading-relaxed max-w-lg"
            >
              Ready to transform your vision into reality? Tell us about your project and we'll respond within 24–48 hours.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────── */}
      <section className="py-20 bg-black" ref={ref}>
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            {/* ── FORM ───────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border border-white/10 p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-16 h-16 mx-auto mb-8 flex items-center justify-center border border-green-500/30"
                  >
                    <CheckCircle size={32} className="text-green-500" />
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold text-white mb-4">
                    Message Received.
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed max-w-sm mx-auto mb-8">
                    We'll review your brief within 24–48 hours and respond with a scoped direction and next steps.
                  </p>
                  <div className="text-left max-w-sm mx-auto border-t border-white/5 pt-8">
                    <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-4">To accelerate review, share:</p>
                    <ul className="space-y-2">
                      {['Brand or website links', 'Timeline priority', 'Decision-maker contact'].map(item => (
                        <li key={item} className="flex items-center gap-3 text-sm text-white/50">
                          <span className="w-1 h-1 rounded-full bg-forge-crimson" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', message: '' }) }}
                    className="mt-10 text-xs text-white/25 hover:text-white/60 transition-colors font-mono uppercase tracking-widest"
                  >
                    Send Another Request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-0">
                  {/* Name + Email */}
                  <div className="grid md:grid-cols-2 gap-8 pb-10 border-b border-white/5">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-widest text-white/30 block mb-3">
                        Your Name <span className="text-forge-crimson">*</span>
                      </label>
                      <input
                        type="text" name="name" value={form.name} onChange={handleChange}
                        placeholder="John Doe"
                        className={`forge-input ${errors.name ? 'border-red-500/60' : ''}`}
                      />
                      {errors.name && (
                        <p className="flex items-center gap-1 text-red-400 text-xs mt-2">
                          <AlertCircle size={11} /> {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase tracking-widest text-white/30 block mb-3">
                        Email Address <span className="text-forge-crimson">*</span>
                      </label>
                      <input
                        type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder="john@company.com"
                        className={`forge-input ${errors.email ? 'border-red-500/60' : ''}`}
                      />
                      {errors.email && (
                        <p className="flex items-center gap-1 text-red-400 text-xs mt-2">
                          <AlertCircle size={11} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company */}
                  <div className="py-10 border-b border-white/5">
                    <label className="text-xs font-mono uppercase tracking-widest text-white/30 block mb-3">Company Name</label>
                    <input
                      type="text" name="company" value={form.company} onChange={handleChange}
                      placeholder="Your Company (optional)"
                      className="forge-input"
                    />
                  </div>



                  {/* Message */}
                  <div className="py-10">
                    <label className="text-xs font-mono uppercase tracking-widest text-white/30 block mb-3">
                      Project Details <span className="text-forge-crimson">*</span>
                    </label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      placeholder="Tell us about your project, goals, and any inspiration you have..."
                      rows={6}
                      className={`forge-textarea ${errors.message ? 'border-red-500/60' : ''}`}
                    />
                    {errors.message && (
                      <p className="flex items-center gap-1 text-red-400 text-xs mt-2">
                        <AlertCircle size={11} /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  {errors.submit && (
                    <p className="text-red-400 text-sm mb-4">{errors.submit}</p>
                  )}
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: submitting ? 1 : 1.02 }}
                    whileTap={{ scale: submitting ? 1 : 0.98 }}
                    className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={14} />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* ── CONTACT INFO ────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 space-y-0 divide-y divide-white/5 border-t border-white/5"
            >
              {/* Direct contact */}
              <div className="py-10">
                <h3 className="label mb-6">Direct Contact</h3>
                <div className="space-y-5">
                  <a
                    href="mailto:designforge250@gmail.com"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-8 h-8 flex items-center justify-center border border-white/10 group-hover:border-forge-crimson/50 transition-colors flex-shrink-0">
                      <Mail size={13} className="text-forge-crimson" />
                    </div>
                    <div>
                      <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-1">Email</p>
                      <p className="text-white/70 text-sm group-hover:text-forge-crimson transition-colors">
                        designforge250@gmail.com
                      </p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4 group">
                    <div className="w-8 h-8 flex items-center justify-center border border-white/10 flex-shrink-0">
                      <Phone size={13} className="text-forge-crimson" />
                    </div>
                    <div>
                      <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-1">Phone</p>
                      <div className="flex flex-col gap-1">
                        <a href="tel:+919318378900" className="text-white/70 text-sm hover:text-forge-crimson transition-colors">
                          +91 93183 78900
                        </a>
                        <a href="tel:+919910695553" className="text-white/70 text-sm hover:text-forge-crimson transition-colors">
                          +91 99106 95553
                        </a>
                        <a href="tel:+918368763677" className="text-white/70 text-sm hover:text-forge-crimson transition-colors">
                          +91 83687 63677
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working hours */}
              <div className="py-10">
                <h3 className="label mb-6">Working Hours</h3>
                <div className="space-y-3">
                  {[
                    { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM' },
                    { day: 'Saturday',        hours: '10:00 AM – 2:00 PM' },
                    { day: 'Sunday',          hours: 'Closed' },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex justify-between items-center">
                      <span className="text-white/40 text-xs">{day}</span>
                      <span className={`text-xs font-mono ${hours === 'Closed' ? 'text-white/20' : 'text-white/70'}`}>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response promise */}
              <div className="py-10">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center border border-white/10 flex-shrink-0">
                    <Clock size={13} className="text-forge-crimson" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white text-sm mb-2">24–48h Response</h3>
                    <p className="text-white/30 text-xs leading-relaxed">
                      We review every brief carefully and respond with a scoped direction and next steps within 48 hours.
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="py-10">
                <h3 className="label mb-4">Based In</h3>
                <p className="font-display text-3xl font-bold text-white/10">Delhi,<br />India.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
