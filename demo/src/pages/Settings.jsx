import { useState } from 'react'
import Header from '../components/Header'
import { img } from '../utils'
import {
  Bell, Mail, Smartphone, Globe, Lock, CreditCard,
  ChevronRight, Moon, Eye, Trash2, HelpCircle, FileText, Check
} from 'lucide-react'

function Toggle({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${on ? 'bg-gold' : 'bg-gray-200'}`}
    >
      <div className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-transform ${on ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
    </button>
  )
}

export default function Settings() {
  const [notifPush, setNotifPush] = useState(true)
  const [notifEmail, setNotifEmail] = useState(true)
  const [notifSMS, setNotifSMS] = useState(false)
  const [notifEvents, setNotifEvents] = useState(true)
  const [notifCommunity, setNotifCommunity] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [profilePublic, setProfilePublic] = useState(true)
  const [showKennel, setShowKennel] = useState(true)
  const [language, setLanguage] = useState('es')
  const [editingCard, setEditingCard] = useState(false)
  const [saved, setSaved] = useState(null)

  const showSaved = (section) => {
    setSaved(section)
    setTimeout(() => setSaved(null), 2000)
  }

  return (
    <div className="h-full flex flex-col">
      <Header title="Configuración" showBack />

      <div className="flex-1 overflow-y-auto scroll-area -mt-5 rounded-t-3xl bg-cream">
        <div className="px-4 pt-5 pb-6 space-y-4">

          {/* Account */}
          <div className="bg-white rounded-2xl card-shadow overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-50">
              <h3 className="text-navy font-bold text-sm">Cuenta</h3>
            </div>
            <div className="p-4 flex items-center gap-3">
              <img
                src={img('images/avatar-ricardo.jpg')}
                alt="Ricardo"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-navy font-semibold text-sm">Ricardo Martínez</p>
                <p className="text-gray-400 text-xs">ricardo.martinez@email.com</p>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
            <div className="px-4 pb-3 space-y-2">
              <div className="flex items-center justify-between py-2 border-t border-gray-50">
                <div className="flex items-center gap-2.5">
                  <Smartphone size={16} className="text-gray-400" />
                  <span className="text-navy text-sm">Teléfono</span>
                </div>
                <span className="text-gray-400 text-sm">+52 55 1234 5678</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-50">
                <div className="flex items-center gap-2.5">
                  <Globe size={16} className="text-gray-400" />
                  <span className="text-navy text-sm">País</span>
                </div>
                <span className="text-gray-400 text-sm">México</span>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl card-shadow overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-navy font-bold text-sm">Notificaciones</h3>
              {saved === 'notif' && (
                <span className="text-green-500 text-xs font-medium flex items-center gap-1">
                  <Check size={12} /> Guardado
                </span>
              )}
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Bell size={16} className="text-gray-400" />
                  <span className="text-navy text-sm">Push</span>
                </div>
                <Toggle on={notifPush} onToggle={() => { setNotifPush(!notifPush); showSaved('notif') }} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-navy text-sm">Correo electrónico</span>
                </div>
                <Toggle on={notifEmail} onToggle={() => { setNotifEmail(!notifEmail); showSaved('notif') }} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Smartphone size={16} className="text-gray-400" />
                  <span className="text-navy text-sm">SMS</span>
                </div>
                <Toggle on={notifSMS} onToggle={() => { setNotifSMS(!notifSMS); showSaved('notif') }} />
              </div>
              <div className="border-t border-gray-50 pt-3 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-navy text-sm">Eventos y shows</span>
                  <Toggle on={notifEvents} onToggle={() => { setNotifEvents(!notifEvents); showSaved('notif') }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-navy text-sm">Comunidad</span>
                  <Toggle on={notifCommunity} onToggle={() => { setNotifCommunity(!notifCommunity); showSaved('notif') }} />
                </div>
              </div>
            </div>
          </div>

          {/* Appearance & Language */}
          <div className="bg-white rounded-2xl card-shadow overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-50">
              <h3 className="text-navy font-bold text-sm">Apariencia</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Moon size={16} className="text-gray-400" />
                  <span className="text-navy text-sm">Modo oscuro</span>
                </div>
                <Toggle on={darkMode} onToggle={() => setDarkMode(!darkMode)} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Globe size={16} className="text-gray-400" />
                  <span className="text-navy text-sm">Idioma</span>
                </div>
                <select
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                  className="text-sm text-navy bg-gray-50 rounded-lg px-3 py-1.5 outline-none border border-gray-200"
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="pt">Português</option>
                  <option value="fr">Français</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white rounded-2xl card-shadow overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-navy font-bold text-sm">Privacidad</h3>
              {saved === 'privacy' && (
                <span className="text-green-500 text-xs font-medium flex items-center gap-1">
                  <Check size={12} /> Guardado
                </span>
              )}
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Eye size={16} className="text-gray-400" />
                  <div>
                    <span className="text-navy text-sm block">Perfil público</span>
                    <span className="text-gray-400 text-[10px]">Otros miembros pueden ver tu perfil</span>
                  </div>
                </div>
                <Toggle on={profilePublic} onToggle={() => { setProfilePublic(!profilePublic); showSaved('privacy') }} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Eye size={16} className="text-gray-400" />
                  <div>
                    <span className="text-navy text-sm block">Mostrar kennel</span>
                    <span className="text-gray-400 text-[10px]">Tu kennel es visible en tu perfil</span>
                  </div>
                </div>
                <Toggle on={showKennel} onToggle={() => { setShowKennel(!showKennel); showSaved('privacy') }} />
              </div>
              <button className="flex items-center gap-2.5 py-2 w-full border-t border-gray-50">
                <Lock size={16} className="text-gray-400" />
                <span className="text-navy text-sm flex-1 text-left">Cambiar contraseña</span>
                <ChevronRight size={16} className="text-gray-300" />
              </button>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl card-shadow overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-50">
              <h3 className="text-navy font-bold text-sm">Método de Pago</h3>
            </div>
            <div className="p-4">
              <div className="bg-navy/5 rounded-xl p-3 flex items-center gap-3">
                <div className="w-10 h-7 bg-navy rounded-md flex items-center justify-center">
                  <CreditCard size={16} className="text-gold" />
                </div>
                <div className="flex-1">
                  <p className="text-navy text-sm font-medium">•••• •••• •••• 4832</p>
                  <p className="text-gray-400 text-[10px]">Visa · Expira 12/27</p>
                </div>
                <button
                  onClick={() => { setEditingCard(!editingCard) }}
                  className="text-gold text-xs font-semibold"
                >
                  {editingCard ? 'Listo' : 'Editar'}
                </button>
              </div>
              {editingCard && (
                <div className="mt-3 space-y-2">
                  <input
                    type="text"
                    defaultValue="4832"
                    placeholder="Últimos 4 dígitos"
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-navy outline-none focus:border-gold"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      defaultValue="12/27"
                      placeholder="MM/AA"
                      className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-navy outline-none focus:border-gold"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="w-20 bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-navy outline-none focus:border-gold"
                    />
                  </div>
                  <button
                    onClick={() => { setEditingCard(false); showSaved('card') }}
                    className="w-full bg-gold-gradient text-white font-semibold text-sm py-2.5 rounded-xl mt-1"
                  >
                    Guardar Tarjeta
                  </button>
                  {saved === 'card' && (
                    <p className="text-green-500 text-xs text-center font-medium flex items-center justify-center gap-1">
                      <Check size={12} /> Tarjeta actualizada
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Support & Legal */}
          <div className="bg-white rounded-2xl card-shadow overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-50">
              <h3 className="text-navy font-bold text-sm">Soporte</h3>
            </div>
            <div>
              <button className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-gray-50">
                <HelpCircle size={16} className="text-gray-400" />
                <span className="text-navy text-sm flex-1 text-left">Centro de ayuda</span>
                <ChevronRight size={16} className="text-gray-300" />
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-gray-50">
                <FileText size={16} className="text-gray-400" />
                <span className="text-navy text-sm flex-1 text-left">Términos y condiciones</span>
                <ChevronRight size={16} className="text-gray-300" />
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-gray-50">
                <Lock size={16} className="text-gray-400" />
                <span className="text-navy text-sm flex-1 text-left">Política de privacidad</span>
                <ChevronRight size={16} className="text-gray-300" />
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3.5">
                <Trash2 size={16} className="text-red-400" />
                <span className="text-red-400 text-sm flex-1 text-left">Eliminar cuenta</span>
                <ChevronRight size={16} className="text-gray-300" />
              </button>
            </div>
          </div>

          {/* Version */}
          <p className="text-center text-gray-300 text-xs pt-2">
            Alianz Virtual v1.0.0 · ADOS Platform
          </p>

        </div>
      </div>
    </div>
  )
}
