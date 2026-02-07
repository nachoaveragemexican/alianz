import { useState } from 'react'
import Header from '../components/Header'
import { Send, Image, Paperclip } from 'lucide-react'

const conversations = [
  {
    id: 1,
    name: 'Alianz HQ',
    avatar: '/images/logo-alianz.png',
    lastMsg: 'Tu certificación de Handler ha sido aprobada. ¡Felicidades!',
    time: '10:30',
    unread: 1,
    isOrg: true,
  },
  {
    id: 2,
    name: 'María K.',
    avatar: '/images/avatar-maria.jpg',
    lastMsg: '¡Felicidades por el resultado en el show! Tu doberman estuvo increíble.',
    time: 'Ayer',
    unread: 0,
  },
  {
    id: 3,
    name: 'Juan D.',
    avatar: '/images/avatar-juan.jpg',
    lastMsg: '¿Vas a asistir al seminario de grooming en Guadalajara?',
    time: 'Ayer',
    unread: 2,
  },
  {
    id: 4,
    name: 'Alianz México',
    avatar: '/images/seal-alianz.png',
    lastMsg: 'Recordatorio: Inscripciones abiertas para el Show Nacional de Marzo.',
    time: 'Lun',
    unread: 0,
    isOrg: true,
  },
]

const chatMessages = [
  { id: 1, from: 'them', text: 'Hola Ricardo, te informamos que tu solicitud de certificación como Handler Profesional ha sido revisada.', time: '10:28' },
  { id: 2, from: 'them', text: 'Tu certificación de Handler ha sido aprobada. ¡Felicidades! Ya puedes ver tu certificado en la sección de Universidad.', time: '10:30' },
  { id: 3, from: 'me', text: '¡Excelente noticia! Muchas gracias. ¿Ya está disponible para descargar?', time: '10:32' },
  { id: 4, from: 'them', text: 'Sí, puedes descargarlo directamente desde Alianz Universidad > Mis Certificaciones. También lo puedes compartir desde tu perfil.', time: '10:33' },
]

export default function Messages() {
  const [activeChat, setActiveChat] = useState(null)
  const [newMsg, setNewMsg] = useState('')

  if (activeChat) {
    const conv = conversations.find(c => c.id === activeChat)
    return (
      <div className="h-full flex flex-col">
        <Header title={conv.name} showBack />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto scroll-area bg-cream px-4 pt-4 pb-2">
          <div className="space-y-3">
            {chatMessages.map(msg => (
              <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 ${
                  msg.from === 'me'
                    ? 'bg-navy text-white rounded-br-sm'
                    : 'bg-white card-shadow text-navy rounded-bl-sm'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.from === 'me' ? 'text-white/50' : 'text-gray-400'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-100 px-3 py-2 flex items-center gap-2 safe-bottom">
          <button className="text-gray-300 p-1">
            <Paperclip size={20} />
          </button>
          <button className="text-gray-300 p-1">
            <Image size={20} />
          </button>
          <input
            type="text"
            value={newMsg}
            onChange={e => setNewMsg(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-navy outline-none placeholder:text-gray-400"
          />
          <button className="bg-gold-gradient p-2 rounded-full">
            <Send size={16} className="text-white" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <Header title="Mensajes" showBack />

      <div className="flex-1 overflow-y-auto scroll-area bg-cream">
        <div className="px-4 pt-4 pb-6">
          {conversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => setActiveChat(conv.id)}
              className="w-full flex items-center gap-3 py-3 border-b border-gray-100 last:border-0 text-left"
            >
              <div className="relative shrink-0">
                <img
                  src={conv.avatar}
                  alt={conv.name}
                  className={`w-12 h-12 rounded-full object-cover ${conv.isOrg ? 'bg-navy p-1.5' : ''}`}
                />
                {conv.unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {conv.unread}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-navy font-semibold text-sm">{conv.name}</span>
                  <span className="text-gray-400 text-xs">{conv.time}</span>
                </div>
                <p className="text-gray-400 text-xs truncate mt-0.5">{conv.lastMsg}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
