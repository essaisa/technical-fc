import { NextResponse } from "next/server"

const standings = [
    { position: 1, team: "Arsenal", points: 73 },
    { position: 2, team: "Man City", points: 70 },
    { position: 3, team: "Man United", points: 61 },
    { position: 4, team: "Liverpool", points: 58 },
    { position: 5, team: "Aston Villa", points: 58 },
    { position: 6, team: "Brighton", points: 50 },
    { position: 7, team: "Bournemouth", points: 49 },
    { position: 8, team: "Chelsea", points: 48 },
    { position: 9, team: "Brentford", points: 48 },
    { position: 10, team: "Fulham", points: 48 },
    { position: 11, team: "Everton", points: 47 },
    { position: 12, team: "Sunderland", points: 46 },
    { position: 13, team: "Palace", points: 43 },
    { position: 14, team: "Leeds", points: 43 },
    { position: 15, team: "Newcastle", points: 42 },
    { position: 16, team: "Nottm Forest", points: 39 },
    { position: 17, team: "West Ham", points: 36 },
    { position: 18, team: "Tottenham", points: 34 },
    { position: 19, team: "Burnley", points: 20 },
    { position: 20, team: "Wolves", points: 17 },
  ]

export async function GET() {
  return NextResponse.json(standings)
}