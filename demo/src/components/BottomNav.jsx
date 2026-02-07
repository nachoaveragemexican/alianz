import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Calendar, GraduationCap, Users, User } from 'lucide-react'

const tabs = [
  { path: '/', label: 'Inicio', icon: Home },
  { path: '/eventos', label: 'Eventos', icon: Calendar },
  { path: '/universidad', label: 'Cursos', icon: GraduationCap },
  { path: '/comunidad', label: 'Comunidad', icon: Users },
  { path: '/perfil', label: 'Perfil', icon: User },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="safe-bottom bg-white border-t border-gray-200 flex items-center justify-around px-2 pt-2 pb-2">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path
        const Icon = tab.icon
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors ${
              isActive
                ? 'text-navy'
                : 'text-gray-400'
            }`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
            <span className={`text-[10px] ${isActive ? 'font-semibold' : 'font-normal'}`}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
