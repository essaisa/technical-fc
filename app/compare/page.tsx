"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts"

type Player = {
  id: number
  name: string
  slug: string
  position: string
  age: number
  image: string | null
  apps: number | null
  goals: number | null
  assists: number | null
  rating?: number | null
  minutes?: number | null

  touches?: number
  shotAttempts?: number
  goalThreat?: number
  chancesCreated?: number
  aerialDuelsWon?: number
  defensiveContributions?: number

  passing?: number
  ballWinning?: number
  keyPasses?: number
  dribbles?: number
  passAccuracy?: number
  progressivePasses?: number

  tackles?: number
  interceptions?: number
  clearances?: number
  blocks?: number
  recoveries?: number

  saves?: number
  claims?: number
  distribution?: number
  reflexes?: number
  oneVsOne?: number
  aerialCommand?: number
  cleanSheets?: number
  savePercentage?: number
  longPassAccuracy?: number
}

const getPlayerGroup = (position: string) => {
  if (["ST", "RW", "LW", "CAM"].includes(position)) return "ATT"
  if (["CM", "CDM"].includes(position)) return "MID"
  if (["CB", "LB", "RB"].includes(position)) return "DEF"
  if (position === "GK") return "GK"
  return "OTHER"
}

const radarMetricsByGroup = {
  ATT: [
    { label: "Touches", key: "touches" },
    { label: "Shot Attempts", key: "shotAttempts" },
    { label: "Goal Threat", key: "goalThreat" },
    { label: "Chances Created", key: "chancesCreated" },
    { label: "Aerial Duels", key: "aerialDuelsWon" },
    { label: "Def. Work", key: "defensiveContributions" },
  ],
  MID: [
    { label: "Touches", key: "touches" },
    { label: "Passing", key: "passing" },
    { label: "Chances Created", key: "chancesCreated" },
    { label: "Ball Winning", key: "ballWinning" },
    { label: "Aerial Duels", key: "aerialDuelsWon" },
    { label: "Goal Threat", key: "goalThreat" },
  ],
  DEF: [
    { label: "Tackles", key: "tackles" },
    { label: "Interceptions", key: "interceptions" },
    { label: "Aerial Duels", key: "aerialDuelsWon" },
    { label: "Clearances", key: "clearances" },
    { label: "Passing", key: "passing" },
    { label: "Def. Work", key: "defensiveContributions" },
  ],
  GK: [
    { label: "Saves", key: "saves" },
    { label: "Claims", key: "claims" },
    { label: "Distribution", key: "distribution" },
    { label: "Reflexes", key: "reflexes" },
    { label: "1v1", key: "oneVsOne" },
    { label: "Aerial Cmd", key: "aerialCommand" },
  ],
} as const

const mapPlayer = (player: any): Player => ({
  id: player.id,
  name: player.name,
  slug: player.slug,
  position: player.position,
  age: player.age,
  image: player.image,
  apps: player.apps,
  goals: player.goals,
  assists: player.assists,
  rating: player.rating,
  minutes: player.minutes,
  ...(player.compareStats || {}),
})

