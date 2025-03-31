"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

// This is a simplified database of car makes and models
// In a real application, this would come from an API or database
const carDatabase = {
  makes: [
    "Acura",
    "Audi",
    "BMW",
    "Buick",
    "Cadillac",
    "Chevrolet",
    "Chrysler",
    "Dodge",
    "Ford",
    "GMC",
    "Honda",
    "Hyundai",
    "Infiniti",
    "Jaguar",
    "Jeep",
    "Kia",
    "Land Rover",
    "Lexus",
    "Lincoln",
    "Mazda",
    "Mercedes-Benz",
    "Nissan",
    "Porsche",
    "Subaru",
    "Tesla",
    "Toyota",
    "Volkswagen",
    "Volvo",
  ],
  models: {
    Toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma", "4Runner", "Prius"],
    Honda: ["Civic", "Accord", "CR-V", "Pilot", "Odyssey", "HR-V", "Ridgeline"],
    Ford: ["F-150", "Escape", "Explorer", "Mustang", "Edge", "Ranger", "Bronco"],
    // Add more makes and models as needed
  },
}

// Generate years from current year back to 1990
const years = Array.from({ length: new Date().getFullYear() - 1989 }, (_, i) =>
  (new Date().getFullYear() - i).toString(),
)

export function CarSelector() {
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedMake, setSelectedMake] = useState("")
  const [selectedModel, setSelectedModel] = useState("")

  // Get models for the selected make
  const availableModels = selectedMake ? carDatabase.models[selectedMake as keyof typeof carDatabase.models] || [] : []

  return (
    <div className="grid grid-cols-3 gap-3 mb-4">
      <div className="relative">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full p-3 pr-10 border border-gray-200 rounded-md bg-gray-50 appearance-none"
        >
          <option value="">Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-500" />
      </div>

      <div className="relative">
        <select
          value={selectedMake}
          onChange={(e) => {
            setSelectedMake(e.target.value)
            setSelectedModel("") // Reset model when make changes
          }}
          className="w-full p-3 pr-10 border border-gray-200 rounded-md bg-gray-50 appearance-none"
        >
          <option value="">Make</option>
          {carDatabase.makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-500" />
      </div>

      <div className="relative">
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full p-3 pr-10 border border-gray-200 rounded-md bg-gray-50 appearance-none"
          disabled={!selectedMake}
        >
          <option value="">Model</option>
          {availableModels.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-500" />
      </div>
    </div>
  )
}

