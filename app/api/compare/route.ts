import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const player1 = searchParams.get("player1")
    const player2 = searchParams.get("player2")

    if (!player1 || !player2) {
      return NextResponse.json(
        { message: "Two players are required" },
        { status: 400 }
      )
    }

    const players = await prisma.player.findMany({
      where: {
        slug: {
          in: [player1, player2],
        },
      },
    })

    if (players.length !== 2) {
      return NextResponse.json(
        { message: "One or more players not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(players)
  } catch (error) {
    console.error("COMPARE ERROR:", error)

    return NextResponse.json(
      { message: "Failed to compare players" },
      { status: 500 }
    )
  }
}