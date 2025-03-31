"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Plus, X } from "lucide-react"

// Car database for make/model dropdowns
const carDatabase = {
  makes: [
    "Acura",
    "Alfa Romeo",
    "Aston Martin",
    "Audi",
    "Bentley",
    "BMW",
    "Buick",
    "Cadillac",
    "Chevrolet",
    "Chrysler",
    "Dodge",
    "Ferrari",
    "Fiat",
    "Ford",
    "Genesis",
    "GMC",
    "Honda",
    "Hyundai",
    "Infiniti",
    "Jaguar",
    "Jeep",
    "Kia",
    "Lamborghini",
    "Land Rover",
    "Lexus",
    "Lincoln",
    "Maserati",
    "Mazda",
    "McLaren",
    "Mercedes-Benz",
    "Mini",
    "Mitsubishi",
    "Nissan",
    "Porsche",
    "Ram",
    "Rolls-Royce",
    "Subaru",
    "Tesla",
    "Toyota",
    "Volkswagen",
    "Volvo",
  ],
  models: {
    Acura: ["ILX", "MDX", "NSX", "RDX", "TLX"],
    BMW: [
      "1 Series",
      "2 Series",
      "3 Series",
      "4 Series",
      "5 Series",
      "6 Series",
      "7 Series",
      "8 Series",
      "X1",
      "X2",
      "X3",
      "X4",
      "X5",
      "X6",
      "X7",
      "Z4",
    ],
    Chevrolet: [
      "Blazer",
      "Bolt",
      "Camaro",
      "Colorado",
      "Corvette",
      "Equinox",
      "Malibu",
      "Silverado",
      "Suburban",
      "Tahoe",
      "Trailblazer",
      "Traverse",
    ],
    Ford: [
      "Bronco",
      "EcoSport",
      "Edge",
      "Escape",
      "Expedition",
      "Explorer",
      "F-150",
      "F-250",
      "F-350",
      "Mustang",
      "Ranger",
    ],
    Honda: ["Accord", "Civic", "CR-V", "HR-V", "Insight", "Odyssey", "Passport", "Pilot", "Ridgeline"],
    Hyundai: ["Accent", "Elantra", "Ioniq", "Kona", "Palisade", "Santa Fe", "Sonata", "Tucson", "Venue"],
    Jeep: ["Cherokee", "Compass", "Gladiator", "Grand Cherokee", "Renegade", "Wrangler"],
    Lexus: ["ES", "GS", "GX", "IS", "LC", "LS", "LX", "NX", "RC", "RX", "UX"],
    "Mercedes-Benz": [
      "A-Class",
      "C-Class",
      "CLA",
      "CLS",
      "E-Class",
      "G-Class",
      "GLA",
      "GLB",
      "GLC",
      "GLE",
      "GLS",
      "S-Class",
    ],
    Nissan: [
      "Altima",
      "Armada",
      "Frontier",
      "Kicks",
      "Leaf",
      "Maxima",
      "Murano",
      "Pathfinder",
      "Rogue",
      "Sentra",
      "Titan",
      "Versa",
    ],
    Toyota: [
      "4Runner",
      "Avalon",
      "Camry",
      "Corolla",
      "Highlander",
      "Land Cruiser",
      "Prius",
      "RAV4",
      "Sequoia",
      "Sienna",
      "Tacoma",
      "Tundra",
    ],
    Tesla: ["Model 3", "Model S", "Model X", "Model Y"],
    Volkswagen: ["Atlas", "Golf", "ID.4", "Jetta", "Passat", "Taos", "Tiguan"],
  },
}

// For other makes, we'll provide a generic set of models
const genericModels = ["Sedan", "SUV", "Truck", "Coupe", "Convertible", "Hatchback", "Wagon", "Van", "Minivan"]

