"use client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { School } from '@prisma/client';
import { Check, ChevronsUpDown, Edit, MoreHorizontal, Trash, TrendingUp } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EditSchool } from './edit-school';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';

interface ExtendedSchool extends School {
    studentCount?: number;
    tutorCount?: number;
    trEnrollment?: number;
}

interface PaginationState {
    pageIndex: number;
    pageSize: number;
}

interface SchoolsResponse {
    schools: ExtendedSchool[];
    pageCount: number;
    total: number;
}



export default function AdminTables() {

    const [data, setData] = useState<SchoolsResponse>({
        schools: [],
        pageCount: 0,
        total: 0
    });
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });
    const [globalFilter, setGlobalFilter] = useState("");
    const [loading, setLoading] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
    const [schoolToDelete, setSchoolToDelete] = React.useState<number | null>(null);
    const [selectedSchoolForTutors, setSelectedSchoolForTutors] = React.useState<string>("");
    const [selectedSchoolForStudents, setSelectedSchoolForStudents] = React.useState<string>("");
    const [selectedTutorForStudents, setSelectedTutorForStudents] = React.useState<string>("");
    const [schoolToEdit, setSchoolToEdit] = useState<School | null>(null);

    async function handleDeleteSchool(): Promise<void> {
        if (!schoolToDelete) {
            toast.info('Nothing to delete');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`/api/schools/${schoolToDelete}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete school');
            }

            // Update local state to remove the deleted school
            setData(prev => ({
                ...prev,
                schools: prev.schools.filter(school => school.id !== schoolToDelete),
                total: prev.total - 1
            }));

            toast.success('School deleted successfully');
        } catch (error) {
            console.error('Failed to delete school:', error);
            toast.error('Failed to delete school');
        } finally {
            setLoading(false);
            setIsDeleteDialogOpen(false);
            setSchoolToDelete(null);
        }
    }

    const columns: ColumnDef<ExtendedSchool>[] = [
        {
            accessorKey: "name",
            header: "School Name",
            cell: ({ row }) => (
                <Button
                    variant="link"
                // onClick={() => navigateToSchool(row.original.id)}
                >
                    {row.getValue("name")}
                </Button>
            ),
        },
        {
            accessorKey: "location",
            header: "Location",
        },
        {
            accessorKey: "studentCount",
            header: "Students",
        },
        {
            accessorKey: "tutorCount",
            header: "Tutors",
        },
        {
            accessorKey: "trEnrollment",
            header: "TR Enrollment",
            cell: ({ row }) => (
                <Badge variant="outline">
                    {row.getValue("trEnrollment")}%
                </Badge>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <Badge variant={row.getValue("status") === "active" ? "default" : "secondary"}>
                    {row.getValue("status")}
                </Badge>
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setSchoolToEdit(row.original)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                                setSchoolToDelete(row.original.id);
                                setIsDeleteDialogOpen(true);
                            }}
                        >
                            <Trash className="mr-2 h-4 w-4" /> Delete School
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const searchQuery = new URLSearchParams({
                page: (pageIndex + 1).toString(),
                limit: pageSize.toString(),
                search: globalFilter
            });

            const response = await fetch(`/api/schools?${searchQuery}`);
            const json = await response.json();

            setData(json);
            if (json.pageCount > 0 && pageIndex >= json.pageCount) {
                setPagination(prev => ({
                    ...prev,
                    pageIndex: 0
                }));
            }
        } catch (error) {
            console.error('Failed to fetch schools:', error);
        } finally {
            setLoading(false);
        }
    }, [pageIndex, pageSize, globalFilter]);

    useEffect(() => {
        fetchData();
    }, [pageIndex, pageSize, globalFilter, fetchData]);

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
                            <DataTable
                                columns={columns}
                                data={data.schools}
                                pageCount={data.pageCount}
                                pagination={{
                                    pageIndex,
                                    pageSize,
                                }}
                                onPaginationChange={setPagination}
                                onGlobalFilterChange={setGlobalFilter}
                                globalFilter={globalFilter}
                                loading={loading}
                            // searchKey="name"
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="tutors">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tutor Management</CardTitle>
                            <div className="mt-4 max-w-md">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className="w-full justify-between"
                                        >
                                            {data.schools.find((school) => school.id.toString() === selectedSchoolForTutors)
                                                ?.name ?? "Select a school"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                            <CommandInput placeholder="Search schools..." />
                                            <CommandEmpty>No schools found.</CommandEmpty>
                                            <CommandGroup>
                                                {data.schools.map((school) => (
                                                    <CommandItem
                                                        key={school.id}
                                                        value={school.id.toString()}
                                                        onSelect={(value) => {
                                                            setSelectedSchoolForTutors(value)
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                selectedSchoolForTutors === school.id.toString()
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {school.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
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
                                            {data.schools.map((school) => (
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
                                                {/* {tutors.map((tutor) => (
                                                    <SelectItem key={tutor.id} value={tutor.id.toString()}>
                                                        {tutor.name}
                                                    </SelectItem>
                                                ))} */}
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
                            className="bg-red-600 hover:bg-red-700">
                            {loading ? 'Deleting...' : 'Delete School'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {schoolToEdit && (
                <EditSchool
                    school={schoolToEdit}
                    open={!!schoolToEdit}
                    onOpenChange={(open) => !open && setSchoolToEdit(null)}
                    onSuccess={() => {
                        setSchoolToEdit(null);
                        // Refresh the data
                        fetchData();
                    }}
                />
            )}
        </>
    );
}
