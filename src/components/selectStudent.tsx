"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Key for storing selected student in session storage
const SELECTED_STUDENT_KEY = "thinking-reading-selected-student";

const data: StudentList[] = [
  {
    studentId: "1",
    name: "John Doe",
    schoolId: "1",
    schoolName: "Harvard University",
    enrollmentDate: "2021-01-01"
  },
  {
    studentId: "2",
    name: "Emma Smith",
    schoolId: "2",
    schoolName: "Yale University",
    enrollmentDate: "2021-02-15"
  },
  {
    studentId: "3",
    name: "Michael Johnson",
    schoolId: "3",
    schoolName: "Stanford University",
    enrollmentDate: "2021-03-20"
  },
  {
    studentId: "4",
    name: "Sarah Williams",
    schoolId: "1",
    schoolName: "Harvard University",
    enrollmentDate: "2021-01-30"
  },
  {
    studentId: "5",
    name: "James Brown",
    schoolId: "2",
    schoolName: "Yale University",
    enrollmentDate: "2021-02-01"
  },
  {
    studentId: "6",
    name: "Emily Davis",
    schoolId: "3",
    schoolName: "Stanford University",
    enrollmentDate: "2021-03-15"
  },
  {
    studentId: "7",
    name: "William Miller",
    schoolId: "1",
    schoolName: "Harvard University",
    enrollmentDate: "2021-04-01"
  },
  {
    studentId: "8",
    name: "Olivia Wilson",
    schoolId: "2",
    schoolName: "Yale University",
    enrollmentDate: "2021-02-28"
  },
  {
    studentId: "9",
    name: "Henry Taylor",
    schoolId: "3",
    schoolName: "Stanford University",
    enrollmentDate: "2021-03-10"
  },
  {
    studentId: "10",
    name: "Sophia Anderson",
    schoolId: "1",
    schoolName: "Harvard University",
    enrollmentDate: "2021-01-15"
  },
  {
    studentId: "11",
    name: "Liam Thomas",
    schoolId: "2",
    schoolName: "Yale University",
    enrollmentDate: "2021-02-20"
  },
  {
    studentId: "12",
    name: "Ava Jackson",
    schoolId: "3",
    schoolName: "Stanford University",
    enrollmentDate: "2021-03-25"
  },
  {
    studentId: "13",
    name: "Noah White",
    schoolId: "1",
    schoolName: "Harvard University",
    enrollmentDate: "2021-04-05"
  },
  {
    studentId: "14",
    name: "Isabella Harris",
    schoolId: "2",
    schoolName: "Yale University",
    enrollmentDate: "2021-02-10"
  },
  {
    studentId: "15",
    name: "Mason Clark",
    schoolId: "3",
    schoolName: "Stanford University",
    enrollmentDate: "2021-03-30"
  },
  {
    studentId: "16",
    name: "Charlotte Lewis",
    schoolId: "1",
    schoolName: "Harvard University",
    enrollmentDate: "2021-01-20"
  },
  {
    studentId: "17",
    name: "Elijah Lee",
    schoolId: "2",
    schoolName: "Yale University",
    enrollmentDate: "2021-02-25"
  },
  {
    studentId: "18",
    name: "Amelia Walker",
    schoolId: "3",
    schoolName: "Stanford University",
    enrollmentDate: "2021-03-05"
  },
  {
    studentId: "19",
    name: "Oliver Hall",
    schoolId: "1",
    schoolName: "Harvard University",
    enrollmentDate: "2021-04-10"
  },
  {
    studentId: "20",
    name: "Mia Allen",
    schoolId: "2",
    schoolName: "Yale University",
    enrollmentDate: "2021-02-05"
  },
  {
    studentId: "21",
    name: "Lucas Young",
    schoolId: "3",
    schoolName: "Stanford University",
    enrollmentDate: "2021-03-12"
  },
  {
    studentId: "22",
    name: "Harper King",
    schoolId: "1",
    schoolName: "Harvard University",
    enrollmentDate: "2021-01-25"
  },
  {
    studentId: "23",
    name: "Alexander Wright",
    schoolId: "2",
    schoolName: "Yale University",
    enrollmentDate: "2021-02-18"
  },
  {
    studentId: "24",
    name: "Evelyn Lopez",
    schoolId: "3",
    schoolName: "Stanford University",
    enrollmentDate: "2021-03-22"
  },
  {
    studentId: "25",
    name: "Daniel Hill",
    schoolId: "1",
    schoolName: "Harvard University",
    enrollmentDate: "2021-04-15"
  },
  {
    studentId: "26",
    name: "Victoria Scott",
    schoolId: "2",
    schoolName: "Yale University",
    enrollmentDate: "2021-02-08"
  },
  {
    studentId: "27",
    name: "Matthew Green",
    schoolId: "3",
    schoolName: "Stanford University",
    enrollmentDate: "2021-03-17"
  },
  {
    studentId: "28",
    name: "Sofia Adams",
    schoolId: "1",
    schoolName: "Harvard University",
    enrollmentDate: "2021-01-28"
  },
  {
    studentId: "29",
    name: "Joseph Baker",
    schoolId: "2",
    schoolName: "Yale University",
    enrollmentDate: "2021-02-22"
  },
  {
    studentId: "30",
    name: "Scarlett Nelson",
    schoolId: "3",
    schoolName: "Stanford University",
    enrollmentDate: "2021-03-27"
  },
  {
    studentId: "31",
    name: "Samuel Carter",
    schoolId: "1",
    schoolName: "Harvard University",
    enrollmentDate: "2021-04-20"
  },
  {
    studentId: "32",
    name: "Chloe Mitchell",
    schoolId: "2",
    schoolName: "Yale University",
    enrollmentDate: "2021-02-12"
  },
  {
    studentId: "33",
    name: "David Perez",
    schoolId: "3",
    schoolName: "Stanford University",
    enrollmentDate: "2021-03-19"
  },
  {
    studentId: "34",
    name: "Grace Roberts",
    schoolId: "1",
    schoolName: "Harvard University",
    enrollmentDate: "2021-01-31"
  },
  {
    studentId: "35",
    name: "Jack Turner",
    schoolId: "2",
    schoolName: "Yale University",
    enrollmentDate: "2021-02-24"
  },
  {
    studentId: "36",
    name: "Luna Phillips",
    schoolId: "3",
    schoolName: "Stanford University",
    enrollmentDate: "2021-03-29"
  },
  {
    studentId: "37",
    name: "Owen Campbell",
    schoolId: "1",
    schoolName: "Harvard University",
    enrollmentDate: "2021-04-25"
  },
  {
    studentId: "38",
    name: "Elena Parker",
    schoolId: "2",
    schoolName: "Yale University",
    enrollmentDate: "2021-02-14"
  },
  {
    studentId: "39",
    name: "Sebastian Evans",
    schoolId: "3",
    schoolName: "Stanford University",
    enrollmentDate: "2021-03-21"
  },
  {
    studentId: "40",
    name: "Aria Edwards",
    schoolId: "1",
    schoolName: "Harvard University",
    enrollmentDate: "2021-02-03"
  },
  {
    studentId: "41",
    name: "Julian Collins",
    schoolId: "2",
    schoolName: "Yale University",
    enrollmentDate: "2021-02-26"
  },
  {
    studentId: "42",
    name: "Layla Stewart",
    schoolId: "3",
    schoolName: "Stanford University",
    enrollmentDate: "2021-03-31"
  },
  {
    studentId: "43",
    name: "Christopher Morris",
    schoolId: "1",
    schoolName: "Harvard University",
    enrollmentDate: "2021-04-30"
  },
  {
    studentId: "44",
    name: "Zoe Sanders",
    schoolId: "2",
    schoolName: "Yale University",
    enrollmentDate: "2021-02-16"
  },
  {
    studentId: "45",
    name: "Adrian Price",
    schoolId: "3",
    schoolName: "Stanford University",
    enrollmentDate: "2021-03-23"
  },
  {
    studentId: "46",
    name: "Penelope Ross",
    schoolId: "1",
    schoolName: "Harvard University",
    enrollmentDate: "2021-02-06"
  },
  {
    studentId: "47",
    name: "Thomas Wood",
    schoolId: "2",
    schoolName: "Yale University",
    enrollmentDate: "2021-02-28"
  },
  {
    studentId: "48",
    name: "Maya Barnes",
    schoolId: "3",
    schoolName: "Stanford University",
    enrollmentDate: "2021-04-02"
  },
  {
    studentId: "49",
    name: "Charles Cook",
    schoolId: "1",
    schoolName: "Harvard University",
    enrollmentDate: "2021-05-01"
  },
  {
    studentId: "50",
    name: "Alice Morgan",
    schoolId: "2",
    schoolName: "Yale University",
    enrollmentDate: "2021-02-19"
  }
]

