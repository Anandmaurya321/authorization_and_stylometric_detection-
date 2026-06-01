import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import DetectorCard from './components/DetectorCard.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen bg-void">
      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Global ambient mesh */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 10% 20%, rgba(109,40,217,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 90% 70%, rgba(0,229,255,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 40% 60% at 50% 100%, rgba(109,40,217,0.05) 0%, transparent 60%)
          `,
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <DetectorCard />
          <HowItWorks />
        </main>
        <Footer />
      </div>
    </div>
  )
}