export default function ProfessionalInfo2Page() {
  const router = useRouter()
  // Add these state variables
  const [specializedCars, setSpecializedCars] = useState<{ make: string; model: string }[]>([])
  const [selectedMake, setSelectedMake] = useState("")
  const [filteredMakes, setFilteredMakes] = useState<string[]>([])
  const [makeInput, setMakeInput] = useState("")
  const [showMakeDropdown, setShowMakeDropdown] = useState(false)

  const [selectedModel, setSelectedModel] = useState("")
  const [filteredModels, setFilteredModels] = useState<string[]>([])
  const [modelInput, setModelInput] = useState("")
  const [showModelDropdown, setShowModelDropdown] = useState(false)

  const [leastFavoriteCars, setLeastFavoriteCars] = useState<string[]>([])
  const [unwantedCars, setUnwantedCars] = useState<string[]>([])
  const [unwantedServices, setUnwantedServices] = useState<string[]>([])

  const [newSpecializedCar, setNewSpecializedCar] = useState("")
  const [newLeastFavoriteCar, setNewLeastFavoriteCar] = useState("")
  const [newUnwantedCar, setNewUnwantedCar] = useState("")
  const [newUnwantedService, setNewUnwantedService] = useState("")

  // Add these useEffect hooks
  useEffect(() => {
    if (makeInput) {
      const filtered = carDatabase.makes.filter((make) => make.toLowerCase().includes(makeInput.toLowerCase()))
      setFilteredMakes(filtered)
    } else {
      setFilteredMakes([])
    }
  }, [makeInput])

  useEffect(() => {
    if (selectedMake) {
      const models = carDatabase.models[selectedMake as keyof typeof carDatabase.models] || genericModels

      if (modelInput) {
        const filtered = models.filter((model) => model.toLowerCase().includes(modelInput.toLowerCase()))
        setFilteredModels(filtered)
      } else {
        setFilteredModels(models)
      }
    } else {
      setFilteredModels([])
    }
  }, [selectedMake, modelInput])

  // Add these functions
  const handleSelectMake = (make: string) => {
    setSelectedMake(make)
    setMakeInput(make)
    setShowMakeDropdown(false)
    setModelInput("")
    setSelectedModel("")
  }

  const handleSelectModel = (model: string) => {
    setSelectedModel(model)
    setModelInput(model)
    setShowModelDropdown(false)
  }

  const handleAddCar = () => {
    if (selectedMake && selectedModel) {
      setSpecializedCars([...specializedCars, { make: selectedMake, model: selectedModel }])
      setSelectedMake("")
      setSelectedModel("")
      setMakeInput("")
      setModelInput("")
    }
  }

  const handleRemoveCar = (index: number) => {
    setSpecializedCars(specializedCars.filter((_, i) => i !== index))
  }

  const handleAddItem = (
    item: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    list: string[],
    listSetter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (item.trim()) {
      listSetter([...list, item.trim()])
      setter("")
    }
  }

  const handleRemoveItem = (
    item: string,
    list: string[],
    listSetter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    listSetter(list.filter((i) => i !== item))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/onboarding/mechanic/verification")
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
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Mechanic Questions</h1>
            <p className="text-center text-gray-600 mb-6">Fill out the information</p>

            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center">1</div>
                <div className="w-16 h-1 bg-green-800"></div>
                <div className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center">2</div>
                <div className="w-16 h-1 bg-green-800"></div>
                <div className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center">3</div>
                <div className="w-16 h-1 bg-green-800"></div>
                <div className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center">4</div>
                <div className="w-16 h-1 bg-green-800"></div>
                <div className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center">5</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialized cars to work on</label>

                {/* Selected cars */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {specializedCars.map((car, index) => (
                    <div
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {car.make} {car.model}
                      <button
                        type="button"
                        onClick={() => handleRemoveCar(index)}
                        className="ml-1 text-green-600 hover:text-green-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-2">
                  {/* Make dropdown */}
                  <div className="relative">
                    <label htmlFor="carMake" className="block text-xs font-medium text-gray-500 mb-1">
                      Make
                    </label>
                    <input
                      id="carMake"
                      type="text"
                      value={makeInput}
                      onChange={(e) => {
                        setMakeInput(e.target.value)
                        setShowMakeDropdown(true)
                      }}
                      onFocus={() => setShowMakeDropdown(true)}
                      placeholder="Select car make"
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />

                    {showMakeDropdown && filteredMakes.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {filteredMakes.map((make) => (
                          <button
                            key={make}
                            type="button"
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                            onClick={() => handleSelectMake(make)}
                          >
                            {make}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Model dropdown */}
                  <div className="relative">
                    <label htmlFor="carModel" className="block text-xs font-medium text-gray-500 mb-1">
                      Model
                    </label>
                    <input
                      id="carModel"
                      type="text"
                      value={modelInput}
                      onChange={(e) => {
                        setModelInput(e.target.value)
                        setShowModelDropdown(true)
                      }}
                      onFocus={() => setShowModelDropdown(true)}
                      placeholder="Select car model"
                      className="w-full p-3 border border-gray-300 rounded-md"
                      disabled={!selectedMake}
                    />

                    {showModelDropdown && filteredModels.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {filteredModels.map((model) => (
                          <button
                            key={model}
                            type="button"
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                            onClick={() => handleSelectModel(model)}
                          >
                            {model}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddCar}
                  className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                  disabled={!selectedMake || !selectedModel}
                >
                  Add Car
                </button>
              </div>

              {/* Combine questions 2 & 3 side by side */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Least favorite Brands to work on
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {leastFavoriteCars.map((car) => (
                      <div
                        key={car}
                        className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {car}
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(car, leastFavoriteCars, setLeastFavoriteCars)}
                          className="ml-1 text-yellow-600 hover:text-yellow-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      value={newLeastFavoriteCar}
                      onChange={(e) => setNewLeastFavoriteCar(e.target.value)}
                      placeholder="E.g., BMW, Volkswagen"
                      className="flex-1 p-3 border border-gray-300 rounded-l-md"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleAddItem(
                          newLeastFavoriteCar,
                          setNewLeastFavoriteCar,
                          leastFavoriteCars,
                          setLeastFavoriteCars,
                        )
                      }
                      className="px-4 bg-green-800 text-white rounded-r-md hover:bg-green-700"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cars that you do not wish to work on
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {unwantedCars.map((car) => (
                      <div
                        key={car}
                        className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {car}
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(car, unwantedCars, setUnwantedCars)}
                          className="ml-1 text-red-600 hover:text-red-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      value={newUnwantedCar}
                      onChange={(e) => setNewUnwantedCar(e.target.value)}
                      placeholder="E.g., Exotic cars, Electric vehicles"
                      className="flex-1 p-3 border border-gray-300 rounded-l-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddItem(newUnwantedCar, setNewUnwantedCar, unwantedCars, setUnwantedCars)}
                      className="px-4 bg-green-800 text-white rounded-r-md hover:bg-green-700"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services that you do not wish to work on
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {unwantedServices.map((service) => (
                    <div
                      key={service}
                      className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {service}
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(service, unwantedServices, setUnwantedServices)}
                        className="ml-1 text-red-600 hover:text-red-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={newUnwantedService}
                    onChange={(e) => setNewUnwantedService(e.target.value)}
                    placeholder="E.g., Transmission rebuild, Engine swap"
                    className="flex-1 p-3 border border-gray-300 rounded-l-md"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleAddItem(newUnwantedService, setNewUnwantedService, unwantedServices, setUnwantedServices)
                    }
                    className="px-4 bg-green-800 text-white rounded-r-md hover:bg-green-700"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <Link
                  href="/onboarding/mechanic/professional-info"
                  className="flex items-center px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  Back
                </Link>

                <button
                  type="submit"
                  className="flex items-center px-6 py-3 bg-green-800 text-white rounded-md hover:bg-green-700"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

