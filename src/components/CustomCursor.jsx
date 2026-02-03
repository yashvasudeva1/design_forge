import { motion } from 'framer-motion'

const CustomCursor = ({ mousePosition }) => {
  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed w-4 h-4 bg-forge-crimson rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />
      
      {/* Cursor glow trail */}
      <motion.div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-[9998] hidden lg:block"
        style={{
          background: 'radial-gradient(circle, rgba(177, 18, 38, 0.3) 0%, transparent 70%)'
        }}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed w-10 h-10 border border-forge-crimson/30 rounded-full pointer-events-none z-[9997] hidden lg:block"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 0.8
        }}
      />
    </>
  )
}

export default CustomCursor
