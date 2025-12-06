"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../store/store"
import { useNavigate } from "react-router"
import { deleteFaq, updateFaq } from "../../store/faqsSlice"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import DraggableFaqCard from "./components/draggable-faq-card"

export default function FaqsListPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const categories = useSelector((state: RootState) => state.faqs.categories)
  const faqs = useSelector((state: RootState) => state.faqs.faqs)
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.id || "")
  const [searchTerm, setSearchTerm] = useState("")

  const sensors = useSensors(
    useSensor(PointerSensor, {
      distance: 8,
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const filteredFaqs = faqs
    .filter((faq) => {
      const matchesCategory = !selectedCategory || faq.categoryId === selectedCategory
      const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => a.order - b.order)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = filteredFaqs.findIndex((faq) => faq.id === active.id)
      const newIndex = filteredFaqs.findIndex((faq) => faq.id === over.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(filteredFaqs, oldIndex, newIndex)

        // Update order for moved FAQs
        newOrder.forEach((faq, index) => {
          if (faq.order !== index + 1) {
            dispatch(
              updateFaq({
                ...faq,
                order: index + 1,
              }),
            )
          }
        })
      }
    }
  }

  return (
    <main className="min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 darkx:text-white mb-2">FAQs</h1>
              <p className="text-gray-600 darkx:text-gray-400 text-sm sm:text-base">Manage frequently asked questions</p>
            </div>
            <button
              onClick={() => navigate("/faqs/create")}
              className="w-full sm:w-auto px-6 py-3 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 darkx:hover:bg-brand-400 transition-colors text-center"
            >
              + New FAQ
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 darkx:text-gray-300 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-white darkx:bg-gray-800 border border-gray-200 darkx:border-gray-700 rounded-lg text-gray-900 darkx:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 darkx:text-gray-300 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-white darkx:bg-gray-800 border border-gray-200 darkx:border-gray-700 rounded-lg text-gray-900 darkx:text-white placeholder-gray-500 darkx:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        </div>

        {/* FAQs List with Drag and Drop */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={filteredFaqs.map((f) => f.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {filteredFaqs.length === 0 ? (
                <div className="py-12 text-center text-gray-600 darkx:text-gray-400">
                  <p>No FAQs found</p>
                </div>
              ) : (
                filteredFaqs.map((faq) => (
                  <DraggableFaqCard
                    key={faq.id}
                    faq={faq}
                    onEdit={(id) => navigate(`/faqs/edit/${id}`)}
                    onDelete={(id) => dispatch(deleteFaq(id))}
                  />
                ))
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </main>
  )
}
