import { prisma } from "@/lib/prisma"
import { signToken } from "@/lib/auth"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const token = signToken(user.id)

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    })
  } catch (error) {
    console.error("SIGNUP ERROR:", error)
  
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}