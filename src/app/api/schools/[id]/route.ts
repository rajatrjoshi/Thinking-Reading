import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const updateSchoolSchema = z.object({
  name: z.string().min(2).optional(),
  location: z.string().min(2).optional(),
  address: z.string().min(5).optional(),
  contactEmail: z.string().email().optional(),
  phoneNumber: z.string().min(10).optional(),
})

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const validatedData = updateSchoolSchema.parse(body)

    const school = await prisma.school.update({
      where: { id: parseInt(params.id) },
      data: validatedData,
      include: {
        _count: {
          select: {
            students: true,
            // tutors: true,
          },
        },
      },
    })

    return NextResponse.json(school)
  } catch (error) {
    console.error("Failed to update school:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.school.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete school:", error);
    return NextResponse.json(
      { error: "Failed to delete school" },
      { status: 500 }
    );
  }
}