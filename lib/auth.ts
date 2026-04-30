import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET as string

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number }
    return decoded
  } catch {
    return null
  }
}

export function signToken(id: number) {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" })
}