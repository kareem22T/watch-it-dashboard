"use client"

import { useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import { BarChartOne } from "./components/charts/bar-chart-one"
import { LineChartOne } from "./components/charts/line-chart-one"
import { DepartmentsChart } from "./components/charts/departments-chart"
import { Users, CheckCircle, TrendingUp, Clock, Target, MessageSquare, Star } from "lucide-react"
import { Link } from "react-router"

export default function DashboardHome() {
  const applications = useSelector((state: RootState) => state.applications.applications)
  const messages = useSelector((state: RootState) => state.contactMessages.messages)
  const users = useSelector((state: RootState) => state.users.individuals)
  const companies = useSelector((state: RootState) => state.users.companies)

  // Calculate statistics
  const totalUsers = users.length + companies.length
  const completeProfiles = users.filter((u) => u.portfolio).length + companies.filter((c) => c.portfolio).length
  const incompleteProfiles = totalUsers - completeProfiles
  const approvedApps = applications.filter((a) => a.status === "approved").length
  const pendingApps = applications.filter((a) => a.status === "pending").length
  const rejectedApps = applications.filter((a) => a.status === "rejected").length
  const topRatedApps = applications.filter((a) => a.rating && a.rating >= 4).length
  const lastMessages = messages.slice(-5).reverse()

  // Get top departments
  const departmentCounts = applications.reduce(
    (acc, app) => {
      acc[app.departmentName] = (acc[app.departmentName] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Last 10 applications
  const lastApplications = applications
    .slice(0, 10)

  const topRatedApplications = applications
    .filter((a) => a.rating && a.rating > 0)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5)

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600">Welcome back! Here is your platform overview.</p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Stat Card 1 */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{totalUsers}</p>
                <p className="text-xs text-slate-500 mt-2">{completeProfiles} completed profiles</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Profile Completion</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {totalUsers > 0 ? Math.round((completeProfiles / totalUsers) * 100) : 0}%
                </p>
                <p className="text-xs text-slate-500 mt-2">{incompleteProfiles} incomplete</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Applications</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{applications.length}</p>
                <p className="text-xs text-slate-500 mt-2">{approvedApps} approved</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Stat Card 4 */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Approved</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{approvedApps}</p>
                <p className="text-xs text-slate-500 mt-2">
                  {applications.length > 0 ? ((approvedApps / applications.length) * 100).toFixed(0) : 0}% approval
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Stat Card 5 */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">In Review</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{pendingApps}</p>
                <p className="text-xs text-slate-500 mt-2">{rejectedApps} rejected</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>

          {/* Stat Card 6 */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Top Rated</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{topRatedApps}</p>
                <p className="text-xs text-slate-500 mt-2">
                  {applications.length > 0 ? ((topRatedApps / applications.length) * 100).toFixed(0) : 0}% of total
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Target className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Departments Chart */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900">Applications by Department</h3>
              <p className="text-sm text-slate-600 mt-1">Distribution across departments</p>
            </div>
            <DepartmentsChart departmentCounts={departmentCounts} />
          </div>

          {/* Activity Chart */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900">Platform Activity</h3>
              <p className="text-sm text-slate-600 mt-1">Monthly trends over the year</p>
            </div>
            <LineChartOne />
          </div>
        </div>

        {/* Overview Chart */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Application Status Overview</h3>
            <p className="text-sm text-slate-600 mt-1">Monthly application submissions and approvals</p>
          </div>
          <BarChartOne />
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Applications Table */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Recent Applications</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Completion
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lastApplications.map((app) => (
                    <tr key={app.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-900 font-medium">{app.userName}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{app.departmentName}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            app.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : app.status === "pending"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${app.completionPercentage}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium">{app.completionPercentage}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Rated Applications */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Rated Applications</h3>
              <div className="space-y-3">
                {topRatedApplications.map((app) => (
                  <div key={app.id} className="pb-3 border-b border-slate-200 last:border-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{app.userName}</p>
                    <p className="text-xs text-slate-500 mt-1">{app.departmentName}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {Array.from({ length: app.rating || 0 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Messages</h3>
              <div className="space-y-3">
                {lastMessages.map((msg, idx) => (
                  <div key={idx} className="pb-3 border-b border-slate-200 last:border-0">
                    <p className="text-xs font-semibold text-slate-600">
                      {msg.firstName} {msg.lastName}
                    </p>
                    <p className="text-sm text-slate-700 mt-1 line-clamp-2">{msg.subject}</p>
                    <p className="text-xs text-slate-500 mt-1">{msg.email}</p>
                  </div>
                ))}
                <Link
                  to="/contact-messages"
                  className="inline-block text-xs font-semibold text-brand-600 hover:text-brand-700 mt-3"
                >
                  View all messages →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
