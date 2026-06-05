"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type Player = {
  id: number
  name: string
  slug: string
  position: string
  age: number
  club: string
  country: string
}

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Player[]>([])

  useEffect(() => {
    const searchPlayers = async () => {
      if (!query.trim()) {
        setResults([])
        return
      }

      try {
        const res = await fetch(
          `/api/players/search?q=${encodeURIComponent(query)}`
        )

        const data = await res.json()
        setResults(data)
      } catch (error) {
        console.error("SEARCH FETCH ERROR:", error)
      }
    }

    const timeout = setTimeout(() => {
      searchPlayers()
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Search Players</h1>

      <input
        type="text"
        placeholder="Search by name..."
        className="w-full p-3 border rounded mb-6"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="space-y-3">
        {results.map((player) => (
          <Link
            key={player.id}
            href={`/players/${player.slug}`}
            className="block p-4 border rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-900"
          >
            <h2 className="font-bold">{player.name}</h2>

            <p className="text-sm text-gray-500">
              {player.position} • {player.age} yrs • {player.club} • {player.country}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}