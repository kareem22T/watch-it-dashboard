import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface FaqCategory {
  id: string
  title: string
  description?: string
  iconImage?: string
  order: number
  createdAt: string
  updatedAt: string
}

export interface Faq {
  id: string
  categoryId: string
  question: string
  answer: string
  order: number
  createdAt: string
  updatedAt: string
}

interface FaqsState {
  categories: FaqCategory[]
  faqs: Faq[]
  selectedCategories: Set<string>
  loading: boolean
  error: string | null
}

const initialState: FaqsState = {
  categories: [
    {
      id: "general",
      title: "General",
      description: "General questions and information",
      iconImage: "/help-circle-icon.jpg",
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "technical",
      title: "Technical Support",
      description: "Technical issues and troubleshooting",
      iconImage: "/settings-icon.png",
      order: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "billing",
      title: "Billing & Payments",
      description: "Billing and payment related questions",
      iconImage: "/lightning-bolt-icon.png",
      order: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  faqs: [
    {
      id: "faq-1",
      categoryId: "general",
      question: "What is this service?",
      answer:
        "<p>This is a comprehensive FAQ management system that allows you to organize and manage frequently asked questions.</p>",
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "faq-2",
      categoryId: "general",
      question: "How do I get started?",
      answer:
        "<p>You can start by creating FAQ categories and then adding questions and answers to them. Use the HTML editor to format your answers.</p>",
      order: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "faq-3",
      categoryId: "technical",
      question: "How do I use the HTML editor?",
      answer:
        "<p>The HTML editor supports various formatting options:</p><ul><li><strong>Bold</strong> text</li><li><em>Italic</em> text</li><li>Headings (H3)</li><li>Lists</li><li>Links</li></ul>",
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  selectedCategories: new Set(),
  loading: false,
  error: null,
}

const faqsSlice = createSlice({
  name: "faqs",
  initialState,
  reducers: {
    // Category actions
    addCategory: (state, action: PayloadAction<FaqCategory>) => {
      state.categories.push(action.payload)
    },
    updateCategory: (state, action: PayloadAction<FaqCategory>) => {
      const index = state.categories.findIndex((c) => c.id === action.payload.id)
      if (index !== -1) {
        state.categories[index] = action.payload
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter((c) => c.id !== action.payload)
      // Also delete all FAQs in this category
      state.faqs = state.faqs.filter((f) => f.categoryId !== action.payload)
    },
    deleteMultipleCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = state.categories.filter((c) => !action.payload.includes(c.id))
      // Also delete all FAQs in these categories
      state.faqs = state.faqs.filter((f) => !action.payload.includes(f.categoryId))
    },
    toggleCategorySelection: (state, action: PayloadAction<string>) => {
      const newSet = new Set(state.selectedCategories)
      if (newSet.has(action.payload)) {
        newSet.delete(action.payload)
      } else {
        newSet.add(action.payload)
      }
      state.selectedCategories = newSet
    },
    selectAllCategories: (state) => {
      state.selectedCategories = new Set(state.categories.map((c) => c.id))
    },
    clearCategorySelection: (state) => {
      state.selectedCategories = new Set()
    },

    // FAQ actions
    addFaq: (state, action: PayloadAction<Faq>) => {
      state.faqs.push(action.payload)
    },
    updateFaq: (state, action: PayloadAction<Faq>) => {
      const index = state.faqs.findIndex((f) => f.id === action.payload.id)
      if (index !== -1) {
        state.faqs[index] = action.payload
      }
    },
    deleteFaq: (state, action: PayloadAction<string>) => {
      state.faqs = state.faqs.filter((f) => f.id !== action.payload)
    },
    deleteMultipleFaqs: (state, action: PayloadAction<string[]>) => {
      state.faqs = state.faqs.filter((f) => !action.payload.includes(f.id))
    },
  },
})

export const {
  addCategory,
  updateCategory,
  deleteCategory,
  deleteMultipleCategories,
  toggleCategorySelection,
  selectAllCategories,
  clearCategorySelection,
  addFaq,
  updateFaq,
  deleteFaq,
  deleteMultipleFaqs,
} = faqsSlice.actions

export default faqsSlice.reducer
