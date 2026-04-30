import { prisma } from "@/lib/prisma"
import { signToken } from "@/lib/auth"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  try {
    const { email, password, username } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    })

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
    return NextResponse.json(
      { error: "Signup failed" },
      { status: 500 }
    )
  }
}