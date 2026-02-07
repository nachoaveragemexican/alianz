import { useState } from 'react'
import Header from '../components/Header'
import { MapPin, Calendar as CalIcon, ChevronRight } from 'lucide-react'

const filters = ['Todos', 'Shows', 'Seminarios', 'Local']

const events = [
  {
    id: 1,
    title: 'Show Nacional Especialidad Alianz',
    location: 'Ciudad de México, MX',
    date: '15 Mar, 2025',
    day: 15,
    type: 'Shows',
  },
  {
    id: 2,
    title: 'Seminario de Grooming Profesional',
    location: 'Guadalajara, MX',
    date: '22 Mar, 2025',
    day: 22,
    type: 'Seminarios',
  },
  {
    id: 3,
    title: 'World Dog Show 2025',
    location: 'Madrid, España',
    date: '15 Oct, 2025',
    day: 15,
    type: 'Shows',
  },
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

  const filtered = activeFilter === 'Todos' ? events : events.filter(e => e.type === activeFilter)

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
                <button className="mt-3 w-full bg-gold-gradient text-white font-semibold text-sm py-2.5 rounded-xl active:scale-[0.97] transition-transform">
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
