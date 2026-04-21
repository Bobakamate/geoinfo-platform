import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth";

export async function PATCH(
  req: NextRequest,
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

  const { resourceId, completed } = await req.json()

  const progress = await prisma.userProgress.upsert({
    where: { userId_resourceId: { userId, resourceId } },
    create: { userId, resourceId, completed, completedAt: completed ? new Date() : null },
    update: { completed, completedAt: completed ? new Date() : null },
  })
  return NextResponse.json(progress)
}