import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const positionOrder: Record<string, number> = {
      ST: 1,
      RW: 2,
      LW: 3,
      CAM: 4,
      CM: 5,
      CDM: 6,
      RB: 7,
      LB: 8,
      CB: 9,
      GK: 10,
    }
    
    const players = await prisma.player.findMany()
    
    players.sort(
      (a, b) =>
        (positionOrder[a.position] || 999) -
        (positionOrder[b.position] || 999)
    )

    return NextResponse.json(players)
  } catch (error) {
    console.error("PLAYERS FETCH ERROR:", error)

    return NextResponse.json(
      { message: "Failed to fetch players" },
      { status: 500 }
    )
  }
}