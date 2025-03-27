"use client";
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Users, School, BookOpen, UserPlus, TrendingUp } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, ChevronRight, Trash, Edit, UserCog } from "lucide-react"

const tutorFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "slt", "tutor"], {
    required_error: "Please select a role",
  }),
  school: z.string().min(1, "Please select a school"),
})

export default function AdminDashboard() {
  const [schools, setSchools] = React.useState([
    {
      id: 1,
      name: 'St Francis',
      location: 'UK',
      studentCount: 100,
      tutorCount: 90,
      trEnrollment: 490,
      status: 'active'
    }
  ])
  const [students, setStudents] = React.useState([]);
  const [tutors, setTutors] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [selectedSchoolForTutors, setSelectedSchoolForTutors] = React.useState<string>("");
  const [selectedSchoolForStudents, setSelectedSchoolForStudents] = React.useState<string>("");
  const [selectedTutorForStudents, setSelectedTutorForStudents] = React.useState<string>("");

  const tutorForm = useForm({
    resolver: zodResolver(tutorFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "tutor",
      school: "",
    },
  })

  const onTutorSubmit = async (data) => {
    try {
      setLoading(true)
      // Add your API call here
      console.log('Adding tutor:', data)
      // Reset form on success
      tutorForm.reset()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Add form handling functions
  const handleAddSchool = async (formData) => {
    // Implement school addition logic
    console.log('Adding school:', formData)
  }

  const handleTutorAssignment = async (data) => {
    // Implement tutor assignment logic
    console.log('Assigning tutor:', data)
  }

  // Add these functions inside your AdminDashboard component
  const navigateToSchool = (schoolId: string) => {
    // Implement navigation to school details
    console.log('Navigating to school:', schoolId)
  }

  const handleEditSchool = (schoolId: string) => {
    // Implement school editing
    console.log('Editing school:', schoolId)
  }

  const handleManageTutors = (schoolId: string) => {
    // Implement tutor management for school
    console.log('Managing tutors for school:', schoolId)
  }

  const handleDeleteSchool = (schoolId: string) => {
    // Implement school deletion
    console.log('Deleting school:', schoolId)
  }

  const confirmDeleteSchool = () => {
    // Implement school deletion confirmation
    console.log('School deleted')
  }

  React.useEffect(() => {
    if (selectedSchoolForStudents) {
      // Fetch tutors for the selected school
      const fetchTutors = async () => {
        try {
          setLoading(true);
          // Replace with your actual API call
          const response = await fetch(`/api/schools/${selectedSchoolForStudents}/tutors`);
          const data = await response.json();
          setTutors(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      
      fetchTutors();
    }
  }, [selectedSchoolForStudents]);

  React.useEffect(() => {
    if (selectedSchoolForStudents && selectedTutorForStudents) {
      // Fetch students for the selected tutor
      const fetchStudents = async () => {
        try {
          setLoading(true);
          // Replace with your actual API call
          const response = await fetch(
            `/api/schools/${selectedSchoolForStudents}/tutors/${selectedTutorForStudents}/students`
          );
          const data = await response.json();
          setStudents(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      
      fetchStudents();
    }
  }, [selectedSchoolForStudents, selectedTutorForStudents]);

  return (
    <main className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New School
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New School</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label>School Name</label>
                  <Input placeholder="Enter school name" />
                </div>
                <div className="space-y-2">
                  <label>Address</label>
                  <Input placeholder="Enter school address" />
                </div>
                <div className="space-y-2">
                  <label>Contact Email</label>
                  <Input type="email" placeholder="contact@school.com" />
                </div>
                <div className="space-y-2">
                  <label>Phone Number</label>
                  <Input type="tel" placeholder="Phone number" />
                </div>
                <Button className="w-full">Create School</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Manage Tutors</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Manage Tutor Assignment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label>Select School</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a school" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="school1">Springfield Elementary</SelectItem>
                      <SelectItem value="school2">Central High School</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label>Select Tutor</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tutor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tutor1">John Doe</SelectItem>
                      <SelectItem value="tutor2">Jane Smith</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label>Role</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="slt">SLT</SelectItem>
                      <SelectItem value="tutor">General Tutor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Assign Tutor</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <UserPlus className="mr-2 h-4 w-4" /> Add Tutor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Tutor</DialogTitle>
              </DialogHeader>
              <Form {...tutorForm}>
                <form onSubmit={tutorForm.handleSubmit(onTutorSubmit)} className="space-y-4 py-4">
                  <FormField
                    control={tutorForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={tutorForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={tutorForm.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="slt">SLT</SelectItem>
                            <SelectItem value="tutor">General Tutor</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={tutorForm.control}
                    name="school"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assigned School</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a school" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {schools.map((school) => (
                              <SelectItem key={school.id} value={school.id}>
                                {school.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Adding..." : "Add Tutor"}
                  </Button>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <Button variant="secondary">View Reports</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schools.length}</div>
            <p className="text-xs text-muted-foreground">Active schools in program</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tutors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tutors.length}</div>
            <p className="text-xs text-muted-foreground">Across all schools</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TR Program Students</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">320</div>
            <p className="text-xs text-muted-foreground">Total enrolled students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Program Enrollment</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">Average across schools</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="schools" className="space-y-4">
        <TabsList>
          <TabsTrigger value="schools">Schools</TabsTrigger>
          <TabsTrigger value="tutors">Tutors</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>
        
        <TabsContent value="schools">
          <Card>
            <CardHeader>
              <CardTitle>Registered Schools</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>School Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Tutors</TableHead>
                    <TableHead>TR Enrollment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schools.map((school) => (
                    <TableRow key={school.id}>
                      <TableCell className="font-medium">
                        <Button variant="link" onClick={() => navigateToSchool(school.id)}>
                          {school.name}
                        </Button>
                      </TableCell>
                      <TableCell>{school.location}</TableCell>
                      <TableCell>{school.studentCount}</TableCell>
                      <TableCell>{school.tutorCount}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{school.trEnrollment}%</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={school.status === 'active' ? 'success' : 'secondary'}>
                          {school.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditSchool(school.id)}>
                              <Edit className="mr-2 h-4 w-4" /> Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleManageTutors(school.id)}>
                              <UserCog className="mr-2 h-4 w-4" /> Manage Tutors
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteSchool(school.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" /> Delete School
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutors">
          <Card>
            <CardHeader>
              <CardTitle>Tutor Management</CardTitle>
              <div className="mt-4 max-w-md">
                <Select
                  value={selectedSchoolForTutors}
                  onValueChange={setSelectedSchoolForTutors}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a school to view tutors" />
                  </SelectTrigger>
                  <SelectContent>
                    {schools.map((school) => (
                      <SelectItem key={school.id} value={school.id.toString()}>
                        {school.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {selectedSchoolForTutors ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>Lead Tutor</TableCell>
                      <TableCell>15</TableCell>
                      <TableCell>
                        <Badge variant="success">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  Please select a school to view its tutors
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Management</CardTitle>
              <div className="mt-4 space-y-4">
                <div className="max-w-md">
                  <Select
                    value={selectedSchoolForStudents}
                    onValueChange={(value) => {
                      setSelectedSchoolForStudents(value);
                      setSelectedTutorForStudents(""); // Reset tutor selection when school changes
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a school" />
                    </SelectTrigger>
                    <SelectContent>
                      {schools.map((school) => (
                        <SelectItem key={school.id} value={school.id.toString()}>
                          {school.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedSchoolForStudents && (
                  <div className="max-w-md">
                    <Select
                      value={selectedTutorForStudents}
                      onValueChange={setSelectedTutorForStudents}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a tutor" />
                      </SelectTrigger>
                      <SelectContent>
                        {tutors.map((tutor) => (
                          <SelectItem key={tutor.id} value={tutor.id.toString()}>
                            {tutor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {selectedSchoolForStudents && selectedTutorForStudents ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Reading Age</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Alice Smith</TableCell>
                      <TableCell>Year 7</TableCell>
                      <TableCell>11.5</TableCell>
                      <TableCell>
                        <Badge variant="outline">+2.3 years</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="success">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Progress
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  {!selectedSchoolForStudents 
                    ? "Please select a school first"
                    : "Please select a tutor to view their students"}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          {/* This is used programmatically */}
          <Button className="hidden">Delete School</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the school
              and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => confirmDeleteSchool()}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}