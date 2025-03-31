"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Search,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  MoreHorizontal,
  X,
  Calendar,
  Clock,
  Edit,
  DollarSign,
} from "lucide-react"

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
    C63: "/placeholder.svg?height=200&width=400",
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

// Mock data for upcoming appointments
const upcomingAppointments = [
  {
    id: 1,
    service: "Rear Brakes",
    date: "Tuesday February 28th",
    time: "2:30 p.m.",
    distance: 3,
    location: "Pravardh",
    price: 140,
    car: {
      year: "2011",
      make: "Audi",
      model: "A4",
    },
  },
  {
    id: 2,
    service: "Oil Change",
    date: "Wednesday March 1st",
    time: "10:00 a.m.",
    distance: 5,
    location: "Michael",
    price: 95,
    car: {
      year: "2018",
      make: "Toyota",
      model: "Camry",
    },
  },
  {
    id: 3,
    service: "Battery Replacement",
    date: "Friday March 3rd",
    time: "3:15 p.m.",
    distance: 2,
    location: "Sarah",
    price: 120,
    car: {
      year: "2015",
      make: "Honda",
      model: "Civic",
    },
  },
]

// Mock data for available appointments
const availableAppointments = [
  {
    id: 1,
    customer: "Sebos",
    distance: 1,
    service: "Oil Change",
    date: "February 28th",
    time: "6:00 p.m.",
    car: {
      year: "2014",
      make: "Mercedes",
      model: "C63",
    },
    suggestedPrice: null, // Mechanic needs to set this
  },
  {
    id: 2,
    customer: "John",
    distance: 4,
    service: "Tire Rotation",
    date: "March 2nd",
    time: "2:00 p.m.",
    car: {
      year: "2019",
      make: "BMW",
      model: "3 Series",
    },
    suggestedPrice: null,
  },
  {
    id: 3,
    customer: "Emma",
    distance: 2,
    service: "Brake Inspection",
    date: "March 5th",
    time: "11:30 a.m.",
    car: {
      year: "2017",
      make: "Ford",
      model: "Mustang",
    },
    suggestedPrice: null,
  },
]

