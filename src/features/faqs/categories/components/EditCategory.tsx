"use client"

import { useDispatch, useSelector } from "react-redux"
import { updateCategory } from "../../../../store/faqsSlice"
import type { RootState } from "../../../../store/store"
import CategoryForm from "../components/category-form"
import type { FaqCategory } from "../../../../store/faqsSlice"
import { useNavigate, useParams } from "react-router"

export default function EditCategoryPage() {
  const params = useParams()
  const router = useNavigate()
  const dispatch = useDispatch()
  const categoryId = params.id as string

  const category = useSelector((state: RootState) => state.faqs.categories.find((c) => c.id === categoryId))

  if (!category) {
    return (
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 darkx:text-white mb-2">Category not found</h1>
        </div>
      </main>
    )
  }

  const handleSubmit = (data: Partial<FaqCategory>) => {
    const updatedCategory: FaqCategory = {
      ...category,
      ...data,
      updatedAt: new Date().toISOString(),
    }

    dispatch(updateCategory(updatedCategory))
    router("/faqs")
  }

  return (
    <main className="min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 darkx:text-white mb-2">Edit Category</h1>
          <p className="text-gray-600 darkx:text-gray-400 text-sm sm:text-base">Update category details and icon</p>
        </div>

        <CategoryForm initialData={category} onSubmit={handleSubmit} />
      </div>
    </main>
  )
}
