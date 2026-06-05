"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

type Player = {
  id: number
  name: string
  slug: string
  position: string
  age: number
  club: string
  country: string
  image: string | null
}

type ShortlistEntry = {
  id: number
  userId: number
  playerId: number
  createdAt: string
  player: Player
}

export default function ShortlistPage() {
  const [shortlist, setShortlist] = useState<ShortlistEntry[]>([])
  const [loading, setLoading] = useState(true)

  const fetchShortlist = async () => {
    const token = localStorage.getItem("token")

    if (!token) {
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/shortlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      setShortlist(data)
    } catch (error) {
      console.error("SHORTLIST FETCH ERROR:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchShortlist()
  }, [])

  const removePlayer = async (playerId: number) => {
    const token = localStorage.getItem("token")

    if (!token) return

    try {
      await fetch("/api/shortlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ playerId }),
      })

      setShortlist((current) =>
        current.filter((entry) => entry.playerId !== playerId)
      )
    } catch (error) {
      console.error("SHORTLIST REMOVE ERROR:", error)
    }
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

        {loading ? (
          <div className="p-6 border rounded-xl bg-white dark:bg-zinc-900">
            <p className="text-gray-500">Loading shortlist...</p>
          </div>
        ) : shortlist.length === 0 ? (
          <div className="p-6 border rounded-xl bg-white dark:bg-zinc-900">
            <p className="text-gray-500">No players shortlisted yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {shortlist.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 border rounded-xl bg-white dark:bg-zinc-900"
              >
                <div className="flex items-center gap-4">
                  {entry.player.image && (
                    <Image
                      src={entry.player.image}
                      alt={entry.player.name}
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                  )}

                  <div>
                    <h2 className="font-bold">{entry.player.name}</h2>
                    <p className="text-sm text-gray-500">
                      {entry.player.position} • {entry.player.age} •{" "}
                      {entry.player.club} • {entry.player.country}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/players/${entry.player.slug}`}
                    className="px-3 py-2 bg-black text-white rounded-lg hover:bg-zinc-700"
                  >
                    View Player
                  </Link>

                  <button
                    onClick={() => removePlayer(entry.playerId)}
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