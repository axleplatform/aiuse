"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, User, Camera, Upload } from "lucide-react"
import Image from "next/image"

// Mock car image database - in a real app, this would be more extensive
const carImageDatabase = {
  Audi: {
    A4: "/placeholder.svg?height=200&width=400", // Would be replaced with actual car images
    Q5: "/placeholder.svg?height=200&width=400",
    R8: "/placeholder.svg?height=200&width=400",
  },
  BMW: {
    "3 Series": "/placeholder.svg?height=200&width=400",
    "5 Series": "/placeholder.svg?height=200&width=400",
    X5: "/placeholder.svg?height=200&width=400",
  },
  Mercedes: {
    "C-Class": "/placeholder.svg?height=200&width=400",
    "E-Class": "/placeholder.svg?height=200&width=400",
    GLE: "/placeholder.svg?height=200&width=400",
  },
  Toyota: {
    Camry: "/placeholder.svg?height=200&width=400",
    Corolla: "/placeholder.svg?height=200&width=400",
    RAV4: "/placeholder.svg?height=200&width=400",
  },
  Honda: {
    Accord: "/placeholder.svg?height=200&width=400",
    Civic: "/placeholder.svg?height=200&width=400",
    "CR-V": "/placeholder.svg?height=200&width=400",
  },
  Ford: {
    "F-150": "/placeholder.svg?height=200&width=400",
    Mustang: "/placeholder.svg?height=200&width=400",
    Explorer: "/placeholder.svg?height=200&width=400",
  },
}

export default function ProfilePage() {
  const router = useRouter()
  const [profileData, setProfileData] = useState({
    businessName: "",
    bio: "",
    carYear: "",
    carMake: "",
    carModel: "",
    licensePlate: "",
    carName: "",
  })
  const [hasProfilePicture, setHasProfilePicture] = useState(false)
  const [hasCarPicture, setHasCarPicture] = useState(false)
  const [carImageUrl, setCarImageUrl] = useState("")

  // Update car image when make and model change
  useEffect(() => {
    if (profileData.carMake && profileData.carModel) {
      const makeImages = carImageDatabase[profileData.carMake as keyof typeof carImageDatabase]
      if (makeImages) {
        const modelImage = makeImages[profileData.carModel as keyof typeof makeImages]
        if (modelImage) {
          setCarImageUrl(modelImage)
          setHasCarPicture(true)
        }
      }
    }
  }, [profileData.carMake, profileData.carModel])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/dashboard/mechanic")
  }

  // Available car makes
  const carMakes = Object.keys(carImageDatabase)

  // Available car models for selected make
  const carModels = profileData.carMake
    ? Object.keys(carImageDatabase[profileData.carMake as keyof typeof carImageDatabase] || {})
    : []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
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
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Profile Information</h1>
          <p className="text-center text-gray-600 mb-6">Fill out your Account</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 relative">
          <div className="absolute right-6 top-6">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600"
              onClick={() => router.push("/dashboard/mechanic")}
            >
              Skip
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Profile Picture */}
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden mb-4 relative">
                {hasProfilePicture ? (
                  <Image
                    src="/placeholder.svg?height=192&width=192"
                    alt="Profile"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <User className="h-24 w-24 text-gray-400" />
                  </div>
                )}
                <div
                  className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 flex items-center justify-center transition-all duration-200 cursor-pointer rounded-full"
                  onClick={() => setHasProfilePicture(true)}
                >
                  <div className="opacity-0 hover:opacity-100">
                    <Camera className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setHasProfilePicture(true)}
                className="text-sm text-green-800 hover:text-green-700 flex items-center"
              >
                <Camera className="h-4 w-4 mr-1" />
                Add a Profile Picture
              </button>
            </div>

            {/* Middle Column - Form Fields */}
            <div className="space-y-4">
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  value={profileData.businessName}
                  onChange={handleChange}
                  placeholder="Enter your Business Name"
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  value={profileData.bio}
                  onChange={handleChange}
                  placeholder="Enter a Bio"
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Add Your Work Car</label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <input
                    name="carYear"
                    type="text"
                    value={profileData.carYear}
                    onChange={handleChange}
                    placeholder="Year"
                    className="p-3 border border-gray-300 rounded-md bg-gray-50"
                  />
                  <select
                    name="carMake"
                    value={profileData.carMake}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-md bg-gray-50"
                  >
                    <option value="">Make</option>
                    {carMakes.map((make) => (
                      <option key={make} value={make}>
                        {make}
                      </option>
                    ))}
                  </select>
                  <select
                    name="carModel"
                    value={profileData.carModel}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-md bg-gray-50"
                    disabled={!profileData.carMake}
                  >
                    <option value="">Model</option>
                    {carModels.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 mb-1">
                  License Plate
                </label>
                <input
                  id="licensePlate"
                  name="licensePlate"
                  type="text"
                  value={profileData.licensePlate}
                  onChange={handleChange}
                  placeholder="XXXXX"
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
            </div>

            {/* Right Column - Car Image */}
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden mb-4 relative">
                {hasCarPicture ? (
                  <Image
                    src={carImageUrl || "/placeholder.svg?height=192&width=192"}
                    alt="Car"
                    width={192}
                    height={192}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="h-16 w-16 text-gray-400" />
                    <p className="text-sm text-gray-500 mt-2">Upload Car Image</p>
                  </div>
                )}
                <div
                  className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 flex items-center justify-center transition-all duration-200 cursor-pointer rounded-full"
                  onClick={() => setHasCarPicture(true)}
                >
                  <div className="opacity-0 hover:opacity-100">
                    <Camera className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              <div className="w-full">
                <label htmlFor="carName" className="block text-sm font-medium text-gray-700 mb-1 text-center">
                  Name Your Car
                </label>
                <input
                  id="carName"
                  name="carName"
                  type="text"
                  value={profileData.carName}
                  onChange={handleChange}
                  placeholder="Car Name"
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-center"
                />
              </div>
            </div>

            {/* Bottom Section - Buttons and Terms */}
            <div className="col-span-1 md:col-span-3 mt-8">
              <div className="flex justify-between">
                <Link
                  href="/onboarding/mechanic/verification"
                  className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600"
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  Back
                </Link>

                <button type="submit" className="px-6 py-3 bg-green-800 text-white rounded-full hover:bg-green-700">
                  Continue
                </button>
              </div>

              <div className="text-xs text-gray-500 text-center mt-4">
                By selecting Continue, I agree to axle's Terms of Service, Payments, and Non-discrimination Policy and
                acknowledge the Privacy Policy.
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

