import { useState } from 'react'
import Header from '../components/Header'
import { img } from '../utils'
import {
  MapPin, Calendar as CalIcon, ChevronRight, ChevronLeft,
  Check, Award, CreditCard, X, PawPrint
} from 'lucide-react'

const filters = ['Todos', 'Shows', 'Seminarios', 'Local']

const events = [
  {
    id: 1,
    title: 'Show Nacional Especialidad Alianz',
    location: 'Ciudad de México, MX',
    date: '15 Mar, 2025',
    day: 15,
    type: 'Shows',
    price: 1850,
    currency: 'MXN',
  },
  {
    id: 2,
    title: 'Seminario de Grooming Profesional',
    location: 'Guadalajara, MX',
    date: '22 Mar, 2025',
    day: 22,
    type: 'Seminarios',
    price: 950,
    currency: 'MXN',
  },
  {
    id: 3,
    title: 'World Dog Show 2025',
    location: 'Madrid, España',
    date: '15 Oct, 2025',
    day: 15,
    type: 'Shows',
    price: 120,
    currency: 'EUR',
  },
]

const kennelDogs = [
  {
    id: 1,
    name: 'CH. Maximus Prince of Alianz',
    breed: 'Doberman',
    sex: 'Macho',
    reg: 'MX-2025-00847',
    img: 'images/dog-doberman.jpg',
  },
]

const categories = [
  { id: 'open', label: 'Clase Abierta', desc: 'Perros de 15+ meses' },
  { id: 'champion', label: 'Clase Campeones', desc: 'Perros con título CH' },
  { id: 'veteran', label: 'Clase Veteranos', desc: 'Perros de 8+ años' },
  { id: 'puppy', label: 'Clase Cachorros', desc: 'Perros de 6-9 meses' },
]

const calendarDays = [
  [null, null, null, null, null, null, 1],
  [2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20, 21, 22],
  [23, 24, 25, 26, 27, 28, 29],
  [30, 31, null, null, null, null, null],
]

const eventDays = [7, 14, 15, 22, 23]

