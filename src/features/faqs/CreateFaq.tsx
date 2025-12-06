"use client"

import { useDispatch } from "react-redux"
import { addFaq } from "../../store/faqsSlice"
import { v4 as uuidv4 } from "uuid"
import FaqForm from "./components/faq-form"
import type { Faq } from "../../store/faqsSlice"
import { useNavigate } from "react-router"

export default function CreateFaqPage() {
  const router = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (data: Partial<Faq>) => {
    const newFaq: Faq = {
      id: uuidv4(),
      categoryId: data.categoryId || "",
      question: data.question || "",
      answer: data.answer || "",
      order: data.order || 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    dispatch(addFaq(newFaq))
    router("/faqs/faqs-list")
  }

  return (
    <main className="min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 darkx:text-white mb-2">Create FAQ</h1>
          <p className="text-gray-600 darkx:text-gray-400 text-sm sm:text-base">Add a new frequently asked question</p>
        </div>

        <FaqForm onSubmit={handleSubmit} />
      </div>
    </main>
  )
}
