import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get("page") ?? "1")
    const limit = parseInt(searchParams.get("limit") ?? "10")
    const search = searchParams.get("search") ?? ""

    const skip = (page - 1) * limit

    const [schools, total] = await Promise.all([
        prisma.school.findMany({
            where: {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { location: { contains: search, mode: 'insensitive' } },
                ],
            },
            skip,
            take: limit,
            //   include: {
            //     _count: {
            //       select: { students: true, tutors: true }
            //     }
            //   }
        }),
        prisma.school.count({
            where: {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { location: { contains: search, mode: 'insensitive' } },
                ],
            },
        })
    ])

    return NextResponse.json({
        schools,
        pageCount: Math.ceil(total / limit),
        total
    })
}

const createSchoolSchema = z.object({
    name: z.string().min(2),
    location: z.string().min(2),
    address: z.string().min(5),
    contactEmail: z.string().email(),
    phoneNumber: z.string().min(10),
})

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        // Validate request body
        const validatedData = createSchoolSchema.parse(body)

        // Create new school
        const school = await prisma.school.create({
            data: {
                ...validatedData,
                status: "active",
            },
            include: {
                _count: {
                    select: {
                        students: true,
                        // tutors: true,
                    },
                },
            },
        })

        return NextResponse.json(school, { status: 201 })
    } catch (error) {
        console.error("Failed to create school:", error)

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