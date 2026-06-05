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
  playerId: number
  player: Player
}

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [shortlist, setShortlist] = useState<ShortlistEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token")

      try {
        const playersRes = await fetch("/api/players")
        const playersData = await playersRes.json()
        setPlayers(playersData)

        if (token) {
          const shortlistRes = await fetch("/api/shortlist", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          const shortlistData = await shortlistRes.json()
          setShortlist(shortlistData)
        }
      } catch (error) {
        console.error("PLAYERS PAGE FETCH ERROR:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getPositionColor = (position: string) => {
    switch (position) {
      case "ST":
      case "RW":
      case "LW":
        return "bg-blue-500"
      case "CAM":
      case "CM":
      case "CDM":
        return "bg-green-500"
      case "CB":
      case "LB":
      case "RB":
        return "bg-yellow-500"
      case "GK":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  const isShortlisted = (playerId: number) => {
    return shortlist.some((entry) => entry.playerId === playerId)
  }

  const toggleShortlist = async (player: Player) => {
    const token = localStorage.getItem("token")

    if (!token) {
      alert("Please log in to shortlist players.")
      return
    }

    try {
      if (isShortlisted(player.id)) {
        await fetch("/api/shortlist", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ playerId: player.id }),
        })

        setShortlist((current) =>
          current.filter((entry) => entry.playerId !== player.id)
        )
      } else {
        const res = await fetch("/api/shortlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ playerId: player.id }),
        })

        const newEntry = await res.json()
        setShortlist((current) => [...current, newEntry])
      }
    } catch (error) {
      console.error("SHORTLIST TOGGLE ERROR:", error)
    }
  }

  if (loading) {
    return <div className="p-8">Loading players...</div>
  }

  return (
    <div className="min-h-screen font-press-start dark:bg-black">
      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
        <Image
          src="/players/olise_cele.avif"
          alt="Michael Olise"
          fill
          className="object-cover object-[center_5%]"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute bottom-0 p-6 text-white">
          <h2 className="text-3xl font-bold">Michael Olise</h2>
          <p className="text-sm">FC Bayern Munich • France</p>

          <Link href="/players/michael-olise">
            <button className="mt-4 px-4 py-2 bg-white text-black rounded-lg font-bold">
              View Player
            </button>
          </Link>
        </div>
      </div>

      <main className="w-full max-w-6xl mx-auto px-8 py-12 bg-white dark:bg-black">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">PLAYERS</h1>

          <Link
            href="/shortlist"
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900"
          >
            ⭐ View Shortlist
          </Link>
        </div>

        <div className="grid grid-cols-[10px_2fr_1fr_1fr_1fr_1fr_100px_70px] items-center border-b p-2 font-bold gap-4">
          <span></span>
          <span>Name</span>
          <span>Position</span>
          <span>Age</span>
          <span>Club</span>
          <span>Country</span>
          <span className="text-center">Profile</span>
          <span className="text-center">Star</span>
        </div>

        {players.map((player) => (
          <div
            key={player.id}
            className="grid grid-cols-[10px_2fr_1fr_1fr_1fr_1fr_100px_70px] items-center border-b p-2 gap-4"
          >
            <div className={`h-full ${getPositionColor(player.position)}`} />

            <span>{player.name}</span>
            <span>{player.position}</span>
            <span>{player.age}</span>
            <span>{player.club}</span>
            <span>{player.country}</span>

            <div className="flex justify-center">
              <Link
                href={`/players/${player.slug}`}
                className="px-3 py-1 text-xs border rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                View
              </Link>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => toggleShortlist(player)}
                className={`text-2xl leading-none transition-transform hover:scale-110 ${
                  isShortlisted(player.id)
                    ? "text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]"
                    : "text-zinc-400"
                }`}
                aria-label={`Toggle shortlist for ${player.name}`}
              >
                ★
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}