"use client"

import { useState, useRef, useEffect } from "react"
import { MapPin, X } from "lucide-react"

// Mock data for address suggestions
const mockAddressSuggestions = [
  "123 Main St, Seattle, WA 98101",
  "456 Pine Ave, Seattle, WA 98101",
  "789 Oak Blvd, Seattle, WA 98102",
  "321 Elm St, Seattle, WA 98103",
  "555 Cedar Rd, Seattle, WA 98104",
  "777 Maple Dr, Seattle, WA 98105",
]

export function AddressAutocomplete({ onAddressSelect }: { onAddressSelect?: (address: string) => void }) {
  const [inputValue, setInputValue] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter suggestions based on input
  useEffect(() => {
    if (inputValue.length > 2) {
      setIsLoading(true)

      // Simulate API delay
      const timer = setTimeout(() => {
        const filtered = mockAddressSuggestions.filter((address) =>
          address.toLowerCase().includes(inputValue.toLowerCase()),
        )
        setSuggestions(filtered)
        setIsLoading(false)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setSuggestions([])
    }
  }, [inputValue])

  // Handle suggestion selection
  const handleSelectSuggestion = (address: string) => {
    setInputValue(address)
    setShowSuggestions(false)
    if (onAddressSelect) {
      onAddressSelect(address)
    }
  }

  // Clear input
  const handleClearInput = () => {
    setInputValue("")
    setSuggestions([])
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Current Car Location"
          className="w-full p-3 pl-10 border border-gray-200 rounded-md bg-gray-50"
        />
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

        {inputValue && (
          <button onClick={handleClearInput} className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {showSuggestions && inputValue.length > 2 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-3 text-center text-gray-500">
              <div className="inline-block animate-spin h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full mr-2"></div>
              Loading suggestions...
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="w-full text-left p-3 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{suggestion}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="p-3 text-center text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  )
}

