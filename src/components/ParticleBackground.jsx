import { useEffect, useRef, useCallback } from 'react'

const ParticleBackground = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })

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

    const ctx = canvas.getContext('2d')
    let particles = particlesRef.current

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)

    // Initialize particles
    for (let i = 0; i < 60; i++) {
      const particle = createParticle(canvas)
      particle.y = Math.random() * canvas.height
      particles.push(particle)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Add new particles occasionally
      if (Math.random() < 0.06 && particles.length < 100) {
        particles.push(createParticle(canvas))
      }

      particles = particles.filter(particle => {
        particle.life++
        
        // Mouse interaction - particles are repelled by cursor
        const mouse = mouseRef.current
        const dx = particle.x - mouse.x
        const dy = particle.y - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150
        
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          particle.x += Math.cos(angle) * force * 3
          particle.y += Math.sin(angle) * force * 3
        }
        
        particle.y -= particle.speedY
        particle.x += particle.speedX
        particle.opacity = (1 - particle.life / particle.maxLife) * 0.5

        if (particle.life >= particle.maxLife || particle.y < -10) {
          return false
        }

        // Draw ember
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        )
        gradient.addColorStop(0, `rgba(177, 18, 38, ${particle.opacity})`)
        gradient.addColorStop(0.5, `rgba(212, 32, 44, ${particle.opacity * 0.5})`)
        gradient.addColorStop(1, 'rgba(177, 18, 38, 0)')

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Add glow
        ctx.shadowBlur = 10
        ctx.shadowColor = `rgba(177, 18, 38, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 150, 100, ${particle.opacity})`
        ctx.fill()
        ctx.shadowBlur = 0

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
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

export default ParticleBackground
