"use client"

import type React from "react"
import { useState } from "react"
import type { FaqCategory } from "../../../../store/faqsSlice"

interface CategoryFormProps {
  initialData?: FaqCategory
  onSubmit: (data: Partial<FaqCategory>) => void
}

export default function CategoryForm({ initialData, onSubmit }: CategoryFormProps) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [iconImage, setIconImage] = useState<File | null>(null)
  const [iconPreview, setIconPreview] = useState(initialData?.iconImage || "")
  const [order, setOrder] = useState(initialData?.order || 1)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIconImage(file)
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setIconPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      description,
      iconImage: iconPreview || initialData?.iconImage,
      order,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="bg-white darkx:bg-gray-800 border border-gray-200 darkx:border-gray-700 rounded-xl p-6 sm:p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 darkx:text-gray-300 mb-2">Category Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., General, Technical Support"
            className="w-full px-4 py-3 bg-white darkx:bg-gray-900 border border-gray-200 darkx:border-gray-700 rounded-lg text-gray-900 darkx:text-white placeholder-gray-500 darkx:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 darkx:focus:ring-brand-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 darkx:text-gray-300 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of this category..."
            rows={3}
            className="w-full px-4 py-3 bg-white darkx:bg-gray-900 border border-gray-200 darkx:border-gray-700 rounded-lg text-gray-900 darkx:text-white placeholder-gray-500 darkx:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 darkx:focus:ring-brand-400 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 darkx:text-gray-300 mb-2">Category Icon</label>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/png,image/jpeg,image/svg+xml"
                onChange={handleImageChange}
                className="flex-1 px-4 py-3 bg-white darkx:bg-gray-900 border border-gray-200 darkx:border-gray-700 rounded-lg text-gray-900 darkx:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 darkx:focus:ring-brand-400"
              />
            </div>
            {iconPreview && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 darkx:text-gray-400">Preview:</span>
                <img
                  src={iconPreview || "/placeholder.svg"}
                  alt="Icon preview"
                  className="w-12 h-12 rounded-lg object-cover border border-gray-200 darkx:border-gray-700"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 darkx:text-gray-300 mb-2">Display Order</label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            min="1"
            className="w-full px-4 py-3 bg-white darkx:bg-gray-900 border border-gray-200 darkx:border-gray-700 rounded-lg text-gray-900 darkx:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 darkx:focus:ring-brand-400"
          />
        </div>

        <div className="flex gap-4 justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 darkx:hover:bg-brand-400 transition-colors font-medium"
          >
            {initialData ? "Update Category" : "Create Category"}
          </button>
        </div>
      </div>
    </form>
  )
}
