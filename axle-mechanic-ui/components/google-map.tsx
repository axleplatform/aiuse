"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

// Mock data for mechanic locations
const mechanicLocations = [
  { id: 1, lat: 47.6062, lng: -122.3321, name: "John's Auto Repair" },
  { id: 2, lat: 47.6102, lng: -122.3426, name: "Quick Fix Mechanics" },
  { id: 3, lat: 47.6205, lng: -122.3493, name: "Mobile Mechanic Pro" },
  { id: 4, lat: 47.6152, lng: -122.3553, name: "Auto Care Express" },
]

export function GoogleMap({ center = { lat: 47.6062, lng: -122.3321 } }) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-64 w-full border border-gray-200 rounded-md overflow-hidden">
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
        </div>
      )}

      <div
        ref={mapRef}
        className={`h-full w-full transition-opacity duration-300 ${isMapLoaded ? "opacity-100" : "opacity-0"}`}
      >
        {/* This is a placeholder for the actual Google Maps implementation */}
        <div className="relative h-full w-full bg-blue-50">
          {/* Map background */}
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Map showing mechanic locations"
            width={800}
            height={400}
            className="h-full w-full object-cover"
          />

          {/* Mechanic location markers */}
          {mechanicLocations.map((location, index) => (
            <div
              key={location.id}
              className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                top: `${30 + index * 15}%`,
                left: `${20 + index * 20}%`,
                animation: `bounce 1s infinite ${index * 0.2}s`,
              }}
            >
              <div className="w-6 h-6 bg-green-800 rounded-full flex items-center justify-center text-white text-xs">
                {index + 1}
              </div>
            </div>
          ))}

          {/* Current location marker */}
          <div
            className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: "50%", left: "50%" }}
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-blue-500"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </div>
  )
}

