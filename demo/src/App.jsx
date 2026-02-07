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

export default function App() {
  const location = useLocation()

  return (
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
          </Routes>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
