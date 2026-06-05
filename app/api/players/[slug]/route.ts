import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params

    const player = await prisma.player.findUnique({
      where: {
        slug,
      },
    })

    if (!player) {
      return NextResponse.json(
        { message: "Player not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(player)
  } catch (error) {
    console.error("PLAYER FETCH ERROR:", error)

    return NextResponse.json(
      { message: "Failed to fetch player" },
      { status: 500 }
    )
  }
}