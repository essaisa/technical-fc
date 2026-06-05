import { describe, it, expect } from "vitest"

const BASE_URL = "http://localhost:3000"

describe("API integration tests", () => {
  it("should fetch players from the database", async () => {
    const res = await fetch(`${BASE_URL}/api/players`)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
  })

  it("should return search results for an existing player", async () => {
    const res = await fetch(`${BASE_URL}/api/players/search?q=cole`)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data[0].name).toContain("Cole")
  })

  it("should return one player profile by slug", async () => {
    const res = await fetch(`${BASE_URL}/api/players/cole-palmer`)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.slug).toBe("cole-palmer")
  })

  it("should block shortlist access without a token", async () => {
    const res = await fetch(`${BASE_URL}/api/shortlist`)
    const data = await res.json()

    expect(res.status).toBe(401)
    expect(data.message).toBe("Unauthorized")
  })
})