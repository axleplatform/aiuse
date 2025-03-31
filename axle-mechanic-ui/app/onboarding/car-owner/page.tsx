"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PhoneInput } from "@/components/phone-input"
import { AddressAutocomplete } from "@/components/address-autocomplete"

export default function CarOwnerOnboardingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddressSelect = (address: string) => {
    setFormData((prev) => ({ ...prev, address }))
  }

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/onboarding/car-owner/create-account")
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
        <h1 className="text-3xl font-bold text-center text-green-800 mb-8">Car Owner Information</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-lg font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-lg font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-lg font-medium text-gray-700 mb-2">
              Current Car Location
            </label>
            <AddressAutocomplete onAddressSelect={handleAddressSelect} />
          </div>

          <div>
            <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <PhoneInput value={formData.phone} onChange={handlePhoneChange} />
          </div>

          <div className="flex justify-center pt-6">
            <button type="submit" className="px-8 py-3 bg-green-800 text-white rounded-full hover:bg-green-700">
              Continue
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

