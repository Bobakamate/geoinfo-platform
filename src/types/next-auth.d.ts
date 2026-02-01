// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // on garantit qu'on a un id string
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  // Optionnel : préciser User et JWT si tu veux plus de sécurité
  interface User {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // token.id peut exister
    email?: string | null;
    name?: string | null;
  }
}