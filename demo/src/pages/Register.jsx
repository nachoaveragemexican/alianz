import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Check, PawPrint, Camera } from 'lucide-react'
import { img } from '../utils'

const breeds = [
  'Doberman', 'Golden Retriever', 'Pastor Alemán', 'Poodle', 'Bulldog Francés',
  'Labrador Retriever', 'Chihuahua', 'Rottweiler', 'Husky Siberiano', 'Boxer',
  'Yorkshire Terrier', 'Schnauzer', 'Dálmata', 'Beagle', 'Otro',
]

const steps = [
  { id: 'name', question: '¿Cómo se llama tu perro?', subtitle: 'Nombre completo como aparecerá en el pedigree', type: 'text', placeholder: 'Ej: Maximus Prince of Alianz' },
  { id: 'breed', question: '¿Cuál es su raza?', subtitle: 'Selecciona de la lista o escribe para buscar', type: 'select' },
  { id: 'sex', question: '¿Es macho o hembra?', subtitle: 'Selecciona el sexo de tu perro', type: 'choice', options: ['Macho', 'Hembra'] },
  { id: 'dob', question: '¿Cuándo nació?', subtitle: 'Fecha de nacimiento', type: 'date' },
  { id: 'color', question: '¿De qué color es?', subtitle: 'Color principal del pelaje', type: 'text', placeholder: 'Ej: Negro y fuego' },
  { id: 'microchip', question: '¿Tiene microchip?', subtitle: 'Número de identificación del microchip', type: 'text', placeholder: 'Ej: 941000025678432' },
  { id: 'photo', question: 'Agrega una foto', subtitle: 'Una foto clara de perfil de tu perro', type: 'photo' },
  { id: 'confirm', question: '¡Listo para registrar!', subtitle: 'Revisa los datos antes de enviar', type: 'confirm' },
]

