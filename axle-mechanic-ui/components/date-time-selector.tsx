"use client"

import { useState } from "react"
import { Calendar, Clock } from "lucide-react"

export function DateTimeSelector() {
  const [showCalendar, setShowCalendar] = useState(false)
  const [showTimeSelector, setShowTimeSelector] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState("Now")

  // Generate calendar days
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  // Get first day of month and total days in month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  // Create calendar grid with empty cells for proper alignment
  const calendarDays = Array(firstDayOfMonth)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1))

  // Generate time slots in 30-minute increments with AM/PM format
  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour24 = Math.floor(i / 2)
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12
    const minute = (i % 2) * 30
    const ampm = hour24 < 12 ? "AM" : "PM"
    return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`
  })

  // Format date for display
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: "short", month: "short", day: "numeric" }
    return date.toLocaleDateString("en-US", options)
  }

  // Handle date selection
  const handleDateSelect = (day: number | null) => {
    if (day) {
      const newDate = new Date(currentYear, currentMonth, day)
      setSelectedDate(newDate)
      setShowCalendar(false)
    }
  }

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setShowTimeSelector(false)
  }

  return (
    <div className="flex gap-4 mb-6">
      {/* Date Selector */}
      <div className="relative flex-1">
        <button
          className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-md bg-gray-50 w-full"
          onClick={() => {
            setShowCalendar(!showCalendar)
            setShowTimeSelector(false)
          }}
        >
          <Calendar className="h-4 w-4" />
          <span>{selectedDate.getDate() === today.getDate() ? "Today" : formatDate(selectedDate)}</span>
          <span className="ml-1">▼</span>
        </button>

        {showCalendar && (
          <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-3">
            <div className="mb-2 text-center font-medium">
              {new Date(currentYear, currentMonth).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="text-xs font-medium text-gray-500">
                  {day}
                </div>
              ))}

              {calendarDays.map((day, index) => (
                <button
                  key={index}
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${
                    day === null
                      ? "invisible"
                      : day === today.getDate()
                        ? "bg-green-800 text-white hover:bg-green-700"
                        : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleDateSelect(day)}
                  disabled={day === null}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Time Selector */}
      <div className="relative flex-1">
        <button
          className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-md bg-gray-50 w-full"
          onClick={() => {
            setShowTimeSelector(!showTimeSelector)
            setShowCalendar(false)
          }}
        >
          <Clock className="h-4 w-4" />
          <span>{selectedTime}</span>
          <span className="ml-1">▼</span>
        </button>

        {showTimeSelector && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
            {timeSlots.map((time) => (
              <button
                key={time}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

