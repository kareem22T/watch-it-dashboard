"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import {
  deleteApplication,
  deleteMultipleApplications,
  toggleApplicationSelection,
  selectAllApplications,
  clearSelection,
  updateApplicationStatus,
} from "../../store/applicationsSlice"
import ApplicationsTable from "./components/ApplicationsTable"
import BulkApplicationActionBar from "./components/BulkApplicationActionBar"
import { useNavigate } from "react-router"

export default function ApplicationsPage() {
  const dispatch = useDispatch()
  const router = useNavigate()
  const applications = useSelector((state: RootState) => state.applications.applications)
  const selectedApplications = useSelector((state: RootState) => state.applications.selectedApplications)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredApplications = applications.filter(
    (app) =>
      app.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.departmentName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelectAll = () => {
    if (selectedApplications.size === applications.length) {
      dispatch(clearSelection())
    } else {
      dispatch(selectAllApplications())
    }
  }

  const handleToggleSelect = (id: string) => {
    dispatch(toggleApplicationSelection(id))
  }

  const handleBulkDelete = () => {
    const idsToDelete = Array.from(selectedApplications)
    dispatch(deleteMultipleApplications(idsToDelete))
    dispatch(clearSelection())
  }

  const handleDelete = (id: string) => {
    dispatch(deleteApplication(id))
  }

  const handleBulkStatusChange = (status: "approved" | "rejected" | "pending") => {
    Array.from(selectedApplications).forEach((id) => {
      dispatch(updateApplicationStatus({ id, status }))
    })
    dispatch(clearSelection())
  }

  return (
    <main className="min-h-screen ">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-auto">
              <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 darkx:text-white mb-2">Applications</h1>
              <p className="text-gray-600 darkx:text-gray-400 text-sm sm:text-base">
                Review and manage all department applications
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by user or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-white darkx:bg-gray-800 border border-gray-200 darkx:border-gray-700 rounded-lg text-gray-900 darkx:text-white placeholder-gray-500 darkx:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 darkx:focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Bulk Action Bar */}
        {selectedApplications.size > 0 && (
          <BulkApplicationActionBar
            selectedCount={selectedApplications.size}
            totalCount={applications.length}
            onSelectAll={handleSelectAll}
            onDelete={handleBulkDelete}
            onApprove={() => handleBulkStatusChange("approved")}
            onReject={() => handleBulkStatusChange("rejected")}
            onPending={() => handleBulkStatusChange("pending")}
            onClearSelection={() => dispatch(clearSelection())}
          />
        )}

        {/* Table */}
        <ApplicationsTable
          applications={filteredApplications}
          selectedApplications={selectedApplications}
          onSelectAll={handleSelectAll}
          onToggleSelect={handleToggleSelect}
          onDelete={handleDelete}
          onView={(id) => {
            router(`/applications/${id}`)
          }}
        />
      </div>
    </main>
  )
}
