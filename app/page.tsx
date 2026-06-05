"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

type Standing = {
  position: number
  team: string
  points: number
}

type Fixture = {
  home: string
  away: string
  time: string
}

type Player = {
  id: number
  name: string
  slug: string
  position: string
  club: string
  country: string
  goals: number | null
  rating: number | null
}

export default function Dashboard() {
  const [standings, setStandings] = useState<Standing[]>([])
  const [fixtures, setFixtures] = useState<Fixture[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [page, setPage] = useState(0)

  const pageSize = 5
  const paginatedStandings = standings.slice(page * pageSize, page * pageSize + pageSize)
  const totalPages = Math.ceil(standings.length / pageSize)

  useEffect(() => {
    const fetchDashboardData = async () => {
      const [standingsRes, fixturesRes, playersRes] = await Promise.all([
        fetch("/api/dashboard/standings"),
        fetch("/api/dashboard/fixtures"),
        fetch("/api/players"),
      ])

      setStandings(await standingsRes.json())
      setFixtures(await fixturesRes.json())
      setPlayers(await playersRes.json())
    }

    fetchDashboardData()
  }, [])

  const topPlayers = [...players]
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 3)

  const recentPlayers = [...players].slice(-3).reverse()

  return (
    <div className="p-8 space-y-8">
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/players/cole_palmer_cele.webp"
              alt="Cole Palmer"
              fill
              className="object-cover object-[center_20%]"
            />

            <div className="absolute inset-0 bg-black/50" />

            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-sm">Player Spotlight</p>
              <h2 className="text-3xl font-bold">Cole Palmer</h2>
              <p className="text-xs">Chelsea • England</p>

              <Link href="/players/cole-palmer">
                <button className="mt-4 px-4 py-2 bg-white text-black rounded-lg font-bold">
                  View Player
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-[300px] hidden lg:block">
          <div className="p-4 border rounded-xl bg-white dark:bg-zinc-900 h-[400px]">
            <h2 className="font-bold mb-4 text-center">Premier League</h2>

            <div className="space-y-1 text-sm min-h-[250px]">
              {paginatedStandings.map((team) => (
                <div key={team.position} className="flex justify-between border-b py-1">
                  <span>
                    {team.position}. {team.team}
                  </span>
                  <span>{team.points} pts</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4 text-xs">
              <button
                disabled={page === 0}
                onClick={() => setPage((current) => current - 1)}
                className="px-2 py-1 border rounded disabled:opacity-40"
              >
                Prev
              </button>

              <span>
                Page {page + 1} / {totalPages || 1}
              </span>

              <button
                disabled={page >= totalPages - 1}
                onClick={() => setPage((current) => current + 1)}
                className="px-2 py-1 border rounded disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 border rounded-xl bg-white dark:bg-zinc-900">
          <h2 className="font-bold mb-3">Top Players</h2>

          <div className="text-sm space-y-1">
            {topPlayers.length > 0 ? (
              topPlayers.map((player) => (
                <Link
                  key={player.id}
                  href={`/players/${player.slug}`}
                  className="block hover:underline"
                >
                  🔥 {player.name}
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No players available</p>
            )}
          </div>
        </div>

        <div className="p-4 border rounded-xl bg-white dark:bg-zinc-900">
          <h2 className="font-bold mb-3">Recent Players</h2>

          <div className="text-sm space-y-1">
            {recentPlayers.length > 0 ? (
              recentPlayers.map((player) => (
                <Link
                  key={player.id}
                  href={`/players/${player.slug}`}
                  className="block hover:underline"
                >
                  {player.name}
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No recent players</p>
            )}
          </div>
        </div>

        <div className="p-4 border rounded-xl bg-white dark:bg-zinc-900">
          <h2 className="font-bold mb-3">Quick Actions</h2>

          <div className="text-sm flex flex-wrap gap-2">
            <Link href="/search" className="underline">
              Search
            </Link>
            <span>•</span>
            <Link href="/compare" className="underline">
              Compare
            </Link>
            <span>•</span>
            <Link href="/shortlist" className="underline">
              Shortlist
            </Link>
          </div>
        </div>
      </div>

      <div className="p-4 border rounded-xl bg-white dark:bg-zinc-900">
        <h2 className="font-bold mb-4">Upcoming Fixtures</h2>

        <div className="space-y-3 text-sm">
          {fixtures.map((fixture, index) => (
            <div key={index} className="flex justify-between border-b pb-2">
              <span>
                {fixture.home} vs {fixture.away}
              </span>
              <span className="text-gray-500">{fixture.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}