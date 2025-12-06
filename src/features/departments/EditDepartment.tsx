"use client"

import { useDispatch, useSelector } from "react-redux"
import { updateDepartment } from "../../store/departmentsSlice"
import type { RootState } from "../../store/store"
import DepartmentForm from "./components/DepartmentForm"
import type { Department } from "../../store/departmentsSlice"
import { useNavigate, useParams } from "react-router"

export default function EditDepartmentPage() {
  const params = useParams()
  const router = useNavigate()
  const dispatch = useDispatch()
  const departmentId = params.id as string

  const department = useSelector((state: RootState) => state.departments.departments.find((d) => d.id === departmentId))

  if (!department) {
    return (
      <main className="min-h-screen  py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 darkx:text-white mb-2">Department not found</h1>
        </div>
      </main>
    )
  }

  const handleSubmit = (data: Partial<Department>) => {
    const updatedDepartment: Department = {
      ...department,
      ...data,
      updatedAt: new Date().toISOString(),
    }

    dispatch(updateDepartment(updatedDepartment))
    router("/departments")
  }

  return (
    <main className="min-h-screen  py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 darkx:text-white mb-2">Edit Department</h1>
          <p className="text-gray-600 darkx:text-gray-400 text-sm sm:text-base">
            Update department details and manage workflow steps
          </p>
        </div>

        <DepartmentForm initialData={department} onSubmit={handleSubmit} />
      </div>
    </main>
  )
}
