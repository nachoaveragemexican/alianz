import { useState, useRef, useEffect } from 'react'
import Header from '../components/Header'
import { Heart, MessageCircle, Share2, BadgeCheck, MoreHorizontal, ChevronLeft, Send } from 'lucide-react'
import { img } from '../utils'

const initialComments = {
  1: [
    { id: 1, user: 'Ricardo M.', avatar: img('images/avatar-ricardo.jpg'), text: '¡Felicidades María! Rex estuvo espectacular en la pista.', time: 'hace 1 hora' },
    { id: 2, user: 'Juan D.', avatar: img('images/avatar-juan.jpg'), text: 'Increíble resultado, bien merecido el Best in Show! 🏆', time: 'hace 1 hora' },
    { id: 3, user: 'Alianz México', avatar: img('images/seal-alianz.png'), text: 'Felicitamos al equipo por este gran logro. ¡Orgullo Alianz!', time: 'hace 45 min' },
  ],
  2: [
    { id: 1, user: 'María K.', avatar: img('images/avatar-maria.jpg'), text: '¡Se ve hermoso! ¿Qué productos usas para el acabado?', time: 'hace 3 horas' },
    { id: 2, user: 'Ricardo M.', avatar: img('images/avatar-ricardo.jpg'), text: 'Alianz University tiene el mejor contenido de grooming. El módulo 4 es excelente.', time: 'hace 2 horas' },
  ],
  3: [
    { id: 1, user: 'Juan D.', avatar: img('images/avatar-juan.jpg'), text: 'El proceso digital de Alianz es muy rápido, lo confirmo.', time: 'hace 20 horas' },
    { id: 2, user: 'María K.', avatar: img('images/avatar-maria.jpg'), text: '¡Maximus Prince es un campeón increíble! Hermoso doberman. 🐕', time: 'hace 18 horas' },
    { id: 3, user: 'Alianz HQ', avatar: img('images/logo-alianz.png'), text: 'Gracias por confiar en Alianz para el registro digital de tu pedigree.', time: 'hace 15 horas' },
  ],
}

const posts = [
  {
    id: 1,
    user: 'María K.',
    avatar: img('images/avatar-maria.jpg'),
    verified: true,
    time: 'hace 2 horas',
    text: 'Increíble resultado en el Show Nacional Alianz! Nuestro CH. Rex von Heidelberg obtuvo Best in Show. Muy orgullosa del equipo!',
    image: img('images/dog-german-shepherd.jpg'),
    likes: 47,
    comments: 12,
    liked: false,
  },
  {
    id: 2,
    user: 'Juan D.',
    avatar: img('images/avatar-juan.jpg'),
    verified: true,
    time: 'hace 5 horas',
    text: 'Preparando a nuestro poodle para la competencia de grooming del próximo mes. Alianz University ha sido una gran ayuda con las técnicas.',
    image: img('images/dog-poodle.jpg'),
    likes: 31,
    comments: 8,
    liked: true,
  },
  {
    id: 3,
    user: 'Ricardo M.',
    avatar: img('images/avatar-ricardo.jpg'),
    verified: true,
    time: 'hace 1 día',
    text: 'Nuevo pedigree registrado para Maximus Prince. El proceso digital fue rápido y sencillo. Gran trabajo, Alianz!',
    image: img('images/dog-doberman.jpg'),
    likes: 62,
    comments: 15,
    liked: false,
  },
]

