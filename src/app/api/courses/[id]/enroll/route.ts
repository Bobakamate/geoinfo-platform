import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth";

export async function POST(
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

  const enrollment = await prisma.enrollment.upsert({
    where: { userId_courseId: { userId, courseId: params.id } },
    create: { userId, courseId: params.id },
    update: {},
  })
  return NextResponse.json(enrollment)
}

export async function DELETE(
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

  await prisma.enrollment.delete({
    where: { userId_courseId: { userId, courseId: params.id } },
  })
  return NextResponse.json({ success: true })
}