import { useEffect, useRef } from 'react'

const STATS = [
  { value: '50+', label: 'Authors' },
  { value: '98%', label: 'Accuracy' },
  { value: '<1s', label: 'Inference' },
]

const FLOATING_NAMES = [
  'Hemingway', 'Austen', 'Dostoevsky', 'Woolf', 'Kafka',
  'Tolstoy', 'Dickens', 'Poe', 'Twain', 'Shakespeare',
]

export default function Hero() {
  const canvasRef = useRef(null)

  // Minimal particle canvas background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const W = () => canvas.offsetWidth
    const H = () => canvas.offsetHeight

    const DOTS = Array.from({ length: 60 }, () => ({
      x: Math.random() * 1200,
      y: Math.random() * 700,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.4 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W(), H())

      // Draw connections
      for (let i = 0; i < DOTS.length; i++) {
        for (let j = i + 1; j < DOTS.length; j++) {
          const dx = DOTS[i].x - DOTS[j].x
          const dy = DOTS[i].y - DOTS[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0,229,255,${0.04 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(DOTS[i].x, DOTS[i].y)
            ctx.lineTo(DOTS[j].x, DOTS[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw dots
      DOTS.forEach((d) => {
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0 || d.x > W()) d.vx *= -1
        if (d.y < 0 || d.y > H()) d.vy *= -1

        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(168,85,247,${d.alpha})`
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 bg-mesh-1" />
      <div className="absolute inset-0 bg-mesh-2" />
      <div className="absolute inset-0 bg-mesh-3" />

      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
        style={{ zIndex: 1 }}
      />

      {/* Floating author names — decorative */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
        {FLOATING_NAMES.map((name, i) => (
          <span
            key={name}
            className="absolute font-mono text-xs font-300 text-white/[0.06] select-none animate-float"
            style={{
              left: `${(i * 9.3 + 5) % 90}%`,
              top: `${(i * 13.7 + 8) % 85}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${5 + (i % 3)}s`,
            }}
          >
            {name}
          </span>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] mb-8 animate-fade-in stagger-1"
        >
          <div className="status-dot" />
          <span className="font-mono text-xs text-cyan-400/80 tracking-widest uppercase">
            Stylometric AI · v1.0
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display font-800 text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight mb-6 animate-fade-up stagger-2"
        >
          <span className="block text-white">Who wrote</span>
          <span className="block text-shimmer">this passage?</span>
        </h1>

        {/* Sub-headline */}
        <p
          className="text-white/45 font-body font-300 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up stagger-3"
        >
          Paste any paragraph and our machine-learning model will analyse writing style,
          syntax patterns, and vocabulary fingerprints to identify the author.
        </p>

        {/* CTA buttons */}
        <div className="flex items-center justify-center gap-4 mb-16 animate-fade-up stagger-4">
          <a
            href="#detector"
            className="btn-primary relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-600 text-white text-base shadow-glow-violet"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              Detect Author
            </span>
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-500 text-white/60 text-base border border-border hover:border-border-bright hover:text-white/90 transition-all duration-300"
          >
            How it works
          </a>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 max-w-sm mx-auto gap-px rounded-2xl overflow-hidden border border-border animate-fade-up stagger-5">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`glass-card flex flex-col items-center py-4 px-2 ${
                i === 1 ? 'border-x border-border' : ''
              }`}
            >
              <span className="font-display font-700 text-xl text-gradient-cyan">{stat.value}</span>
              <span className="font-mono text-[10px] text-white/35 uppercase tracking-widest mt-0.5">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce opacity-40">
        <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">Scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
          <path d="M12 5v14m-7-7 7 7 7-7"/>
        </svg>
      </div>
    </section>
  )
}
