import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

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