"use client"

import { useState } from "react"
import { Link } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import {
  deleteCategory,
  deleteMultipleCategories,
  toggleCategorySelection,
  selectAllCategories,
  clearCategorySelection,
} from "../../store/faqsSlice"
import type { RootState } from "../../store/store"
import CategoriesTable from "./components/categories-table"
import BulkActionBar from "./components/bulk-action-bar"

export default function FaqsPage() {
  const dispatch = useDispatch()
  const categories = useSelector((state: RootState) => state.faqs.categories)
  const selectedCategories = useSelector((state: RootState) => state.faqs.selectedCategories)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCategories = categories.filter((cat) => cat.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSelectAll = () => {
    if (selectedCategories.size === categories.length) {
      dispatch(clearCategorySelection())
    } else {
      dispatch(selectAllCategories())
    }
  }

  const handleToggleSelect = (id: string) => {
    dispatch(toggleCategorySelection(id))
  }

  const handleBulkDelete = () => {
    const idsToDelete = Array.from(selectedCategories)
    dispatch(deleteMultipleCategories(idsToDelete))
    dispatch(clearCategorySelection())
  }

  const handleDelete = (id: string) => {
    dispatch(deleteCategory(id))
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-auto">
              <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 darkx:text-white mb-2">FAQ Categories</h1>
              <p className="text-gray-600 darkx:text-gray-400 text-sm sm:text-base">
                Manage your FAQ categories and questions
              </p>
            </div>
            <Link
              to="/faqs/categories/add"
              className="w-full sm:w-auto px-6 py-3 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 darkx:hover:bg-brand-400 transition-colors text-center"
            >
              + New Category
            </Link>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-white darkx:bg-gray-800 border border-gray-200 darkx:border-gray-700 rounded-lg text-gray-900 darkx:text-white placeholder-gray-500 darkx:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 darkx:focus:ring-brand-400"
            />
          </div>
        </div>

        {/* Bulk Action Bar */}
        {selectedCategories.size > 0 && (
          <BulkActionBar
            selectedCount={selectedCategories.size}
            totalCount={categories.length}
            onSelectAll={handleSelectAll}
            onDelete={handleBulkDelete}
            onClearSelection={() => dispatch(clearCategorySelection())}
          />
        )}

        {/* Table */}
        <CategoriesTable
          categories={filteredCategories}
          selectedCategories={selectedCategories}
          onSelectAll={handleSelectAll}
          onToggleSelect={handleToggleSelect}
          onDelete={handleDelete}
          allSelected={selectedCategories.size === categories.length}
        />
      </div>
    </main>
  )
}
