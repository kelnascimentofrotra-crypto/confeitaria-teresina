import type { MotionValue } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  born: number // segundos até começar a surgir
  phase: number
  depth: number // 0.4 (fundo) a 1 (frente): muda o quanto reage ao cursor
}

interface Props {
  /** true depois que a seção entra na tela pela primeira vez: os pontos começam a surgir */
  started: boolean
  /** posição do ponteiro normalizada (0–1) dentro do palco */
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  reduced: boolean
}

/**
 * Pontos azuis que surgem aos poucos, flutuam devagar e se ligam por linhas finas.
 * O loop de animação só roda com a seção visível; com "reduzir movimento" desenha um quadro estático.
 */
export function ParticleField({ started, pointerX, pointerY, reduced }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !started) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let raf = 0
    let visible = false
    let t0 = performance.now()
    let dpr = 1

    const seed = () => {
      const count = Math.max(18, Math.min(38, Math.round((width * height) / 30000)))
      particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: 0.7 + Math.random() * 1.7,
        born: reduced ? 0 : (i / count) * 1.6 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        depth: 0.4 + Math.random() * 0.6,
      }))
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      // telas grandes: resolução 1x (os pontos são suaves, não se nota e custa bem menos)
      dpr = width > 900 ? 1 : Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
      if (reduced) draw(performance.now())
    }

    const draw = (now: number) => {
      const t = (now - t0) / 1000
      const px = pointerX.get() * width
      const py = pointerY.get() * height
      ctx.clearRect(0, 0, width, height)

      const alphas: number[] = []
      for (const p of particles) {
        if (!reduced) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < -10) p.x = width + 10
          else if (p.x > width + 10) p.x = -10
          if (p.y < -10) p.y = height + 10
          else if (p.y > height + 10) p.y = -10
        }
        const appear = Math.max(0, Math.min(1, (t - p.born) / 0.9))
        const twinkle = 0.62 + 0.38 * Math.sin(t * 0.9 + p.phase)
        const d = Math.hypot(p.x - px, p.y - py)
        const near = Math.max(0, 1 - d / 190) // brilho extra perto do cursor
        alphas.push(appear * (0.26 + 0.34 * twinkle * p.depth + 0.4 * near))
      }

      // linhas entre pontos próximos
      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          if (dx > 130 || dx < -130 || dy > 130 || dy < -130) continue
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 130) {
            ctx.strokeStyle = `rgba(60,140,255,${(1 - d / 130) * 0.16 * Math.min(alphas[i], alphas[j]) * 2})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      particles.forEach((p, i) => {
        const a = alphas[i]
        if (a <= 0) return
        ctx.fillStyle = `rgba(40,130,255,${a * 0.22})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 3.4, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = `rgba(150,205,255,${Math.min(1, a)})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // os pontos se movem devagar: 30 quadros por segundo bastam e deixam folga para a rolagem
    let lastDraw = 0
    const loop = (now: number) => {
      if (now - lastDraw >= 30) {
        lastDraw = now
        draw(now)
      }
      if (visible && !reduced) raf = requestAnimationFrame(loop)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        cancelAnimationFrame(raf)
        if (visible && !reduced) raf = requestAnimationFrame(loop)
      },
      { rootMargin: '80px' },
    )
    io.observe(canvas)
    t0 = performance.now()
    resize()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [started, pointerX, pointerY, reduced])

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
}
