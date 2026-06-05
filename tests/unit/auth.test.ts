import { describe, it, expect } from "vitest"
import { signToken, verifyToken } from "@/lib/auth"

describe("Authentication utilities", () => {
  it("should create and verify a valid JWT token", () => {
    const token = signToken(1)

    const decoded = verifyToken(token)

    expect(decoded).not.toBeNull()
    expect(decoded?.id).toBe(1)
  })

  it("should return null for an invalid JWT token", () => {
    const decoded = verifyToken("invalid-token")

    expect(decoded).toBeNull()
  })
})