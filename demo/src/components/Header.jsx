import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Globe, Bell, Search } from 'lucide-react'

export default function Header({ title, showBack = false, rightIcon = null, onRightClick }) {
  const navigate = useNavigate()

  return (
    <header className="bg-navy-gradient safe-top px-5 pb-12 shrink-0 flex items-end justify-center" style={{ minHeight: '120px' }}>
      <div className="flex items-center justify-between w-full mb-1">
        <div className="w-10">
          {showBack && (
            <button onClick={() => navigate(-1)} className="text-gold">
              <ChevronLeft size={24} />
            </button>
          )}
        </div>
        <h1 className="text-white text-2xl font-bold tracking-wide">
          {title}
        </h1>
        <div className="w-10 flex justify-end">
          {rightIcon === 'globe' && <Globe size={20} className="text-gold/70" />}
          {rightIcon === 'bell' && <Bell size={20} className="text-gold/70" />}
          {rightIcon === 'search' && (
            <button onClick={onRightClick} className="text-gold/70">
              <Search size={20} />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
