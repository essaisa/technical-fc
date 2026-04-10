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

export default function PlayersPage() {
  const players: Player[] = [
    {
      name: "Bukayo Saka",
      position: "RW",
      age: 24,
      club: "ARS",
      country: "ENG",
      image: "/players/saka.png",
    },
    {
      name: "Cole Palmer",
      position: "CAM",
      age: 24,
      club: "CHE",
      country: "ENG",
      image: "/players/cole_palmer.png",
    },
    {
      name: "Virgil Van Dijk",
      position: "CB",
      age: 34,
      club: "LIV",
      country: "NED",
      image: "/players/vvd.png",
    },
    {
      name: "Gianluigi Donnarumma",
      position: "GK",
      age: 27,
      club: "PSG",
      country: "ITA",
      image: "/players/donnarumma.png",
    },
  ]

  const [shortlist, setShortlist] = useState<Player[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("shortlist")
    if (stored) {
      setShortlist(JSON.parse(stored))
    }
  }, [])

  const getPositionColor = (position: string) => {
    switch (position) {
      case "FW":
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

  const isShortlisted = (name: string) => {
    return shortlist.some((player) => player.name === name)
  }

  const toggleShortlist = (player: Player) => {
    let updated: Player[]

    if (isShortlisted(player.name)) {
      updated = shortlist.filter((p) => p.name !== player.name)
    } else {
      updated = [...shortlist, player]
    }

    setShortlist(updated)
    localStorage.setItem("shortlist", JSON.stringify(updated))
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

          <button className="mt-4 px-4 py-2 bg-white text-black rounded-lg font-bold">
            View Player
          </button>
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

        {/* HEADER */}
        <div className="grid grid-cols-[10px_2fr_1fr_1fr_1fr_1fr_70px] items-center border-b p-2 font-bold gap-4">
          <span></span>
          <span>Name</span>
          <span>Position</span>
          <span>Age</span>
          <span>Club</span>
          <span>Country</span>
          <span className="text-center">Star</span>
        </div>

        {/* ROWS */}
        {players.map((player, index) => (
          <div
            key={index}
            className="grid grid-cols-[10px_2fr_1fr_1fr_1fr_1fr_70px] items-center border-b p-2 gap-4"
          >
            <div className={`h-full ${getPositionColor(player.position)}`} />

            <span>{player.name}</span>
            <span>{player.position}</span>
            <span>{player.age}</span>
            <span>{player.club}</span>
            <span>{player.country}</span>

            <div className="flex justify-center">
              <button
                onClick={() => toggleShortlist(player)}
                className={`text-2xl leading-none transition-transform hover:scale-110 ${
                  isShortlisted(player.name)
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