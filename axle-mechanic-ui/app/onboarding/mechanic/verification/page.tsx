"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Lock, CreditCard, FileText } from "lucide-react"
import Image from "next/image"

export default function VerificationPage() {
  const router = useRouter()
  const [verificationType, setVerificationType] = useState<"ein" | "dl">("ein")
  const [einNumber, setEinNumber] = useState("")
  const [driverLicense, setDriverLicense] = useState("")
  const [hasAgreed, setHasAgreed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/onboarding/mechanic/profile")
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
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Create an account</h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <p className="text-gray-700">
                At axle, the Users security and compliance are our top priorities. To verify your account and meet
                federal tax regulations, we need to confirm your Social Security Number (SSN) or Driver License, and a
                self portrait picture.
              </p>
              <p className="text-gray-700 mt-4 font-medium">
                Tax Reporting: Required by federal law to file 1099 forms for your earnings.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Verification Type Selection */}
                <div className="flex items-center justify-center mb-4 space-x-4">
                  <button
                    type="button"
                    onClick={() => setVerificationType("ein")}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      verificationType === "ein"
                        ? "bg-green-800 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    EIN Number
                  </button>
                  <button
                    type="button"
                    onClick={() => setVerificationType("dl")}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      verificationType === "dl"
                        ? "bg-green-800 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    Driver's License
                  </button>
                </div>

                {verificationType === "ein" ? (
                  <div>
                    <label htmlFor="einNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Your EIN (Employer Identification Number)
                    </label>
                    <div className="relative">
                      <input
                        id="einNumber"
                        type="text"
                        value={einNumber}
                        onChange={(e) => setEinNumber(e.target.value)}
                        placeholder="##-#######"
                        className="w-full p-3 border border-gray-300 rounded-md pr-10"
                        required
                      />
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Format: XX-XXXXXXX</p>
                  </div>
                ) : (
                  <div>
                    <label htmlFor="driverLicense" className="block text-sm font-medium text-gray-700 mb-1">
                      Your driver license
                    </label>
                    <div className="relative">
                      <input
                        id="driverLicense"
                        type="text"
                        value={driverLicense}
                        onChange={(e) => setDriverLicense(e.target.value)}
                        placeholder="A#######"
                        className="w-full p-3 border border-gray-300 rounded-md pr-10"
                        required
                      />
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Don't share your identity with anyone.</p>
                  </div>
                )}
              </div>

              {/* reCAPTCHA section */}
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <div className="flex items-center">
                  <input
                    id="agreement"
                    type="checkbox"
                    checked={hasAgreed}
                    onChange={() => setHasAgreed(!hasAgreed)}
                    className="h-4 w-4 text-green-800 focus:ring-green-700 border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="agreement" className="ml-2 block text-sm text-gray-700">
                    I'm not a robot
                  </label>
                  <div className="ml-auto flex items-center">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="reCAPTCHA"
                      width={40}
                      height={40}
                      className="h-10 w-10"
                    />
                    <div className="ml-2">
                      <div className="text-xs text-gray-500">reCAPTCHA</div>
                      <div className="text-xs text-gray-400">Privacy - Terms</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <Link
                  href="/onboarding/mechanic/professional-info-2"
                  className="flex items-center px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  Back
                </Link>

                <button
                  type="submit"
                  className="flex items-center px-6 py-3 bg-green-800 text-white rounded-md hover:bg-green-700"
                  disabled={!hasAgreed}
                >
                  Finish
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

