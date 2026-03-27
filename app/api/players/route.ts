import { prisma } from '@/lib/prisma'

export async function GET() {
  const players = await prisma.player.findMany()
  return Response.json(players)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const player = await prisma.player.create({
      data: {
        name: body.name,
        age: body.age,
        position: body.position,
        club: body.club,
      },
    })

    return Response.json(player)
  } catch (error) {
    return Response.json({ error: "Failed to create player" }, { status: 500 })
  }
}