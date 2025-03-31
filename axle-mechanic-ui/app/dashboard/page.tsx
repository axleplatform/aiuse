"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Home,
  Calendar,
  Settings,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Car,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Mock data for upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      service: "Oil Change",
      mechanic: "Tom's Mobile Mechanic",
      date: "Thursday, February 21",
      time: "12:00 pm",
      status: "confirmed",
      price: 110,
    },
    {
      id: 2,
      service: "Brake Inspection",
      mechanic: "Mobile Auto Pros",
      date: "Monday, March 4",
      time: "10:30 am",
      status: "pending",
      price: 85,
    },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-md bg-white shadow-md">
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-30 w-64 bg-white border-r border-gray-200 lg:flex flex-col`}
      >
        <div className="p-4 border-b border-gray-200">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-green-800">axle</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link href="/dashboard" className="flex items-center px-4 py-3 text-gray-700 bg-gray-100 rounded-md">
            <Home className="h-5 w-5 mr-3" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/appointments"
            className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Calendar className="h-5 w-5 mr-3" />
            Appointments
          </Link>
          <Link
            href="/dashboard/vehicles"
            className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Car className="h-5 w-5 mr-3" />
            My Vehicles
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-md w-full">
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>

          <div className="flex items-center space-x-4">
            <button className="relative p-1">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800">Next Appointment</h2>
                  <Clock className="h-5 w-5 text-gray-500" />
                </div>
                {upcomingAppointments.length > 0 ? (
                  <div>
                    <p className="font-medium">{upcomingAppointments[0].service}</p>
                    <p className="text-gray-600">{upcomingAppointments[0].date}</p>
                    <p className="text-gray-600">{upcomingAppointments[0].time}</p>
                  </div>
                ) : (
                  <p className="text-gray-500">No upcoming appointments</p>
                )}
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800">My Vehicles</h2>
                  <Car className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium">2021 Mercedes GLE</p>
                  <p className="text-gray-600">Last service: Oil Change</p>
                  <p className="text-gray-600">January 15, 2023</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800">Quick Actions</h2>
                  <Settings className="h-5 w-5 text-gray-500" />
                </div>
                <div className="space-y-2">
                  <Link
                    href="/book-appointment"
                    className="block w-full py-2 px-4 bg-green-800 text-white rounded-md text-center hover:bg-green-700"
                  >
                    Book Appointment
                  </Link>
                  <Link
                    href="/dashboard/vehicles/add"
                    className="block w-full py-2 px-4 border border-gray-300 rounded-md text-center hover:bg-gray-50"
                  >
                    Add Vehicle
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-800">Upcoming Appointments</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center mb-1">
                          <h3 className="font-medium text-gray-800 mr-2">{appointment.service}</h3>
                          {appointment.status === "confirmed" ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Confirmed
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Pending
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600">{appointment.mechanic}</p>
                        <p className="text-gray-600">
                          {appointment.date} at {appointment.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-800">${appointment.price}</p>
                        <Link
                          href={`/dashboard/appointments/${appointment.id}`}
                          className="text-sm text-green-800 hover:underline"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <Link href="/dashboard/appointments" className="text-sm text-green-800 hover:underline">
                  View All Appointments
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

