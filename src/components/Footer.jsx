import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUp, Instagram, Mail, Phone } from 'lucide-react'

const Footer = () => {
  const year = new Date().getFullYear()

  const navLinks = [
    { name: 'Home',      path: '/' },
    { name: 'About',     path: '/about' },
    { name: 'Services',  path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact',   path: '/contact' },
  ]

  const services = [
    'Logo Design',
    'Brand Identity',
    'Social Media',
    'UI/UX Design',
    'Poster Design',
    'Design Consultancy',
  ]

  return (
    <footer className="relative bg-forge-dark overflow-hidden">
      {/* Top big text */}
      <div className="py-16 md:py-24 overflow-hidden">
        <div className="container-tight">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="headline-lg text-white/10 leading-none select-none"
          >
            DESIGN<br />
            <span className="text-forge-crimson/20">FORGE</span>
          </motion.h2>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container-tight py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-2">
            <img src="/Add a subheading (1).png" alt="Design Forge" className="h-12 object-contain mb-6 opacity-90" />
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-6">
              Forging powerful visual identities from Delhi. Where creative fire meets precision craftsmanship.
            </p>
            <div className="flex flex-col gap-3">
              <a href="mailto:designforge250@gmail.com" className="flex items-center gap-3 text-sm text-white/40 hover:text-forge-crimson transition-colors">
                <Mail size={14} />
                designforge250@gmail.com
              </a>
              <a href="tel:+919318378900" className="flex items-center gap-3 text-sm text-white/40 hover:text-forge-crimson transition-colors">
                <Phone size={14} />
                +91 93183 78900
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="label mb-6">Navigation</h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-white/40 hover:text-forge-crimson transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="label mb-6">Services</h4>
            <ul className="flex flex-col gap-3">
              {services.map(s => (
                <li key={s}>
                  <Link to="/services" className="text-sm text-white/40 hover:text-forge-crimson transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-xs font-mono">
            © {year} Design Forge. All rights reserved.
          </p>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-xs text-white/25 hover:text-forge-crimson transition-colors font-mono tracking-widest uppercase"
            whileHover={{ y: -3 }}
          >
            Back to top <ArrowUp size={12} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
