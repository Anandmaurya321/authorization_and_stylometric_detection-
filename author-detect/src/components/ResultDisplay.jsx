import { useState } from 'react'

const AUTHOR_AVATARS = {
  default: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="24" cy="24" r="24" fill="url(#grad)" />
      <circle cx="24" cy="19" r="7" fill="rgba(255,255,255,0.15)" />
      <path d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16" fill="rgba(255,255,255,0.12)" />
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6d28d9" />
          <stop offset="1" stopColor="#0891b2" />
        </linearGradient>
      </defs>
    </svg>
  ),
}

function ConfidenceBadge({ label }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      {label}
    </span>
  )
}

export default function ResultDisplay({ author, onReset }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(author).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // Split first/last name if space exists
  const parts = author.trim().split(/\s+/)
  const firstName = parts.slice(0, -1).join(' ')
  const lastName = parts.slice(-1)[0]

  return (
    <div className="animate-result-in">
      {/* Ambient glow behind card */}
      <div className="relative">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500/20 to-cyan-400/20 blur-2xl scale-95 opacity-60" />

        <div className="relative glass-card rounded-3xl p-8 sm:p-10 overflow-hidden border-border-bright/50 border glow-border-violet">
          {/* Scan line shimmer */}
          <div className="absolute inset-0 scan-line pointer-events-none" />

          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

          {/* Header row */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(168,85,247)" strokeWidth="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <path d="M22 4 12 14.01l-3-3"/>
                </svg>
                <span className="font-mono text-xs text-violet-400 tracking-wider">ANALYSIS COMPLETE</span>
              </div>
              <ConfidenceBadge label="High Confidence" />
            </div>

            {/* Reset button */}
            <button
              onClick={onReset}
              className="p-2 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.05] transition-all duration-200"
              title="Analyse new text"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
            </button>
          </div>

          {/* Author display */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-8 mb-8">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-violet-500/30 ring-offset-2 ring-offset-surface shadow-glow-violet">
                {AUTHOR_AVATARS.default}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center shadow-glow-sm">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"/>
                  <path d="M12 6a1 1 0 0 0-1 1v5.586L7.707 16.293a1 1 0 1 0 1.414 1.414l3.586-3.586A1 1 0 0 0 13 13V7a1 1 0 0 0-1-1z"/>
                </svg>
              </div>
            </div>

            {/* Name */}
            <div className="text-center sm:text-left">
              <p className="font-mono text-xs text-white/35 uppercase tracking-widest mb-1">
                Detected Author
              </p>
              <div className="font-display font-800 leading-none">
                {firstName && (
                  <span className="block text-white/60 text-2xl sm:text-3xl">{firstName}</span>
                )}
                <span className="text-gradient-cyan text-4xl sm:text-5xl md:text-6xl tracking-tight">
                  {lastName}
                </span>
              </div>
            </div>
          </div>

          {/* Metadata chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { icon: '✦', label: 'Stylometric Analysis' },
              { icon: '◈', label: 'Vocabulary Fingerprint' },
              { icon: '⬡', label: 'Syntax Patterns' },
              { icon: '◉', label: 'ML Classification' },
            ].map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-white/40 bg-white/[0.04] border border-border hover:border-border-bright hover:text-white/60 transition-all duration-200"
              >
                <span className="text-cyan-400/60">{chip.icon}</span>
                {chip.label}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-display font-500 text-white/60 bg-white/[0.04] border border-border hover:border-border-bright hover:text-white/90 hover:bg-white/[0.07] transition-all duration-200"
            >
              {copied ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-cyan-400">Copied!</span>
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                  Copy Result
                </>
              )}
            </button>

            <button
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-display font-500 text-void bg-gradient-to-r from-cyan-400 to-violet-500 hover:from-cyan-300 hover:to-violet-400 transition-all duration-300 shadow-glow-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Analyse Another
            </button>
          </div>

          {/* Bottom grid line decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
        </div>
      </div>
    </div>
  )
}