export default function Community() {
  const [feed, setFeed] = useState(posts)
  const [allComments, setAllComments] = useState(initialComments)
  const [openPostId, setOpenPostId] = useState(null)
  const [newComment, setNewComment] = useState('')
  const commentsEndRef = useRef(null)
  const inputRef = useRef(null)

  const toggleLike = (id) => {
    setFeed(feed.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ))
  }

  const openComments = (postId) => {
    setOpenPostId(postId)
    setNewComment('')
  }

  const closeComments = () => {
    setOpenPostId(null)
    setNewComment('')
  }

  const sendComment = () => {
    if (!newComment.trim() || !openPostId) return
    const comment = {
      id: Date.now(),
      user: 'Ricardo M.',
      avatar: img('images/avatar-ricardo.jpg'),
      text: newComment.trim(),
      time: 'ahora',
    }
    setAllComments(prev => ({
      ...prev,
      [openPostId]: [...(prev[openPostId] || []), comment],
    }))
    setFeed(feed.map(p =>
      p.id === openPostId ? { ...p, comments: p.comments + 1 } : p
    ))
    setNewComment('')
  }

  useEffect(() => {
    if (openPostId && commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [allComments, openPostId])

  useEffect(() => {
    if (openPostId && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [openPostId])

  const openPost = feed.find(p => p.id === openPostId)
  const postComments = openPostId ? (allComments[openPostId] || []) : []

  // Comments view
  if (openPost) {
    return (
      <div className="h-full flex flex-col bg-cream">
        <header className="bg-navy-gradient safe-top px-4 py-3 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={closeComments} className="text-gold">
              <ChevronLeft size={24} />
            </button>
            <span className="text-white font-semibold text-base flex-1">Comentarios</span>
            <span className="text-gold/50 text-sm">{postComments.length}</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto scroll-area">
          {/* Original post */}
          <div className="bg-white border-b border-gray-100">
            <div className="flex items-center gap-3 p-3 pb-2">
              <div className="relative">
                <img src={openPost.avatar} alt={openPost.user} className="w-10 h-10 rounded-full object-cover" />
                {openPost.verified && (
                  <BadgeCheck size={14} className="absolute -bottom-0.5 -right-0.5 text-blue-500 bg-white rounded-full" />
                )}
              </div>
              <div>
                <span className="text-navy font-semibold text-sm">{openPost.user}</span>
                <span className="text-gray-400 text-xs block">{openPost.time}</span>
              </div>
            </div>
            <p className="px-3 pb-2 text-navy/80 text-sm leading-relaxed">{openPost.text}</p>
            {openPost.image && (
              <img src={openPost.image} alt="" className="w-full h-44 object-cover" />
            )}
            <div className="px-3 py-2 flex items-center gap-4">
              <button
                onClick={() => toggleLike(openPost.id)}
                className={`flex items-center gap-1.5 ${openPost.liked ? 'text-red-500' : 'text-gray-400'}`}
              >
                <Heart size={16} fill={openPost.liked ? 'currentColor' : 'none'} />
                <span className="text-xs font-medium">{openPost.likes}</span>
              </button>
              <div className="flex items-center gap-1.5 text-gray-400">
                <MessageCircle size={16} />
                <span className="text-xs font-medium">{openPost.comments}</span>
              </div>
            </div>
          </div>

          {/* Comments list */}
          <div className="px-4 pt-3 pb-4 space-y-4">
            {postComments.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-8">Sé el primero en comentar</p>
            )}
            {postComments.map((c) => (
              <div key={c.id} className="flex gap-2.5">
                <img src={c.avatar} alt={c.user} className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="bg-white rounded-2xl rounded-tl-md px-3 py-2.5 card-shadow">
                    <span className="text-navy font-semibold text-xs">{c.user}</span>
                    <p className="text-navy/80 text-sm mt-0.5 leading-relaxed">{c.text}</p>
                  </div>
                  <span className="text-gray-400 text-[10px] ml-2 mt-1 block">{c.time}</span>
                </div>
              </div>
            ))}
            <div ref={commentsEndRef} />
          </div>
        </div>

        {/* Comment input */}
        <div className="safe-bottom bg-white border-t border-gray-100 px-3 py-2 flex items-center gap-2 shrink-0">
          <img src={img('images/avatar-ricardo.jpg')} alt="Tú" className="w-8 h-8 rounded-full object-cover shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendComment()}
            placeholder="Escribe un comentario..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-navy outline-none placeholder:text-gray-400"
          />
          <button
            onClick={sendComment}
            disabled={!newComment.trim()}
            className={`p-2 rounded-full transition-colors ${
              newComment.trim() ? 'bg-gold text-white' : 'bg-gray-100 text-gray-300'
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <Header title="Comunidad" rightIcon="search" />

      <div className="flex-1 overflow-y-auto scroll-area -mt-5 rounded-t-3xl bg-cream">
        <div className="px-4 pt-5 pb-6 space-y-4">
          {feed.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl card-shadow overflow-hidden">
              {/* Post header */}
              <div className="flex items-center gap-3 p-3 pb-2">
                <div className="relative">
                  <img
                    src={post.avatar}
                    alt={post.user}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {post.verified && (
                    <BadgeCheck size={14} className="absolute -bottom-0.5 -right-0.5 text-blue-500 bg-white rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-navy font-semibold text-sm">{post.user}</span>
                  </div>
                  <span className="text-gray-400 text-xs">{post.time}</span>
                </div>
                <button className="text-gray-300">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              {/* Post text */}
              <p className="px-3 text-navy/80 text-sm leading-relaxed">{post.text}</p>

              {/* Post image */}
              {post.image && (
                <div className="mt-2">
                  <img
                    src={post.image}
                    alt=""
                    className="w-full h-52 object-cover"
                  />
                </div>
              )}

              {/* Reactions */}
              <div className="px-3 py-2 flex items-center justify-between border-t border-gray-100 mt-1">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1.5 py-1 px-2 rounded-lg transition-colors ${
                    post.liked ? 'text-red-500' : 'text-gray-400'
                  }`}
                >
                  <Heart size={18} fill={post.liked ? 'currentColor' : 'none'} />
                  <span className="text-xs font-medium">{post.likes}</span>
                </button>
                <button
                  onClick={() => openComments(post.id)}
                  className="flex items-center gap-1.5 py-1 px-2 rounded-lg text-gray-400 active:bg-gray-50 transition-colors"
                >
                  <MessageCircle size={18} />
                  <span className="text-xs font-medium">{post.comments}</span>
                </button>
                <button
                  onClick={async () => {
                    const shareData = {
                      title: `Post de ${post.user} - Alianz Comunidad`,
                      text: post.text,
                      url: window.location.href,
                    }
                    if (navigator.share) {
                      try { await navigator.share(shareData) } catch {}
                    } else {
                      await navigator.clipboard.writeText(`${post.text}\n\n- ${post.user} en Alianz Comunidad\n${window.location.href}`)
                      alert('Enlace copiado al portapapeles')
                    }
                  }}
                  className="flex items-center gap-1.5 py-1 px-2 rounded-lg text-gray-400 active:bg-gray-50 transition-colors"
                >
                  <Share2 size={18} />
                  <span className="text-xs font-medium">Compartir</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
