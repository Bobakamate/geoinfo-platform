// app/api/user/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// GET - Récupérer les données de l'utilisateur connecté
export async function GET(req: Request) {
  try {
    // Récupérer la session avec Auth.js v5
    const session = await auth();

    // Vérifier si l'utilisateur est authentifié
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non autorisé - Authentification requise" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Récupérer les données de l'utilisateur connecté
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        accounts: true,
        sessions: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Données récupérées avec succès",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    return NextResponse.json(
      { 
        error: "Erreur interne du serveur",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// POST - Mettre à jour le profil
export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const body = await req.json();

    // Validation basique
    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json(
        { error: "Le nom est requis et doit être une chaîne de caractères" },
        { status: 400 }
      );
    }

    // Mettre à jour le profil de l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: body.name.trim(),
        // Ajoutez d'autres champs selon vos besoins
      },
    });

    return NextResponse.json({
      message: "Profil mis à jour avec succès",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    return NextResponse.json(
      { 
        error: "Erreur interne du serveur",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer le compte utilisateur
export async function DELETE(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Supprimer l'utilisateur et toutes ses données liées (grâce aux cascades dans Prisma)
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({
      message: "Compte supprimé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    return NextResponse.json(
      { 
        error: "Erreur interne du serveur",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}