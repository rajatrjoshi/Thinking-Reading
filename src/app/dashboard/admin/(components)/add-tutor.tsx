import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserPlus } from 'lucide-react'
import React from 'react'
import { Form, useForm } from 'react-hook-form'
import { z } from 'zod'

const tutorFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "slt", "tutor"], {
    required_error: "Please select a role",
  }),
  school: z.string().min(1, "Please select a school"),
})

export function AddTutor() {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null)
    const [schools] = React.useState([
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
                                                <SelectItem key={school.id} value={school.id.toString()}>
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
    )
}
