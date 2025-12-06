"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import {
  updateHeroSection,
  updateContactInfo,
  setHomeFaqIds,
  setContactFaqIds,
  updateCookiePolicy,
  updateTermsOfService,
  updatePrivacyPolicy,
} from "../../store/siteContentSlice"
import RichTextEditor from "./../../components/html-editor"
import { Save, Upload, X } from "lucide-react"

export default function SiteContentSettings() {
  const dispatch = useDispatch()
  const siteContent = useSelector((state: RootState) => state.siteContent.content)
  const faqs = useSelector((state: RootState) => state.faqs.faqs)
  const categories = useSelector((state: RootState) => state.faqs.categories)
  const [activeTab, setActiveTab] = useState("home")
  const [isSaving, setIsSaving] = useState(false)

  const [homeFaqSearch, setHomeFaqSearch] = useState("")
  const [homeFaqCategory, setHomeFaqCategory] = useState("")
  const [contactFaqSearch, setContactFaqSearch] = useState("")
  const [contactFaqCategory, setContactFaqCategory] = useState("")
  const [heroImagePreview, setHeroImagePreview] = useState(siteContent.home.hero.image)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1000)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setHeroImagePreview(result)
        dispatch(updateHeroSection({ image: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const filteredHomeFaqs = faqs.filter((faq) => {
    const matchesCategory = !homeFaqCategory || faq.categoryId === homeFaqCategory
    const matchesSearch = faq.question.toLowerCase().includes(homeFaqSearch.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const filteredContactFaqs = faqs.filter((faq) => {
    const matchesCategory = !contactFaqCategory || faq.categoryId === contactFaqCategory
    const matchesSearch = faq.question.toLowerCase().includes(contactFaqSearch.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Site Content Settings</h1>
          <p className="text-gray-600">Manage your website's content and pages</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200 overflow-x-auto">
          {["home", "contact", "cookie", "terms", "privacy"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab
                  ? "border-brand-600 text-brand-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab === "home" && "Home Page"}
              {tab === "contact" && "Contact Us"}
              {tab === "cookie" && "Cookie Policy"}
              {tab === "terms" && "Terms of Service"}
              {tab === "privacy" && "Privacy Policy"}
            </button>
          ))}
        </div>

        {/* Home Page Tab */}
        {activeTab === "home" && (
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6 bg-white">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Hero Section</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hero Background Image</label>
                  <div className="flex gap-4 items-start">
                    <div className="flex-1">
                      <label className="flex items-center justify-center gap-2 px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-brand-500 hover:bg-brand-50 transition-colors">
                        <Upload className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700 font-medium">Click to upload image</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    </div>
                    {heroImagePreview && (
                      <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-200 relative group">
                        <img
                          src={heroImagePreview || "/placeholder.svg"}
                          alt="Hero preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => {
                            setHeroImagePreview("")
                            dispatch(updateHeroSection({ image: "" }))
                          }}
                          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hero Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
                  <input
                    type="text"
                    value={siteContent.home.hero.title}
                    onChange={(e) => dispatch(updateHeroSection({ title: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="Welcome to Our Website"
                  />
                </div>

                {/* Hero Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hero Description</label>
                  <textarea
                    value={siteContent.home.hero.description}
                    onChange={(e) => dispatch(updateHeroSection({ description: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-24"
                    placeholder="Describe your hero section..."
                  />
                </div>

                {/* Button Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                  <input
                    type="text"
                    value={siteContent.home.hero.buttonText}
                    onChange={(e) => dispatch(updateHeroSection({ buttonText: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="Get Started"
                  />
                </div>

                {/* Button Target */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Target (URL or anchor)</label>
                  <input
                    type="text"
                    value={siteContent.home.hero.buttonTarget}
                    onChange={(e) => dispatch(updateHeroSection({ buttonTarget: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="#features or https://example.com"
                  />
                </div>
              </div>
            </div>

            {/* FAQ Selection with Search and Filter */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured FAQs</h2>
              <p className="text-sm text-gray-600 mb-4">Select which FAQs to display on the home page</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search FAQs</label>
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={homeFaqSearch}
                    onChange={(e) => setHomeFaqSearch(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
                  <select
                    value={homeFaqCategory}
                    onChange={(e) => setHomeFaqCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
                {filteredHomeFaqs.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No FAQs found. Create FAQs first.</p>
                ) : (
                  filteredHomeFaqs.map((faq) => (
                    <label
                      key={faq.id}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-white cursor-pointer bg-white transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={siteContent.home.faqIds.includes(faq.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch(setHomeFaqIds([...siteContent.home.faqIds, faq.id]))
                          } else {
                            dispatch(setHomeFaqIds(siteContent.home.faqIds.filter((id) => id !== faq.id)))
                          }
                        }}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-gray-900 font-medium block truncate">{faq.question}</span>
                        <span className="text-xs text-gray-500">
                          {categories.find((c) => c.id === faq.categoryId)?.title}
                        </span>
                      </div>
                    </label>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Contact Page Tab */}
        {activeTab === "contact" && (
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6 bg-white">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>

              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={siteContent.contact.info.email}
                    onChange={(e) => dispatch(updateContactInfo({ email: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="contact@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={siteContent.contact.info.phone}
                    onChange={(e) => dispatch(updateContactInfo({ phone: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={siteContent.contact.info.location}
                    onChange={(e) => dispatch(updateContactInfo({ location: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="123 Main St, City, Country"
                  />
                </div>
              </div>
            </div>

            {/* FAQ Selection with Search and Filter */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured FAQs</h2>
              <p className="text-sm text-gray-600 mb-4">Select which FAQs to display on the contact page</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search FAQs</label>
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={contactFaqSearch}
                    onChange={(e) => setContactFaqSearch(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
                  <select
                    value={contactFaqCategory}
                    onChange={(e) => setContactFaqCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
                {filteredContactFaqs.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No FAQs found. Create FAQs first.</p>
                ) : (
                  filteredContactFaqs.map((faq) => (
                    <label
                      key={faq.id}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-white cursor-pointer bg-white transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={siteContent.contact.faqIds.includes(faq.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch(setContactFaqIds([...siteContent.contact.faqIds, faq.id]))
                          } else {
                            dispatch(setContactFaqIds(siteContent.contact.faqIds.filter((id) => id !== faq.id)))
                          }
                        }}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-gray-900 font-medium block truncate">{faq.question}</span>
                        <span className="text-xs text-gray-500">
                          {categories.find((c) => c.id === faq.categoryId)?.title}
                        </span>
                      </div>
                    </label>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Cookie Policy Tab */}
        {activeTab === "cookie" && (
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Cookie Policy</h2>
            <RichTextEditor
              value={siteContent.cookiePolicy}
              onChange={(value) => dispatch(updateCookiePolicy(value))}
            />
          </div>
        )}

        {/* Terms of Service Tab */}
        {activeTab === "terms" && (
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Terms of Service</h2>
            <RichTextEditor
              value={siteContent.termsOfService}
              onChange={(value) => dispatch(updateTermsOfService(value))}
            />
          </div>
        )}

        {/* Privacy Policy Tab */}
        {activeTab === "privacy" && (
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Privacy Policy</h2>
            <RichTextEditor
              value={siteContent.privacyPolicy}
              onChange={(value) => dispatch(updatePrivacyPolicy(value))}
            />
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors disabled:opacity-50"
            disabled={isSaving}
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </main>
  )
}
