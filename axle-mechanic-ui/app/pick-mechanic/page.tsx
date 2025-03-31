"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Plus, Minus, Star, User, Award, Check } from "lucide-react"

// Mock data for available mechanics
const mechanicsData = [
  {
    id: 1,
    price: 110,
    arrivalTime: "Arrives in 25 mins",
    isFavorite: true,
    isAvailableNow: true,
    rating: 4.9,
    certified: true,
    specialist: true,
    reviews: 124,
  },
  {
    id: 2,
    price: 140,
    arrivalTime: "Arrives in 45 mins",
    isFavorite: false,
    isAvailableNow: true,
    rating: 4.7,
    certified: true,
    specialist: false,
    reviews: 87,
  },
  {
    id: 3,
    price: 120,
    arrivalTime: "Available Friday March 14th @ 6:00 p.m.",
    isFavorite: false,
    isAvailableNow: false,
    rating: 4.5,
    certified: false,
    specialist: true,
    reviews: 56,
  },
  {
    id: 4,
    price: 95,
    arrivalTime: "Arrives in 60 mins",
    isFavorite: false,
    isAvailableNow: true,
    rating: 4.2,
    certified: false,
    specialist: false,
    reviews: 32,
  },
]

export default function PickMechanicPage() {
  const router = useRouter()
  const [isSearching, setIsSearching] = useState(true)
  const [selectedMechanic, setSelectedMechanic] = useState<number | null>(null)
  const [appointmentData, setAppointmentData] = useState<any>(null)

  // Load appointment data from sessionStorage
  useEffect(() => {
    const storedData = sessionStorage.getItem("appointmentData")
    if (storedData) {
      setAppointmentData(JSON.parse(storedData))
    }

    // Simulate search completion after 2 seconds
    const timer = setTimeout(() => {
      setIsSearching(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleConfirm = () => {
    if (selectedMechanic) {
      // Store selected mechanic data
      const mechanic = mechanicsData.find((m) => m.id === selectedMechanic)
      if (mechanic) {
        sessionStorage.setItem("mechanicData", JSON.stringify(mechanic))
      }

      // Navigate to payment page
      router.push("/payment")
    }
  }

  const handleCancel = () => {
    router.push("/confirmation")
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
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-1">Pick Your Mechanic</h1>
          <p className="text-center text-gray-600 mb-8">Pick & Pay</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Mechanics List Section */}
            <div className="bg-gray-50 rounded-lg p-6 relative">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Mobile Mechanics List</h2>
                <button className="text-gray-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z" fill="currentColor" />
                  </svg>
                </button>
              </div>
              <p className="text-center text-gray-600 mb-6">Select One</p>

              <div className="relative">
                {/* Left Navigation Arrow */}
                <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-1 shadow-md z-10">
                  <ChevronLeft className="h-6 w-6 text-gray-600" />
                </button>

                {/* Mechanics Cards */}
                <div className="space-y-4 max-h-[400px] overflow-y-auto px-2">
                  {mechanicsData.map((mechanic) => (
                    <div
                      key={mechanic.id}
                      className={`bg-gray-50 border border-gray-200 rounded-lg p-4 relative cursor-pointer transition-transform transform hover:scale-[1.02] ${
                        selectedMechanic === mechanic.id ? "ring-2 ring-green-800" : ""
                      }`}
                      onClick={() => setSelectedMechanic(mechanic.id)}
                    >
                      {mechanic.isFavorite && (
                        <div className="absolute top-2 right-2">
                          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="bg-green-800 rounded-full p-2 mr-3">
                            <User className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                              <span className="text-sm">
                                {mechanic.rating} ({mechanic.reviews} reviews)
                              </span>
                            </div>
                            {mechanic.certified && (
                              <div className="flex items-center">
                                <Award className="h-4 w-4 text-green-800 mr-1" />
                                <span className="text-sm">Certified</span>
                              </div>
                            )}
                            {mechanic.specialist && (
                              <div className="flex items-center">
                                <Check className="h-4 w-4 text-green-800 mr-1" />
                                <span className="text-sm">
                                  Specialist for {appointmentData?.car?.make || "this model"}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="bg-green-800 text-white rounded-lg py-2 px-4">
                          <span className="text-2xl font-bold">${mechanic.price}</span>
                        </div>
                      </div>

                      <div className="bg-green-800 text-white rounded-lg py-2 px-4 text-center">
                        <span>{mechanic.arrivalTime}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Navigation Arrow */}
                <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-1 shadow-md z-10">
                  <ChevronRight className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center mt-4 space-x-1">
                <div className="h-2 w-2 rounded-full bg-green-800"></div>
                <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                <div className="h-2 w-2 rounded-full bg-gray-300"></div>
              </div>
            </div>

            {/* Map Section */}
            <div className="relative">
              <div className="h-full w-full rounded-lg overflow-hidden border border-gray-200 min-h-[400px]">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Map"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col">
                  <button className="bg-white w-8 h-8 rounded-t-md border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                    <Plus className="h-5 w-5 text-gray-700" />
                  </button>
                  <button className="bg-white w-8 h-8 rounded-b-md border-t-0 border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                    <Minus className="h-5 w-5 text-gray-700" />
                  </button>
                </div>

                {/* Service Information */}
                {appointmentData?.aiSuggestion && (
                  <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 p-3 rounded-md shadow-md">
                    <h3 className="font-medium text-green-800 text-sm">AI Diagnostics</h3>
                    <p className="font-bold">{appointmentData.aiSuggestion.service}</p>
                    <p className="text-xs text-gray-700 mt-1 line-clamp-2">{appointmentData.description}</p>

                    {appointmentData.possibleServices && appointmentData.possibleServices.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-600">Other possible services:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {appointmentData.possibleServices
                            .filter((s: any) => s.service !== appointmentData.aiSuggestion.service)
                            .slice(0, 2)
                            .map((service: any, index: number) => (
                              <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                                {service.service}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Mechanic Markers */}
                {!isSearching && (
                  <>
                    <div className="absolute top-[30%] left-[40%] transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-8 h-8 bg-green-800 rounded-full flex items-center justify-center text-white text-xs border-2 border-white">
                        1
                      </div>
                    </div>
                    <div className="absolute top-[50%] left-[60%] transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-8 h-8 bg-green-800 rounded-full flex items-center justify-center text-white text-xs border-2 border-white">
                        2
                      </div>
                    </div>
                    <div className="absolute top-[70%] left-[30%] transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-8 h-8 bg-green-800 rounded-full flex items-center justify-center text-white text-xs border-2 border-white">
                        3
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-4 text-center">
                {isSearching ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-green-800 mr-2"></div>
                    <span>Searching...</span>
                  </div>
                ) : (
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleConfirm}
                      className={`px-8 py-3 bg-green-800 text-white rounded-md hover:bg-green-700 ${
                        !selectedMechanic ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={!selectedMechanic}
                    >
                      Confirm & Pay
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-8 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    >
                      Back
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

