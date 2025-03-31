import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

export function ManageTutors() {


    return (
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
    )
}
