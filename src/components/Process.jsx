import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Search, PenTool, Flame, Sparkles, Send } from 'lucide-react'

const steps = [
  {
    id: 1,
    title: 'Research',
    description: 'We dive deep into your brand, market, and competitors to uncover unique opportunities and insights.',
    icon: Search,
    details: ['Brand Audit', 'Market Analysis', 'Competitor Review', 'User Research']
  },
  {
    id: 2,
    title: 'Sketch',
    description: 'Raw ideas take shape through rapid ideation, sketching, and exploring multiple creative directions.',
    icon: PenTool,
    details: ['Concept Development', 'Mood Boards', 'Sketching', 'Initial Concepts']
  },
  {
    id: 3,
    title: 'Forge',
    description: 'The best concepts are refined, digitized, and crafted with precision into polished designs.',
    icon: Flame,
    details: ['Digital Refinement', 'Color Exploration', 'Typography', 'Design Systems']
  },
  {
    id: 4,
    title: 'Polish',
    description: 'Every detail is perfected through iterations, feedback, and meticulous attention to quality.',
    icon: Sparkles,
    details: ['Client Review', 'Refinements', 'Quality Check', 'Final Touches']
  },
  {
    id: 5,
    title: 'Deliver',
    description: 'Complete deliverables are prepared with comprehensive guidelines and ongoing support.',
    icon: Send,
    details: ['File Preparation', 'Brand Guidelines', 'Asset Delivery', 'Support']
  }
]

const Process = () => {
  const [activeStep, setActiveStep] = useState(1)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section id="process" className="section bg-forge-dark relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] 
          bg-forge-crimson/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block text-forge-crimson text-sm font-semibold tracking-widest uppercase mb-4"
          >
            How We Work
          </motion.span>
          <h2 className="section-title">
            Our
            <span className="text-gradient-crimson"> Process</span>
          </h2>
          <p className="section-subtitle mx-auto mt-6">
            A proven methodology that transforms your vision into reality, 
            step by step.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          {/* Timeline Line */}
          <div className="relative mb-16">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2" />
            
            {/* Progress Line */}
            <motion.div
              className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-forge-crimson to-forge-crimson-light -translate-y-1/2"
              initial={{ width: 0 }}
              animate={inView ? { width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />

            {/* Step Nodes */}
            <div className="relative flex justify-between">
              {steps.map((step, index) => (
                <motion.button
                  key={step.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                  onClick={() => setActiveStep(step.id)}
                  className="relative group"
                >
                  {/* Node */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500
                    ${activeStep === step.id 
                      ? 'bg-forge-crimson shadow-crimson-lg scale-110' 
                      : activeStep > step.id 
                        ? 'bg-forge-crimson' 
                        : 'bg-forge-gray border-2 border-white/10'
                    }`}
                  >
                    <step.icon 
                      size={24} 
                      className={`transition-colors duration-300 ${
                        activeStep >= step.id ? 'text-white' : 'text-white/50'
                      }`} 
                    />
                  </div>

                  {/* Step Number */}
                  <div className={`absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-bold transition-colors duration-300
                    ${activeStep >= step.id ? 'text-forge-crimson' : 'text-white/40'}`}>
                    0{step.id}
                  </div>

                  {/* Step Title */}
                  <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-heading font-semibold 
                    transition-colors duration-300
                    ${activeStep >= step.id ? 'text-white' : 'text-white/40'}`}>
                    {step.title}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Active Step Details */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-forge-black/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/5"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-forge-crimson/20 flex items-center justify-center">
                    {(() => {
                      const Icon = steps[activeStep - 1].icon
                      return <Icon size={24} className="text-forge-crimson" />
                    })()}
                  </div>
                  <span className="text-forge-crimson font-semibold">Step {activeStep} of {steps.length}</span>
                </div>
                
                <h3 className="font-heading text-3xl font-bold text-white mb-4">
                  {steps[activeStep - 1].title}
                </h3>
                
                <p className="text-white/60 text-lg leading-relaxed">
                  {steps[activeStep - 1].description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {steps[activeStep - 1].details.map((detail, index) => (
                  <motion.div
                    key={detail}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-white/5 rounded-xl"
                  >
                    <div className="w-2 h-2 rounded-full bg-forge-crimson" />
                    <span className="text-white/80 text-sm">{detail}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-8 border-t border-white/5">
              <button
                onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                disabled={activeStep === 1}
                className="px-6 py-3 text-white/60 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Previous Step
              </button>
              <button
                onClick={() => setActiveStep(Math.min(steps.length, activeStep + 1))}
                disabled={activeStep === steps.length}
                className="px-6 py-3 bg-forge-crimson text-white rounded-lg hover:bg-forge-crimson-light 
                  transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next Step →
              </button>
            </div>
          </motion.div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-4">
          {/* Mobile Step Selector */}
          <div className="flex overflow-x-auto gap-2 pb-4 scrollbar-hide">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${activeStep === step.id 
                    ? 'bg-forge-crimson text-white' 
                    : 'bg-white/5 text-white/60 border border-white/10'}`}
              >
                {step.title}
              </button>
            ))}
          </div>

          {/* Mobile Active Step Content */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative pl-12"
          >
            {/* Node */}
            <div className="absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center bg-forge-crimson shadow-crimson">
              {(() => {
                const Icon = steps[activeStep - 1].icon
                return <Icon size={18} className="text-white" />
              })()}
            </div>

            {/* Content */}
            <div className="bg-forge-black/30 rounded-xl p-6 border border-white/5">
              <span className="text-forge-crimson text-xs font-semibold">Step {activeStep} of {steps.length}</span>
              <h3 className="font-heading text-xl font-bold text-white mt-1 mb-2">
                {steps[activeStep - 1].title}
              </h3>
              <p className="text-white/60 text-sm">
                {steps[activeStep - 1].description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {steps[activeStep - 1].details.map((detail) => (
                  <span key={detail} className="px-2 py-1 bg-white/5 text-white/60 text-xs rounded-full">
                    {detail}
                  </span>
                ))}
              </div>

              {/* Mobile Navigation Buttons */}
              <div className="flex justify-between mt-6 pt-4 border-t border-white/5">
                <button
                  onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                  disabled={activeStep === 1}
                  className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setActiveStep(Math.min(steps.length, activeStep + 1))}
                  disabled={activeStep === steps.length}
                  className="px-4 py-2 text-sm bg-forge-crimson text-white rounded-lg hover:bg-forge-crimson-light 
                    transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Process
