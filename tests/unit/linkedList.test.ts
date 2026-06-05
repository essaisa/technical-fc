import { describe, it, expect } from "vitest"
import { LinkedList } from "@/lib/dsa/LinkedList"

describe("LinkedList", () => {
  it("should append values and convert them to an array", () => {
    const list = new LinkedList<string>()

    list.append("Cole Palmer")
    list.append("Bukayo Saka")
    list.append("Michael Olise")

    expect(list.toArray()).toEqual([
      "Cole Palmer",
      "Bukayo Saka",
      "Michael Olise",
    ])
  })
})