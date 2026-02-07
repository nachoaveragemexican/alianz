import { useState } from 'react'
import Header from '../components/Header'
import { Heart, MessageCircle, Share2, BadgeCheck, MoreHorizontal } from 'lucide-react'
import { img } from '../utils'

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

  const toggleLike = (id) => {
    setFeed(feed.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ))
  }

  return (
    <div className="h-full flex flex-col">
      <Header title="Comunidad" rightIcon="search" />

      <div className="flex-1 overflow-y-auto scroll-area bg-cream">
        <div className="px-4 pt-4 pb-6 space-y-4">
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
                <button className="flex items-center gap-1.5 py-1 px-2 rounded-lg text-gray-400">
                  <MessageCircle size={18} />
                  <span className="text-xs font-medium">{post.comments}</span>
                </button>
                <button className="flex items-center gap-1.5 py-1 px-2 rounded-lg text-gray-400">
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
