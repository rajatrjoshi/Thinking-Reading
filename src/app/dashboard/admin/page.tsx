import React from 'react'
import { Users, School, BookOpen, TrendingUp } from "lucide-react"
import StatCard from './(components)/stat-card'
import { ClientSideActions } from './(components)/client-side-actions'
import AdminTables from './(components)/admin-tables'

// This becomes an async server component
export default async function AdminDashboard() {
  // Fetch data server-side
  // const [totalTutors, totalStudents, enrollmentStats] = stats
  // const avgEnrollment = Math.round(enrollmentStats._avg?.enrollmentPercentage || 0)

  return (
    <main className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <ClientSideActions />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Total Schools"
          // value={schools.length}
          icon={School}
          subtitle="Active schools in program"
        />
        <StatCard
          title="Active Tutors"
          // value={totalTutors}
          icon={Users}
          subtitle="Across all schools"
        />
        <StatCard
          title="TR Program Students"
          // value={totalStudents}
          icon={BookOpen}
          subtitle="Total enrolled students"
        />
        <StatCard
          title="Program Enrollment"
          // value={`${avgEnrollment}%`}
          icon={TrendingUp}
          subtitle="Average across schools"
        />
      </div>

      <AdminTables />
    </main>
  )
}