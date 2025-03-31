"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2, MessageSquare } from "lucide-react"

// Mock function to simulate AI diagnostics chatbot
function getAIDiagnostics(carIssue: string) {
  // If no text entered, return empty response
  if (!carIssue.trim()) {
    return null
  }

  // Define possible diagnostic responses based on keywords
  const diagnostics = [
    {
      keywords: ["oil", "change", "dirty", "black", "leak", "leaking"],
      response:
        "Based on your description, this sounds like it could be related to your engine oil. This might require an oil change service. If you're noticing leaks, the mechanic may need to check for damaged gaskets or seals.",
      service: "Oil Change Service",
    },
    {
      keywords: ["brake", "brakes", "stop", "stopping", "pedal", "soft", "squeaking", "squealing"],
      response:
        "I'm detecting potential brake system issues. This could involve worn brake pads, low brake fluid, or issues with your rotors. A brake inspection and service would be recommended.",
      service: "Brake Service",
    },
    {
      keywords: ["battery", "start", "starting", "won't start", "dead", "charge", "charging"],
      response:
        "Your symptoms suggest a potential battery or electrical system issue. This could be a dying battery, alternator problem, or starter issue. An electrical system diagnostic would help identify the exact cause.",
      service: "Battery/Electrical Service",
    },
    {
      keywords: ["tire", "tires", "flat", "pressure", "puncture", "alignment", "pulling", "vibration"],
      response:
        "I'm noticing tire-related concerns in your description. This could involve a puncture, alignment issues, or tire wear. A tire inspection and service would address these issues.",
      service: "Tire Service",
    },
    {
      keywords: ["engine", "check light", "warning", "light", "dashboard", "performance", "power", "acceleration"],
      response:
        "Your description indicates potential engine performance issues. This could be related to fuel delivery, ignition system, or sensors. An engine diagnostic scan would help pinpoint the exact problem.",
      service: "Engine Diagnostic",
    },
    {
      keywords: ["transmission", "gear", "shifting", "automatic", "manual", "clutch", "slipping"],
      response:
        "I'm detecting possible transmission issues. This could involve fluid levels, clutch problems, or internal transmission components. A transmission diagnostic would be recommended.",
      service: "Transmission Service",
    },
    {
      keywords: ["cooling", "overheat", "overheating", "temperature", "radiator", "coolant", "thermostat"],
      response:
        "Your description suggests cooling system issues. This could be related to low coolant, a faulty thermostat, or radiator problems. A cooling system inspection would be appropriate.",
      service: "Cooling System Service",
    },
    {
      keywords: ["suspension", "bumpy", "ride", "shock", "strut", "spring", "bouncing"],
      response:
        "I'm noticing suspension-related concerns. This could involve worn shocks, struts, or other suspension components. A suspension inspection and service would address these issues.",
      service: "Suspension Service",
    },
  ]

  // Check for keyword matches
  const issue = carIssue.toLowerCase()
  const matches = diagnostics.filter((diag) => diag.keywords.some((keyword) => issue.includes(keyword)))

  if (matches.length > 0) {
    // Return the first match, or a random one if multiple matches
    return matches[0]
  }

  // Default response if no specific match
  return {
    response:
      "Based on your description, I'd recommend a general inspection to diagnose the issue properly. A mechanic will need to perform a comprehensive check of your vehicle to identify the specific problem.",
    service: "General Inspection",
  }
}

export default function BookAppointmentPage() {
  const router = useRouter()
  const [carIssue, setCarIssue] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [carRunsStatus, setCarRunsStatus] = useState<"yes" | "no" | "tow" | null>(null)
  const [aiResponse, setAiResponse] = useState<null | {
    response: string
    service: string
  }>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showAiChat, setShowAiChat] = useState(false)

  // Format phone number as user types
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-numeric characters
    const cleaned = e.target.value.replace(/\D/g, "")

    // Format the phone number
    let formatted = ""
    if (cleaned.length <= 3) {
      formatted = cleaned
    } else if (cleaned.length <= 6) {
      formatted = `(${cleaned.slice(0, 3)})-${cleaned.slice(3)}`
    } else {
      formatted = `(${cleaned.slice(0, 3)})-${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`
    }

    setPhoneNumber(formatted)
  }

  // Get AI response when car issue changes and has enough content
  useEffect(() => {
    if (carIssue.length > 10) {
      setIsAnalyzing(true)
      setShowAiChat(true)

      // Simulate API call delay
      const timer = setTimeout(() => {
        setAiResponse(getAIDiagnostics(carIssue))
        setIsAnalyzing(false)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [carIssue])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Store form data in sessionStorage to use on confirmation page
    sessionStorage.setItem(
      "bookingData",
      JSON.stringify({
        carIssue,
        phoneNumber,
        carRunsStatus,
        aiSuggestion: aiResponse,
        description: carIssue,
      }),
    )

    // Navigate to the confirmation page
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
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Book An Appointment</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <p className="text-center text-gray-600">Tell us what happened</p>
              <textarea
                value={carIssue}
                onChange={(e) => setCarIssue(e.target.value)}
                placeholder="Describe your car issue in detail..."
                className="w-full p-4 border border-gray-200 rounded-md bg-gray-50 min-h-[100px]"
                required
              />
            </div>

            {/* AI Diagnostics Chat */}
            {showAiChat && (
              <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
                <div className="bg-green-800 text-white p-3 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  <h3 className="font-medium">AI Diagnostics Assistant</h3>
                </div>

                <div className="p-4">
                  <div className="flex items-start mb-4">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <p className="text-gray-800">
                        Hi there! I'm your AI diagnostics assistant. Please describe your car issue, and I'll help
                        identify what might be wrong.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start justify-end mb-4">
                    <div className="bg-green-100 rounded-lg p-3 max-w-[80%]">
                      <p className="text-gray-800">{carIssue}</p>
                    </div>
                  </div>

                  {isAnalyzing ? (
                    <div className="flex items-start mb-4">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex items-center">
                          <Loader2 className="h-4 w-4 mr-2 animate-spin text-green-800" />
                          <p className="text-gray-600">Analyzing your issue...</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    aiResponse && (
                      <div className="flex items-start mb-4">
                        <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                          <p className="text-gray-800">{aiResponse.response}</p>
                          <p className="mt-2 font-medium text-green-800">Recommended service: {aiResponse.service}</p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-center text-gray-600">Phone #</p>
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="+1 (###)-### ####"
                className="w-full p-4 border border-gray-200 rounded-md bg-gray-50 text-center"
                required
              />
            </div>

            <div className="space-y-4">
              <p className="text-center text-gray-600">Does Your Car Run?</p>
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setCarRunsStatus("yes")}
                  className={`px-8 py-3 rounded-full border ${
                    carRunsStatus === "yes"
                      ? "bg-green-800 text-white border-green-800"
                      : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setCarRunsStatus("no")}
                  className={`px-8 py-3 rounded-full border ${
                    carRunsStatus === "no"
                      ? "bg-green-800 text-white border-green-800"
                      : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  No
                </button>
                <button
                  type="button"
                  onClick={() => setCarRunsStatus("tow")}
                  className={`px-8 py-3 rounded-full border ${
                    carRunsStatus === "tow"
                      ? "bg-green-800 text-white border-green-800"
                      : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  Need a Tow
                </button>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <Link href="/" className="px-8 py-3 border border-green-800 text-green-800 rounded-full hover:bg-gray-50">
                Back
              </Link>
              <button
                type="submit"
                className="px-8 py-3 bg-green-800 text-white rounded-full hover:bg-green-700"
                disabled={!carIssue || !phoneNumber || !carRunsStatus}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

