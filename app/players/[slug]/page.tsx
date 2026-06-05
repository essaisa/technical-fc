"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

type FifaStats = {
  PAC: number
  SHO: number
  PAS: number
  DRI: number
  DEF: number
  PHY: number
}

type RadarStat = {
  stat: string
  value: number
}

type TransferValue = {
  season: string
  value: number
}

type LastGame = {
  opponent: string
  rating: number
}

type Player = {
  id: number
  name: string
  slug: string
  age: number
  position: string
  role: string
  club: string
  country: string
  image: string | null
  apps: number | null
  goals: number | null
  assists: number | null
  rating: number | null
  minutes: number | null
  fifaStats: FifaStats | null
  radarStats: RadarStat[] | null
  transferValues: TransferValue[] | null
  lastGames: LastGame[] | null
}

type SimilarPlayer = {
  id: number
  name: string
  slug: string
  position: string
  age: number
  club: string
  country: string
  image: string | null
  similarityScore: number
}

export default function PlayerInfo() {
  const params = useParams()
  const slug = params.slug as string

  const [player, setPlayer] = useState<Player | null>(null)
  const [similarPlayers, setSimilarPlayers] = useState<SimilarPlayer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const [playerRes, similarRes] = await Promise.all([
          fetch(`/api/players/${slug}`),
          fetch(`/api/players/${slug}/similar`),
        ])

        if (!playerRes.ok) {
          setPlayer(null)
          return
        }

        const playerData = await playerRes.json()
        setPlayer(playerData)

        if (similarRes.ok) {
          const similarData = await similarRes.json()
          setSimilarPlayers(similarData)
        }
      } catch (error) {
        console.error("Failed to fetch player:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlayer()
  }, [slug])

  if (loading) {
    return <div className="p-8">Loading player...</div>
  }

  if (!player) {
    return <div className="p-8">Player not found</div>
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <main className="w-full max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between p-6 border rounded-xl bg-white dark:bg-zinc-900">
          <div className="flex items-center gap-6">
            <Image
              src={player.image || "/players/default.png"}
              alt={player.name}
              width={120}
              height={120}
              className="rounded-lg"
            />

            <div>
              <h1 className="text-3xl font-bold">{player.name}</h1>
              <p className="text-sm text-gray-500">
                {player.position} • {player.age} yrs • {player.club} •{" "}
                {player.country}
              </p>
            </div>
          </div>

          {player.fifaStats && (
            <div className="grid grid-cols-3 gap-4 text-sm text-center">
              {Object.entries(player.fifaStats).map(([key, value]) => (
                <div key={key}>
                  {key}
                  <br />
                  <span className="font-bold">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border rounded-xl bg-white dark:bg-zinc-900">
          <h2 className="text-lg font-bold mb-4">Season Stats</h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>Apps: {player.apps ?? "N/A"}</div>
            <div>Avg Rating: {player.rating ?? "N/A"}</div>
            <div>Goals: {player.goals ?? 0}</div>
            <div>Assists: {player.assists ?? 0}</div>
          </div>
        </div>

        <div className="p-6 border rounded-xl bg-white dark:bg-zinc-900">
          <h2 className="text-lg font-bold mb-4">Last 5 Games</h2>

          <div className="space-y-2">
            {player.lastGames?.map((game, index) => (
              <div
                key={index}
                className="flex justify-between border-b pb-2 text-sm"
              >
                <span>{game.opponent}</span>
                <span
                  className={`font-bold ${
                    game.rating >= 7.5
                      ? "text-green-500"
                      : game.rating < 6.5
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {game.rating}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="p-6 border rounded-xl bg-white dark:bg-zinc-900">
            <h2 className="text-lg font-bold mb-4 text-center">
              {player.role.toUpperCase()} Profile
            </h2>

            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={player.radarStats || []}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="stat" />
                  <PolarRadiusAxis domain={[0, 100]} />

                  <Radar
                    dataKey="value"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                  />

                  <Tooltip formatter={(v) => `${v}%`} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-6 border rounded-xl bg-white dark:bg-zinc-900">
            <h2 className="text-lg font-bold mb-4 text-center">
              Transfer Value
            </h2>

            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={player.transferValues || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="season" />
                  <YAxis />
                  <Tooltip formatter={(v) => `€${v}m`} />

                  <Line type="monotone" dataKey="value" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-xl bg-white dark:bg-zinc-900">
          <h2 className="text-lg font-bold mb-4">Similar Players</h2>

          {similarPlayers.length === 0 ? (
            <p className="text-sm text-gray-500">
              No similar players found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {similarPlayers.map((similar) => (
                <Link
                  key={similar.id}
                  href={`/players/${similar.slug}`}
                  className="p-4 border rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={similar.image || "/players/default.png"}
                      alt={similar.name}
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />

                    <div>
                      <h3 className="font-bold">{similar.name}</h3>
                      <p className="text-xs text-gray-500">
                        {similar.position} • {similar.club} • {similar.country}
                      </p>
                      <p className="text-xs mt-1">
                        Match: {similar.similarityScore}%
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}