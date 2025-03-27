"use client";
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  ClipboardList, 
  BookOpen,
  LineChart,
  FileText
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// Add these type definitions
const assessmentSchema = z.object({
  studentId: z.string(),
  testType: z.enum(['screen1', 'screen2', 'probe', 'wra', 'ssca']),
  testDate: z.string(),
  readingAge: z.number().optional(),
  decodingAge: z.number().optional(),
  comprehensionLevel: z.string().optional(),
  sas: z.number().optional(),
  percentile: z.number().min(0).max(100).optional(),
  needsScreening: z.boolean().default(false),
  wordsMarked: z.array(z.string()).default([]),
})

type Assessment = z.infer<typeof assessmentSchema>

export default function TutorDashboard() {
  const [selectedStudent, setSelectedStudent] = React.useState<string | null>(null)
  const [isAssessmentOpen, setIsAssessmentOpen] = React.useState(false)
  const [assessmentType, setAssessmentType] = React.useState<string>('')

  const assessmentForm = useForm<Assessment>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      studentId: '',
      testType: 'screen1',
      testDate: new Date().toISOString().split('T')[0],
      needsScreening: false,
      wordsMarked: [],
    },
  })

  const onAssessmentSubmit = async (data: Assessment) => {
    console.log('Assessment submitted:', data)
    // Implement API call here
  }

  return (
    <main className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tutor Dashboard</h1>
        <div className="space-x-2">
          <Button>
            <Users className="mr-2 h-4 w-4" /> My Students
          </Button>
          <Button variant="outline">
            <ClipboardList className="mr-2 h-4 w-4" /> New Assessment
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Active students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assessments</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Tests to complete</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-muted-foreground">Across all students</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Students Tab */}
        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Students</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Current Level</TableHead>
                    <TableHead>Next Assessment</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">James Wilson</TableCell>
                    <TableCell>Level 3</TableCell>
                    <TableCell>PROBE Test</TableCell>
                    <TableCell>75%</TableCell>
                    <TableCell>
                      <Badge>Active</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assessments Tab */}
        <TabsContent value="assessments">
          <Card>
            <CardHeader>
              <CardTitle>Available Assessments</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Standard Screens</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => {
                          setAssessmentType('screen1')
                          setIsAssessmentOpen(true)
                        }}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Screen 1 Assessment
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => {
                          setAssessmentType('screen2')
                          setIsAssessmentOpen(true)
                        }}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Screen 2 Assessment
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>PROBE Tests</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => {
                          setAssessmentType('probe')
                          setIsAssessmentOpen(true)
                        }}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        New PROBE Assessment
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>TR Program Assessments</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => {
                          setAssessmentType('wra')
                          setIsAssessmentOpen(true)
                        }}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        WRA Assessment
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => {
                          setAssessmentType('ssca')
                          setIsAssessmentOpen(true)
                        }}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        SSCA Assessment
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Performance Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <LineChart className="mr-2 h-4 w-4" />
                  Individual Progress Reports
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Words Marked for Teaching
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Section-based Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isAssessmentOpen} onOpenChange={setIsAssessmentOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>New Assessment - {assessmentType}</DialogTitle>
          </DialogHeader>
          <Form {...assessmentForm}>
            <form onSubmit={assessmentForm.handleSubmit(onAssessmentSubmit)} className="space-y-4">
              <FormField
                control={assessmentForm.control}
                name="testDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Test Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {assessmentType === 'screen1' || assessmentType === 'screen2' ? (
                <>
                  <FormField
                    control={assessmentForm.control}
                    name="readingAge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reading Age</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={assessmentForm.control}
                    name="sas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SAS Score</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : null}

              {assessmentType === 'probe' && (
                <>
                  <FormField
                    control={assessmentForm.control}
                    name="decodingAge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Decoding Age</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={assessmentForm.control}
                    name="comprehensionLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comprehension Level</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <FormField
                control={assessmentForm.control}
                name="needsScreening"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Flag for Further Screening</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">Save Assessment</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </main>
  )
}