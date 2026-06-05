import { describe, it, expect } from "vitest"
import { PlayerBST } from "@/lib/dsa/PlayerBST"

describe("PlayerBST", () => {
  it("should return players matching a search query", () => {
    const bst = new PlayerBST()

    bst.insert({
      id: 1,
      name: "Cole Palmer",
      slug: "cole-palmer",
      position: "CAM",
      age: 24,
      club: "CHE",
      country: "ENG",
      image: "/players/cole_palmer.png",
    })

    bst.insert({
      id: 2,
      name: "Bukayo Saka",
      slug: "bukayo-saka",
      position: "RW",
      age: 24,
      club: "ARS",
      country: "ENG",
      image: "/players/saka.png",
    })

    const results = bst.search("cole")

    expect(results.length).toBe(1)
    expect(results[0].name).toBe("Cole Palmer")
  })
  it("should return an empty array when no players match the search query", () => {
    const bst = new PlayerBST()
  
    bst.insert({
      id: 1,
      name: "Cole Palmer",
      slug: "cole-palmer",
      position: "CAM",
      age: 24,
      club: "CHE",
      country: "ENG",
      image: "/players/cole_palmer.png",
    })
  
    const results = bst.search("mbappe")
  
    expect(results).toEqual([])
  })
})