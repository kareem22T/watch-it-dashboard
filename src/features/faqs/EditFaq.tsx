"use client"

import { useDispatch, useSelector } from "react-redux"
import { updateFaq } from "../../store/faqsSlice"
import type { RootState } from "../../store/store"
import FaqForm from "./components/faq-form"
import type { Faq } from "../../store/faqsSlice"
import { useNavigate, useParams } from "react-router"

export default function EditFaqPage() {
  const params = useParams()
  const router = useNavigate()
  const dispatch = useDispatch()
  const faqId = params.id as string

  const faq = useSelector((state: RootState) => state.faqs.faqs.find((f) => f.id === faqId))

  if (!faq) {
    return (
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 darkx:text-white mb-2">FAQ not found</h1>
        </div>
      </main>
    )
  }

  const handleSubmit = (data: Partial<Faq>) => {
    const updatedFaq: Faq = {
      ...faq,
      ...data,
      updatedAt: new Date().toISOString(),
    }

    dispatch(updateFaq(updatedFaq))
    router("/faqs/faqs-list")
  }

  return (
    <main className="min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 darkx:text-white mb-2">Edit FAQ</h1>
          <p className="text-gray-600 darkx:text-gray-400 text-sm sm:text-base">Update question and answer</p>
        </div>

        <FaqForm initialData={faq} onSubmit={handleSubmit} />
      </div>
    </main>
  )
}
