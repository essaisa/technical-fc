import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

type CompareStats = Record<string, number>

function calculateSimilarity(a: CompareStats, b: CompareStats) {
  const keys = Object.keys(a).filter(
    (key) => typeof a[key] === "number" && typeof b[key] === "number"
  )

  if (keys.length === 0) return 0

  const totalDifference = keys.reduce((total, key) => {
    return total + Math.abs(a[key] - b[key])
  }, 0)

  return 100 - totalDifference / keys.length
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params

    const currentPlayer = await prisma.player.findUnique({
      where: { slug },
    })

    if (!currentPlayer) {
      return NextResponse.json(
        { message: "Player not found" },
        { status: 404 }
      )
    }

    const players = await prisma.player.findMany({
      where: {
        slug: {
          not: slug,
        },
        role: currentPlayer.role,
      },
    })

    const currentStats = currentPlayer.compareStats as CompareStats

    const similarPlayers = players
      .map((player) => {
        const score = calculateSimilarity(
          currentStats,
          player.compareStats as CompareStats
        )

        return {
          id: player.id,
          name: player.name,
          slug: player.slug,
          position: player.position,
          age: player.age,
          club: player.club,
          country: player.country,
          image: player.image,
          similarityScore: Math.round(score),
        }
      })
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, 3)

    return NextResponse.json(similarPlayers)
  } catch (error) {
    console.error("SIMILAR PLAYERS ERROR:", error)

    return NextResponse.json(
      { message: "Failed to fetch similar players" },
      { status: 500 }
    )
  }
}