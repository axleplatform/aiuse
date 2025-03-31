"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import Image from "next/image"

export default function LocationPage() {
  const router = useRouter()
  const mapRef = useRef<HTMLDivElement>(null)
  const [address, setAddress] = useState("")
  const [radius, setRadius] = useState("10")
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/onboarding/mechanic/professional-info")
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
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Mechanic Questions</h1>
            <p className="text-center text-gray-600 mb-6">Fill out the information</p>

            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center">1</div>
                <div className="w-16 h-1 bg-green-800"></div>
                <div className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center">2</div>
                <div className="w-16 h-1 bg-green-800"></div>
                <div className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center">3</div>
                <div className="w-16 h-1 bg-gray-200"></div>
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">4</div>
                <div className="w-16 h-1 bg-gray-200"></div>
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">5</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Location</h2>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Zip code/Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="relative h-64 w-full border border-gray-200 rounded-md overflow-hidden">
                {!isMapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
                  </div>
                )}

                <div
                  ref={mapRef}
                  className={`h-full w-full transition-opacity duration-300 ${isMapLoaded ? "opacity-100" : "opacity-0"}`}
                >
                  {/* This is a placeholder for the actual Google Maps implementation */}
                  <Image
                    src="/placeholder.svg?height=400&width=800"
                    alt="Map showing location"
                    width={800}
                    height={400}
                    className="h-full w-full object-cover"
                  />

                  {/* Current location marker */}
                  <div
                    className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2"
                    style={{ top: "50%", left: "50%" }}
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-blue-500"></div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Travel Distance from Location</h2>
                <div className="relative">
                  <select
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md appearance-none"
                    required
                  >
                    <option value="5">5 miles</option>
                    <option value="10">10 miles</option>
                    <option value="15">15 miles</option>
                    <option value="20">20 miles</option>
                    <option value="25">25 miles</option>
                    <option value="30">30 miles</option>
                    <option value="50">50 miles</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <Link
                  href="/onboarding/mechanic/create-account"
                  className="flex items-center px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  Back
                </Link>

                <button
                  type="submit"
                  className="flex items-center px-6 py-3 bg-green-800 text-white rounded-md hover:bg-green-700"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

