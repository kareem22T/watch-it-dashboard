"use client"

import { useState } from "react"
import { IndividualUsersList } from "./components/individual-users-list"
import { CompanyUsersList } from "./components/company-users-list"

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState("individual")

  return (
    <main className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Users Management</h1>
          <p className="text-gray-600">View and manage individual and company users</p>
        </div>

        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("individual")}
            className={`px-6 py-3 font-medium transition-all border-b-2 ${
              activeTab === "individual"
                ? "border-brand-600 text-brand-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Individual Users
          </button>
          <button
            onClick={() => setActiveTab("company")}
            className={`px-6 py-3 font-medium transition-all border-b-2 ${
              activeTab === "company"
                ? "border-brand-600 text-brand-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Company Users
          </button>
        </div>

        {activeTab === "individual" && <IndividualUsersList />}
        {activeTab === "company" && <CompanyUsersList />}
      </div>
    </main>
  )
}
