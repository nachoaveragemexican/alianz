import { useState } from 'react'
import Header from '../components/Header'
import { Play, CheckCircle2, Circle, Award, Lock } from 'lucide-react'

const modules = [
  { id: 1, title: 'Show Stacking', desc: 'Posiciones y técnicas de presentación', status: 'completed' },
  { id: 2, title: 'Gait & Movement', desc: 'Movimiento y desplazamiento en pista', status: 'completed' },
  { id: 3, title: 'Ring Etiquette', desc: 'Protocolo y comportamiento en el ring', status: 'current' },
  { id: 4, title: 'Grooming Profesional', desc: 'Preparación del perro para competencia', status: 'locked' },
  { id: 5, title: 'Evaluación Final', desc: 'Examen práctico y teórico', status: 'locked' },
]

export default function University() {
  const [activeModule] = useState(3)
  const completedCount = modules.filter(m => m.status === 'completed').length
  const progress = Math.round((completedCount / modules.length) * 100)

  return (
    <div className="h-full flex flex-col">
      <Header title="Alianz Universidad" showBack rightIcon="globe" />

      <div className="flex-1 overflow-y-auto scroll-area bg-cream">
        <div className="px-4 pt-4 pb-6">

          {/* Video thumbnail */}
          <div className="relative rounded-2xl overflow-hidden card-shadow">
            <img
              src="/images/dog-golden.jpg"
              alt="Curso"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
                <Play size={24} className="text-navy ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute top-3 left-3 bg-navy/80 text-white text-xs px-2 py-1 rounded-full">
              Módulo 3: Ring Etiquette
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-navy font-semibold text-sm">{progress}% Completado</span>
                <span className="text-gray-400 text-xs">{completedCount}/{modules.length} módulos</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-gold-gradient h-2.5 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className="shrink-0">
              <img src="/images/seal-alianz.png" alt="Certificado" className="w-12 h-12 object-contain opacity-40" />
            </div>
          </div>

          {/* Certificate preview */}
          <div className="mt-4 bg-gold/5 border border-gold/20 rounded-xl p-3 flex items-center gap-3">
            <Award size={24} className="text-gold shrink-0" />
            <div>
              <p className="text-navy text-sm font-semibold">Certificación de Handler</p>
              <p className="text-gray-500 text-xs">Completa todos los módulos para obtener tu certificado oficial</p>
            </div>
          </div>

          {/* Modules */}
          <div className="mt-5">
            <h3 className="text-navy font-bold text-base mb-3">Módulos</h3>
            <div className="space-y-2.5">
              {modules.map((mod) => (
                <button
                  key={mod.id}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left ${
                    mod.status === 'current'
                      ? 'bg-white card-shadow border-l-4 border-gold'
                      : mod.status === 'completed'
                      ? 'bg-white card-shadow'
                      : 'bg-gray-100/50'
                  }`}
                  disabled={mod.status === 'locked'}
                >
                  <div className="shrink-0">
                    {mod.status === 'completed' ? (
                      <CheckCircle2 size={22} className="text-green-500" />
                    ) : mod.status === 'current' ? (
                      <Circle size={22} className="text-gold" />
                    ) : (
                      <Lock size={18} className="text-gray-300 ml-0.5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-[10px]">Módulo {mod.id}:</span>
                      {mod.status === 'completed' && (
                        <span className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">Completado</span>
                      )}
                      {mod.status === 'current' && (
                        <span className="text-[10px] text-gold-dark bg-gold/10 px-1.5 py-0.5 rounded-full">En progreso</span>
                      )}
                    </div>
                    <p className={`font-semibold text-sm mt-0.5 ${mod.status === 'locked' ? 'text-gray-300' : 'text-navy'}`}>
                      {mod.title}
                    </p>
                    <p className={`text-xs mt-0.5 ${mod.status === 'locked' ? 'text-gray-300' : 'text-gray-400'}`}>
                      {mod.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
