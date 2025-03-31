"use client"

import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
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
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-20 w-20 text-green-800" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">Appointment Confirmed!</h1>

          <p className="text-gray-600 mb-8">
            Your mechanic appointment has been successfully booked and payment processed. You will receive a
            confirmation email shortly with all the details.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Appointment Details</h2>

            <div className="space-y-2 text-left max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="font-medium">Service:</span>
                <span>Oil Change</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>Thursday, February 21</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Time:</span>
                <span>12:00 pm</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Location:</span>
                <span>9500 Gilman Dr</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Price:</span>
                <span>$110.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Payment Status:</span>
                <span className="text-green-600">Paid</span>
              </div>
            </div>
          </div>

          <Link href="/" className="px-8 py-3 bg-green-800 text-white rounded-full hover:bg-green-700 inline-block">
            Return to Home
          </Link>
        </div>
      </main>
    </div>
  )
}

