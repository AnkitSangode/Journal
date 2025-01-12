import { PrismaClient } from "@prisma/client";

//Every time app refreshes so it creates a new instance of prismaclient and to prevent this

export const db = globalThis.prisma || new PrismaClient()

if(process.env.NODE_ENV !== "production") {
    globalThis.prisma = db
}