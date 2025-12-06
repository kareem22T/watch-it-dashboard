"use client"

import { useState, useMemo } from "react"
import { Link } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../../store/store"
import {
  toggleCompanySelection,
  selectAllCompanies,
  clearCompanySelection,
  deleteCompanyUsers,
} from "../../../store/usersSlice"
import { BulkActionBar } from "./bulk-action-bar"
import { Eye } from "lucide-react"

export function CompanyUsersList() {
  const dispatch = useDispatch()
  const companies = useSelector((state: RootState) => state.users.companies)
  const selected = useSelector((state: RootState) => state.users.selectedCompanies)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = useMemo(() => {
    return companies.filter(
      (user) =>
        user.legalCompanyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.pocName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.city.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [companies, searchTerm])

  const calculateProfileComplete = (user: any) => {
    let completed = 0
    const total = 9

    if (user.legalCompanyName) completed++
    if (user.pocName) completed++
    if (user.pocEmail) completed++
    if (user.pocPhone) completed++
    if (user.email) completed++
    if (user.phone) completed++
    if (user.city) completed++
    if (user.taxNumber) completed++
    if (user.documents.length > 0) completed++

    return Math.round((completed / total) * 100)
  }

  const allSelected = selected.length === filteredUsers.length && filteredUsers.length > 0

  const handleSelectAll = () => {
    if (allSelected) {
      dispatch(clearCompanySelection())
    } else {
      dispatch(selectAllCompanies())
    }
  }

  const handleDelete = () => {
    if (selected.length > 0) {
      dispatch(deleteCompanyUsers(selected))
    }
  }

  return (
    <div className="space-y-4">
      {selected.length > 0 && (
        <BulkActionBar
          count={selected.length}
          onDelete={handleDelete}
          onClear={() => dispatch(clearCompanySelection())}
        />
      )}

      <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
        <input
          type="text"
          placeholder="Search by company name, contact, or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="w-12 px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                    className="w-4 h-4 cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Company Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">City</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Profile Complete</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    No companies found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(user.id)}
                        onChange={() => dispatch(toggleCompanySelection(user.id))}
                        className="w-4 h-4 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{user.legalCompanyName}</td>
                    <td className="px-4 py-3 text-gray-600">{user.email}</td>
                    <td className="px-4 py-3 text-gray-600">{user.phone}</td>
                    <td className="px-4 py-3 text-gray-600">{user.city}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 transition-all"
                            style={{ width: `${calculateProfileComplete(user)}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{calculateProfileComplete(user)}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link to={`/users/profile/${user.id}`}>
                        <button className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
