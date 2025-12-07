"use client"

import { useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import { BarChartOne } from "./components/charts/bar-chart-one"
import { LineChartOne } from "./components/charts/line-chart-one"
import { DepartmentsChart } from "./components/charts/departments-chart"
import { Users, Globe, TrendingUp, Building2, CheckCircle, Clock, Target, MessageSquare, Star, StopCircleIcon, BanIcon } from "lucide-react"
import { Link } from "react-router"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"


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

  const languageVisitsData = [
  { language: "English", visits: 1245, percentage: 65 },
  { language: "Arabic", visits: 675, percentage: 35 },
]

// Campaign/UTM source data
const campaignData = [
  { source: "Google", visits: 450, conversions: 32 },
  { source: "Facebook", visits: 380, conversions: 28 },
  { source: "LinkedIn", visits: 290, conversions: 22 },
  { source: "Twitter", visits: 185, conversions: 14 },
  { source: "Direct", visits: 415, conversions: 31 },
]

// Last registered users
const lastRegisteredUsers = [
  { id: 1, name: "Ahmed Hassan", email: "ahmed.hassan@example.com", role: "Editor", registeredAt: "2024-12-05" },
  { id: 2, name: "Sarah Smith", email: "sarah.smith@example.com", role: "Director", registeredAt: "2024-12-04" },
  { id: 3, name: "John Doe", email: "john.doe@example.com", role: "Cinematographer", registeredAt: "2024-12-03" },
  { id: 4, name: "Emma Wilson", email: "emma.wilson@example.com", role: "Producer", registeredAt: "2024-12-02" },
  { id: 5, name: "Michael Chen", email: "michael.chen@example.com", role: "Editor", registeredAt: "2024-12-01" },
]

// Last registered companies
const lastRegisteredCompanies = [
  {
    id: 1,
    name: "Creative Studios Inc.",
    poc: "Emma Johnson",
    email: "emma@creativestudios.com",
    registeredAt: "2024-12-05",
  },
  {
    id: 2,
    name: "MediaPro Productions Ltd.",
    poc: "Michael Chen",
    email: "michael@mediapro.com",
    registeredAt: "2024-12-03",
  },
  {
    id: 3,
    name: "Digital Innovations Co.",
    poc: "Lisa Anderson",
    email: "lisa@digitalinnovations.com",
    registeredAt: "2024-11-28",
  },
  { id: 4, name: "NextGen Studios", poc: "David Brown", email: "david@nextgenstudios.com", registeredAt: "2024-11-25" },
]

const COLORS = ["#DBA21A", "#64748b"]


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
                <p className="text-slate-600 text-sm font-medium">Rejected Applications</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{topRatedApps}</p>
                <p className="text-xs text-slate-500 mt-2">
                  {applications.length > 0 ? ((topRatedApps / applications.length) * 100).toFixed(0) : 0}% of total
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <BanIcon className="w-5 h-5 text-red-600" />
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
              <p className="text-sm text-slate-600 mt-1">Monthly visits over the year</p>
            </div>
            <LineChartOne />
          </div>
        </div>
        
                {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Language Visits Chart */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Visits by Language</h3>
              <p className="text-sm text-muted-foreground mt-1">English vs Arabic visitor distribution</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={languageVisitsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ payload }) => `${payload.language} (${payload.percentage}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="visits"
                >
                  {languageVisitsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Campaign/UTM Source Visits Chart */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Traffic by Source</h3>
              <p className="text-sm text-muted-foreground mt-1">Campaign and UTM tracking analysis</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={campaignData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="source" type="category" stroke="#64748b" width={90} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="visits" fill="#DBA21A" radius={[0, 8, 8, 0]} />
                <Bar dataKey="conversions" fill="#10b981" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Users and Companies Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Last Registered Users */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="border-b border-border px-6 py-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Last Registered Users
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Recently joined members</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-accent">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {lastRegisteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-foreground font-medium">
                        <div>
                          <p>{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{user.role}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{user.registeredAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Last Registered Companies */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="border-b border-border px-6 py-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Building2 className="w-5 h-5 text-green-600" />
                Last Registered Companies
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Recently joined organizations</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-accent">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">POC</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {lastRegisteredCompanies.map((company) => (
                    <tr key={company.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-foreground font-medium">
                        <div>
                          <p>{company.name}</p>
                          <p className="text-xs text-muted-foreground">{company.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{company.poc}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{company.registeredAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Additional Analytics */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">Campaign Performance Trends</h3>
            <p className="text-sm text-muted-foreground mt-1">Weekly visits across all traffic sources</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={campaignData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="source" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="visits" stroke="#DBA21A" strokeWidth={3} dot={{ fill: "#DBA21A", r: 6 }} />
              <Line
                type="monotone"
                dataKey="conversions"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
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
