"use client";
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  PlusCircle, 
  Users, 
  School, 
  BookOpen, 
  TrendingUp, 
  ClipboardList 
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import { DatePicker } from "@/components/ui/date-picker"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
// import {
//   Filter,
//   CalendarRange,
//   BarChart as BarChartIcon,
// } from "lucide-react"

export default function SLTDashboard() {
  const [selectedTutor, setSelectedTutor] = React.useState("all")
  const [selectedGrade, setSelectedGrade] = React.useState("all")
  const [dateRange, setDateRange] = React.useState({
    from: new Date(),
    to: new Date()
  })
  
  // Mock data for charts
  const performanceData = [
    { month: "Jan", reading: 65, enrollment: 75 },
    { month: "Feb", reading: 70, enrollment: 78 },
    { month: "Mar", reading: 75, enrollment: 82 },
    // Add more data points
  ]

  const handleTutorClick = (tutorId: string) => {
    // Implement tutor details view
    console.log('Viewing tutor:', tutorId)
  }

  const handleStudentClick = (studentId: string) => {
    // Implement student details view
    console.log('Viewing student:', studentId)
  }

  const handleAddStaff = () => {
    // Implement staff addition logic
    console.log('Adding new staff member')
  }

  return (
    <main className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">SLT Dashboard</h1>
        <div className="space-x-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add School
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" /> Manage Staff
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Staff Management</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>Tutor</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Button className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Staff
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="secondary">
            <ClipboardList className="mr-2 h-4 w-4" /> Reports
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">+2 from last term</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">456</div>
            <p className="text-xs text-muted-foreground">+23 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TR Program Enrollment</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">+5% increase</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-muted-foreground">Average improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="schools" className="space-y-4">
        <TabsList>
          <TabsTrigger value="schools">Schools</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
        </TabsList>
        
        <TabsContent value="schools">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>School Performance Overview</CardTitle>
                <div className="flex space-x-2">
                  <Select value={selectedTutor} onValueChange={setSelectedTutor}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Tutor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tutors</SelectItem>
                      <SelectItem value="tutor1">John Doe</SelectItem>
                      <SelectItem value="tutor2">Jane Smith</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Grades</SelectItem>
                      <SelectItem value="grade1">Grade 1</SelectItem>
                      <SelectItem value="grade2">Grade 2</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* <DatePicker /> */}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Reading Progress Chart */}
                <div className="h-[300px]">
                  <h3 className="text-lg font-medium mb-4">Reading Progress Overview</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="reading"
                        stroke="#2563eb"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* TR Program Enrollment Chart */}
                <div className="h-[300px]">
                  <h3 className="text-lg font-medium mb-4">TR Program Enrollment</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="enrollment" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Existing table component */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>School Name</TableHead>
                      <TableHead>Students Enrolled</TableHead>
                      <TableHead>Progress Rate</TableHead>
                      <TableHead>Staff Count</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Riverside Academy</TableCell>
                      <TableCell>124</TableCell>
                      <TableCell>78%</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>
                        <Badge variant="default">Active</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">St. Mary's School</TableCell>
                      <TableCell>96</TableCell>
                      <TableCell>82%</TableCell>
                      <TableCell>6</TableCell>
                      <TableCell>
                        <Badge variant="default">Active</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>School</TableHead>
                    <TableHead>Program Level</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Last Assessment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Alex Johnson</TableCell>
                    <TableCell>Riverside Academy</TableCell>
                    <TableCell>Level 3</TableCell>
                    <TableCell>85%</TableCell>
                    <TableCell>2024-03-01</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff">
          <Card>
            <CardHeader>
              <CardTitle>Staff Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>School</TableHead>
                    <TableHead>Students Assigned</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Sarah Smith</TableCell>
                    <TableCell>Lead Teacher</TableCell>
                    <TableCell>Riverside Academy</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>
                      <Badge>Active</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}