import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get("q") ?? ""

  try {
    const schools = await prisma.school.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive'
        }
      },
      take: 10,
      orderBy: {
        name: 'asc'
      },
      select: {
        id: true,
        name: true
      }
    })

    return NextResponse.json(schools)
  } catch (error) {
    console.error("Error searching schools:", error)
    return NextResponse.json(
      { error: "Failed to search schools" },
      { status: 500 }
    )
  }
}