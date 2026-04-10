import Image from "next/image"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8">

      {/* 🔝 TOP ROW */}
      <div className="flex gap-6">

        {/* HERO */}
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
              <h2 className="text-3xl font-bold">Cole Palmer</h2>
              <p className="text-sm">Player Spotlight</p>

              <Link href="/playerInfo">
                <button className="mt-4 px-4 py-2 bg-white text-black rounded-lg font-bold">
                  View Player
                </button>
              </Link>
            </div>

          </div>
        </div>

        {/* TABLE */}
        <div className="w-[300px] hidden lg:block">
          <div className="p-4 border rounded-xl bg-white dark:bg-zinc-900 h-[400px] overflow-y-auto">
            <h2 className="font-bold mb-4 text-center">Premier League</h2>

            <div className="space-y-1 text-sm">
              {[
                "Arsenal",
                "Man City",
                "Liverpool",
                "Aston Villa",
                "Tottenham",
                "Chelsea",
                "Newcastle",
                "Brighton",
                "Man United",
                "West Ham",
              ].map((team, i) => (
                <div key={i} className="flex justify-between border-b py-1">
                  <span>{i + 1}. {team}</span>
                  <span>{70 - i * 3} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 🔽 MINI CARDS (FULL WIDTH BELOW) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="p-4 border rounded-xl bg-white dark:bg-zinc-900">
          <h2 className="font-bold mb-3">Top Players</h2>
          <p className="text-sm">🔥 Palmer, Saka, Bellingham</p>
        </div>

        <div className="p-4 border rounded-xl bg-white dark:bg-zinc-900">
          <h2 className="font-bold mb-3">Recent Players</h2>
          <p className="text-sm">Palmer, Van Dijk, Donnarumma</p>
        </div>

        <div className="p-4 border rounded-xl bg-white dark:bg-zinc-900">
          <h2 className="font-bold mb-3">Quick Actions</h2>
          <p className="text-sm">Search • Compare • Shortlist</p>
        </div>
      </div>

            {/* 🔽 FIXTURES CARD */}
      <div className="p-4 border rounded-xl bg-white dark:bg-zinc-900">
        <h2 className="font-bold mb-4">Upcoming Fixtures</h2>

        <div className="space-y-3 text-sm">

          {[
            { home: "Arsenal", away: "Chelsea", time: "Sat 12:30" },
            { home: "Liverpool", away: "Spurs", time: "Sat 17:30" },
            { home: "Man City", away: "Newcastle", time: "Sun 14:00" },
            { home: "Brighton", away: "Villa", time: "Sun 16:30" },
            { home: "Man United", away: "West Ham", time: "Mon 20:00" },
          ].map((fixture, i) => (
            <div key={i} className="flex justify-between border-b pb-2">
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