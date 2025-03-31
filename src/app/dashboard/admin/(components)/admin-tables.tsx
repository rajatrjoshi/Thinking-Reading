"use client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { School } from '@prisma/client';
import { Edit, MoreHorizontal, Trash, TrendingUp, UserCog } from 'lucide-react';
import React from 'react'

interface ExtendedSchool extends School {
    studentCount?: number;
    tutorCount?: number;
    trEnrollment?: number;
}

interface AdminTablesProps {
    schools: ExtendedSchool[]
}

export default function AdminTables({ schools }: AdminTablesProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
    const [schoolToDelete, setSchoolToDelete] = React.useState<number | null>(null);
    // const [loading, setLoading] = React.useState(false);
    const [loading,] = React.useState(false);
    const [selectedSchoolForTutors, setSelectedSchoolForTutors] = React.useState<string>("");
    const [selectedSchoolForStudents, setSelectedSchoolForStudents] = React.useState<string>("");
    const [selectedTutorForStudents, setSelectedTutorForStudents] = React.useState<string>("");

    function navigateToSchool(id: number): void {
        console.log(id)
        console.error('Function not implemented.');
    }

    // function handleEditSchool(id: number): void {
    //     console.error('Function not implemented.');
    // }

    function handleManageTutors(id: number): void {
        console.log(id)
        console.error('Function not implemented.');
    }

    function handleDeleteSchool(): void {
        if (schoolToDelete) {
            console.error('Function not implemented.');
            setIsDeleteDialogOpen(false);
        }
    }

    function initiateDeleteSchool(id: number): void {
        setSchoolToDelete(id);
        setIsDeleteDialogOpen(true);
    }

    return (
        <>
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
                                                <Badge variant={school.status === 'active' ? 'default' : 'secondary'}>
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
                                                    <DropdownMenuContent>
                                                        <DropdownMenuItem
                                                            className="text-red-600"
                                                            onClick={() => initiateDeleteSchool(school.id)}
                                                        >
                                                            <Edit className="mr-2 h-4 w-4" /> Edit Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleManageTutors(school.id)}>
                                                            <UserCog className="mr-2 h-4 w-4" /> Manage Tutors
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-red-600"
                                                            onClick={() => handleDeleteSchool()}
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
                                                <Badge variant="default">Active</Badge>
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
                                                <Badge variant="default">Active</Badge>
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
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the school and all associated data.
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteSchool}
                            disabled={loading}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {loading ? 'Deleting...' : 'Delete School'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
