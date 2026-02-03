import { motion } from 'framer-motion'

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-forge-black flex items-center justify-center"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <motion.img
            src="/Graphic (11).png"
            alt="Design Forge"
            className="w-32 h-32 object-contain"
            animate={{
              filter: [
                'drop-shadow(0 0 20px rgba(144, 26, 29, 0.3))',
                'drop-shadow(0 0 40px rgba(144, 26, 29, 0.6))',
                'drop-shadow(0 0 20px rgba(144, 26, 29, 0.3))'
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <h2 className="font-heading text-2xl font-bold text-white mb-2">
            Design Forge
          </h2>
          <p className="text-white/50 text-sm tracking-widest uppercase">
            Forging Ideas Into Reality
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 w-48 h-1 bg-white/10 rounded-full overflow-hidden"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-forge-crimson-dark via-forge-crimson to-forge-crimson-light"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default LoadingScreen
