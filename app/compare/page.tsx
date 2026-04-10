"use client"

import { useState } from "react"
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
  name: string
  position: string
  age: number
  image: string
  apps: number
  goals: number
  assists: number
  rating?: number
  minutes?: number

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

const players: Player[] = [
  {
    name: "Bukayo Saka",
    position: "RW",
    age: 24,
    image: "/players/saka.png",
    apps: 222,
    goals: 59,
    assists: 48,
    rating: 7.7,
    minutes: 16890,
    touches: 69,
    shotAttempts: 86,
    goalThreat: 78,
    chancesCreated: 68,
    aerialDuelsWon: 12,
    defensiveContributions: 35,
    dribbles: 88,
    keyPasses: 79,
    passAccuracy: 84,
  },
  {
    name: "Cole Palmer",
    position: "CAM",
    age: 24,
    image: "/players/cole_palmer.png",
    apps: 109,
    goals: 46,
    assists: 21,
    rating: 7.8,
    minutes: 8120,
    touches: 72,
    shotAttempts: 80,
    goalThreat: 74,
    chancesCreated: 85,
    aerialDuelsWon: 8,
    defensiveContributions: 41,
    dribbles: 84,
    keyPasses: 90,
    passAccuracy: 86,
  },
  {
    name: "Harry Kane",
    position: "FW",
    age: 31,
    image: "/players/harry_kane.png",
    apps: 320,
    goals: 213,
    assists: 52,
    rating: 8.1,
    minutes: 25500,
    touches: 64,
    shotAttempts: 94,
    goalThreat: 96,
    chancesCreated: 71,
    aerialDuelsWon: 67,
    defensiveContributions: 28,
    dribbles: 62,
    keyPasses: 74,
    passAccuracy: 82,
  },
  {
    name: "Pedri",
    position: "CM",
    age: 22,
    image: "/players/pedri.png",
    apps: 188,
    goals: 19,
    assists: 24,
    rating: 7.6,
    minutes: 13640,
    touches: 92,
    passing: 94,
    chancesCreated: 81,
    ballWinning: 63,
    aerialDuelsWon: 18,
    goalThreat: 49,
    passAccuracy: 92,
    progressivePasses: 87,
    dribbles: 73,
  },
  {
    name: "Virgil Van Dijk",
    position: "CB",
    age: 34,
    image: "/players/vvd.png",
    apps: 301,
    goals: 24,
    assists: 9,
    rating: 7.5,
    minutes: 24870,
    tackles: 72,
    interceptions: 75,
    aerialDuelsWon: 95,
    clearances: 88,
    passing: 84,
    defensiveContributions: 91,
    blocks: 67,
    recoveries: 83,
    passAccuracy: 89,
  },
  {
    name: "William Saliba",
    position: "CB",
    age: 24,
    image: "/players/saliba.png",
    apps: 190,
    goals: 8,
    assists: 4,
    rating: 7.4,
    minutes: 15480,
    tackles: 78,
    interceptions: 79,
    aerialDuelsWon: 84,
    clearances: 82,
    passing: 87,
    defensiveContributions: 86,
    blocks: 64,
    recoveries: 81,
    passAccuracy: 91,
  },
  {
    name: "Gianluigi Donnarumma",
    position: "GK",
    age: 27,
    image: "/players/donnarumma.png",
    apps: 280,
    goals: 0,
    assists: 0,
    rating: 7.2,
    minutes: 23400,
    saves: 86,
    claims: 73,
    distribution: 68,
    reflexes: 91,
    oneVsOne: 84,
    aerialCommand: 78,
    cleanSheets: 108,
    savePercentage: 77,
    longPassAccuracy: 63,
  },
  {
    name: "David Raya",
    position: "GK",
    age: 29,
    image: "/players/raya.png",
    apps: 215,
    goals: 0,
    assists: 1,
    rating: 7.3,
    minutes: 18210,
    saves: 81,
    claims: 77,
    distribution: 88,
    reflexes: 84,
    oneVsOne: 79,
    aerialCommand: 74,
    cleanSheets: 83,
    savePercentage: 74,
    longPassAccuracy: 81,
  },
  {
    name: "Vitinha",
    position: "CM",
    age: 25,
    image: "/players/vitinha.png",
    apps: 210,
    goals: 18,
    assists: 20,
    rating: 7.7,
    minutes: 16340,
  
    touches: 94,
    passing: 93,
    chancesCreated: 78,
    ballWinning: 66,
    aerialDuelsWon: 14,
    goalThreat: 52,
  
    passAccuracy: 92,
    progressivePasses: 90,
    dribbles: 76,
  },
]

