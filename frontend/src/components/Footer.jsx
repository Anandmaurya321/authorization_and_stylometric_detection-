export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="about" className="relative border-t border-border mt-8">
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-bright/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-7 h-7">
                <div className="absolute inset-0 rounded-full border border-cyan-400/40" />
                <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 opacity-80" />
                <div className="absolute inset-3 rounded-full bg-void" />
              </div>
              <span className="font-display font-700 text-base text-white">
                Script<span className="text-gradient-cyan">Mind</span>
              </span>
            </div>
            <p className="font-body text-sm text-white/35 leading-relaxed max-w-xs">
              AI-powered stylometric author detection. Identify literary voices through
              the science of writing style analysis.
            </p>
          </div>

          {/* Links column */}
          <div>
            <h4 className="font-display font-600 text-sm text-white/60 uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Detector', href: '#detector' },
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'About', href: '#about' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/35 hover:text-white/70 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-3 h-px bg-border group-hover:bg-cyan-400/50 group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech column */}
          <div>
            <h4 className="font-display font-600 text-sm text-white/60 uppercase tracking-widest mb-4">
              Stack
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'FastAPI Backend', note: 'Python' },
                { label: 'scikit-learn Model', note: 'ML' },
                { label: 'React + Vite', note: 'Frontend' },
                { label: 'Tailwind CSS', note: 'Styling' },
              ].map((item) => (
                <li key={item.label} className="flex items-center justify-between">
                  <span className="font-body text-sm text-white/35">{item.label}</span>
                  <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
                    {item.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-white/20">
            © {year} ScriptMind · All rights reserved
          </p>
          <div className="flex items-center gap-2">
            <div className="status-dot" style={{ width: 5, height: 5 }} />
            <span className="font-mono text-xs text-white/25">
              Backend at{' '}
              <code className="text-cyan-400/40">http://127.0.0.1:8000</code>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
