"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { CreditCard, Lock, Check } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [nameOnCard, setNameOnCard] = useState("")
  const [saveCard, setSaveCard] = useState(false)
  const [appointmentData, setAppointmentData] = useState<any>(null)
  const [mechanicData, setMechanicData] = useState<any>(null)

  // Load appointment and mechanic data from sessionStorage
  useEffect(() => {
    const storedAppointmentData = sessionStorage.getItem("appointmentData")
    const storedMechanicData = sessionStorage.getItem("mechanicData")

    if (storedAppointmentData) {
      setAppointmentData(JSON.parse(storedAppointmentData))
    }

    if (storedMechanicData) {
      setMechanicData(JSON.parse(storedMechanicData))
    } else {
      // Default mechanic data if not available
      setMechanicData({
        price: 110,
        arrivalTime: "Arrives in 25 mins",
      })
    }
  }, [])

  // Format card number as user types
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    const formattedValue = value
      .replace(/(\d{4})/g, "$1 ")
      .trim()
      .slice(0, 19)
    setCardNumber(formattedValue)
  }

  // Format card expiry as user types
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 2) {
      setCardExpiry(value)
    } else {
      setCardExpiry(`${value.slice(0, 2)}/${value.slice(2, 4)}`)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Store payment data for receipt
    const paymentData = {
      mechanic: mechanicData,
      appointment: appointmentData,
      paymentMethod: "Credit Card",
      lastFour: cardNumber.slice(-4),
    }
    sessionStorage.setItem("paymentData", JSON.stringify(paymentData))

    // Simulate payment processing
    setTimeout(() => {
      // Navigate to thank you page after "payment" is processed
      router.push("/thank-you")
    }, 2000)
  }

  // Prepare display data
  const paymentData = {
    mechanic: mechanicData || {
      price: 110,
      arrivalTime: "Arrives in 25 mins",
    },
    service: appointmentData?.service || "Service",
    car: appointmentData
      ? `${appointmentData.car.year} ${appointmentData.car.make} ${appointmentData.car.model}`
      : "Your Car",
    appointment: appointmentData?.appointment || {
      date: "Thursday, February 21",
      time: "12:00 pm",
    },
    location: appointmentData?.location || "Your Location",
    aiSuggestion: appointmentData?.aiSuggestion || null,
    description: appointmentData?.description || "",
    carRuns: appointmentData?.carRuns || "No",
    possibleServices: appointmentData?.possibleServices || [],
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
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-1">Complete Your Payment</h1>
          <p className="text-center text-gray-600 mb-8">Secure payment processing</p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Payment Details</h2>
                  <div className="flex items-center space-x-2">
                    <Image src="/placeholder.svg?height=30&width=40" alt="Visa" width={40} height={30} />
                    <Image src="/placeholder.svg?height=30&width=40" alt="Mastercard" width={40} height={30} />
                    <Image src="/placeholder.svg?height=30&width=40" alt="Amex" width={40} height={30} />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        id="card-number"
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-3 pr-10 border border-gray-300 rounded-md"
                        required
                        maxLength={19}
                      />
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        id="expiry"
                        type="text"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                        CVC
                      </label>
                      <input
                        id="cvc"
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        placeholder="123"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={nameOnCard}
                      onChange={(e) => setNameOnCard(e.target.value)}
                      placeholder="John Smith"
                      className="w-full p-3 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      id="save-card"
                      type="checkbox"
                      checked={saveCard}
                      onChange={() => setSaveCard(!saveCard)}
                      className="h-4 w-4 text-green-800 focus:ring-green-700 border-gray-300 rounded"
                    />
                    <label htmlFor="save-card" className="ml-2 block text-sm text-gray-700">
                      Save this card for future payments
                    </label>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button
                      type="button"
                      onClick={() => router.push("/pick-mechanic")}
                      className="flex-1 py-3 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="h-5 w-5 mr-2" />
                          Pay ${paymentData.mechanic.price}
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="mt-6 flex items-center justify-center">
                  <Lock className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-500">Secure payment powered by Stripe</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vehicle</span>
                    <span className="font-medium">{paymentData.car}</span>
                  </div>

                  {paymentData.aiSuggestion && (
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">AI Diagnostics</span>
                        <span className="font-medium text-green-800">{paymentData.aiSuggestion.service}</span>
                      </div>
                      <div className="mt-2 bg-green-50 border border-green-100 p-3 rounded-md">
                        <p className="text-gray-700 text-xs">{paymentData.description}</p>

                        {paymentData.possibleServices && paymentData.possibleServices.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-green-200">
                            <p className="text-xs text-gray-600">Other possible services:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {paymentData.possibleServices
                                .filter((s: any) => s.service !== paymentData.aiSuggestion.service)
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
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Date & Time</span>
                    <span className="font-medium">
                      {paymentData.appointment.date}, {paymentData.appointment.time}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-gray-600 block">Does Your Car Run?</span>
                      <span className="font-medium">{paymentData.carRuns}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block">Location</span>
                      <span className="font-medium">{paymentData.location}</span>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Mechanic</span>
                    <span className="font-medium">{paymentData.mechanic.arrivalTime}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${paymentData.mechanic.price}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Check className="h-5 w-5 text-green-800" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-700">
                        You will only be charged after the service is completed to your satisfaction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

