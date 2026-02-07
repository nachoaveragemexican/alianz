import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { img } from '../utils'
import { Plus, ChevronRight, Award } from 'lucide-react'

export default function Kennel() {
  const navigate = useNavigate()

  return (
    <div className="h-full flex flex-col">
      <Header title="Kennel Virtual" showBack />

      <div className="flex-1 overflow-y-auto scroll-area -mt-5 rounded-t-3xl bg-cream">
        <div className="px-4 pt-5 pb-6">

          {/* Stats bar */}
          <div className="bg-white rounded-2xl card-shadow p-4 flex items-center justify-around mb-5">
            <div className="text-center">
              <p className="text-navy font-bold text-2xl">1</p>
              <p className="text-gray-400 text-xs">Registrados</p>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="text-center">
              <p className="text-gold font-bold text-2xl">1</p>
              <p className="text-gray-400 text-xs">Campeones</p>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="text-center">
              <p className="text-navy font-bold text-2xl">3</p>
              <p className="text-gray-400 text-xs">Títulos</p>
            </div>
          </div>

          {/* Dog card */}
          <p className="text-navy font-bold text-base mb-3">Mis Perros</p>

          <button
            onClick={() => navigate('/pedigree')}
            className="w-full bg-white rounded-2xl card-shadow overflow-hidden active:scale-[0.98] transition-transform mb-3"
          >
            <div className="flex items-center gap-3 p-3">
              <img
                src={img('images/dog-doberman.jpg')}
                alt="CH. Maximus"
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Award size={14} className="text-gold shrink-0" />
                  <span className="text-gold-dark text-[10px] font-semibold uppercase tracking-wider">Campeón</span>
                </div>
                <h3 className="text-navy font-bold text-sm leading-snug">CH. Maximus Prince of Alianz</h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] bg-gold/10 text-gold-dark px-2 py-0.5 rounded-full font-medium">Doberman</span>
                  <span className="text-[10px] bg-navy/5 text-navy px-2 py-0.5 rounded-full font-medium">Macho</span>
                </div>
                <p className="text-gray-400 text-[10px] mt-1">Registro: MX-2025-00847</p>
              </div>
              <ChevronRight size={18} className="text-gray-300 shrink-0" />
            </div>
          </button>

          {/* Add new dog */}
          <button
            onClick={() => navigate('/registro')}
            className="w-full border-2 border-dashed border-gold/40 rounded-2xl p-6 flex flex-col items-center gap-2 active:scale-[0.98] transition-transform hover:border-gold/60 hover:bg-gold/5"
          >
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
              <Plus size={24} className="text-gold" />
            </div>
            <span className="text-navy font-semibold text-sm">Agregar Registro</span>
            <span className="text-gray-400 text-xs">Registra un nuevo perro en tu kennel</span>
          </button>

        </div>
      </div>
    </div>
  )
}
