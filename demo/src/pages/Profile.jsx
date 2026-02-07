import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import { img } from '../utils'
import {
  Award, PawPrint, Calendar, Star, Settings, LogOut,
  ChevronRight, Shield, Globe
} from 'lucide-react'

const badges = [
  { label: 'Handler Certificado', icon: Award, color: 'text-gold-dark', bg: 'bg-gold/10' },
  { label: 'Criador Profesional', icon: PawPrint, color: 'text-green-600', bg: 'bg-green-50' },
  { label: '10+ Eventos', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Miembro Premium', icon: Star, color: 'text-purple-600', bg: 'bg-purple-50' },
]

const stats = [
  { value: '12', label: 'Pedigrees' },
  { value: '8', label: 'Eventos' },
  { value: '3', label: 'Certificaciones' },
  { value: '156', label: 'Puntos' },
]

const menuItems = [
  { label: 'Mi Kennel', icon: PawPrint, path: '/kennel' },
  { label: 'Mis Certificaciones', icon: Award, path: '/universidad' },
  { label: 'Mis Eventos', icon: Calendar, path: '/eventos' },
  { label: 'Verificación Profesional', icon: Shield, path: null },
  { label: 'Configuración', icon: Settings, path: null },
]

export default function Profile() {
  const navigate = useNavigate()

  return (
    <div className="h-full flex flex-col">
      <Header title="Perfil" rightIcon="globe" />

      <div className="flex-1 overflow-y-auto scroll-area bg-cream">
        {/* Profile header */}
        <div className="bg-navy-gradient px-4 pt-4 pb-8 text-center">
          <img
            src={img('images/avatar-ricardo.jpg')}
            alt="Ricardo"
            className="w-20 h-20 rounded-full border-3 border-gold mx-auto object-cover"
          />
          <h2 className="text-white font-bold text-xl mt-3">Ricardo Martínez</h2>
          <p className="text-gold/70 text-sm mt-0.5">Handler & Criador Profesional</p>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <Globe size={12} className="text-gray-400" />
            <span className="text-gray-400 text-xs">México | Miembro desde 2019</span>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-4 -mt-4 bg-white rounded-2xl card-shadow p-4 grid grid-cols-4 gap-2">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-navy font-bold text-xl">{s.value}</p>
              <p className="text-gray-400 text-[10px]">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="px-4 pt-5 pb-6">
          {/* Badges */}
          <h3 className="text-navy font-bold text-base mb-3">Insignias</h3>
          <div className="grid grid-cols-2 gap-2 mb-5">
            {badges.map((b) => {
              const Icon = b.icon
              return (
                <div key={b.label} className={`${b.bg} rounded-xl p-3 flex items-center gap-2`}>
                  <Icon size={18} className={b.color} />
                  <span className="text-navy text-xs font-medium">{b.label}</span>
                </div>
              )
            })}
          </div>

          {/* Menu */}
          <h3 className="text-navy font-bold text-base mb-3">Mi Cuenta</h3>
          <div className="bg-white rounded-2xl card-shadow overflow-hidden">
            {menuItems.map((item, i) => {
              const Icon = item.icon
              return (
                <button
                  key={item.label}
                  onClick={() => item.path && navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${
                    i < menuItems.length - 1 ? 'border-b border-gray-50' : ''
                  }`}
                >
                  <Icon size={18} className="text-gold shrink-0" />
                  <span className="text-navy text-sm flex-1">{item.label}</span>
                  <ChevronRight size={16} className="text-gray-300" />
                </button>
              )
            })}
          </div>

          {/* Logout */}
          <button className="mt-4 w-full flex items-center justify-center gap-2 py-3 text-red-400 text-sm">
            <LogOut size={16} />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  )
}
