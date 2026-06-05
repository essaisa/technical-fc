import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyToken } from "@/lib/auth"
import { LinkedList } from "@/lib/dsa/LinkedList"

function getUserId(request: NextRequest) {
  const authHeader = request.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }

  const token = authHeader.split(" ")[1]
  const decoded = verifyToken(token)

  return decoded?.id ?? null
}

export async function GET(request: NextRequest) {
  try {
    const userId = getUserId(request)

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const shortlist = await prisma.shortlist.findMany({
      where: { userId },
      include: {
        player: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    const orderedShortlist = new LinkedList<(typeof shortlist)[number]>()

    shortlist.forEach((entry) => {
      orderedShortlist.append(entry)
    })

    return NextResponse.json(orderedShortlist.toArray())
  } catch (error) {
    console.error("SHORTLIST GET ERROR:", error)

    return NextResponse.json(
      { message: "Failed to fetch shortlist" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request)

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { playerId } = await request.json()

    if (!playerId) {
      return NextResponse.json(
        { message: "Player ID is required" },
        { status: 400 }
      )
    }

    const shortlistEntry = await prisma.shortlist.upsert({
      where: {
        userId_playerId: {
          userId,
          playerId,
        },
      },
      update: {},
      create: {
        userId,
        playerId,
      },
      include: {
        player: true,
      },
    })

    return NextResponse.json(shortlistEntry)
  } catch (error) {
    console.error("SHORTLIST POST ERROR:", error)

    return NextResponse.json(
      { message: "Failed to add player to shortlist" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = getUserId(request)

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { playerId } = await request.json()

    if (!playerId) {
      return NextResponse.json(
        { message: "Player ID is required" },
        { status: 400 }
      )
    }

    await prisma.shortlist.delete({
      where: {
        userId_playerId: {
          userId,
          playerId,
        },
      },
    })

    return NextResponse.json({ message: "Player removed from shortlist" })
  } catch (error) {
    console.error("SHORTLIST DELETE ERROR:", error)

    return NextResponse.json(
      { message: "Failed to remove player from shortlist" },
      { status: 500 }
    )
  }
}