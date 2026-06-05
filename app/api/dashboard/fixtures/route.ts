import { NextResponse } from "next/server"

const fixtures = [
  { home: "Arsenal", away: "Chelsea", time: "Sat 12:30" },
  { home: "Liverpool", away: "Spurs", time: "Sat 17:30" },
  { home: "Man City", away: "Newcastle", time: "Sun 14:00" },
  { home: "Brighton", away: "Villa", time: "Sun 16:30" },
  { home: "Man United", away: "West Ham", time: "Mon 20:00" },
]

export async function GET() {
  return NextResponse.json(fixtures)
}