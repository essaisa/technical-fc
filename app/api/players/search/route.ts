import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { PlayerBST } from "@/lib/dsa/PlayerBST"

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("q")

    if (!query) {
      return NextResponse.json([])
    }

    const allPlayers = await prisma.player.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        position: true,
        age: true,
        club: true,
        country: true,
        image: true,
      },
    })

    const bst = new PlayerBST()

    allPlayers.forEach((player) => {
      bst.insert(player)
    })

    const results = bst.search(query)

    return NextResponse.json(results)
  } catch (error) {
    console.error("SEARCH ERROR:", error)

    return NextResponse.json(
      { message: "Search failed" },
      { status: 500 }
    )
  }
}