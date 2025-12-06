"use client"

import { useState } from "react"
import {Link} from "react-router"
import { useDispatch, useSelector } from "react-redux"
import {
  deleteDepartment,
  deleteMultipleDepartments,
  toggleDepartmentSelection,
  selectAllDepartments,
  clearSelection,
} from "../../store/departmentsSlice"
import type { RootState } from "../../store/store"
import DepartmentsTable from "./components/DepartmentsTable"
import BulkActionBar from "./components/BulkActionBar"

export default function DepartmentsPage() {
  const dispatch = useDispatch()
  const departments = useSelector((state: RootState) => state.departments.departments)
  const selectedDepartments = useSelector((state: RootState) => state.departments.selectedDepartments)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDepartments = departments.filter((dept) => dept.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSelectAll = () => {
    if (selectedDepartments.size === departments.length) {
      dispatch(clearSelection())
    } else {
      dispatch(selectAllDepartments())
    }
  }

  const handleToggleSelect = (id: string) => {
    dispatch(toggleDepartmentSelection(id))
  }

  const handleBulkDelete = () => {
    const idsToDelete = Array.from(selectedDepartments)
    dispatch(deleteMultipleDepartments(idsToDelete))
    dispatch(clearSelection())
  }

  const handleDelete = (id: string) => {
    dispatch(deleteDepartment(id))
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-auto">
              <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 darkx:text-white mb-2">Departments</h1>
              <p className="text-gray-600 darkx:text-gray-400 text-sm sm:text-base">
                Manage your organization's departments and workflows
              </p>
            </div>
            <Link
              to="/departments/add"
              className="w-full sm:w-auto px-6 py-3 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 darkx:hover:bg-brand-400 transition-colors text-center"
            >
              + New Department
            </Link>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-white darkx:bg-gray-800 border border-gray-200 darkx:border-gray-700 rounded-lg text-gray-900 darkx:text-white placeholder-gray-500 darkx:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 darkx:focus:ring-brand-400"
            />
          </div>
        </div>

        {/* Bulk Action Bar */}
        {selectedDepartments.size > 0 && (
          <BulkActionBar
            selectedCount={selectedDepartments.size}
            totalCount={departments.length}
            onSelectAll={handleSelectAll}
            onDelete={handleBulkDelete}
            onClearSelection={() => dispatch(clearSelection())}
          />
        )}

        {/* Table */}
        <DepartmentsTable
          departments={filteredDepartments}
          selectedDepartments={selectedDepartments}
          onSelectAll={handleSelectAll}
          onToggleSelect={handleToggleSelect}
          onDelete={handleDelete}
          allSelected={selectedDepartments.size === departments.length}
        />
      </div>
    </main>
  )
}
