import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Kennel from './pages/Kennel'
import Pedigree from './pages/Pedigree'
import Register from './pages/Register'
import University from './pages/University'
import Community from './pages/Community'
import Events from './pages/Events'
import Profile from './pages/Profile'
import Messages from './pages/Messages'
import Settings from './pages/Settings'
import Verification from './pages/Verification'
import { img } from './utils'

function DemoGate({ children }) {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}demo-access.json?t=${Date.now()}`)
      .then(r => r.json())
      .then(data => setStatus(data.enabled ? 'active' : 'expired'))
      .catch(() => setStatus('active'))
  }, [])

  if (status === 'loading') {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-navy-gradient"
           style={{ height: '100dvh' }}>
        <h1 className="font-serif text-gold text-4xl italic">Alianz</h1>
        <div className="mt-4 w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    )
  }

  if (status === 'expired') {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-navy-gradient px-8 text-center"
           style={{ height: '100dvh' }}>
        <img src={img('images/logo-alianz.png')} alt="Alianz" className="w-20 h-20 mb-6 opacity-50" />
        <h1 className="font-serif text-gold text-3xl italic mb-3">Demo Finalizado</h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          Esta demostración ha concluido. Gracias por su interés en Alianz Virtual.
        </p>
        <p className="text-gray-500 text-xs mt-6">Contacte a su representante para más información.</p>
      </div>
    )
  }

  return children
}

export default function App() {
  const location = useLocation()

  return (
    <DemoGate>
      <div className="h-full flex flex-col bg-cream max-w-[430px] mx-auto relative overflow-hidden"
           style={{ height: '100dvh' }}>
        <div className="flex-1 overflow-hidden">
          <div className="h-full page-transition" key={location.pathname}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/kennel" element={<Kennel />} />
              <Route path="/pedigree" element={<Pedigree />} />
              <Route path="/registro" element={<Register />} />
              <Route path="/universidad" element={<University />} />
              <Route path="/comunidad" element={<Community />} />
              <Route path="/eventos" element={<Events />} />
              <Route path="/perfil" element={<Profile />} />
              <Route path="/mensajes" element={<Messages />} />
              <Route path="/configuracion" element={<Settings />} />
              <Route path="/verificacion" element={<Verification />} />
            </Routes>
          </div>
        </div>
        <BottomNav />
      </div>
    </DemoGate>
  )
}
