"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MapPin, Star, User, Wrench, Home, Calendar } from "lucide-react"
import { CarSelector } from "@/components/car-selector"
import { DateTimeSelector } from "@/components/date-time-selector"
import { GoogleMap } from "@/components/google-map"
import { AddressAutocomplete } from "@/components/address-autocomplete"

export default function HomePage() {
  const router = useRouter()
  const [selectedAddress, setSelectedAddress] = useState("")
  const [formComplete, setFormComplete] = useState(false)

  // Check if all required fields are filled
  const checkFormCompletion = () => {
    // This is a simplified check - in a real app you'd validate all fields
    if (selectedAddress) {
      setFormComplete(true)
    }
  }

  const handleContinue = () => {
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
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Find Your Mechanic</h1>

          <div className="text-center mb-6">
            <p className="text-gray-600">Bring a Mechanic to your Home</p>
            <p className="text-gray-600">Order a Service</p>
          </div>

          {/* Location Input with Google Places Autocomplete */}
          <div className="mb-4">
            <AddressAutocomplete
              onAddressSelect={(address) => {
                setSelectedAddress(address)
                checkFormCompletion()
              }}
            />
          </div>

          {/* Google Map */}
          <div className="mb-4">
            <GoogleMap />
          </div>

          {/* Car Details */}
          <CarSelector />

          {/* Date and Time */}
          <DateTimeSelector />

          {/* Continue Button */}
          <div className="flex justify-center mb-8">
            <button
              className="bg-green-800 hover:bg-green-700 text-white font-medium py-3 px-10 rounded-full"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>

          {/* Description */}
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
            We onboard trusted mobile mechanics who run their own businesses and have a proven track record, with Google
            or Yelp reviews of 4 stars or higher.
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full border-2 border-green-800 flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-green-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Real-Time Tracking</h3>
              <p className="text-gray-600 mb-2">Track mechanic in real-time and get accurate ETA.</p>
              <span className="text-sm text-gray-500">Coming Soon</span>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-28 h-28 flex items-center justify-center mb-2">
                <div className="w-20 h-20 border-2 border-green-800 rounded flex items-center justify-center">
                  <Calendar className="h-10 w-10 text-green-800" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Book Appointments Online</h3>
              <p className="text-gray-600">
                Schedule repair or maintenance services at a time and date that works for you.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="flex mb-4">
                <Star className="h-6 w-6 text-green-800 fill-green-800" />
                <Star className="h-6 w-6 text-green-800 fill-green-800" />
                <Star className="h-6 w-6 text-green-800 fill-green-800" />
                <Star className="h-6 w-6 text-green-800 fill-green-800" />
                <Star className="h-6 w-6 text-green-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Ratings and Reviews</h3>
              <p className="text-gray-600 mb-2">Read and write reviews for mechanics to ensure quality service.</p>
              <span className="text-sm text-gray-500">Coming Soon</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            {/* Register Car */}
            <div className="flex flex-col items-center">
              <User className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Register your Car</h3>
              <div className="space-y-1 mb-2">
                <p className="text-sm">Find trusted mechanics</p>
                <p className="text-sm">Schedule and track repairs</p>
                <p className="text-sm">Rate and Review Services</p>
              </div>
              <Link href="#" className="text-sm flex items-center gap-1 text-white hover:underline">
                Get Started <span>→</span>
              </Link>
            </div>

            {/* Register Mechanic */}
            <div className="flex flex-col items-center">
              <Wrench className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Register Mobile Mechanic</h3>
              <div className="space-y-1 mb-2">
                <p className="text-sm">Get job requests</p>
                <p className="text-sm">Manage your Schedule</p>
                <p className="text-sm">Showcase your skills</p>
              </div>
              <Link href="#" className="text-sm flex items-center gap-1 text-white hover:underline">
                Get Started <span>→</span>
              </Link>
            </div>

            {/* Register Shop */}
            <div className="flex flex-col items-center">
              <Home className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Register your Shop</h3>
              <div className="space-y-1 mb-2">
                <p className="text-sm">Custom pricing and quotes</p>
                <p className="text-sm">Customer Reviews and Ratings</p>
                <p className="text-sm">Promote your Services</p>
              </div>
              <span className="text-sm text-gray-300">Coming Soon</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

