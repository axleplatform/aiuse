"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Plus, X, LinkIcon } from "lucide-react"

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

export default function ProfessionalInfoPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    certificates: "",
    businessName: "",
    yelpLink: "",
    googleLink: "",
    websiteLink: "",
  })

  const [specialties, setSpecialties] = useState<string[]>([])
  const [otherSpecialty, setOtherSpecialty] = useState("")
  const [showOtherInput, setShowOtherInput] = useState(false)

  const predefinedSpecialties = [
    "Oil Change",
    "Brake Repair",
    "Engine Repair",
    "Transmission",
    "Electrical",
    "Suspension",
    "Diagnostics",
    "Tire Service",
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSpecialtyToggle = (specialty: string) => {
    if (specialties.includes(specialty)) {
      setSpecialties(specialties.filter((s) => s !== specialty))
    } else {
      setSpecialties([...specialties, specialty])
    }
  }

  const handleAddOtherSpecialty = () => {
    if (otherSpecialty.trim()) {
      setSpecialties([...specialties, otherSpecialty.trim()])
      setOtherSpecialty("")
      setShowOtherInput(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/onboarding/mechanic/professional-info-2")
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
                <div className="w-16 h-1 bg-gray-200"></div>
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">4</div>
                <div className="w-16 h-1 bg-gray-200"></div>
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">5</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="certificates" className="block text-sm font-medium text-gray-700 mb-1">
                  Do you have any certificates or mechanic license?
                </label>
                <input
                  id="certificates"
                  name="certificates"
                  type="text"
                  placeholder="Automotive Service Excellence (ASE), BAR, ASO"
                  value={formData.certificates}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                  Are you incorporated?
                </label>
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  placeholder="Name your Business (LLC), Sole Proprietorship, etc."
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>

              {/* Online Presence Section */}
              <div className="space-y-4 border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium text-gray-800">Online Presence</h3>
                <p className="text-sm text-gray-600">
                  We'll use these links to verify your ratings and reviews on these platforms.
                </p>

                <div>
                  <label htmlFor="yelpLink" className="block text-sm font-medium text-gray-700 mb-1">
                    Yelp Business Page URL
                  </label>
                  <div className="relative">
                    <input
                      id="yelpLink"
                      name="yelpLink"
                      type="url"
                      placeholder="https://www.yelp.com/biz/your-business"
                      value={formData.yelpLink}
                      onChange={handleChange}
                      className="w-full p-3 pl-10 border border-gray-300 rounded-md"
                    />
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="googleLink" className="block text-sm font-medium text-gray-700 mb-1">
                    Google Business Profile URL
                  </label>
                  <div className="relative">
                    <input
                      id="googleLink"
                      name="googleLink"
                      type="url"
                      placeholder="https://g.page/your-business"
                      value={formData.googleLink}
                      onChange={handleChange}
                      className="w-full p-3 pl-10 border border-gray-300 rounded-md"
                    />
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="websiteLink" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Website URL
                  </label>
                  <div className="relative">
                    <input
                      id="websiteLink"
                      name="websiteLink"
                      type="url"
                      placeholder="https://www.yourbusiness.com"
                      value={formData.websiteLink}
                      onChange={handleChange}
                      className="w-full p-3 pl-10 border border-gray-300 rounded-md"
                    />
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Specialties</label>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {predefinedSpecialties.map((specialty) => (
                    <div key={specialty} className="flex items-center">
                      <input
                        id={`specialty-${specialty}`}
                        type="checkbox"
                        checked={specialties.includes(specialty)}
                        onChange={() => handleSpecialtyToggle(specialty)}
                        className="h-4 w-4 text-green-800 focus:ring-green-700 border-gray-300 rounded"
                      />
                      <label htmlFor={`specialty-${specialty}`} className="ml-2 block text-sm text-gray-700">
                        {specialty}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Selected specialties tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {specialties.map((specialty) => (
                    <div
                      key={specialty}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {specialty}
                      <button
                        type="button"
                        onClick={() => handleSpecialtyToggle(specialty)}
                        className="ml-1 text-green-600 hover:text-green-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {showOtherInput ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={otherSpecialty}
                      onChange={(e) => setOtherSpecialty(e.target.value)}
                      placeholder="Enter other specialty"
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={handleAddOtherSpecialty}
                      className="ml-2 p-2 bg-green-800 text-white rounded-md hover:bg-green-700"
                      disabled={!otherSpecialty.trim()}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOtherSpecialty("")
                        setShowOtherInput(false)
                      }}
                      className="ml-2 p-2 border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowOtherInput(true)}
                    className="flex items-center text-sm text-green-800 hover:text-green-700"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Other Specialty
                  </button>
                )}
              </div>

              <div className="mt-8 flex justify-between">
                <Link
                  href="/onboarding/mechanic/location"
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

