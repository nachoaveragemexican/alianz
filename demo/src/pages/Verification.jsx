import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft, ChevronRight, Check, Shield, Camera,
  Upload, Award, Stethoscope, Scissors, Gavel, PawPrint, X
} from 'lucide-react'
import { img } from '../utils'

const professions = [
  { id: 'handler', label: 'Handler Profesional', desc: 'Presentador de perros en competencias oficiales', icon: PawPrint, color: 'text-gold-dark', bg: 'bg-gold/10' },
  { id: 'breeder', label: 'Criador Certificado', desc: 'Criador registrado con estándares de calidad', icon: Award, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'judge', label: 'Juez de Conformación', desc: 'Juez certificado para evaluar perros en shows', icon: Gavel, color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'vet', label: 'Médico Veterinario', desc: 'Veterinario con cédula profesional vigente', icon: Stethoscope, color: 'text-green-600', bg: 'bg-green-50' },
  { id: 'groomer', label: 'Groomer Profesional', desc: 'Estilista canino con formación certificada', icon: Scissors, color: 'text-pink-600', bg: 'bg-pink-50' },
]

const steps = [
  { id: 'profession', title: 'Tipo de Profesión' },
  { id: 'details', title: 'Datos Profesionales' },
  { id: 'document', title: 'Documento de Identidad' },
  { id: 'credential', title: 'Credencial Profesional' },
  { id: 'review', title: 'Revisión' },
]

const detailFields = {
  handler: [
    { key: 'license', label: 'Número de Licencia de Handler', placeholder: 'Ej: HDL-MX-2024-0847' },
    { key: 'federation', label: 'Federación Canina', placeholder: 'Ej: FCI, AKC, Alianz' },
    { key: 'experience', label: 'Años de Experiencia', placeholder: 'Ej: 8', type: 'number' },
    { key: 'specialty', label: 'Grupo de Especialidad', placeholder: 'Ej: Grupo 2 - Pinscher y Schnauzer' },
  ],
  breeder: [
    { key: 'kennel_name', label: 'Nombre del Criadero', placeholder: 'Ej: Von Alianz Kennel' },
    { key: 'registration', label: 'Registro de Criadero', placeholder: 'Ej: CRI-MX-2019-0312' },
    { key: 'breeds', label: 'Razas que Cría', placeholder: 'Ej: Doberman, Rottweiler' },
    { key: 'experience', label: 'Años como Criador', placeholder: 'Ej: 12', type: 'number' },
  ],
  judge: [
    { key: 'license', label: 'Licencia de Juez', placeholder: 'Ej: JDG-FCI-2020-0156' },
    { key: 'federation', label: 'Organismo Certificador', placeholder: 'Ej: FCI, AKC' },
    { key: 'groups', label: 'Grupos Autorizados', placeholder: 'Ej: Todos los grupos' },
    { key: 'events', label: 'Shows Juzgados (aprox.)', placeholder: 'Ej: 45', type: 'number' },
  ],
  vet: [
    { key: 'cedula', label: 'Cédula Profesional', placeholder: 'Ej: 12345678' },
    { key: 'university', label: 'Universidad', placeholder: 'Ej: UNAM - Facultad de Veterinaria' },
    { key: 'specialty', label: 'Especialidad', placeholder: 'Ej: Medicina de pequeñas especies' },
    { key: 'clinic', label: 'Clínica / Hospital', placeholder: 'Ej: Hospital Veterinario del Sur' },
  ],
  groomer: [
    { key: 'certification', label: 'Certificación de Grooming', placeholder: 'Ej: NDGAA, IPG, Alianz' },
    { key: 'school', label: 'Escuela de Formación', placeholder: 'Ej: Alianz Grooming Academy' },
    { key: 'specialty', label: 'Especialidad', placeholder: 'Ej: Poodle, Terriers' },
    { key: 'experience', label: 'Años de Experiencia', placeholder: 'Ej: 5', type: 'number' },
  ],
}

