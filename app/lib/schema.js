import {z} from "zod"

// for journal

export const journalSchema = z.object({
    title:z.string().min(1,"Titlel is required"),
    content: z.string().min(1,"Content is required"),
    mood: z.string().min(1,"Mood is required"),
    collectionId: z.string().optional()
})

export const collectionSchema = z.object({
    name: z.string().min(1,"Name is required"),
    description: z.string().optional()
})