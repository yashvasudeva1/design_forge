import { useEffect, useRef, useCallback, memo } from 'react'

const ParticleBackground = memo(() => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const lastMouseUpdate = useRef(0)

  const createParticle = useCallback((canvas) => {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      size: Math.random() * 4 + 2,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.8,
      opacity: Math.random() * 0.6 + 0.4,
      life: 0,
      maxLife: Math.random() * 250 + 120
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    let particles = particlesRef.current
    
    // Reduce particles on mobile for better performance
    const isMobile = window.innerWidth < 768
    const maxParticles = isMobile ? 40 : 80
    const initialParticles = isMobile ? 30 : 50

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Throttled mouse move handler
    const handleMouseMove = (e) => {
      const now = performance.now()
      if (now - lastMouseUpdate.current > 16) { // ~60fps throttle
        mouseRef.current = { x: e.clientX, y: e.clientY }
        lastMouseUpdate.current = now
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Initialize particles
    for (let i = 0; i < initialParticles; i++) {
      const particle = createParticle(canvas)
      particle.y = Math.random() * canvas.height
      particles.push(particle)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Add new particles occasionally
      if (Math.random() < 0.05 && particles.length < maxParticles) {
        particles.push(createParticle(canvas))
      }

      particles = particles.filter(particle => {
        particle.life++
        
        // Mouse interaction - particles are repelled by cursor (skip on mobile)
        if (!isMobile) {
          const mouse = mouseRef.current
          const dx = particle.x - mouse.x
          const dy = particle.y - mouse.y
          const distSq = dx * dx + dy * dy
          const maxDistSq = 22500 // 150^2
          
          if (distSq < maxDistSq) {
            const distance = Math.sqrt(distSq)
            const force = (150 - distance) / 150
            const angle = Math.atan2(dy, dx)
            particle.x += Math.cos(angle) * force * 3
            particle.y += Math.sin(angle) * force * 3
          }
        }
        
        particle.y -= particle.speedY
        particle.x += particle.speedX
        particle.opacity = (1 - particle.life / particle.maxLife) * 0.5

        if (particle.life >= particle.maxLife || particle.y < -10) {
          return false
        }

        // Simplified drawing for better performance
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(177, 18, 38, ${particle.opacity})`
        ctx.fill()

        // Add subtle glow only on desktop
        if (!isMobile) {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(212, 32, 44, ${particle.opacity * 0.3})`
          ctx.fill()
        }

        return true
      })

      particlesRef.current = particles
      animationRef.current = requestAnimationFrame(animate)
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReducedMotion) {
      animate()
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [createParticle])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-80"
      style={{ mixBlendMode: 'screen', willChange: 'auto' }}
    />
  )
})

ParticleBackground.displayName = 'ParticleBackground'

export default ParticleBackground
