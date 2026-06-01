import { useState, useRef, useCallback } from 'react'
import { detectAuthor } from '../services/api.js'
import LoadingSpinner from './LoadingSpinner.jsx'
import ResultDisplay from './ResultDisplay.jsx'

const MIN_CHARS = 100
const MAX_CHARS = 5000

const SAMPLE_TEXTS = [
  {
    label: 'Classic Prose',
    text: `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered as the rightful property of some one or other of their daughters.`,
  },
  {
    label: 'Victorian',
    text: `It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.`,
  },
  {
    label: 'American Realism',
    text: `You don't know about me without you have read a book by the name of The Adventures of Tom Sawyer; but that ain't no matter. That book was made by Mr. Mark Twain, and he told the truth, mainly. There was things which he stretched, but mainly he told the truth.`,
  },
]

export default function DetectorCard() {
  const [text, setText] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [author, setAuthor] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const textareaRef = useRef(null)

  const charCount = text.length
  const remaining = MIN_CHARS - charCount
  const isValid = charCount >= MIN_CHARS && charCount <= MAX_CHARS
  const isOverLimit = charCount > MAX_CHARS

  const handleSubmit = useCallback(async () => {
    if (!isValid || status === 'loading') return

    setStatus('loading')
    setAuthor(null)
    setErrorMsg('')

    try {
      const result = await detectAuthor(text)
      setAuthor(result.author)
      setStatus('success')
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }, [text, isValid, status])

  const handleReset = () => {
    setStatus('idle')
    setAuthor(null)
    setErrorMsg('')
    setText('')
    setTimeout(() => textareaRef.current?.focus(), 100)
  }

  const handleSample = (sampleText) => {
    setText(sampleText)
    setStatus('idle')
    setErrorMsg('')
    setTimeout(() => textareaRef.current?.focus(), 50)
  }

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <section id="detector" className="relative py-24 px-4 sm:px-6">
      {/* Background ambient */}
      <div className="absolute inset-0 bg-mesh-1 opacity-50" />
      <div className="absolute inset-0 bg-mesh-2 opacity-40" />

      <div className="relative max-w-3xl mx-auto">
        {/* Section label */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-border mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
              Author Detection Engine
            </span>
          </div>
          <h2 className="font-display font-700 text-3xl sm:text-4xl text-white tracking-tight">
            Paste your <span className="text-gradient-violet">passage</span>
          </h2>
          <p className="mt-3 text-white/40 font-body text-base max-w-md mx-auto">
            Minimum {MIN_CHARS} characters. The more text, the higher the confidence.
          </p>
        </div>

        {/* Main card */}
        <div className="glass-card rounded-3xl overflow-hidden border border-border-bright/40 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
          {/* Card top bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            </div>
            <span className="font-mono text-[10px] text-white/25 tracking-widest uppercase">
              scriptmind.ai — input
            </span>
            <div className="flex items-center gap-1">
              <div className="status-dot" />
              <span className="font-mono text-[10px] text-cyan-400/60">LIVE</span>
            </div>
          </div>

          {/* Input area — show when not in success state */}
          {status !== 'success' && (
            <div className="p-5 sm:p-7">
              {/* Sample text buttons */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest self-center mr-1">
                  Try:
                </span>
                {SAMPLE_TEXTS.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => handleSample(s.text)}
                    className="px-2.5 py-1 text-[11px] font-mono rounded-md border border-border text-white/40 hover:text-white/70 hover:border-border-bright hover:bg-white/[0.04] transition-all duration-200"
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Textarea wrapper */}
              <div
                className={`relative rounded-2xl border transition-all duration-300 ${
                  isOverLimit
                    ? 'border-rose-500/50 glow-border-rose'
                    : text.length > 0
                    ? 'border-violet-500/30 glow-border-violet'
                    : 'border-border'
                }`}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                {/* Inner top glow line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-px rounded-t-2xl transition-opacity duration-500 ${
                    text.length > 0 ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.5), transparent)',
                  }}
                />

                <textarea
                  ref={textareaRef}
                  className="author-textarea p-5 sm:p-6 min-h-[240px] max-h-[480px]"
                  placeholder="Paste a literary paragraph, excerpt, or writing sample here…&#10;&#10;The model will analyse stylometric features such as sentence length distribution, vocabulary richness, function word frequency, and syntactic patterns to identify the most likely author."
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS + 100))}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                />

                {/* Char count overlay */}
                <div className="flex items-center justify-between px-5 pb-4">
                  <span className="font-mono text-[11px] text-white/25">
                    {remaining > 0 ? (
                      <span className="text-yellow-500/60">{remaining} more chars needed</span>
                    ) : isOverLimit ? (
                      <span className="text-rose-400/80">
                        {charCount - MAX_CHARS} chars over limit
                      </span>
                    ) : (
                      <span className="text-emerald-400/60">✓ Ready to analyse</span>
                    )}
                  </span>
                  <span
                    className={`font-mono text-xs transition-colors ${
                      isOverLimit
                        ? 'text-rose-400/80'
                        : isValid
                        ? 'text-emerald-400/60'
                        : 'text-white/25'
                    }`}
                  >
                    {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 h-0.5 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min((charCount / MIN_CHARS) * 100, 100)}%`,
                    background: isValid
                      ? 'linear-gradient(90deg, #8b5cf6, #00e5ff)'
                      : 'linear-gradient(90deg, #4a4a7a, #6d28d9)',
                  }}
                />
              </div>

              {/* Error message */}
              {status === 'error' && (
                <div className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-rose-500/[0.08] border border-rose-500/20 animate-fade-in">
                  <svg
                    className="flex-shrink-0 mt-0.5"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgb(251,113,133)"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <div>
                    <p className="font-display font-500 text-sm text-rose-300">Detection Failed</p>
                    <p className="font-body text-xs text-rose-400/70 mt-0.5">{errorMsg}</p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="ml-auto text-rose-400/50 hover:text-rose-400/80 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              )}

              {/* Submit button */}
              <div className="mt-5 flex items-center justify-between gap-4">
                {/* Keyboard shortcut hint */}
                <span className="hidden sm:block font-mono text-[10px] text-white/20 tracking-wide">
                  ⌘↵ to detect
                </span>

                <button
                  onClick={handleSubmit}
                  disabled={!isValid || status === 'loading'}
                  className={`btn-primary relative flex-1 sm:flex-none sm:min-w-[200px] flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-display font-600 text-white text-base transition-all duration-300 ${
                    !isValid ? 'opacity-40 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2.5">
                    {status === 'loading' ? (
                      <>
                        <LoadingSpinner size="sm" />
                        <span>Analysing…</span>
                      </>
                    ) : (
                      <>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="11" cy="11" r="8"/>
                          <path d="m21 21-4.35-4.35"/>
                        </svg>
                        <span>Detect Author</span>
                      </>
                    )}
                  </span>
                </button>
              </div>

              {/* Fine print */}
              <p className="mt-4 text-center font-mono text-[10px] text-white/15 tracking-wide">
                Text is processed locally and never stored · scikit-learn backend
              </p>
            </div>
          )}

          {/* Loading state overlay */}
          {status === 'loading' && (
            <div className="flex flex-col items-center justify-center py-20 gap-6 animate-fade-in">
              <LoadingSpinner size="lg" />
              <div className="text-center">
                <p className="font-display font-600 text-white/80 text-lg">
                  Analysing writing style…
                </p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  {[
                    'Vocabulary fingerprint',
                    'Syntax patterns',
                    'Function words',
                  ].map((step, i) => (
                    <span
                      key={step}
                      className="font-mono text-[10px] text-white/30 tracking-widest animate-pulse"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    >
                      {i > 0 && <span className="mx-1 opacity-50">·</span>}
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Success result */}
          {status === 'success' && author && (
            <div className="p-5 sm:p-7">
              <ResultDisplay author={author} onReset={handleReset} />
            </div>
          )}
        </div>

        {/* Tip below card */}
        {status === 'idle' && (
          <p className="text-center mt-4 font-mono text-[11px] text-white/20 animate-fade-in">
            Works best with 200+ characters · literary prose · non-translated text
          </p>
        )}
      </div>
    </section>
  )
}