export default function Events() {
  const [activeFilter, setActiveFilter] = useState('Todos')
  const [selectedDay, setSelectedDay] = useState(14)

  // Registration flow state
  const [regEvent, setRegEvent] = useState(null)
  const [regStep, setRegStep] = useState(0) // 0=dog, 1=category, 2=confirm
  const [selectedDog, setSelectedDog] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [regSuccess, setRegSuccess] = useState(false)

  const filtered = activeFilter === 'Todos' ? events : events.filter(e => e.type === activeFilter)

  const startRegistration = (ev) => {
    setRegEvent(ev)
    setRegStep(0)
    setSelectedDog(null)
    setSelectedCategory(null)
    setRegSuccess(false)
  }

  const closeRegistration = () => {
    setRegEvent(null)
    setRegStep(0)
    setSelectedDog(null)
    setSelectedCategory(null)
    setRegSuccess(false)
  }

  const regNext = () => {
    if (regStep < 2) setRegStep(regStep + 1)
    else {
      setRegSuccess(true)
      setTimeout(closeRegistration, 3000)
    }
  }

  const regBack = () => {
    if (regStep > 0) setRegStep(regStep - 1)
    else closeRegistration()
  }

  const canAdvanceReg = regStep === 0 ? !!selectedDog : regStep === 1 ? !!selectedCategory : true

  // Registration overlay
  if (regEvent && regSuccess) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-cream px-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
          <Check size={40} className="text-green-500" />
        </div>
        <h2 className="text-navy font-bold text-xl mb-2">¡Inscripción Confirmada!</h2>
        <p className="text-gray-500 text-sm mb-1">Tu registro para <span className="font-semibold">{regEvent.title}</span> ha sido procesado.</p>
        <p className="text-gray-400 text-xs">Recibirás un correo de confirmación con los detalles.</p>
      </div>
    )
  }

  if (regEvent) {
    const progress = ((regStep + 1) / 3) * 100
    const stepLabels = ['Selecciona Perro', 'Categoría', 'Confirmación']

    return (
      <div className="h-full flex flex-col bg-cream">
        {/* Header */}
        <header className="bg-navy-gradient safe-top px-4 py-3 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <button onClick={regBack} className="text-gold">
              <ChevronLeft size={24} />
            </button>
            <span className="text-gold/70 text-sm font-medium">Paso {regStep + 1} de 3</span>
            <button onClick={closeRegistration} className="text-gray-400">
              <X size={20} />
            </button>
          </div>
          <div className="w-full bg-navy-light rounded-full h-1.5">
            <div
              className="bg-gold-gradient h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto scroll-area px-5 pt-6 pb-4 flex flex-col">
          <div className="flex-1">
            {/* Event badge */}
            <div className="bg-navy/5 rounded-xl px-3 py-2 mb-5 flex items-center gap-2">
              <CalIcon size={14} className="text-navy shrink-0" />
              <span className="text-navy text-xs font-medium truncate">{regEvent.title}</span>
            </div>

            {/* Step 0: Select Dog */}
            {regStep === 0 && (
              <>
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                  <PawPrint size={22} className="text-gold" />
                </div>
                <h2 className="text-navy font-bold text-xl mb-1">¿Con cuál perro participas?</h2>
                <p className="text-gray-400 text-sm mb-6">Selecciona un perro de tu Kennel Virtual</p>

                <div className="space-y-3">
                  {kennelDogs.map(dog => (
                    <button
                      key={dog.id}
                      onClick={() => setSelectedDog(dog)}
                      className={`w-full rounded-2xl overflow-hidden transition-all ${
                        selectedDog?.id === dog.id
                          ? 'ring-2 ring-gold card-shadow scale-[1.01]'
                          : 'bg-white card-shadow'
                      }`}
                    >
                      <div className="flex items-center gap-3 p-3">
                        <img
                          src={img(dog.img)}
                          alt={dog.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1 text-left min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <Award size={14} className="text-gold shrink-0" />
                            <span className="text-gold-dark text-[10px] font-semibold uppercase tracking-wider">Campeón</span>
                          </div>
                          <h3 className="text-navy font-bold text-sm leading-snug">{dog.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] bg-gold/10 text-gold-dark px-2 py-0.5 rounded-full font-medium">{dog.breed}</span>
                            <span className="text-[10px] bg-navy/5 text-navy px-2 py-0.5 rounded-full font-medium">{dog.sex}</span>
                          </div>
                        </div>
                        {selectedDog?.id === dog.id && (
                          <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center shrink-0">
                            <Check size={14} className="text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Step 1: Select Category */}
            {regStep === 1 && (
              <>
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                  <Award size={22} className="text-gold" />
                </div>
                <h2 className="text-navy font-bold text-xl mb-1">¿En qué clase compites?</h2>
                <p className="text-gray-400 text-sm mb-6">Selecciona la categoría de competencia</p>

                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-4 py-3.5 rounded-xl transition-all ${
                        selectedCategory?.id === cat.id
                          ? 'bg-gold-gradient text-white card-shadow scale-[1.01]'
                          : 'bg-white text-navy card-shadow'
                      }`}
                    >
                      <p className={`font-semibold text-sm ${selectedCategory?.id === cat.id ? 'text-white' : 'text-navy'}`}>
                        {cat.label}
                      </p>
                      <p className={`text-xs mt-0.5 ${selectedCategory?.id === cat.id ? 'text-white/70' : 'text-gray-400'}`}>
                        {cat.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Step 2: Confirmation */}
            {regStep === 2 && (
              <>
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                  <CreditCard size={22} className="text-gold" />
                </div>
                <h2 className="text-navy font-bold text-xl mb-1">Confirma tu inscripción</h2>
                <p className="text-gray-400 text-sm mb-6">Revisa los detalles antes de pagar</p>

                <div className="bg-white rounded-2xl card-shadow overflow-hidden">
                  {/* Dog info */}
                  <div className="flex items-center gap-3 p-4 border-b border-gray-50">
                    <img
                      src={img(selectedDog.img)}
                      alt={selectedDog.name}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-navy font-bold text-sm leading-snug">{selectedDog.name}</h3>
                      <p className="text-gray-400 text-xs mt-0.5">{selectedDog.breed} · {selectedDog.sex}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Evento</span>
                      <span className="text-navy font-medium text-sm text-right max-w-[60%]">{regEvent.title}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Fecha</span>
                      <span className="text-navy font-medium text-sm">{regEvent.date}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Ubicación</span>
                      <span className="text-navy font-medium text-sm">{regEvent.location}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Clase</span>
                      <span className="text-navy font-medium text-sm">{selectedCategory.label}</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mx-4 border-t border-gray-100 py-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Inscripción</span>
                      <span className="text-navy text-sm">${regEvent.price.toLocaleString()} {regEvent.currency}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Comisión Alianz</span>
                      <span className="text-navy text-sm">${Math.round(regEvent.price * 0.05).toLocaleString()} {regEvent.currency}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                      <span className="text-navy font-bold text-base">Total</span>
                      <span className="text-navy font-bold text-base">${Math.round(regEvent.price * 1.05).toLocaleString()} {regEvent.currency}</span>
                    </div>
                  </div>

                  {/* Card on file */}
                  <div className="mx-4 mb-4 bg-navy/5 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-10 h-7 bg-navy rounded-md flex items-center justify-center">
                      <CreditCard size={16} className="text-gold" />
                    </div>
                    <div className="flex-1">
                      <p className="text-navy text-sm font-medium">•••• •••• •••• 4832</p>
                      <p className="text-gray-400 text-[10px]">Visa · Tarjeta en archivo</p>
                    </div>
                    <Check size={16} className="text-green-500" />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Action button */}
          <button
            onClick={regNext}
            disabled={!canAdvanceReg}
            className={`mt-6 w-full py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all ${
              canAdvanceReg
                ? 'bg-gold-gradient text-white active:scale-[0.97]'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            {regStep === 2 ? (
              <>
                <CreditCard size={20} />
                Pagar y Confirmar
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

  return (
    <div className="h-full flex flex-col">
      <Header title="Calendario de Eventos" showBack />

      <div className="flex-1 overflow-y-auto scroll-area bg-cream">
        <div className="px-4 pt-4 pb-6">

          {/* Filters */}
          <div className="flex gap-2 mb-4">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === f
                    ? 'bg-navy text-white'
                    : 'bg-white text-navy border border-navy/15'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-2xl card-shadow p-4 mb-4">
            <p className="text-navy font-bold text-center mb-3">Marzo 2025</p>
            <div className="grid grid-cols-7 text-center text-xs text-gray-400 mb-2">
              {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map(d => (
                <span key={d} className="py-1">{d}</span>
              ))}
            </div>
            {calendarDays.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 text-center">
                {week.map((day, di) => (
                  <button
                    key={di}
                    onClick={() => day && setSelectedDay(day)}
                    disabled={!day}
                    className={`py-1.5 text-sm relative ${
                      !day ? '' :
                      day === selectedDay
                        ? 'bg-navy text-white rounded-full font-bold'
                        : 'text-navy hover:bg-gray-50 rounded-full'
                    }`}
                  >
                    {day || ''}
                    {day && eventDays.includes(day) && day !== selectedDay && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Event cards */}
          <div className="space-y-3">
            {filtered.map(ev => (
              <div key={ev.id} className="bg-white rounded-2xl card-shadow p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-navy font-bold text-sm leading-snug">{ev.title}</h3>
                    <div className="flex items-center gap-1.5 mt-2 text-gray-400">
                      <MapPin size={14} />
                      <span className="text-xs">{ev.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 text-gray-400">
                      <CalIcon size={14} />
                      <span className="text-xs">{ev.date}</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 mt-1" />
                </div>
                <button
                  onClick={() => startRegistration(ev)}
                  className="mt-3 w-full bg-gold-gradient text-white font-semibold text-sm py-2.5 rounded-xl active:scale-[0.97] transition-transform"
                >
                  Registrarse
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
