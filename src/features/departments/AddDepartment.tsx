"use client"
import { useDispatch } from "react-redux"
import { addDepartment } from "../../store/departmentsSlice"
import { v4 as uuidv4 } from "uuid"
import DepartmentForm from "./components/DepartmentForm"
import type { Department } from "../../store/departmentsSlice"
import { useNavigate } from "react-router"

export default function AddDepartmentPage() {
  const router = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (data: Partial<Department>) => {
    const newDepartment: Department = {
      id: uuidv4(),
      name: data.name || "",
      description: data.description || "",
      steps: data.steps || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    dispatch(addDepartment(newDepartment))
    router("/departments")
  }

  return (
    <main className="min-h-screen  py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 darkx:text-white mb-2">Create Department</h1>
          <p className="text-gray-600 darkx:text-gray-400 text-sm sm:text-base">
            Set up a new department with steps and workflow forms
          </p>
        </div>

        <DepartmentForm onSubmit={handleSubmit} />
      </div>
    </main>
  )
}
