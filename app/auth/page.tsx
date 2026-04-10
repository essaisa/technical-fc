"use client"

import Image from "next/image"
import { useState } from "react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <div className="w-full h-screen flex items-start">

      {/*  LEFT IMAGE */}
      <div className="relative w-1/2 h-full hidden md:flex">
        
        <div className="absolute top-[25%] left-[10%] z-10 text-white">
          <h1 className="text-4xl font-bold italic mb-4">
            Scout Smarter. Build Your Team.
          </h1>
          <p className="text-lg font-semibold">
            Compare players, track performance, and shortlist talent.
          </p>
          <br/>
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

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 h-full bg-white dark:bg-black flex flex-col p-12 justify-center items-center">

        <div className="w-full max-w-[400px]">

          <h1 className="text-xl font-bold mb-8">
            Technical FC
          </h1>

          <div className="flex flex-col mb-6">
            <h2 className="text-3xl font-semibold mb-2">
              {isLogin ? "Login" : "Sign Up"}
            </h2>
            <p className="text-sm text-gray-500">
              {isLogin
                ? "Welcome back"
                : "Create your account"}
            </p>
          </div>

          {/* INPUTS */}
          <div className="flex flex-col gap-4">

            {!isLogin && (
              <input
                type="text"
                placeholder="Username"
                className="border-b border-gray-400 bg-transparent p-2 outline-none"
              />
            )}

            <input
              type="email"
              placeholder="Email"
              className="border-b border-gray-400 bg-transparent p-2 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              className="border-b border-gray-400 bg-transparent p-2 outline-none"
            />
          </div>

          {/* BUTTON */}
          <button className="w-full mt-6 bg-black text-white p-3 rounded-md font-semibold hover:bg-zinc-800">
            {isLogin ? "Login" : "Create Account"}
          </button>

          {/* DIVIDER */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-[1px] bg-gray-300" />
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 h-[1px] bg-gray-300" />
          </div>

          {/* TOGGLE */}
          <p className="text-sm text-center mt-6">
            {isLogin ? "No account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 underline"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>

        </div>
      </div>
    </div>
  )
}