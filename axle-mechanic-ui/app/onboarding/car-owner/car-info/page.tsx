"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CarInfoPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    year: "",
    make: "",
    model: "",
    mileage: "",
    color: "",
    licensePlate: "",
    vin: "",
  })
  const [hasAgreed, setHasAgreed] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-white">
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
      <main className="container mx-auto px-4 py-8 max-w-md">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-8">Fill your car information</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="car" className="block text-lg font-medium text-gray-700 mb-2">
              Your Car <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-4">
              <input
                id="year"
                name="year"
                type="text"
                value={formData.year}
                onChange={handleChange}
                placeholder="Year"
                className="p-3 border border-gray-200 rounded-md bg-gray-50"
                required
              />
              <input
                id="make"
                name="make"
                type="text"
                value={formData.make}
                onChange={handleChange}
                placeholder="Make"
                className="p-3 border border-gray-200 rounded-md bg-gray-50"
                required
              />
              <input
                id="model"
                name="model"
                type="text"
                value={formData.model}
                onChange={handleChange}
                placeholder="Model"
                className="p-3 border border-gray-200 rounded-md bg-gray-50"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="mileage" className="block text-lg font-medium text-gray-700 mb-2">
                Mileage
              </label>
              <input
                id="mileage"
                name="mileage"
                type="text"
                value={formData.mileage}
                onChange={handleChange}
                placeholder="###,###"
                className="w-full p-3 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label htmlFor="color" className="block text-lg font-medium text-gray-700 mb-2">
                Color
              </label>
              <input
                id="color"
                name="color"
                type="text"
                value={formData.color}
                onChange={handleChange}
                placeholder="Navy Blue"
                className="w-full p-3 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="licensePlate" className="block text-lg font-medium text-gray-700 mb-2">
              License Plate
            </label>
            <input
              id="licensePlate"
              name="licensePlate"
              type="text"
              value={formData.licensePlate}
              onChange={handleChange}
              placeholder="XXXXXX"
              className="w-full p-3 border border-gray-200 rounded-md bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="vin" className="block text-lg font-medium text-gray-700 mb-2">
              Vehicle Identification Number (VIN)
            </label>
            <input
              id="vin"
              name="vin"
              type="text"
              value={formData.vin}
              onChange={handleChange}
              placeholder="################"
              className="w-full p-3 border border-gray-200 rounded-md bg-gray-50"
            />
          </div>

          <div className="flex justify-center space-x-4 pt-6">
            <Link
              href="/onboarding/car-owner/create-account"
              className="px-8 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600"
            >
              Back
            </Link>
            <button type="submit" className="px-8 py-3 bg-green-800 text-white rounded-full hover:bg-green-700">
              Continue
            </button>
          </div>

          <div className="text-xs text-gray-500 text-center mt-4">
            By selecting Continue, I agree to axle's Terms of Service, Payments,
            <br />
            and Nondiscrimination Policy and acknowledge the Privacy Policy.
          </div>
        </form>
      </main>
    </div>
  )
}