const getPlayerGroup = (position: string) => {
  if (["FW", "RW", "LW", "CAM"].includes(position)) return "ATT"
  if (["CM", "CDM"].includes(position)) return "MID"
  if (["CB", "LB", "RB"].includes(position)) return "DEF"
  if (["GK"].includes(position)) return "GK"
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

export default function ComparePage() {
  const [query, setQuery] = useState("")
  const [activeSlot, setActiveSlot] = useState<1 | 2 | null>(null)
  const [player1, setPlayer1] = useState<Player | null>(null)
  const [player2, setPlayer2] = useState<Player | null>(null)

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(query.toLowerCase())
  )

  const selectPlayer = (player: Player) => {
    if (activeSlot === 1) setPlayer1(player)
    if (activeSlot === 2) setPlayer2(player)
    setActiveSlot(null)
    setQuery("")
  }

  const getBetter = (a?: number, b?: number) => {
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
    p1?: number
    p2?: number
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
            {filteredPlayers.map((player, index) => (
              <div
                key={index}
                onClick={() => selectPlayer(player)}
                className="p-2 border-b cursor-pointer hover:bg-gray-100"
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
                src={player1.image}
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
                src={player2.image}
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
              Compare attacker vs attacker, midfielder vs midfielder, defender vs defender,
              or goalkeeper vs goalkeeper.
            </div>
          )}

          {sameGroup && (
            <div className="p-4 border rounded-xl mb-6">
              <h2 className="text-lg font-bold mb-4 text-center">Radar Comparison</h2>

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
              </div>
            </div>

            {player1Group === "ATT" && player2Group === "ATT" && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="p-4 border rounded-xl">
                  <h2 className="text-lg font-bold mb-4 text-center">Attacking Output</h2>
                  <div className="space-y-2">
                    <StatRow label="Goals" p1={player1.goals} p2={player2.goals} />
                    <StatRow label="Assists" p1={player1.assists} p2={player2.assists} />
                    <StatRow label="Shot Attempts" p1={player1.shotAttempts} p2={player2.shotAttempts} />
                    <StatRow label="Goal Threat" p1={player1.goalThreat} p2={player2.goalThreat} />
                  </div>
                </div>

                <div className="p-4 border rounded-xl">
                  <h2 className="text-lg font-bold mb-4 text-center">Chance Creation</h2>
                  <div className="space-y-2">
                    <StatRow label="Chances Created" p1={player1.chancesCreated} p2={player2.chancesCreated} />
                    <StatRow label="Key Passes" p1={player1.keyPasses} p2={player2.keyPasses} />
                    <StatRow label="Dribbles" p1={player1.dribbles} p2={player2.dribbles} />
                    <StatRow label="Pass Accuracy" p1={player1.passAccuracy} p2={player2.passAccuracy} />
                  </div>
                </div>
              </div>
            )}

            {player1Group === "MID" && player2Group === "MID" && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="p-4 border rounded-xl">
                  <h2 className="text-lg font-bold mb-4 text-center">Midfield Play</h2>
                  <div className="space-y-2">
                    <StatRow label="Touches" p1={player1.touches} p2={player2.touches} />
                    <StatRow label="Passing" p1={player1.passing} p2={player2.passing} />
                    <StatRow label="Pass Accuracy" p1={player1.passAccuracy} p2={player2.passAccuracy} />
                    <StatRow label="Progressive Passes" p1={player1.progressivePasses} p2={player2.progressivePasses} />
                  </div>
                </div>

                <div className="p-4 border rounded-xl">
                  <h2 className="text-lg font-bold mb-4 text-center">Creation & Ball Work</h2>
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
                  <h2 className="text-lg font-bold mb-4 text-center">Defending</h2>
                  <div className="space-y-2">
                    <StatRow label="Tackles" p1={player1.tackles} p2={player2.tackles} />
                    <StatRow label="Interceptions" p1={player1.interceptions} p2={player2.interceptions} />
                    <StatRow label="Clearances" p1={player1.clearances} p2={player2.clearances} />
                    <StatRow label="Blocks" p1={player1.blocks} p2={player2.blocks} />
                  </div>
                </div>

                <div className="p-4 border rounded-xl">
                  <h2 className="text-lg font-bold mb-4 text-center">Possession & Duels</h2>
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
                  <h2 className="text-lg font-bold mb-4 text-center">Shot Stopping</h2>
                  <div className="space-y-2">
                    <StatRow label="Saves" p1={player1.saves} p2={player2.saves} />
                    <StatRow label="Save %" p1={player1.savePercentage} p2={player2.savePercentage} />
                    <StatRow label="Reflexes" p1={player1.reflexes} p2={player2.reflexes} />
                    <StatRow label="1v1" p1={player1.oneVsOne} p2={player2.oneVsOne} />
                  </div>
                </div>

                <div className="p-4 border rounded-xl">
                  <h2 className="text-lg font-bold mb-4 text-center">Command & Distribution</h2>
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