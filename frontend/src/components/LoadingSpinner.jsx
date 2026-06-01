/**
 * LoadingSpinner — multi-ring orbital loader with scan animation
 */
export default function LoadingSpinner({ size = 'md' }) {
  const sizes = {
    sm: { outer: 32, inner: 20, dot: 3 },
    md: { outer: 64, inner: 44, dot: 5 },
    lg: { outer: 96, inner: 68, dot: 7 },
  }
  const s = sizes[size] || sizes.md

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: s.outer, height: s.outer }}
      role="status"
      aria-label="Loading..."
    >
      {/* Outer ring — cyan, slow */}
      <div
        className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
        style={{
          borderTopColor: 'rgba(0,229,255,0.8)',
          borderRightColor: 'rgba(0,229,255,0.2)',
          animationDuration: '1.4s',
        }}
      />

      {/* Middle ring — violet, medium, reverse */}
      <div
        className="absolute rounded-full border-2 border-transparent"
        style={{
          width: s.inner,
          height: s.inner,
          borderTopColor: 'rgba(168,85,247,0.0)',
          borderBottomColor: 'rgba(168,85,247,0.7)',
          animation: 'spin 1.0s linear infinite reverse',
        }}
      />

      {/* Inner glow dot */}
      <div
        className="rounded-full bg-cyan-glow animate-pulse"
        style={{
          width: s.dot,
          height: s.dot,
          boxShadow: '0 0 8px rgba(0,229,255,0.9)',
        }}
      />

      {/* Glow halo */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
