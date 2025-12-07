"use client"

import type React from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../../../store/store"
import type { Faq } from "../../../store/faqsSlice"
import RichTextEditor from "../../../components/html-editor"

interface FaqFormProps {
  initialData?: Faq
  onSubmit: (data: Partial<Faq>) => void
}

export default function FaqForm({ initialData, onSubmit }: FaqFormProps) {
  const categories = useSelector((state: RootState) => state.faqs.categories)
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || categories[0]?.id || "")
  const [question, setQuestion] = useState(initialData?.question || "")
  const [answer, setAnswer] = useState(initialData?.answer || "")
  const [order, setOrder] = useState(initialData?.order || 1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      categoryId,
      question,
      answer,
      order,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white darkx:bg-gray-800 border border-gray-200 darkx:border-gray-700 rounded-xl p-6 sm:p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 darkx:text-gray-300 mb-2">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-4 py-3 bg-white darkx:bg-gray-900 border border-gray-200 darkx:border-gray-700 rounded-lg text-gray-900 darkx:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 darkx:focus:ring-brand-400"
            required
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 darkx:text-gray-300 mb-2">Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter the question..."
            className="w-full px-4 py-3 bg-white darkx:bg-gray-900 border border-gray-200 darkx:border-gray-700 rounded-lg text-gray-900 darkx:text-white placeholder-gray-500 darkx:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 darkx:focus:ring-brand-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 darkx:text-gray-300 mb-2">Answer</label>
          <RichTextEditor value={answer} onChange={setAnswer} />
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
            {initialData ? "Update FAQ" : "Create FAQ"}
          </button>
        </div>
      </div>
    </form>
  )
}
