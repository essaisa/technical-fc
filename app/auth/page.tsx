"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup"

      const body = isLogin
        ? { email, password }
        : { username, email, password }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong")
        setLoading(false)
        return
      }

      localStorage.setItem("token", data.token)

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user))
      }
      window.dispatchEvent(new Event("authChanged"))
      router.push("/")
      router.refresh()
    } catch {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full hidden md:flex">
        <div className="absolute top-[25%] left-[10%] z-10 text-white">
          <h1 className="text-4xl font-bold italic mb-4">
            Scout Smarter. Build Your Team.
          </h1>
          <p className="text-lg font-semibold">
            Compare players, track performance, and shortlist talent.
          </p>
          <br />
          <p className="text-xs">Morgan Rogers • Aston Villa & England</p>
        </div>

        <Image
          src="/players/rogers_cele.jpg"
          alt="Morgan Rogers"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="w-full md:w-1/2 h-full bg-white dark:bg-black flex flex-col p-12 justify-center items-center">
        <div className="w-full max-w-[400px]">
          <h1 className="text-xl font-bold mb-8">Technical FC</h1>

          <div className="flex flex-col mb-6">
            <h2 className="text-3xl font-semibold mb-2">
              {isLogin ? "Login" : "Sign Up"}
            </h2>
            <p className="text-sm text-gray-500">
              {isLogin ? "Welcome back" : "Create your account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-b border-gray-400 bg-transparent p-2 outline-none"
                required={!isLogin}
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-b border-gray-400 bg-transparent p-2 outline-none"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-b border-gray-400 bg-transparent p-2 outline-none"
              required
            />

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-black text-white p-3 rounded-md font-semibold hover:bg-zinc-800 disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Login"
                : "Create Account"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 h-[1px] bg-gray-300" />
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 h-[1px] bg-gray-300" />
          </div>

          <p className="text-sm text-center mt-6">
            {isLogin ? "No account?" : "Already have an account?"}
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError("")
              }}
              className="ml-2 underline"
              type="button"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}