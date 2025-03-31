"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Plus, Minus, MessageSquare } from "lucide-react"

export default function ConfirmationPage() {
  const router = useRouter()
  const [isSearching, setIsSearching] = useState(true)
  const [bookingData, setBookingData] = useState<any>(null)

  // Load booking data from sessionStorage
  useEffect(() => {
    const storedData = sessionStorage.getItem("bookingData")
    if (storedData) {
      setBookingData(JSON.parse(storedData))
    }

    // Simulate search completion after 3 seconds
    const timer = setTimeout(() => {
      setIsSearching(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Mock data - in a real app, this would come from previous steps or context
  const appointmentData = {
    car: {
      year: "2021",
      make: "Mercedes",
      model: "GLE",
      image: "/placeholder.svg?height=200&width=200",
    },
    service: bookingData?.aiSuggestion?.service || "General Service",
    appointment: {
      date: "Thursday, February 21",
      time: "12:00 pm",
    },
    carRuns: bookingData?.carRunsStatus === "yes" ? "Yes" : bookingData?.carRunsStatus === "no" ? "No" : "Needs Tow",
    location: "9500 Gilman Dr",
    description: bookingData?.carIssue || "",
    phoneNumber: bookingData?.phoneNumber || "",
    aiSuggestion: bookingData?.aiSuggestion || null,
  }

  const handleConfirm = () => {
    // Store appointment data for next pages
    sessionStorage.setItem("appointmentData", JSON.stringify(appointmentData))

    // Navigate to the pick mechanic page
    router.push("/pick-mechanic")
  }

  const handleBack = () => {
    router.push("/book-appointment")
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
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-1">Finding Your Mechanic</h1>
          <p className="text-center text-gray-600 mb-8">Check to Confirm</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Overview Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-6 text-center">Overview</h2>

              <div className="flex justify-center mb-4">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                  <Image
                    src={appointmentData.car.image || "/placeholder.svg"}
                    alt="Car"
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>
              </div>

              <p className="text-center text-lg font-medium mb-4">
                {appointmentData.car.year} {appointmentData.car.make} {appointmentData.car.model}
              </p>

              <div className="space-y-4">
                <div>
                  <span className="font-medium block mb-2">Appointment:</span>
                  <div className="ml-6 space-y-2">
                    <div className="flex">
                      <span className="font-medium w-16">Date:</span>
                      <span className="text-gray-600">{appointmentData.appointment.date}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-16">Time:</span>
                      <span className="text-gray-600">{appointmentData.appointment.time}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium block">Does Your Car Run?</span>
                    <span className="text-gray-600">{appointmentData.carRuns}</span>
                  </div>
                  <div>
                    <span className="font-medium block">Location:</span>
                    <span className="text-gray-600">{appointmentData.location}</span>
                  </div>
                </div>

                <div className="flex">
                  <span className="font-medium w-40">Phone Number:</span>
                  <span className="text-gray-600">{appointmentData.phoneNumber}</span>
                </div>

                {appointmentData.aiSuggestion && (
                  <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden mt-4">
                    <div className="bg-green-800 text-white p-3 flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      <h3 className="font-medium">AI Diagnostics Assistant</h3>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start mb-4">
                        <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                          <p className="text-gray-800">
                            Hi there! I'm your AI diagnostics assistant. How can I help with your car issue?
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start justify-end mb-4">
                        <div className="bg-green-100 rounded-lg p-3 max-w-[80%]">
                          <p className="text-gray-800">{appointmentData.description}</p>
                        </div>
                      </div>

                      <div className="flex items-start mb-4">
                        <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                          <p className="text-gray-800">{appointmentData.aiSuggestion.response}</p>
                          <p className="mt-2 font-medium text-green-800">
                            Recommended service: {appointmentData.aiSuggestion.service}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Map Section */}
            <div className="relative">
              <div className="h-full w-full rounded-lg overflow-hidden border border-gray-200">
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
                      className="px-8 py-3 bg-green-800 text-white rounded-md hover:bg-green-700"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={handleBack}
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

