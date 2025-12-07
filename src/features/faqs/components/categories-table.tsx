"use client"

import { Link } from "react-router"
import type { FaqCategory } from "../../../store/faqsSlice"
import { Trash2, Edit } from "lucide-react"

interface CategoriesTableProps {
  categories: FaqCategory[]
  selectedCategories: Set<string>
  onSelectAll: () => void
  onToggleSelect: (id: string) => void
  onDelete: (id: string) => void
  allSelected: boolean
}

export default function CategoriesTable({
  categories,
  selectedCategories,
  onSelectAll,
  onToggleSelect,
  onDelete,
  allSelected,
}: CategoriesTableProps) {
  return (
    <div className="border border-gray-200 darkx:border-gray-700 rounded-xl overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 darkx:bg-gray-900 border-b border-gray-200 darkx:border-gray-700">
          <tr>
            <th className="px-4 sm:px-6 py-4 text-left">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onSelectAll}
                className="w-5 h-5 rounded border-gray-300 darkx:border-gray-600 cursor-pointer accent-brand-500"
              />
            </th>
            <th className="px-4 sm:px-6 py-4 text-left font-semibold text-gray-900 darkx:text-white text-sm">
              Category
            </th>
            <th className="px-4 sm:px-6 py-4 text-left font-semibold text-gray-900 darkx:text-white text-sm hidden md:table-cell">
              Description
            </th>
            <th className="px-4 sm:px-6 py-4 text-left font-semibold text-gray-900 darkx:text-white text-sm hidden sm:table-cell">
              Icon
            </th>
            <th className="px-4 sm:px-6 py-4 text-left font-semibold text-gray-900 darkx:text-white text-sm hidden sm:table-cell">
              Created
            </th>
            <th className="px-4 sm:px-6 py-4 text-center font-semibold text-gray-900 darkx:text-white text-sm">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 darkx:divide-gray-700">
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-gray-50 darkx:hover:bg-gray-800/50 transition-colors">
              <td className="px-4 sm:px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedCategories.has(category.id)}
                  onChange={() => onToggleSelect(category.id)}
                  className="w-5 h-5 rounded border-gray-300 darkx:border-gray-600 cursor-pointer accent-brand-500"
                />
              </td>
              <td className="px-4 sm:px-6 py-4">
                <div className="font-semibold text-gray-900 darkx:text-white text-sm sm:text-base">{category.title}</div>
              </td>
              <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                <span className="text-gray-600 darkx:text-gray-400 text-sm">{category.description || "-"}</span>
              </td>
              <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                {category.iconImage ? (
                  <img
                    src={category.iconImage || "/placeholder.svg"}
                    alt={`${category.title} icon`}
                    className="w-10 h-10 rounded-lg object-cover darkx:border-gray-700"
                  />
                ) : (
                  <span className="text-gray-500 darkx:text-gray-400 text-sm">No icon</span>
                )}
              </td>
              <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                <span className="text-gray-600 darkx:text-gray-400 text-sm">
                  {new Date(category.createdAt).toLocaleDateString()}
                </span>
              </td>
              <td className="px-4 sm:px-6 py-4">
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <Link
                    to={`/faqs/categories/edit/${category.id}`}
                    className="p-2 text-green-600 darkx:text-green-400 hover:bg-green-50 darkx:hover:bg-green-500/10 rounded-lg transition-colors"
                  >
                    <Edit size={18} />
                  </Link>
                  <button
                    onClick={() => onDelete(category.id)}
                    className="p-2 text-red-600 darkx:text-red-400 hover:bg-red-50 darkx:hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {categories.length === 0 && (
        <div className="px-4 sm:px-6 py-12 text-center">
          <p className="text-gray-600 darkx:text-gray-400">No categories found</p>
        </div>
      )}
    </div>
  )
}
