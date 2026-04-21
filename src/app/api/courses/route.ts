import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") as "COURSE" | "RESOURCE" | null

  const courses = await prisma.course.findMany({
    where: {
      published: true,
      ...(type ? { type } : {}),
    },
    orderBy: [{ level: "asc" }, { createdAt: "desc" }],
  })

  return NextResponse.json(courses)
}