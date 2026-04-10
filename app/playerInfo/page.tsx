"use client"

import Image from "next/image"
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

const radarData = [
    { stat: "Touches", value: 69 },
    { stat: "Shot attempts", value: 86 },
    { stat: "Goals", value: 78 },
    { stat: "Chances created", value: 68 },
    { stat: "Aerial duels", value: 1 },
    { stat: "Defensive", value: 22 },
  ]
  
  const transferValueData = [
    { season: "2022/23", value: 18 },
    { season: "2023/24", value: 35 },
    { season: "2024/25", value: 65 },
  ]

export default function PlayerInfo() {

  const lastGames = [
    { opponent: "Liverpool", rating: 7.8 },
    { opponent: "Chelsea", rating: 6.9 },
    { opponent: "Arsenal", rating: 8.2 },
    { opponent: "Spurs", rating: 7.1 },
    { opponent: "Man City", rating: 7.5 },
  ]

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      
      <main className="w-full max-w-5xl mx-auto space-y-6">

        {/* 🔷 HEADER CARD */}
        <div className="flex items-center justify-between p-6 border rounded-xl bg-white dark:bg-zinc-900">

          <div className="flex items-center gap-6">
            <Image
              src="/players/cole_palmer.png"
              alt="Palmer"
              width={120}
              height={120}
              className="rounded-lg"
            />

            <div>
              <h1 className="text-3xl font-bold">Cole Palmer</h1>
              <p className="text-sm text-gray-500">CAM • 24 yrs</p>
            </div>
          </div>

          {/* FIFA STYLE STATS */}
          <div className="grid grid-cols-3 gap-4 text-sm text-center">
            <div>PAC<br /><span className="font-bold">87</span></div>
            <div>SHO<br /><span className="font-bold">85</span></div>
            <div>PAS<br /><span className="font-bold">90</span></div>
            <div>DRI<br /><span className="font-bold">90</span></div>
            <div>DEF<br /><span className="font-bold">55</span></div>
            <div>PHY<br /><span className="font-bold">70</span></div>
          </div>

        </div>

        {/* 🟩 STATS CARD */}
        <div className="p-6 border rounded-xl bg-white dark:bg-zinc-900">
          <h2 className="text-lg font-bold mb-4">Season Stats</h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>Apps: 20(2)</div>
            <div>Avg Rating: 7.11</div>
            <div>Goals: 10</div>
            <div>Assists: 3</div>
          </div>
        </div>

        {/* 🟨 FORM CARD */}
        <div className="p-6 border rounded-xl bg-white dark:bg-zinc-900">
          <h2 className="text-lg font-bold mb-4">Last 5 Games</h2>

          <div className="space-y-2">
            {lastGames.map((game, index) => (
              <div key={index} className="flex justify-between border-b pb-2 text-sm">
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
        {/* 🟪 ANALYTICS SECTION */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* 🔵 RADAR */}
        <div className="p-6 border rounded-xl bg-white dark:bg-zinc-900">
        <h2 className="text-lg font-bold mb-4 text-center">Player Profile</h2>

        <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
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

        {/* 🟣 TRANSFER VALUE */}
        <div className="p-6 border rounded-xl bg-white dark:bg-zinc-900">
        <h2 className="text-lg font-bold mb-4 text-center">Transfer Value</h2>

        <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
            <LineChart data={transferValueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="season" />
                <YAxis />
                <Tooltip formatter={(v) => `€${v}m`} />

                <Line
                type="monotone"
                dataKey="value"
                strokeWidth={3}
                />
            </LineChart>
            </ResponsiveContainer>
        </div>
        </div>

        </div>

      </main>
    </div>
  )
}