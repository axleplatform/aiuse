"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Wrench } from "lucide-react"

type UserType = "car-owner" | "mechanic" | null

export default function SignupPage() {
  const router = useRouter()
  const [selectedUserType, setSelectedUserType] = useState<UserType>(null)

  const handleContinue = () => {
    if (selectedUserType === "car-owner") {
      router.push("/onboarding/car-owner")
    } else if (selectedUserType === "mechanic") {
      router.push("/onboarding/mechanic")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-bold text-xl text-gray-900">
              axle
            </Link>
            <Link href="/login" className="text-sm font-medium text-gray-700 ml-6">
              Log In
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium text-white bg-green-800 hover:bg-green-700 px-4 py-2 rounded-full"
            >
              Sign Up
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-sm font-medium text-gray-700">
              About
            </Link>
            <Link href="/services" className="text-sm font-medium text-gray-700">
              Services
            </Link>
            <Link href="/help" className="text-sm font-medium text-gray-700">
              Help
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-3xl px-4 py-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Register as a...</h1>
          <p className="text-center text-gray-600 mb-10">Make a Selection Below</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Car Owner Option */}
            <div
              className={`border rounded-lg p-6 cursor-pointer transition-all ${
                selectedUserType === "car-owner"
                  ? "border-green-800 bg-green-50"
                  : "border-gray-200 hover:border-green-800 hover:bg-gray-50"
              }`}
              onClick={() => setSelectedUserType("car-owner")}
            >
              <div className="flex flex-col items-center mb-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                    selectedUserType === "car-owner" ? "bg-green-800 text-white" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <User className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-semibold">Car Owner</h2>
              </div>

              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-800 rounded-full mr-2"></span>
                  Find trusted mechanics
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-800 rounded-full mr-2"></span>
                  Schedule and track repairs
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-800 rounded-full mr-2"></span>
                  Make payments
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-800 rounded-full mr-2"></span>
                  Rate and Review Services
                </li>
              </ul>
            </div>

            {/* Mechanic Option */}
            <div
              className={`border rounded-lg p-6 cursor-pointer transition-all ${
                selectedUserType === "mechanic"
                  ? "border-green-800 bg-green-50"
                  : "border-gray-200 hover:border-green-800 hover:bg-gray-50"
              }`}
              onClick={() => setSelectedUserType("mechanic")}
            >
              <div className="flex flex-col items-center mb-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                    selectedUserType === "mechanic" ? "bg-green-800 text-white" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <Wrench className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-semibold">Mobile Mechanic</h2>
              </div>

              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-800 rounded-full mr-2"></span>
                  Get job requests
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-800 rounded-full mr-2"></span>
                  Manage your Schedule
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-800 rounded-full mr-2"></span>
                  Showcase your Skills
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-800 rounded-full mr-2"></span>
                  Boost your Reputation
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleContinue}
              disabled={!selectedUserType}
              className="px-8 py-3 bg-green-800 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-green-800 hover:text-green-700 font-medium">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}