export default function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [data, setData] = useState({})
  const [breedSearch, setBreedSearch] = useState('')
  const [photoPreview, setPhotoPreview] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const current = steps[step]
  const progress = ((step + 1) / steps.length) * 100
  const canAdvance = current.type === 'confirm' || current.type === 'photo' || !!data[current.id]

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1)
    else {
      setSubmitted(true)
      setTimeout(() => navigate('/kennel'), 2500)
    }
  }

  const back = () => {
    if (step > 0) setStep(step - 1)
    else navigate('/kennel')
  }

  if (submitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-cream px-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
          <Check size={40} className="text-green-500" />
        </div>
        <h2 className="text-navy font-bold text-xl mb-2">¡Registro Enviado!</h2>
        <p className="text-gray-500 text-sm">Tu solicitud está siendo procesada. Recibirás una notificación cuando el pedigree esté listo.</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-cream">
      {/* Header */}
      <header className="bg-navy-gradient safe-top px-4 py-3 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <button onClick={back} className="text-gold">
            <ChevronLeft size={24} />
          </button>
          <span className="text-gold/70 text-sm font-medium">Paso {step + 1} de {steps.length}</span>
          <div className="w-6" />
        </div>
        <div className="w-full bg-navy-light rounded-full h-1.5">
          <div
            className="bg-gold-gradient h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Question area */}
      <div className="flex-1 overflow-y-auto scroll-area px-5 pt-8 pb-4 flex flex-col">
        <div className="flex-1">
          {/* Icon */}
          <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
            <PawPrint size={22} className="text-gold" />
          </div>

          <h2 className="text-navy font-bold text-xl mb-1">{current.question}</h2>
          <p className="text-gray-400 text-sm mb-6">{current.subtitle}</p>

          {/* Text input */}
          {current.type === 'text' && (
            <input
              type="text"
              value={data[current.id] || ''}
              onChange={e => setData({ ...data, [current.id]: e.target.value })}
              placeholder={current.placeholder}
              autoFocus
              className="w-full bg-white border-2 border-gray-200 focus:border-gold rounded-xl px-4 py-3.5 text-navy text-base outline-none transition-colors placeholder:text-gray-300"
            />
          )}

          {/* Date input */}
          {current.type === 'date' && (
            <input
              type="date"
              value={data[current.id] || ''}
              onChange={e => setData({ ...data, [current.id]: e.target.value })}
              className="w-full bg-white border-2 border-gray-200 focus:border-gold rounded-xl px-4 py-3.5 text-navy text-base outline-none transition-colors"
            />
          )}

          {/* Choice buttons */}
          {current.type === 'choice' && (
            <div className="flex gap-3">
              {current.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => setData({ ...data, [current.id]: opt })}
                  className={`flex-1 py-4 rounded-xl font-semibold text-base transition-all ${
                    data[current.id] === opt
                      ? 'bg-gold-gradient text-white scale-[1.02] card-shadow'
                      : 'bg-white border-2 border-gray-200 text-navy'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Breed select */}
          {current.type === 'select' && (
            <div>
              <input
                type="text"
                value={breedSearch}
                onChange={e => setBreedSearch(e.target.value)}
                placeholder="Buscar raza..."
                autoFocus
                className="w-full bg-white border-2 border-gray-200 focus:border-gold rounded-xl px-4 py-3 text-navy text-sm outline-none transition-colors placeholder:text-gray-300 mb-3"
              />
              <div className="space-y-2 max-h-60 overflow-y-auto scroll-area">
                {breeds
                  .filter(b => b.toLowerCase().includes(breedSearch.toLowerCase()))
                  .map(b => (
                    <button
                      key={b}
                      onClick={() => { setData({ ...data, breed: b }); setBreedSearch(b) }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
                        data.breed === b
                          ? 'bg-gold-gradient text-white font-semibold'
                          : 'bg-white text-navy hover:bg-gray-50'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Photo upload */}
          {current.type === 'photo' && (
            <label className="block cursor-pointer">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={e => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const url = URL.createObjectURL(file)
                    setPhotoPreview(url)
                    setData({ ...data, photo: file.name })
                  }
                }}
              />
              {photoPreview ? (
                <div className="relative rounded-2xl overflow-hidden card-shadow">
                  <img src={photoPreview} alt="Preview" className="w-full h-64 object-cover" />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white font-medium text-sm flex items-center gap-2">
                      <Camera size={16} />
                      Toca para cambiar foto
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-full bg-white border-2 border-dashed border-gray-200 rounded-2xl py-12 flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center">
                    <Camera size={28} className="text-gold" />
                  </div>
                  <span className="text-navy font-medium text-sm">Toca para tomar o seleccionar foto</span>
                  <span className="text-gray-400 text-xs">JPG o PNG, máximo 10MB</span>
                </div>
              )}
            </label>
          )}

          {/* Confirmation */}
          {current.type === 'confirm' && (
            <div className="bg-white rounded-2xl card-shadow overflow-hidden">
              {photoPreview && (
                <img src={photoPreview} alt="Preview" className="w-full h-40 object-cover" />
              )}
              <div className="p-4 space-y-3">
                {Object.entries(data).map(([key, val]) => {
                  const label = {
                    name: 'Nombre', breed: 'Raza', sex: 'Sexo',
                    dob: 'Nacimiento', color: 'Color', microchip: 'Microchip'
                  }[key]
                  if (!label) return null
                  return (
                    <div key={key} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                      <span className="text-gray-400 text-sm">{label}</span>
                      <span className="text-navy font-medium text-sm">{val}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Next button */}
        <button
          onClick={next}
          disabled={!canAdvance}
          className={`mt-6 w-full py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all ${
            canAdvance
              ? 'bg-gold-gradient text-white active:scale-[0.97]'
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          {step === steps.length - 1 ? (
            <>
              <Check size={20} />
              Enviar Registro
            </>
          ) : (
            <>
              Continuar
              <ChevronRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
