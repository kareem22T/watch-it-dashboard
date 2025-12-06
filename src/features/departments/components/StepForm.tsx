"use client"

import type React from "react"

import { useState } from "react"
import type { Step, FormField } from "../../../store/departmentsSlice"
import FormFieldBuilder from "./FormFieldBuilder"
import { v4 as uuidv4 } from "uuid"
import { Trash2 } from "lucide-react"

interface StepFormProps {
  step?: Step
  onSubmit: (data: Omit<Step, "id" | "order">) => void
  onCancel: () => void
}

export default function StepForm({ step, onSubmit, onCancel }: StepFormProps) {
  const [title, setTitle] = useState(step?.title || "")
  const [description, setDescription] = useState(step?.description || "")
  const [formFields, setFormFields] = useState<FormField[]>(step?.formFields || [])
  const [showFieldForm, setShowFieldForm] = useState(false)

  const handleAddField = (field: Omit<FormField, "id">) => {
    setFormFields([...formFields, { ...field, id: uuidv4() }])
    setShowFieldForm(false)
  }

  const handleDeleteField = (fieldId: string) => {
    setFormFields(formFields.filter((f) => f.id !== fieldId))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      description,
      formFields,
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 darkx:text-gray-300 mb-2">Step Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Employee Information"
          className="w-full px-3 py-2 bg-white darkx:bg-gray-800 border border-gray-200 darkx:border-gray-700 rounded-lg text-gray-900 darkx:text-white placeholder-gray-500 darkx:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 darkx:focus:ring-brand-400"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 darkx:text-gray-300 mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description..."
          rows={2}
          className="w-full px-3 py-2 bg-white darkx:bg-gray-800 border border-gray-200 darkx:border-gray-700 rounded-lg text-gray-900 darkx:text-white placeholder-gray-500 darkx:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 darkx:focus:ring-brand-400 resize-none"
        />
      </div>

      {/* Form Fields */}
      <div>
        <div className="flex items-center justify-between mb-3 flex-col sm:flex-row gap-2">
          <label className="block text-sm font-medium text-gray-700 darkx:text-gray-300">Form Fields</label>
          {!showFieldForm && (
            <button
              type="button"
              onClick={() => setShowFieldForm(true)}
              className="text-brand-500 darkx:text-brand-400 hover:underline text-sm font-medium"
            >
              + Add Field
            </button>
          )}
        </div>

        {showFieldForm && (
          <div className="mb-3 p-3 bg-gray-50 darkx:bg-gray-900 rounded-lg border border-gray-200 darkx:border-gray-700">
            <FormFieldBuilder onAdd={handleAddField} onCancel={() => setShowFieldForm(false)} />
          </div>
        )}

        {formFields.length === 0 ? (
          <div className="py-4 text-center text-sm text-gray-500 darkx:text-gray-400 bg-gray-50 darkx:bg-gray-900/50 rounded-lg">
            No form fields added yet
          </div>
        ) : (
          <div className="space-y-2">
            {formFields.map((field) => (
              <div
                key={field.id}
                className="flex items-center justify-between p-3 bg-white darkx:bg-gray-800 rounded-lg border border-gray-200 darkx:border-gray-700"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 darkx:text-white">{field.label}</p>
                  <p className="text-xs text-gray-500 darkx:text-gray-400 capitalize">
                    {field.type} {field.required ? "(required)" : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteField(field.id)}
                  className="p-1 text-error-500 darkx:text-error-400 hover:bg-error-50 darkx:hover:bg-error-500/10 rounded transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-4 flex-col sm:flex-row">
        <button
          onClick={handleSubmit}
          className="flex-1 px-4 py-2 bg-success-500 text-white rounded-lg hover:bg-success-600 darkx:hover:bg-success-400 transition-colors font-medium text-sm"
        >
          {step ? "Update Step" : "Add Step"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 bg-gray-300 darkx:bg-gray-700 text-gray-800 darkx:text-gray-200 rounded-lg hover:bg-gray-400 darkx:hover:bg-gray-600 transition-colors font-medium text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}