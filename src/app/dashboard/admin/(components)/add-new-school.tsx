import { Button } from '@/components/ui/button'
import { DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@radix-ui/react-dialog'
import { PlusCircle } from 'lucide-react'
import React from 'react'

export function AddNewSchool() {

    return (
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
    )
}