export type StudentList = {
    studentId: string
    name: string
    schoolId: string
    schoolName: string  
    enrollmentDate: string
}

export const columns: ColumnDef<StudentList>[] = [
  {
    id: "select",
    header: () => <div>Select</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <div 
          className={`h-4 w-4 rounded-full border ${row.getIsSelected() ? 'border-[var(--color-tertiary)] border-4' : 'border-primary'}`}
          aria-label={row.getIsSelected() ? "Selected" : "Select"}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "studentId",
    header: "Student Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("studentId")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "schoolName",
    header: () => <div className="">School Name</div>,
    cell: ({ row }) => <div>{row.getValue("schoolName")} </div>,
  },
  {
    accessorKey: "schoolId",
    header: "School Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("schoolId")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.studentId)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

interface SelectStudentProps {
  onStartTest?: (student: StudentList) => void;
}

export default function SelectStudent({ onStartTest }: SelectStudentProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [selectedRowId, setSelectedRowId] = React.useState<string | null>(null)

  // Check session storage for previously selected student on component mount
  React.useEffect(() => {
    try {
      const storedStudent = sessionStorage.getItem(SELECTED_STUDENT_KEY);
      if (storedStudent) {
        const parsedStudent = JSON.parse(storedStudent);
        // Find the row ID that matches the stored student ID
        const matchingRow = data.findIndex(student => student.studentId === parsedStudent.studentId);
        if (matchingRow >= 0) {
          setSelectedRowId(String(matchingRow));
        }
      }
    } catch (error) {
      console.error("Error retrieving selected student from session storage:", error);
    }
  }, []);

  // Function to select a single row
  const handleRowClick = (rowId: string) => {
    // If the row is already selected, keep it selected
    if (selectedRowId === rowId) return;
    
    // Otherwise, select only this row
    setSelectedRowId(rowId);
    
    // Store the selected student in session storage
    // try {
    //   const selectedStudent = table.getRow(rowId).original;
    //   sessionStorage.setItem(SELECTED_STUDENT_KEY, JSON.stringify(selectedStudent));
    // } catch (error) {
    //   console.error("Error storing selected student in session storage:", error);
    // }
  };

  // Convert the selectedRowId to the format expected by the table
  const rowSelection = React.useMemo(() => {
    if (!selectedRowId) return {};
    return { [selectedRowId]: true };
  }, [selectedRowId]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const selectedStudent = selectedRowId ? 
    table.getRow(selectedRowId).original : null;

  return (
    <div className="w-full pt-8">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <div className="max-h-[600px] overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={`cursor-pointer ${row.getIsSelected() ? "bg-muted" : ""}`}
                    onClick={() => handleRowClick(row.id)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-end pt-4">
        <Button 
          className="hover:bg-[var(--color-tertiary)] hover:opacity-75 bg-[var(--color-tertiary)]"
          disabled={!selectedRowId}
          onClick={() => {
            if (selectedStudent && onStartTest) {
              // Ensure the session storage has the latest data before starting the test
              sessionStorage.setItem(SELECTED_STUDENT_KEY, JSON.stringify(selectedStudent));
              onStartTest(selectedStudent);
            }
          }}
        >
          Start Test
        </Button>
      </div>
    </div>
  )
}
