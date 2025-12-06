"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../store/store"
import { updateApplicationStatus, addApplicationRating } from "../../store/applicationsSlice"
import ApplicationRatingForm from "./components/ApplicationRatingForm"
import { Star, CheckCircle, XCircle, Clock, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useParams, Link } from "react-router"

export default function ApplicationDetailPage() {
  const params = useParams()
  const dispatch = useDispatch()
  const applicationId = params.id as string
  const applications = useSelector((state: RootState) => state.applications.applications)
  const application = applications.find((a) => a.id === applicationId)
  const [showRatingForm, setShowRatingForm] = useState(false)

  if (!application) {
    return (
      <main className="min-h-screen bg-white darkx:bg-gray-950 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 darkx:text-white mb-4">Application not found</h1>
          <Link to="/applications" className="text-blue-500 hover:underline">
            Back to Applications
          </Link>
        </div>
      </main>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle size={24} className="text-green-500 darkx:text-green-400" />
      case "rejected":
        return <XCircle size={24} className="text-red-500 darkx:text-red-400" />
      default:
        return <Clock size={24} className="text-yellow-500 darkx:text-yellow-400" />
    }
  }

  const handleStatusChange = (newStatus: "approved" | "rejected" | "pending") => {
    dispatch(updateApplicationStatus({ id: application.id, status: newStatus }))
  }

  const handleRatingSubmit = (rating: number, comment: string) => {
    dispatch(addApplicationRating({ id: application.id, rating, comment }))
    setShowRatingForm(false)
  }

  return (
    <main className="min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/applications"
          className="inline-flex items-center gap-2 text-brand-500 hover:text-brand-600 darkx:hover:text-brand-400 mb-6 font-medium"
        >
          <ArrowLeft size={18} />
          Back to Applications
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Application Header */}
            <div className="bg-white darkx:bg-gray-800 border border-gray-200 darkx:border-gray-700 rounded-xl p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-6 flex-col sm:flex-row">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 darkx:text-white mb-2">
                    {application.userName}
                  </h1>
                  <p className="text-gray-600 darkx:text-gray-400">{application.userId}</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 darkx:bg-gray-700">
                  {getStatusIcon(application.status)}
                  <span className="capitalize font-semibold text-gray-900 darkx:text-white">{application.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 darkx:text-gray-400 uppercase">Department</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 darkx:text-white mt-1">
                    {application.departmentName}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 darkx:text-gray-400 uppercase">Completion</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 darkx:text-white mt-1">
                    {Math.round(application.completionPercentage)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 darkx:text-gray-400 uppercase">Submitted</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 darkx:text-white mt-1">
                    {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Completion Progress */}
              <div className="mt-6 pt-6 border-t border-gray-200 darkx:border-gray-700">
                <p className="text-sm font-medium text-gray-700 darkx:text-gray-300 mb-3">Completion Progress</p>
                <div className="w-full h-3 bg-gray-200 darkx:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                    style={{ width: `${application.completionPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Application Steps */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 darkx:text-white">Application Steps</h2>
              {application.steps.map((step) => (
                <div
                  key={step.stepId}
                  className="bg-white darkx:bg-gray-800 border border-gray-200 darkx:border-gray-700 rounded-xl p-6 sm:p-8"
                >
                  <h3 className="text-lg font-semibold text-gray-900 darkx:text-white mb-4">{step.stepTitle}</h3>
                  <div className="space-y-3">
                    {Object.entries(step.formData).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex flex-col sm:flex-row gap-2 justify-between pb-3 border-b border-gray-200 darkx:border-gray-700 last:border-0"
                      >
                        <span className="font-medium text-gray-700 darkx:text-gray-300 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <span className="text-gray-600 darkx:text-gray-400">
                          {typeof value === "object" ? JSON.stringify(value) : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Actions */}
            <div className="bg-white darkx:bg-gray-800 border border-gray-200 darkx:border-gray-700 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 darkx:text-white mb-4">Update Status</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleStatusChange("approved")}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                    application.status === "approved"
                      ? "bg-green-100 darkx:bg-green-500/20 text-green-700 darkx:text-green-400"
                      : "bg-gray-100 darkx:bg-gray-700 text-gray-700 darkx:text-gray-300 hover:bg-gray-200 darkx:hover:bg-gray-600"
                  }`}
                >
                  <CheckCircle size={16} />
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange("rejected")}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                    application.status === "rejected"
                      ? "bg-red-100 darkx:bg-red-500/20 text-red-700 darkx:text-red-400"
                      : "bg-gray-100 darkx:bg-gray-700 text-gray-700 darkx:text-gray-300 hover:bg-gray-200 darkx:hover:bg-gray-600"
                  }`}
                >
                  <XCircle size={16} />
                  Reject
                </button>
                <button
                  onClick={() => handleStatusChange("pending")}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                    application.status === "pending"
                      ? "bg-yellow-100 darkx:bg-yellow-500/20 text-yellow-700 darkx:text-yellow-400"
                      : "bg-gray-100 darkx:bg-gray-700 text-gray-700 darkx:text-gray-300 hover:bg-gray-200 darkx:hover:bg-gray-600"
                  }`}
                >
                  <Clock size={16} />
                  Pending
                </button>
              </div>
            </div>

            {/* Rating Section */}
            <div className="bg-white darkx:bg-gray-800 border border-gray-200 darkx:border-gray-700 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 darkx:text-white mb-4">Rating</h3>

              {application.rating ? (
                <div className="space-y-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={
                          i < application.rating!
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 darkx:text-gray-600"
                        }
                      />
                    ))}
                  </div>
                  {application.ratingComment && (
                    <p className="text-sm text-gray-600 darkx:text-gray-400">{application.ratingComment}</p>
                  )}
                  <button
                    onClick={() => setShowRatingForm(!showRatingForm)}
                    className="w-full px-4 py-2 text-blue-500 hover:bg-blue-50 darkx:hover:bg-blue-500/10 rounded-lg transition-colors font-medium text-sm"
                  >
                    Edit Rating
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowRatingForm(!showRatingForm)}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 darkx:hover:bg-blue-400 transition-colors font-medium"
                >
                  Add Rating
                </button>
              )}

              {showRatingForm && (
                <div className="mt-4 pt-4 border-t border-gray-200 darkx:border-gray-700">
                  <ApplicationRatingForm
                    currentRating={application.rating}
                    currentComment={application.ratingComment}
                    onSubmit={handleRatingSubmit}
                    onCancel={() => setShowRatingForm(false)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
