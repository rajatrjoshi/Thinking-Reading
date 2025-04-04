import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserPlus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
// import { useDebounce } from '@/hooks/use-debounce'

interface School {
    id: number
    name: string
}

const tutorFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    role: z.enum(["admin", "slt", "tutor"], {
        required_error: "Please select a role",
    }),
    school: z.string().min(1, "Please select a school"),
})

const OPTIONS = [
    { value: "slt", label: "School Leader" },
    { value: "lt", label: "Team Leader" },
    { value: "tutor", label: "General Tutor" }
]

export function AddTutor() {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null)
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [schools, setSchools] = useState<School[]>([])
    const [schoolsLoading, setSchoolsLoading] = useState(false)

    const tutorForm = useForm<z.infer<typeof tutorFormSchema>>({
        resolver: zodResolver(tutorFormSchema),
        defaultValues: {
            name: "",
            email: "",
            role: "tutor",
            school: "",
        },
    })

    const onTutorSubmit = async (data: z.infer<typeof tutorFormSchema>) => {
        try {
            setLoading(true)
            // Add your API call here
            console.log('Adding tutor:', data)
            // Reset form on success
            tutorForm.reset()
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchInitialSchools = async () => {
            setSchoolsLoading(true)
            try {
                const response = await fetch('/api/schools/search')
                if (!response.ok) throw new Error('Failed to fetch schools')
                const data = await response.json()
                setSchools(data)
            } catch (error) {
                console.error('Error loading schools:', error)
                setError('Failed to load schools')
            } finally {
                setSchoolsLoading(false)
            }
        }

        fetchInitialSchools()
    }, []) // Load schools only once when component mounts

    useEffect(() => {
        const fetchSchools = async () => {
            if (!search) {
                setSchools([]) // Reset when no search
                return
            }
            setSchoolsLoading(true)
            try {
                const response = await fetch(`/api/schools/search?q=${encodeURIComponent(search)}`)
                if (!response.ok) throw new Error("Failed to fetch schools")
                const data = await response.json()
                setSchools(data)
            } catch (error) {
                console.error("Error searching schools:", error)
            } finally {
                setSchoolsLoading(false)
            }
        }
        fetchSchools();
        // Debounce API call to prevent too many requests
        // const debounceFetch = setTimeout(fetchSchools, 300)
        // return () => clearTimeout(debounceFetch)
    }, [search]) // Fetch when search changes

    return (
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
                                            {OPTIONS.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
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
                                <FormItem className="flex flex-col">
                                    <FormLabel>Assigned School</FormLabel>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={open}
                                                    className={cn(
                                                        "w-full justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? schools.find((school) => school.id.toString() === field.value)?.name
                                                        : "Select school..."}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[400px] p-0" align="start">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search schools..."
                                                    className="h-9"
                                                    value={search}
                                                    onValueChange={setSearch} // Just update the search state
                                                />
                                                <CommandEmpty>
                                                    {schoolsLoading ? (
                                                        <div className="p-2 text-sm text-muted-foreground">Loading...</div>
                                                    ) : (
                                                        <div className="p-2 text-sm text-muted-foreground">No schools found.</div>
                                                    )}
                                                </CommandEmpty>
                                                <CommandGroup className="max-h-[300px] overflow-auto">
                                                    {schools.map((school) => (
                                                        <CommandItem
                                                            key={school.id}
                                                            value={school.id.toString()}
                                                            onSelect={(value) => {
                                                                field.onChange(value)
                                                                setOpen(false)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    field.value === school.id.toString() ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {school.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
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
    )
}
