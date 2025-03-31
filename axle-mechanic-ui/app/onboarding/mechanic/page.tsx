"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function MechanicOnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    businessStartYear: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    if (step === 1) {
      // Navigate to create account page
      router.push("/onboarding/mechanic/create-account")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    nextStep()
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
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Mechanic Onboarding</h1>
            <p className="text-center text-gray-600 mb-6">Fill out the information</p>

            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center">1</div>
                <div className="w-16 h-1 bg-gray-200"></div>
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">2</div>
                <div className="w-16 h-1 bg-gray-200"></div>
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">3</div>
                <div className="w-16 h-1 bg-gray-200"></div>
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">4</div>
                <div className="w-16 h-1 bg-gray-200"></div>
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">5</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="businessStartYear" className="block text-sm font-medium text-gray-700 mb-1">
                    When did you start your mobile mechanic business?
                  </label>
                  <select
                    id="businessStartYear"
                    name="businessStartYear"
                    value={formData.businessStartYear}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select year</option>
                    {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <Link
                  href="/signup"
                  className="flex items-center px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  Back to Sign Up
                </Link>

                <button
                  type="submit"
                  className="flex items-center px-6 py-3 bg-green-800 text-white rounded-md hover:bg-green-700"
                >
                  Next
                  <ChevronRight className="h-5 w-5 ml-1" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

