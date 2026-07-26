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
    <footer className="relative bg-forge-dark border-t border-white/5 overflow-hidden">
      {/* Main footer content */}
      <div className="container-tight pt-20 pb-16 md:pt-28 md:pb-20">
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
              <div className="flex items-start gap-3">
                <Phone size={14} className="text-white/40 mt-1 flex-shrink-0" />
                <div className="flex flex-col gap-2">
                  <a href="tel:+919318378900" className="text-sm text-white/40 hover:text-forge-crimson transition-colors">
                    +91 93183 78900
                  </a>
                  <a href="tel:+919910695553" className="text-sm text-white/40 hover:text-forge-crimson transition-colors">
                    +91 99106 95553
                  </a>
                  <a href="tel:+918368763677" className="text-sm text-white/40 hover:text-forge-crimson transition-colors">
                    +91 83687 63677
                  </a>
                </div>
              </div>
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
