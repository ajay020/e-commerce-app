import { z } from "zod";

export const CategorySchema = z.object({
    id: z.string().optional(), // Optional for creation, required for updates
    name: z.string().min(2, "Name must be at least 2 characters"),
    slug: z
        .string()
        .min(2, "Slug must be at least 2 characters")
        .regex(/^[a-z0-z0-9-]+$/, "Slug can only contain letters, numbers, and hyphens"),
});