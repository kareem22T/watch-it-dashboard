"use client"

import { useDispatch } from "react-redux"
import { addCategory } from "../../../../store/faqsSlice"
import { v4 as uuidv4 } from "uuid"
import CategoryForm from "../components/category-form"
import type { FaqCategory } from "../../../../store/faqsSlice"
import { useNavigate } from "react-router"

export default function AddCategoryPage() {
  const router = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (data: Partial<FaqCategory>) => {
    const newCategory: FaqCategory = {
      id: uuidv4(),
      title: data.title || "",
      description: data.description || "",
      iconImage: data.iconImage || "HelpCircle",
      order: data.order || 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    dispatch(addCategory(newCategory))
    router("/faqs")
  }

  return (
    <main className="min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 darkx:text-white mb-2">Create FAQ Category</h1>
          <p className="text-gray-600 darkx:text-gray-400 text-sm sm:text-base">
            Add a new FAQ category with icon and description
          </p>
        </div>

        <CategoryForm onSubmit={handleSubmit} />
      </div>
    </main>
  )
}
