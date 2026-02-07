import { Routes, Route, useLocation } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Pedigree from './pages/Pedigree'
import University from './pages/University'
import Community from './pages/Community'
import Events from './pages/Events'
import Profile from './pages/Profile'
import Messages from './pages/Messages'

export default function App() {
  const location = useLocation()

  return (
    <div className="h-full flex flex-col bg-cream max-w-[430px] mx-auto relative overflow-hidden"
         style={{ height: '100dvh' }}>
      <div className="flex-1 overflow-hidden">
        <div className="h-full page-transition" key={location.pathname}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pedigree" element={<Pedigree />} />
            <Route path="/universidad" element={<University />} />
            <Route path="/comunidad" element={<Community />} />
            <Route path="/eventos" element={<Events />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/mensajes" element={<Messages />} />
          </Routes>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
