import { createContext, useContext } from 'react'

const users = {
  ricardo: {
    id: 'ricardo',
    name: 'Ricardo',
    fullName: 'Ricardo Martínez',
    email: 'ricardo.martinez@email.com',
    avatar: 'images/avatar-ricardo.jpg',
  },
  carlos: {
    id: 'carlos',
    name: 'Carlos',
    fullName: 'Carlos García',
    email: 'carlos.garcia@email.com',
    avatar: 'images/avatar-juan.jpg',
  },
}

const UserContext = createContext(users.ricardo)

export function getUserFromURL() {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('u') || 'ricardo'
  return users[id] || users.ricardo
}

export function UserProvider({ children }) {
  const user = getUserFromURL()
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export function useUser() {
  return useContext(UserContext)
}
