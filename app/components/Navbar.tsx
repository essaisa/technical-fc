"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

type User = {
  id: number
  email: string
  username?: string | null
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.dispatchEvent(new Event("authChanged"))
    setUser(null)
    window.location.href = "/auth"
  }

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user")
      setUser(storedUser ? JSON.parse(storedUser) : null)
    }
  
    loadUser()
  
    window.addEventListener("authChanged", loadUser)
  
    return () => {
      window.removeEventListener("authChanged", loadUser)
    }
  }, [])

  return (
    <nav className="border-b bg-white dark:bg-zinc-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          Technical FC
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/">Dashboard</Link>
          <Link href="/players">Players</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/search">Search</Link>
          <Link href="/shortlist">Shortlist</Link>

          {user ? (
            <div className="flex items-center gap-3">
              <button onClick={logout} className="underline">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/auth">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}