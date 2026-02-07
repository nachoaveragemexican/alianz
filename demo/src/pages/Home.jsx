import { useNavigate } from 'react-router-dom'
import { PawPrint, Calendar, GraduationCap, Users, Globe, MessageCircle, Crown } from 'lucide-react'
import { img } from '../utils'

const tiles = [
  { label: 'Kennel Virtual', icon: PawPrint, path: '/kennel' },
  { label: 'Eventos', icon: Calendar, path: '/eventos' },
  { label: 'Universidad', icon: GraduationCap, path: '/universidad' },
  { label: 'Comunidad', icon: Users, path: '/comunidad' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="h-full flex flex-col">
      {/* Navy header — branding only */}
      <header className="bg-navy-gradient safe-top px-5 pb-12 shrink-0 flex items-center justify-center" style={{ minHeight: '120px' }}>
        <div className="flex items-center justify-between w-full">
          <div className="w-7" />
          <h1 className="font-serif text-gold text-4xl italic tracking-wide">Alianz</h1>
          <Globe size={28} className="text-gold/70" />
        </div>
      </header>

      {/* Content on cream — overlaps navy header */}
      <div className="flex-1 overflow-y-auto scroll-area -mt-5 rounded-t-3xl bg-cream">
        <div className="px-4 pt-5 pb-4">
          {/* Welcome + avatar row */}
          <div className="flex items-center gap-3 mb-5">
            <button onClick={() => navigate('/perfil')} className="shrink-0">
              <img
                src={img('images/avatar-ricardo.jpg')}
                alt="Ricardo"
                className="w-14 h-14 rounded-full border-2 border-gold object-cover"
              />
            </button>
            <div>
              <p className="text-gray-400 text-sm">Bienvenido de nuevo,</p>
              <p className="text-navy text-xl font-bold">Ricardo!</p>
            </div>
            <button
              onClick={() => navigate('/mensajes')}
              className="ml-auto bg-navy/10 p-2.5 rounded-full relative"
            >
              <MessageCircle size={20} className="text-navy" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">3</span>
              </span>
            </button>
          </div>

          {/* Quick action tiles */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {tiles.map((tile) => {
              const Icon = tile.icon
              return (
                <button
                  key={tile.label}
                  onClick={() => navigate(tile.path)}
                  className="bg-gold-gradient rounded-2xl p-4 flex flex-col items-center gap-2 active:scale-[0.97] transition-transform"
                >
                  <Icon size={28} className="text-white" />
                  <span className="text-white font-semibold text-sm">{tile.label}</span>
                </button>
              )
            })}
          </div>

          {/* Next event card */}
          <div className="bg-navy rounded-2xl p-4 card-shadow">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-gold text-xs font-medium uppercase tracking-wider">Próximo Evento:</p>
                <h3 className="text-white font-bold text-base mt-1">World Dog Show 2025</h3>
                <p className="text-gray-400 text-sm mt-0.5">Madrid, España - Oct 15-18</p>
              </div>
              {/* Gold medallion with crown */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold via-yellow-500 to-gold-dark flex items-center justify-center shrink-0 shadow-lg">
                <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center border-2 border-yellow-300/50">
                  <Crown size={26} className="text-white drop-shadow" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-1">
                <div className="bg-navy-light rounded-lg px-3 py-1.5">
                  <span className="text-white font-bold text-lg">15</span>
                </div>
                <span className="text-gold font-bold mx-1">:</span>
                <div className="bg-navy-light rounded-lg px-3 py-1.5">
                  <span className="text-white font-bold text-lg">18</span>
                </div>
                <span className="text-gray-400 text-xs ml-2">días : hrs</span>
              </div>
              <button
                onClick={() => navigate('/eventos')}
                className="bg-white text-navy text-sm font-semibold px-4 py-2 rounded-full active:scale-95 transition-transform"
              >
                Ver Detalles
              </button>
            </div>
          </div>

          {/* Recent activity */}
          <div className="mt-5">
            <h3 className="text-navy font-bold text-base mb-3">Actividad Reciente</h3>

            <div className="space-y-3">
              <div className="bg-white rounded-xl p-3 card-shadow flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <PawPrint size={18} className="text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-navy text-sm font-medium">Pedigree registrado</p>
                  <p className="text-gray-400 text-xs">CH. Maximus Prince - hace 2 días</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 card-shadow flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                  <GraduationCap size={18} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-navy text-sm font-medium">Módulo completado</p>
                  <p className="text-gray-400 text-xs">Gait & Movement - hace 5 días</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 card-shadow flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                  <Calendar size={18} className="text-gold-dark" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-navy text-sm font-medium">Inscripción confirmada</p>
                  <p className="text-gray-400 text-xs">Show Nacional Alianz - hace 1 semana</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
