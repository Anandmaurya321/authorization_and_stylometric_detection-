import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = [
    { label: 'Detector', href: '#detector' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'About', href: '#about' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink/80 backdrop-blur-xl border-b border-border shadow-[0_1px_0_rgba(255,255,255,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-cyan-400/40 group-hover:border-cyan-400/70 transition-all duration-300" />
              {/* Inner glow */}
              <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Center dot */}
              <div className="absolute inset-3 rounded-full bg-void" />
              {/* Scan lines */}
              <div className="absolute top-0 left-1/2 w-px h-full bg-cyan-400/30 -translate-x-1/2" />
              <div className="absolute left-0 top-1/2 h-px w-full bg-cyan-400/30 -translate-y-1/2" />
            </div>
            <span className="font-display font-700 text-lg tracking-tight">
              <span className="text-white">Script</span>
              <span className="text-gradient-cyan">Mind</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm text-white/50 hover:text-white/90 font-body transition-colors duration-200 rounded-lg hover:bg-white/[0.04]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#detector"
              className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-display font-600 text-void bg-gradient-to-r from-cyan-400 to-violet-500 hover:from-cyan-300 hover:to-violet-400 transition-all duration-300 shadow-glow-sm"
            >
              Try Now
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-px bg-white/70 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-px bg-white/70 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-px bg-white/70 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-64' : 'max-h-0'}`}>
        <div className="bg-ink/95 backdrop-blur-xl border-t border-border px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 text-sm text-white/60 hover:text-white font-body transition-colors rounded-lg hover:bg-white/[0.04]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#detector"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-4 py-2.5 rounded-lg text-sm font-display font-600 text-void text-center bg-gradient-to-r from-cyan-400 to-violet-500"
          >
            Try Now
          </a>
        </div>
      </div>
    </nav>
  )
}