export default function MechanicDashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentUpcomingIndex, setCurrentUpcomingIndex] = useState(0)
  const [currentAvailableIndex, setCurrentAvailableIndex] = useState(0)
  const [editingDateTime, setEditingDateTime] = useState(false)
  const [priceInput, setPriceInput] = useState("")
  const [dateInput, setDateInput] = useState("")
  const [timeInput, setTimeInput] = useState("")
  const priceInputRef = useRef<HTMLInputElement>(null)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Initialize date and time inputs when available appointment changes
  useEffect(() => {
    if (currentAvailable) {
      setDateInput(currentAvailable.date)
      setTimeInput(currentAvailable.time)
    }
  }, [currentAvailableIndex])

  const handleNextUpcoming = () => {
    setCurrentUpcomingIndex((prev) => (prev + 1) % upcomingAppointments.length)
  }

  const handlePrevUpcoming = () => {
    setCurrentUpcomingIndex((prev) => (prev - 1 + upcomingAppointments.length) % upcomingAppointments.length)
  }

  const handleNextAvailable = () => {
    setCurrentAvailableIndex((prev) => (prev + 1) % availableAppointments.length)
  }

  const handlePrevAvailable = () => {
    setCurrentAvailableIndex((prev) => (prev - 1 + availableAppointments.length) % availableAppointments.length)
  }

  const handleAccept = () => {
    // In a real app, this would send the acceptance to the backend
    alert(`Appointment accepted with price: $${priceInput || "TBD"}`)
    setPriceInput("")
  }

  const handleEditDateTime = () => {
    setEditingDateTime(!editingDateTime)
  }

  const handleSaveDateTime = () => {
    // In a real app, this would update the appointment in the backend
    setEditingDateTime(false)
    alert(`Date and time updated to: ${dateInput} @ ${timeInput}`)
  }

  const currentUpcoming = upcomingAppointments[currentUpcomingIndex]
  const currentAvailable = availableAppointments[currentAvailableIndex]

  // Get car image for current appointments
  const getCarImage = (make: string, model: string) => {
    if (carImageDatabase[make as keyof typeof carImageDatabase]) {
      return (
        carImageDatabase[make as keyof typeof carImageDatabase][
          model as keyof (typeof carImageDatabase)[keyof typeof carImageDatabase]
        ] || "/placeholder.svg?height=200&width=400"
      )
    }
    return "/placeholder.svg?height=200&width=400"
  }

  const upcomingCarImage = getCarImage(currentUpcoming.car.make, currentUpcoming.car.model)
  const availableCarImage = getCarImage(currentAvailable.car.make, currentAvailable.car.model)

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

          <div className="flex items-center">
            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-900">Dashboard</h1>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-64 py-2 px-4 bg-gray-100 border border-gray-200 rounded-md"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>

            <button className="bg-green-800 text-white px-4 py-2 rounded-full hover:bg-green-700">
              Refer a friend
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column - Upcoming Appointments */}
              <div className="h-full">
                <h2 className="text-xl font-medium text-gray-700 mb-4">Upcoming Appointments</h2>

                <div className="bg-gray-50 rounded-lg p-4 relative h-[550px] flex flex-col">
                  <div className="mb-2">
                    <h3 className="text-xl font-bold">{currentUpcoming.service}</h3>
                    <p className="text-gray-700 font-medium">
                      {currentUpcoming.date} @ {currentUpcoming.time}
                    </p>
                    <div className="flex items-center text-gray-600 mt-1">
                      <span className="flex items-center">
                        <span className="mr-1">~</span>
                        <span>{currentUpcoming.distance} miles away</span>
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 text-red-500 mr-1" />
                      <Link
                        href={`https://maps.google.com/?q=${currentUpcoming.location}`}
                        target="_blank"
                        className="hover:underline"
                      >
                        {currentUpcoming.location}
                      </Link>
                    </div>
                  </div>

                  <div className="text-5xl font-bold mb-4">${currentUpcoming.price}</div>

                  <div className="text-center mb-2">
                    <p className="font-medium">
                      {currentUpcoming.car.year} {currentUpcoming.car.make} {currentUpcoming.car.model}
                    </p>
                  </div>

                  <div className="mb-4 flex-grow flex items-center justify-center">
                    <Image
                      src={upcomingCarImage || "/placeholder.svg"}
                      alt={`${currentUpcoming.car.make} ${currentUpcoming.car.model}`}
                      width={300}
                      height={150}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    <button className="bg-green-800 text-white px-6 py-2 rounded-full hover:bg-green-700">Start</button>
                    <span className="text-gray-500 mx-2">or</span>
                    <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-50">
                      Cancel
                    </button>
                    <button className="ml-2 text-gray-500">
                      <MoreHorizontal className="h-6 w-6" />
                    </button>
                  </div>

                  {upcomingAppointments.length > 1 && (
                    <>
                      <button
                        className="absolute left-2 top-1/2 transform -translate-y-1/2"
                        onClick={handlePrevUpcoming}
                      >
                        <ChevronLeft className="h-6 w-6 text-gray-400" />
                      </button>

                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={handleNextUpcoming}
                      >
                        <ChevronRight className="h-6 w-6 text-gray-400" />
                      </button>
                    </>
                  )}

                  {/* Pagination dots */}
                  {upcomingAppointments.length > 1 && (
                    <div className="flex justify-center mt-4 space-x-1">
                      {upcomingAppointments.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 w-2 rounded-full ${
                            index === currentUpcomingIndex ? "bg-green-800" : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Middle Column - Map */}
              <div className="h-full">
                <h2 className="text-xl font-medium text-gray-700 mb-4">Map</h2>
                <div className="relative h-[550px] rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src="/placeholder.svg?height=550&width=600"
                    alt="Map"
                    width={600}
                    height={550}
                    className="w-full h-full object-cover"
                  />

                  {/* Map markers */}
                  <div className="absolute top-1/4 left-1/4">
                    <div className="bg-blue-500 h-6 w-6 rounded-full flex items-center justify-center text-white text-xs">
                      <div className="h-3 w-3 bg-white rounded-full"></div>
                    </div>
                  </div>

                  <div className="absolute top-1/2 left-1/2">
                    <div className="bg-red-500 h-6 w-6 rounded-full flex items-center justify-center text-white text-xs">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  <div className="absolute bottom-1/4 right-1/4">
                    <div className="bg-yellow-500 h-6 w-6 rounded-full flex items-center justify-center text-white text-xs">
                      1
                    </div>
                  </div>

                  {/* Map controls */}
                  <div className="absolute right-2 top-2 flex flex-col">
                    <button className="bg-white w-8 h-8 rounded-t-md border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                      <Plus className="h-5 w-5 text-gray-700" />
                    </button>
                    <button className="bg-white w-8 h-8 rounded-b-md border-t-0 border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                      <Minus className="h-5 w-5 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Available Appointments */}
              <div className="h-full">
                <h2 className="text-xl font-medium text-gray-700 mb-4">Available Appointments</h2>

                <div className="bg-green-800 text-white rounded-lg p-4 relative h-[550px] flex flex-col">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="bg-yellow-500 h-6 w-6 rounded-full flex items-center justify-center text-white text-xs mr-2">
                        {currentAvailableIndex + 1}
                      </div>
                      <span>
                        {currentAvailable.customer} - {currentAvailable.distance} mile away
                      </span>
                    </div>
                    <button className="text-white">
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex justify-center my-4">
                    <div className="flex items-center">
                      <DollarSign className="h-6 w-6 mr-1" />
                      <input
                        ref={priceInputRef}
                        type="text"
                        value={priceInput}
                        onChange={(e) => setPriceInput(e.target.value)}
                        placeholder="Enter price"
                        className="bg-transparent border-b border-white w-32 text-center text-2xl focus:outline-none cursor-text"
                        onClick={() => priceInputRef.current?.focus()}
                      />
                    </div>
                  </div>

                  <div className="flex-grow flex items-center justify-center mb-4">
                    <Image
                      src={availableCarImage || "/placeholder.svg"}
                      alt={`${currentAvailable.car.make} ${currentAvailable.car.model}`}
                      width={300}
                      height={150}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  <div className="text-center mb-4">
                    <p className="text-lg font-medium">
                      {currentAvailable.car.year} {currentAvailable.car.make} {currentAvailable.car.model}
                    </p>
                    <p className="text-xl font-bold">{currentAvailable.service}</p>

                    {editingDateTime ? (
                      <div className="flex flex-col items-center mt-2 space-y-2">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <input
                            type="text"
                            value={dateInput}
                            onChange={(e) => setDateInput(e.target.value)}
                            placeholder="Date"
                            className="bg-transparent border-b border-white w-40 text-center focus:outline-none"
                          />
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <input
                            type="text"
                            value={timeInput}
                            onChange={(e) => setTimeInput(e.target.value)}
                            placeholder="Time"
                            className="bg-transparent border-b border-white w-40 text-center focus:outline-none"
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="text-lg">
                        {currentAvailable.date} @ {currentAvailable.time}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    <button
                      className="bg-white text-green-800 px-6 py-2 rounded-full hover:bg-gray-100"
                      onClick={handleAccept}
                    >
                      Accept
                    </button>
                    <span className="text-white mx-2">or</span>
                    {editingDateTime ? (
                      <button
                        className="border border-white text-white px-6 py-2 rounded-full hover:bg-green-700 flex items-center"
                        onClick={handleSaveDateTime}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="border border-white text-white px-6 py-2 rounded-full hover:bg-green-700 flex items-center"
                        onClick={handleEditDateTime}
                      >
                        Edit <Edit className="ml-1 h-4 w-4" />
                      </button>
                    )}
                    <button className="ml-2 text-white">
                      <MoreHorizontal className="h-6 w-6" />
                    </button>
                  </div>

                  {availableAppointments.length > 1 && (
                    <>
                      <button
                        className="absolute left-2 top-1/2 transform -translate-y-1/2"
                        onClick={handlePrevAvailable}
                      >
                        <ChevronLeft className="h-6 w-6 text-white" />
                      </button>

                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={handleNextAvailable}
                      >
                        <ChevronRight className="h-6 w-6 text-white" />
                      </button>
                    </>
                  )}

                  {/* Pagination dots */}
                  {availableAppointments.length > 1 && (
                    <div className="flex justify-center mt-4 space-x-1">
                      {availableAppointments.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 w-2 rounded-full ${
                            index === currentAvailableIndex ? "bg-white" : "bg-green-700"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function EmptyDashboard() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6">
          <Image
            src="/placeholder.svg?height=200&width=200"
            alt="Empty dashboard"
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">No Appointments Yet</h2>
        <p className="text-gray-600 mb-6">
          You don't have any upcoming appointments. Your available hours are set and customers can book you for
          services.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/dashboard/mechanic/availability"
            className="bg-green-800 text-white px-6 py-3 rounded-full hover:bg-green-700"
          >
            Update Availability
          </Link>
          <Link
            href="/dashboard/mechanic/services"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-50"
          >
            Manage Services
          </Link>
        </div>
      </div>
    </div>
  )
}

