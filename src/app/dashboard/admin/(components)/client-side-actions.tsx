"use client"

import { Button } from "@/components/ui/button"
import { AddNewSchool } from './add-new-school'
import { ManageTutors } from './manage-tutors'
import { AddTutor } from './add-tutor'

export function ClientSideActions() {
  return (
    <div className="space-x-2">
      <AddNewSchool />
      <ManageTutors />
      <AddTutor />
      <Button variant="secondary">View Reports</Button>
    </div>
  )
}