export default function Verification() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [selectedProfession, setSelectedProfession] = useState(null)
  const [formData, setFormData] = useState({})
  const [idPreview, setIdPreview] = useState(null)
  const [credPreview, setCredPreview] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [processing, setProcessing] = useState(false)

  const current = steps[step]
  const progress = ((step + 1) / steps.length) * 100
  const profession = professions.find(p => p.id === selectedProfession)
  const fields = selectedProfession ? detailFields[selectedProfession] : []

  const canAdvance = () => {
    if (step === 0) return !!selectedProfession
    if (step === 1) return fields.every(f => formData[f.key]?.trim())
    if (step === 2) return !!idPreview
    if (step === 3) return !!credPreview
    return true
  }

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      setProcessing(true)
      setTimeout(() => {
        setProcessing(false)
        setSubmitted(true)
        setTimeout(() => navigate('/perfil'), 3500)
      }, 2000)
    }
  }

  const back = () => {
    if (step > 0) setStep(step - 1)
    else navigate('/perfil')
  }

  if (submitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-cream px-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
          <Shield size={40} className="text-green-500" />
        </div>
        <h2 className="text-navy font-bold text-xl mb-2">¡Solicitud Enviada!</h2>
        <p className="text-gray-500 text-sm mb-1">Tu verificación como <span className="font-semibold">{profession?.label}</span> está siendo procesada.</p>
        <p className="text-gray-400 text-xs mb-4">Recibirás una notificación en 24-48 horas con el resultado.</p>
        <div className="bg-white rounded-xl card-shadow px-4 py-3 flex items-center gap-3">
          <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
          <span className="text-navy text-sm font-medium">Estado: En revisión</span>
        </div>
      </div>
    )
  }

  if (processing) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-cream px-8 text-center">
        <div className="w-16 h-16 border-4 border-gold/20 border-t-gold rounded-full animate-spin mb-6" />
        <h2 className="text-navy font-bold text-lg mb-2">Procesando solicitud...</h2>
        <p className="text-gray-400 text-sm">Verificando documentos y datos</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-cream">
      <header className="bg-navy-gradient safe-top px-4 py-3 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <button onClick={back} className="text-gold">
            <ChevronLeft size={24} />
          </button>
          <span className="text-gold/70 text-sm font-medium">Paso {step + 1} de {steps.length}</span>
          <button onClick={() => navigate('/perfil')} className="text-gray-400">
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

          {/* Step 0: Select Profession */}
          {step === 0 && (
            <>
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <Shield size={22} className="text-gold" />
              </div>
              <h2 className="text-navy font-bold text-xl mb-1">Verificación Profesional</h2>
              <p className="text-gray-400 text-sm mb-6">Selecciona tu profesión para obtener la insignia verificada en tu perfil</p>

              <div className="space-y-2.5">
                {professions.map(p => {
                  const Icon = p.icon
                  const selected = selectedProfession === p.id
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProfession(p.id)}
                      className={`w-full flex items-center gap-3 p-3.5 rounded-xl transition-all text-left ${
                        selected
                          ? 'bg-gold-gradient card-shadow scale-[1.01]'
                          : 'bg-white card-shadow'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        selected ? 'bg-white/20' : p.bg
                      }`}>
                        <Icon size={20} className={selected ? 'text-white' : p.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold text-sm ${selected ? 'text-white' : 'text-navy'}`}>{p.label}</p>
                        <p className={`text-xs mt-0.5 ${selected ? 'text-white/70' : 'text-gray-400'}`}>{p.desc}</p>
                      </div>
                      {selected && (
                        <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center shrink-0">
                          <Check size={14} className="text-white" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </>
          )}

          {/* Step 1: Professional Details */}
          {step === 1 && profession && (
            <>
              <div className={`w-12 h-12 ${profession.bg} rounded-full flex items-center justify-center mb-4`}>
                <profession.icon size={22} className={profession.color} />
              </div>
              <h2 className="text-navy font-bold text-xl mb-1">Datos de {profession.label}</h2>
              <p className="text-gray-400 text-sm mb-6">Completa tu información profesional</p>

              <div className="space-y-3">
                {fields.map(f => (
                  <div key={f.key}>
                    <label className="text-navy text-xs font-semibold block mb-1.5">{f.label}</label>
                    <input
                      type={f.type || 'text'}
                      value={formData[f.key] || ''}
                      onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                      placeholder={f.placeholder}
                      className="w-full bg-white border-2 border-gray-200 focus:border-gold rounded-xl px-4 py-3 text-navy text-sm outline-none transition-colors placeholder:text-gray-300"
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Step 2: ID Upload */}
          {step === 2 && (
            <>
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <Upload size={22} className="text-gold" />
              </div>
              <h2 className="text-navy font-bold text-xl mb-1">Identificación Oficial</h2>
              <p className="text-gray-400 text-sm mb-6">Sube una foto de tu INE, pasaporte o identificación oficial vigente</p>

              <label className="block cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) setIdPreview(URL.createObjectURL(file))
                  }}
                />
                {idPreview ? (
                  <div className="relative rounded-2xl overflow-hidden card-shadow">
                    <img src={idPreview} alt="ID" className="w-full h-52 object-cover" />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <p className="text-white font-medium text-sm flex items-center gap-2">
                        <Camera size={16} />
                        Toca para cambiar foto
                      </p>
                    </div>
                    <div className="absolute top-3 right-3 bg-green-500 rounded-full p-1">
                      <Check size={14} className="text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-full bg-white border-2 border-dashed border-gray-200 rounded-2xl py-10 flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center">
                      <Camera size={28} className="text-gold" />
                    </div>
                    <span className="text-navy font-medium text-sm">Toca para tomar o seleccionar foto</span>
                    <span className="text-gray-400 text-xs">Asegúrate que sea legible y sin reflejos</span>
                  </div>
                )}
              </label>

              <div className="mt-4 bg-blue-50 rounded-xl p-3">
                <p className="text-blue-700 text-xs leading-relaxed">
                  <span className="font-semibold">Documentos aceptados:</span> INE/IFE, Pasaporte, Cédula Profesional, Licencia de conducir. El documento debe estar vigente y ser legible.
                </p>
              </div>
            </>
          )}

          {/* Step 3: Credential Upload */}
          {step === 3 && profession && (
            <>
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <Award size={22} className="text-gold" />
              </div>
              <h2 className="text-navy font-bold text-xl mb-1">Credencial Profesional</h2>
              <p className="text-gray-400 text-sm mb-6">
                {selectedProfession === 'vet'
                  ? 'Sube una foto de tu cédula profesional de veterinaria'
                  : selectedProfession === 'judge'
                  ? 'Sube tu licencia de juez expedida por tu federación'
                  : selectedProfession === 'handler'
                  ? 'Sube tu licencia de handler o certificado de competencia'
                  : selectedProfession === 'breeder'
                  ? 'Sube tu registro de criadero o certificado de criador'
                  : 'Sube tu certificado o diploma de grooming profesional'
                }
              </p>

              <label className="block cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) setCredPreview(URL.createObjectURL(file))
                  }}
                />
                {credPreview ? (
                  <div className="relative rounded-2xl overflow-hidden card-shadow">
                    <img src={credPreview} alt="Credential" className="w-full h-52 object-cover" />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <p className="text-white font-medium text-sm flex items-center gap-2">
                        <Camera size={16} />
                        Toca para cambiar foto
                      </p>
                    </div>
                    <div className="absolute top-3 right-3 bg-green-500 rounded-full p-1">
                      <Check size={14} className="text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-full bg-white border-2 border-dashed border-gray-200 rounded-2xl py-10 flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center">
                      <Award size={28} className="text-gold" />
                    </div>
                    <span className="text-navy font-medium text-sm">Sube tu credencial profesional</span>
                    <span className="text-gray-400 text-xs">JPG o PNG, debe ser legible</span>
                  </div>
                )}
              </label>
            </>
          )}

          {/* Step 4: Review */}
          {step === 4 && profession && (
            <>
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <Shield size={22} className="text-gold" />
              </div>
              <h2 className="text-navy font-bold text-xl mb-1">Revisa tu solicitud</h2>
              <p className="text-gray-400 text-sm mb-6">Confirma que toda la información es correcta</p>

              <div className="bg-white rounded-2xl card-shadow overflow-hidden">
                {/* Profession header */}
                <div className="bg-navy-gradient p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <profession.icon size={20} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{profession.label}</p>
                    <p className="text-gray-400 text-xs">Verificación profesional</p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2.5">
                  <div className="flex items-center gap-3 pb-2.5 border-b border-gray-50">
                    <img
                      src={img('images/avatar-ricardo.jpg')}
                      alt="Ricardo"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-navy font-semibold text-sm">Ricardo Martínez</p>
                      <p className="text-gray-400 text-xs">ricardo.martinez@email.com</p>
                    </div>
                  </div>

                  {fields.map(f => (
                    <div key={f.key} className="flex justify-between items-center py-1">
                      <span className="text-gray-400 text-sm">{f.label}</span>
                      <span className="text-navy font-medium text-sm text-right max-w-[55%]">{formData[f.key]}</span>
                    </div>
                  ))}
                </div>

                {/* Document previews */}
                <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                  <div className="relative rounded-xl overflow-hidden">
                    {idPreview && <img src={idPreview} alt="ID" className="w-full h-20 object-cover" />}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span className="text-white text-[10px] font-medium bg-black/40 px-2 py-0.5 rounded-full">ID Oficial</span>
                    </div>
                  </div>
                  <div className="relative rounded-xl overflow-hidden">
                    {credPreview && <img src={credPreview} alt="Credential" className="w-full h-20 object-cover" />}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span className="text-white text-[10px] font-medium bg-black/40 px-2 py-0.5 rounded-full">Credencial</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-gold/5 border border-gold/20 rounded-xl p-3">
                <p className="text-navy/70 text-xs leading-relaxed">
                  Al enviar esta solicitud, confirmo que la información proporcionada es verídica y autorizo a Alianz a verificar mis datos profesionales. El proceso de verificación toma entre 24-48 horas hábiles.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Action button */}
        <button
          onClick={next}
          disabled={!canAdvance()}
          className={`mt-6 w-full py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all ${
            canAdvance()
              ? 'bg-gold-gradient text-white active:scale-[0.97]'
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          {step === steps.length - 1 ? (
            <>
              <Shield size={20} />
              Enviar Solicitud
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
