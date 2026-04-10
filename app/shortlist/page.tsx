"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

type Player = {
  name: string
  position: string
  age: number
  club: string
  country: string
  image?: string
}

export default function ShortlistPage() {
  const [shortlist, setShortlist] = useState<Player[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("shortlist")
    if (stored) {
      setShortlist(JSON.parse(stored))
    }
  }, [])

  const removePlayer = (name: string) => {
    const updated = shortlist.filter((player) => player.name !== name)
    setShortlist(updated)
    localStorage.setItem("shortlist", JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen p-8 bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">⭐ Shortlist</h1>

          <Link
            href="/players"
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900"
          >
            Back to Players
          </Link>
        </div>

        {shortlist.length === 0 ? (
          <div className="p-6 border rounded-xl bg-white dark:bg-zinc-900">
            <p className="text-gray-500">No players shortlisted yet.</p>
          </div>
        ) : (
            <div className="space-y-4">
            {shortlist.map((player, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-xl bg-white dark:bg-zinc-900"
              >
                <div className="flex items-center gap-4">
                  {player.image && (
                    <Image
                      src={player.image}
                      alt={player.name}
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                  )}
          
                  <div>
                    <h2 className="font-bold">{player.name}</h2>
                    <p className="text-sm text-gray-500">
                      {player.position} • {player.age} • {player.club} • {player.country}
                    </p>
                  </div>
                </div>
          
                <div className="flex gap-2">
                  <button className="px-3 py-2 bg-black text-white rounded-lg hover:bg-zinc-700">
                    View Player
                  </button>
          
                  <button
                    onClick={() => removePlayer(player.name)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}