import { prisma } from "@/lib/prisma"
import type { Prisma } from "@/app/generated/prisma/client"

// OVERLOADS
export function createRecord(
  type: "user",
  data: Prisma.UserCreateInput
): Promise<any>

export function createRecord(
  type: "player",
  data: Prisma.PlayerCreateInput
): Promise<any>

export function createRecord(
  type: "shortlist",
  data: Prisma.ShortlistCreateInput
): Promise<any>

// SINGLE IMPLEMENTATION
export async function createRecord(type: string, data: any) {
  switch (type) {
    case "user":
      return prisma.user.create({ data })

    case "player":
      return prisma.player.create({ data })

    case "shortlist":
      return prisma.shortlist.create({ data })

    default:
      throw new Error(`Unknown record type: ${type}`)
  }
}