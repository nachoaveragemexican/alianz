import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Globe, Bell, Search } from 'lucide-react'

export default function Header({ title, showBack = false, rightIcon = null, onRightClick }) {
  const navigate = useNavigate()

  return (
    <header className="bg-navy-gradient safe-top px-4 py-3 flex items-center justify-between shrink-0">
      <div className="w-10">
        {showBack && (
          <button onClick={() => navigate(-1)} className="text-gold">
            <ChevronLeft size={24} />
          </button>
        )}
      </div>
      <h1 className="font-serif text-gold text-lg font-semibold tracking-wide">
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
    </header>
  )
}