export default function ComparePage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [query, setQuery] = useState("")
  const [activeSlot, setActiveSlot] = useState<1 | 2 | null>(null)
  const [player1, setPlayer1] = useState<Player | null>(null)
  const [player2, setPlayer2] = useState<Player | null>(null)

  useEffect(() => {
    const searchPlayers = async () => {
      if (!query.trim()) {
        setPlayers([])
        return
      }

      try {
        const res = await fetch(
          `/api/players/search?q=${encodeURIComponent(query)}`
        )

        if (!res.ok) throw new Error("Failed to search players")

        const data = await res.json()
        setPlayers(data.map(mapPlayer))
      } catch (error) {
        console.error("COMPARE SEARCH ERROR:", error)
      }
    }

    const timeout = setTimeout(searchPlayers, 300)
    return () => clearTimeout(timeout)
  }, [query])

  const selectPlayer = async (player: Player) => {
    try {
      if (activeSlot === 1 && player2) {
        const res = await fetch(
          `/api/compare?player1=${player.slug}&player2=${player2.slug}`
        )

        const data = await res.json()
        const mapped = data.map(mapPlayer)

        setPlayer1(mapped.find((p: Player) => p.slug === player.slug) || null)
        setPlayer2(mapped.find((p: Player) => p.slug === player2.slug) || null)
      } else if (activeSlot === 2 && player1) {
        const res = await fetch(
          `/api/compare?player1=${player1.slug}&player2=${player.slug}`
        )

        const data = await res.json()
        const mapped = data.map(mapPlayer)

        setPlayer1(mapped.find((p: Player) => p.slug === player1.slug) || null)
        setPlayer2(mapped.find((p: Player) => p.slug === player.slug) || null)
      } else {
        if (activeSlot === 1) setPlayer1(player)
        if (activeSlot === 2) setPlayer2(player)
      }

      setActiveSlot(null)
      setQuery("")
      setPlayers([])
    } catch (error) {
      console.error("COMPARE FETCH ERROR:", error)
    }
  }

  const getBetter = (a?: number | null, b?: number | null) => {
    if (a == null || b == null) return ""
    if (a > b) return "text-green-500 font-bold"
    if (a < b) return "text-red-500"
    return ""
  }

  const player1Group = player1 ? getPlayerGroup(player1.position) : null
  const player2Group = player2 ? getPlayerGroup(player2.position) : null

  const sameGroup =
    player1 && player2 && player1Group === player2Group && player1Group !== "OTHER"

  const radarData =
    sameGroup && player1 && player2
      ? radarMetricsByGroup[player1Group as keyof typeof radarMetricsByGroup].map(
          (metric) => ({
            stat: metric.label,
            p1: (player1 as any)[metric.key] ?? 0,
            p2: (player2 as any)[metric.key] ?? 0,
          })
        )
      : []

  const StatRow = ({
    label,
    p1,
    p2,
  }: {
    label: string
    p1?: number | null
    p2?: number | null
  }) => (
    <div className="grid grid-cols-3 text-center">
      <span className={getBetter(p1, p2)}>{p1 ?? "-"}</span>
      <span className="font-bold">{label}</span>
      <span className={getBetter(p2, p1)}>{p2 ?? "-"}</span>
    </div>
  )

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Compare Players</h1>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div
          onClick={() => setActiveSlot(1)}
          className="p-4 border rounded-xl cursor-pointer"
        >
          <h2 className="font-bold mb-2">Player 1</h2>
          <p>{player1 ? player1.name : "Select player..."}</p>
        </div>

        <div
          onClick={() => setActiveSlot(2)}
          className="p-4 border rounded-xl cursor-pointer"
        >
          <h2 className="font-bold mb-2">Player 2</h2>
          <p>{player2 ? player2.name : "Select player..."}</p>
        </div>
      </div>

      {activeSlot && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search players..."
            className="w-full p-2 border rounded mb-2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="border rounded">
            {players.map((player) => (
              <div
                key={player.id}
                onClick={() => selectPlayer(player)}
                className="p-2 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-900"
              >
                {player.name} — {player.position}
              </div>
            ))}
          </div>
        </div>
      )}

      {player1 && player2 && (
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-6 mb-6 text-center">
            <div className="p-4 border rounded-xl">
              <Image
                src={player1.image || "/players/default.png"}
                alt={player1.name}
                width={100}
                height={100}
                className="mx-auto mb-2"
              />
              <h2 className="font-bold">{player1.name}</h2>
              <p>{player1.position}</p>
            </div>

            <div className="p-4 border rounded-xl">
              <Image
                src={player2.image || "/players/default.png"}
                alt={player2.name}
                width={100}
                height={100}
                className="mx-auto mb-2"
              />
              <h2 className="font-bold">{player2.name}</h2>
              <p>{player2.position}</p>
            </div>
          </div>

          {!sameGroup && (
            <div className="p-4 border rounded-xl bg-red-50 text-red-700 mb-6">
              These players are in different role groups, so radar comparison is disabled.
            </div>
          )}

          {sameGroup && (
            <div className="p-4 border rounded-xl mb-6">
              <h2 className="text-lg font-bold mb-4 text-center">
                Radar Comparison
              </h2>

              <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="stat" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />

                    <Radar
                      name={player1.name}
                      dataKey="p1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                    />

                    <Radar
                      name={player2.name}
                      dataKey="p2"
                      stroke="#a855f7"
                      fill="#a855f7"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="p-4 border rounded-xl">
              <h2 className="text-lg font-bold mb-4 text-center">General</h2>
              <div className="space-y-2">
                <StatRow label="Apps" p1={player1.apps} p2={player2.apps} />
                <StatRow label="Age" p1={player1.age} p2={player2.age} />
                <StatRow label="Rating" p1={player1.rating} p2={player2.rating} />
                <StatRow label="Minutes" p1={player1.minutes} p2={player2.minutes} />
                <StatRow label="Goals" p1={player1.goals} p2={player2.goals} />
                <StatRow label="Assists" p1={player1.assists} p2={player2.assists} />
              </div>
            </div>

            {player1Group === "ATT" && player2Group === "ATT" && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="p-4 border rounded-xl">
                  <h2 className="text-lg font-bold mb-4 text-center">
                    Attacking Output
                  </h2>
                  <div className="space-y-2">
                    <StatRow label="Shot Attempts" p1={player1.shotAttempts} p2={player2.shotAttempts} />
                    <StatRow label="Goal Threat" p1={player1.goalThreat} p2={player2.goalThreat} />
                    <StatRow label="Chances Created" p1={player1.chancesCreated} p2={player2.chancesCreated} />
                    <StatRow label="Aerial Duels" p1={player1.aerialDuelsWon} p2={player2.aerialDuelsWon} />
                  </div>
                </div>

                <div className="p-4 border rounded-xl">
                  <h2 className="text-lg font-bold mb-4 text-center">
                    Chance Creation
                  </h2>
                  <div className="space-y-2">
                    <StatRow label="Key Passes" p1={player1.keyPasses} p2={player2.keyPasses} />
                    <StatRow label="Dribbles" p1={player1.dribbles} p2={player2.dribbles} />
                    <StatRow label="Pass Accuracy" p1={player1.passAccuracy} p2={player2.passAccuracy} />
                    <StatRow label="Def. Work" p1={player1.defensiveContributions} p2={player2.defensiveContributions} />
                  </div>
                </div>
              </div>
            )}

            {player1Group === "MID" && player2Group === "MID" && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="p-4 border rounded-xl">
                  <h2 className="text-lg font-bold mb-4 text-center">
                    Midfield Play
                  </h2>
                  <div className="space-y-2">
                    <StatRow label="Touches" p1={player1.touches} p2={player2.touches} />
                    <StatRow label="Passing" p1={player1.passing} p2={player2.passing} />
                    <StatRow label="Pass Accuracy" p1={player1.passAccuracy} p2={player2.passAccuracy} />
                    <StatRow label="Progressive Passes" p1={player1.progressivePasses} p2={player2.progressivePasses} />
                  </div>
                </div>

                <div className="p-4 border rounded-xl">
                  <h2 className="text-lg font-bold mb-4 text-center">
                    Creation & Ball Work
                  </h2>
                  <div className="space-y-2">
                    <StatRow label="Chances Created" p1={player1.chancesCreated} p2={player2.chancesCreated} />
                    <StatRow label="Ball Winning" p1={player1.ballWinning} p2={player2.ballWinning} />
                    <StatRow label="Dribbles" p1={player1.dribbles} p2={player2.dribbles} />
                    <StatRow label="Goal Threat" p1={player1.goalThreat} p2={player2.goalThreat} />
                  </div>
                </div>
              </div>
            )}

            {player1Group === "DEF" && player2Group === "DEF" && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="p-4 border rounded-xl">
                  <h2 className="text-lg font-bold mb-4 text-center">
                    Defending
                  </h2>
                  <div className="space-y-2">
                    <StatRow label="Tackles" p1={player1.tackles} p2={player2.tackles} />
                    <StatRow label="Interceptions" p1={player1.interceptions} p2={player2.interceptions} />
                    <StatRow label="Clearances" p1={player1.clearances} p2={player2.clearances} />
                    <StatRow label="Blocks" p1={player1.blocks} p2={player2.blocks} />
                  </div>
                </div>

                <div className="p-4 border rounded-xl">
                  <h2 className="text-lg font-bold mb-4 text-center">
                    Possession & Duels
                  </h2>
                  <div className="space-y-2">
                    <StatRow label="Aerial Duels" p1={player1.aerialDuelsWon} p2={player2.aerialDuelsWon} />
                    <StatRow label="Recoveries" p1={player1.recoveries} p2={player2.recoveries} />
                    <StatRow label="Passing" p1={player1.passing} p2={player2.passing} />
                    <StatRow label="Pass Accuracy" p1={player1.passAccuracy} p2={player2.passAccuracy} />
                  </div>
                </div>
              </div>
            )}

            {player1Group === "GK" && player2Group === "GK" && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="p-4 border rounded-xl">
                  <h2 className="text-lg font-bold mb-4 text-center">
                    Shot Stopping
                  </h2>
                  <div className="space-y-2">
                    <StatRow label="Saves" p1={player1.saves} p2={player2.saves} />
                    <StatRow label="Save %" p1={player1.savePercentage} p2={player2.savePercentage} />
                    <StatRow label="Reflexes" p1={player1.reflexes} p2={player2.reflexes} />
                    <StatRow label="1v1" p1={player1.oneVsOne} p2={player2.oneVsOne} />
                  </div>
                </div>

                <div className="p-4 border rounded-xl">
                  <h2 className="text-lg font-bold mb-4 text-center">
                    Command & Distribution
                  </h2>
                  <div className="space-y-2">
                    <StatRow label="Claims" p1={player1.claims} p2={player2.claims} />
                    <StatRow label="Aerial Cmd" p1={player1.aerialCommand} p2={player2.aerialCommand} />
                    <StatRow label="Distribution" p1={player1.distribution} p2={player2.distribution} />
                    <StatRow label="Long Pass Acc." p1={player1.longPassAccuracy} p2={player2.longPassAccuracy} />
                    <StatRow label="Clean Sheets" p1={player1.cleanSheets} p2={player2.cleanSheets} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}