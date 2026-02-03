import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const footerLinks = {
  company: [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' }
  ],
  services: [
    { name: 'Logo Design', href: '#services' },
    { name: 'Branding', href: '#services' },
    { name: 'UI/UX Design', href: '#services' },
    { name: 'Motion Graphics', href: '#services' },
    { name: 'Social Media', href: '#services' }
  ]
}

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavClick = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative bg-forge-black border-t border-white/5 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-30">
        {/* Flame Background */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px]">
          <svg viewBox="0 0 200 150" className="w-full h-full opacity-10">
            <defs>
              <linearGradient id="footerFlame" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#701518" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#901a1d" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M100 0 C120 40, 170 60, 170 100 C170 130, 140 150, 100 150 C60 150, 30 130, 30 100 C30 60, 80 40, 100 0"
              fill="url(#footerFlame)"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/assets/Graphic (11).png"
                alt="Design Forge"
                className="h-12 w-12 object-contain"
              />
              <span className="font-heading font-bold text-2xl text-white">
                Design<span className="text-forge-crimson">Forge</span>
              </span>
            </div>
            <p className="text-white/50 max-w-sm">
              Forging powerful visual identities that stand the test of time. 
              Where creativity meets precision.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                    className="text-white/50 hover:text-forge-crimson transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                    className="text-white/50 hover:text-forge-crimson transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Design Forge. All rights reserved.
            </p>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-white/50 hover:text-forge-crimson transition-colors text-sm"
              whileHover={{ y: -2 }}
            >
              Back to top
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>

        {/* Large Watermark Logo */}
        <div className="absolute bottom-0 right-0 opacity-[0.02] pointer-events-none">
          <img
            src="/assets/Graphic (11).png"
            alt=""
            className="w-96 h-96 object-contain"
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer
