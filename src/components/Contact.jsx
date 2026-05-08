import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, CheckCircle, AlertCircle, Phone, Mail } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    timeline: '',
    budget: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      const response = await fetch('https://formspree.io/f/mgozjwpg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setIsSubmitted(true)
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors({ submit: 'Failed to send message. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      projectType: '',
      timeline: '',
      budget: '',
      message: ''
    })
    setErrors({})
    setIsSubmitted(false)
  }

  return (
    <section id="contact" className="section bg-forge-dark relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-forge-crimson/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-forge-crimson/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block text-forge-crimson text-sm font-semibold tracking-widest uppercase mb-4"
          >
            Get in Touch
          </motion.span>
          <h2 className="section-title">
            Let's Forge
            <span className="text-gradient-crimson"> Your Brand</span>
          </h2>
          <p className="section-subtitle mx-auto mt-6">
            Ready to transform your vision into reality? 
            We'd love to hear about your project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-3xl p-8 md:p-10">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle size={40} className="text-green-500" />
                  </motion.div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">
                    Request Received. Next: Precision Review.
                  </h3>
                  <p className="text-white/60 max-w-md mx-auto">
                    We will review your brief within 24-48 hours and respond with a
                    scoped direction and next steps.
                  </p>
                  <div className="mt-6 text-left max-w-md mx-auto text-sm text-white/70 space-y-2">
                    <p>To accelerate the review, share:</p>
                    <ul className="list-disc list-inside text-white/60 space-y-1">
                      <li>Brand or website links</li>
                      <li>Timeline priority</li>
                      <li>Decision-maker and budget range</li>
                    </ul>
                  </div>
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href="mailto:designforge250@gmail.com?subject=Design%20Forge%20Project%20Intake"
                      className="btn-primary px-6 py-3"
                    >
                      Share Project Links
                    </a>
                    <a
                      href="#process"
                      className="px-6 py-3 rounded-xl border border-white/20 text-white/80 hover:text-white hover:border-forge-crimson transition-colors"
                    >
                      View Our Process
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-6 text-xs text-white/50 hover:text-white/80 transition-colors"
                  >
                    Send another request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-white/60 text-sm mb-2">
                        Your Name <span className="text-forge-crimson">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-white/60 text-sm mb-2">
                        Email Address <span className="text-forge-crimson">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-white/60 text-sm mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className="input-field"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Project Type */}
                    <div>
                      <label className="block text-white/60 text-sm mb-2">
                        Project Type
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option value="">Select</option>
                        <option value="Branding">Branding</option>
                        <option value="Logo">Logo Design</option>
                        <option value="UI/UX">UI/UX Design</option>
                        <option value="Print">Print / Poster</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Timeline */}
                    <div>
                      <label className="block text-white/60 text-sm mb-2">
                        Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option value="">Select</option>
                        <option value="2-4 weeks">2-4 weeks</option>
                        <option value="1-2 months">1-2 months</option>
                        <option value="3+ months">3+ months</option>
                        <option value="Not sure">Not sure</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-white/60 text-sm mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select</option>
                      <option value="Below 25k">Below 25k</option>
                      <option value="25k-60k">25k-60k</option>
                      <option value="60k-1.5L">60k-1.5L</option>
                      <option value="1.5L+">1.5L+</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-white/60 text-sm mb-2">
                      Project Details <span className="text-forge-crimson">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, goals, and timeline..."
                      rows={5}
                      className={`input-field resize-none ${errors.message ? 'border-red-500' : ''}`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Quick Contact */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading text-lg font-semibold text-white mb-4">
                Quick Contact
              </h3>
              <div className="space-y-3">
                <p className="text-white/60 text-sm flex items-center gap-2">
                  <Mail size={16} className="text-forge-crimson" />
                  <span className="text-white">designforge250@gmail.com</span>
                </p>
                <p className="text-white/60 text-sm flex items-center gap-2">
                  <Phone size={16} className="text-forge-crimson" />
                  <span className="text-white">+91 9318378900</span>
                </p>
              </div>
            </div>

            {/* Office Hours */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading text-lg font-semibold text-white mb-4">
                Working Hours
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Monday - Friday</span>
                  <span className="text-white">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Saturday</span>
                  <span className="text-white">10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Sunday</span>
                  <span className="text-white/40">Closed</span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
