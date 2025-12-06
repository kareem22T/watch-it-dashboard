"use client"

import type React from "react"

import { useState } from "react"
import type { FormField } from "../../../store/departmentsSlice"

interface FormFieldBuilderProps {
  onAdd: (field: Omit<FormField, "id">) => void
  onCancel: () => void
}

export default function FormFieldBuilder({ onAdd, onCancel }: FormFieldBuilderProps) {
  const [type, setType] = useState<FormField["type"]>("input")
  const [label, setLabel] = useState("")
  const [name, setName] = useState("")
  const [placeholder, setPlaceholder] = useState("")
  const [required, setRequired] = useState(false)
  const [options, setOptions] = useState<Array<{ value: string; label: string }>>([])
  const [optionInput, setOptionInput] = useState("")

  const handleAddOption = () => {
    if (optionInput.trim()) {
      setOptions([...options, { value: optionInput.toLowerCase().replace(/\s+/g, "-"), label: optionInput }])
      setOptionInput("")
    }
  }

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      onAdd({
        type,
        label,
        name,
        placeholder,
        required,
        ...(type === "select" && { options }),
      })

      // Reset form
      setType("input")
      setLabel("")
      setName("")
      setPlaceholder("")
      setRequired(false)
      setOptions([])
    } catch (error) {
      console.error("Error in handleSubmit:", error)
    }
  }
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 darkx:text-gray-300 mb-1">Field Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as FormField["type"])}
            className="w-full px-2 py-2 bg-white darkx:bg-gray-800 border border-gray-200 darkx:border-gray-700 rounded text-sm text-gray-900 darkx:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 darkx:focus:ring-brand-400"
          >
            <option value="input">Text Input</option>
            <option value="textarea">Textarea</option>
            <option value="select">Select</option>
            <option value="file">File Upload</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 darkx:text-gray-300 mb-1">Field Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g., Full Name"
            className="w-full px-2 py-2 bg-white darkx:bg-gray-800 border border-gray-200 darkx:border-gray-700 rounded text-sm text-gray-900 darkx:text-white placeholder-gray-500 darkx:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 darkx:focus:ring-brand-400"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 darkx:text-gray-300 mb-1">
          Field Name (for form submission)
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., fullName"
          className="w-full px-2 py-2 bg-white darkx:bg-gray-800 border border-gray-200 darkx:border-gray-700 rounded text-sm text-gray-900 darkx:text-white placeholder-gray-500 darkx:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 darkx:focus:ring-brand-400"
          required
        />
      </div>

      {type !== "file" && type !== "select" && (
        <div>
          <label className="block text-xs font-medium text-gray-700 darkx:text-gray-300 mb-1">Placeholder</label>
          <input
            type="text"
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
            placeholder="Optional placeholder text"
            className="w-full px-2 py-2 bg-white darkx:bg-gray-800 border border-gray-200 darkx:border-gray-700 rounded text-sm text-gray-900 darkx:text-white placeholder-gray-500 darkx:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 darkx:focus:ring-brand-400"
          />
        </div>
      )}

      {type === "select" && (
        <div>
          <label className="block text-xs font-medium text-gray-700 darkx:text-gray-300 mb-1">Options</label>
          <div className="flex gap-2 mb-2 flex-col sm:flex-row">
            <input
              type="text"
              value={optionInput}
              onChange={(e) => setOptionInput(e.target.value)}
              placeholder="Add option..."
              className="flex-1 px-2 py-2 bg-white darkx:bg-gray-800 border border-gray-200 darkx:border-gray-700 rounded text-sm text-gray-900 darkx:text-white placeholder-gray-500 darkx:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 darkx:focus:ring-brand-400"
            />
            <button
              type="button"
              onClick={handleAddOption}
              className="px-3 py-2 bg-brand-500 text-white rounded text-sm hover:bg-brand-600 darkx:hover:bg-brand-400 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="space-y-1">
            {options.map((opt, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-2 py-1 bg-white darkx:bg-gray-800 rounded border border-gray-200 darkx:border-gray-700"
              >
                <span className="text-sm text-gray-900 darkx:text-white">{opt.label}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveOption(idx)}
                  className="text-xs text-error-500 hover:text-error-600 darkx:text-error-400 darkx:hover:text-error-300"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={required}
          onChange={(e) => setRequired(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 darkx:border-gray-600 accent-brand-500"
        />
        <span className="text-sm text-gray-700 darkx:text-gray-300">Required field</span>
      </label>

      <div className="flex gap-2 pt-2 flex-col sm:flex-row">
        <button
          onClick={handleSubmit}
          className="flex-1 px-3 py-2 bg-brand-500 text-white rounded text-sm hover:bg-brand-600 darkx:hover:bg-brand-400 font-medium transition-colors"
        >
          Add Field
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-3 py-2 bg-gray-100 darkx:bg-gray-800 text-gray-700 darkx:text-gray-300 rounded text-sm hover:bg-gray-200 darkx:hover:bg-gray-700 font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
