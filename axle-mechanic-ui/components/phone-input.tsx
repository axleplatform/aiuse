"use client"

import type React from "react"

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  required?: boolean
}

export function PhoneInput({ value, onChange, required = false }: PhoneInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-numeric characters
    const cleaned = e.target.value.replace(/\D/g, "")

    // Format the phone number
    let formatted = ""
    if (cleaned.length <= 3) {
      formatted = cleaned
    } else if (cleaned.length <= 6) {
      formatted = `(${cleaned.slice(0, 3)})-${cleaned.slice(3)}`
    } else {
      formatted = `(${cleaned.slice(0, 3)})-${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`
    }

    onChange(formatted)
  }

  return (
    <input
      type="tel"
      value={value}
      onChange={handleChange}
      placeholder="+1 (###)-### ####"
      className="w-full p-4 border border-gray-200 rounded-md bg-gray-50 text-center"
      required={required}
    />
  )
}

