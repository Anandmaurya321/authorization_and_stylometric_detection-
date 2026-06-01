const STEPS = [
  {
    number: '01',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: 'Paste Your Text',
    desc: 'Provide a minimum of 100 characters from any literary work. The longer and more representative the passage, the higher the accuracy.',
    color: 'from-cyan-500/20 to-cyan-400/5',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/20',
  },
  {
    number: '02',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    title: 'Feature Extraction',
    desc: 'The backend extracts stylometric features: vocabulary richness, sentence length distributions, function word frequencies, and syntactic n-grams.',
    color: 'from-violet-500/20 to-violet-400/5',
    accent: 'text-violet-400',
    border: 'border-violet-500/20',
  },
  {
    number: '03',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'ML Classification',
    desc: 'A scikit-learn classifier trained on thousands of literary samples identifies the most likely author from the extracted feature vector.',
    color: 'from-emerald-500/20 to-emerald-400/5',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/20',
  },
  {
    number: '04',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: 'Instant Result',
    desc: 'The predicted author is returned and beautifully displayed. You can copy the result or immediately start a new analysis.',
    color: 'from-rose-500/20 to-rose-400/5',
    accent: 'text-rose-400',
    border: 'border-rose-500/20',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 px-4 sm:px-6">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-border mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
              Under The Hood
            </span>
          </div>
          <h2 className="font-display font-700 text-3xl sm:text-4xl text-white tracking-tight">
            How it <span className="text-gradient-cyan">works</span>
          </h2>
          <p className="mt-3 text-white/40 font-body text-base max-w-lg mx-auto">
            Four steps from raw text to identified author, powered by classical NLP
            and machine learning.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="group glass-card rounded-2xl p-6 border border-border hover:border-border-bright transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Step number */}
              <div className="flex items-start justify-between mb-5">
                <div
                  className={`flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${step.color} border ${step.border} ${step.accent} group-hover:scale-105 transition-transform duration-300`}
                >
                  {step.icon}
                </div>
                <span className="font-mono font-500 text-3xl text-white/[0.06] group-hover:text-white/[0.10] transition-colors duration-300">
                  {step.number}
                </span>
              </div>

              <h3 className="font-display font-600 text-lg text-white/90 mb-2">
                {step.title}
              </h3>
              <p className="font-body text-sm text-white/40 leading-relaxed">
                {step.desc}
              </p>

              {/* Bottom accent line on hover */}
              <div
                className={`mt-4 h-px w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-transparent ${step.border.replace('border-', 'via-')} to-transparent`}
              />
            </div>
          ))}
        </div>

        {/* Tech stack badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <span className="font-mono text-xs text-white/25 uppercase tracking-widest mr-2">
            Powered by
          </span>
          {['FastAPI', 'scikit-learn', 'Python', 'React', 'Vite', 'Tailwind CSS'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-lg font-mono text-xs text-white/40 bg-white/[0.03] border border-border hover:border-border-bright hover:text-white/60 transition-all duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
