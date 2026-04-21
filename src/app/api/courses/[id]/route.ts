import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();

    // Vérifier si l'utilisateur est authentifié
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non autorisé - Authentification requise" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

  const course = await prisma.course.findUnique({
    where: { id: params.id },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          resources: {
            orderBy: { order: "asc" },
            include: userId
              ? { progress: { where: { userId }, select: { completed: true } } }
              : { progress: false },
          },
        },
      },
      _count: { select: { enrollments: true } },
      enrollments: userId
        ? { where: { userId }, select: { id: true } }
        : false,
    },
  })

  if (!course) {
    return NextResponse.json({ error: "Cours introuvable" }, { status: 404 })
  }

  // Flatten progress into each resource
  const modules = course.modules.map((m) => ({
    ...m,
    resources: m.resources.map((r) => ({
      ...r,
      completed: (r.progress as any)?.[0]?.completed ?? false,
      progress: undefined,
    })),
  }))

  // Global progress %
  const allResources = modules.flatMap((m) => m.resources)
  const completedCount = allResources.filter((r) => r.completed).length
  const progress =
    allResources.length > 0
      ? Math.round((completedCount / allResources.length) * 100)
      : 0

  return NextResponse.json({
    ...course,
    modules,
    isEnrolled: (course.enrollments as any[])?.length > 0,
    progress,
    enrollments: undefined,
  })
}