"use server";

import { requireAdmin } from "@/lib/admin";
import prisma from "@/lib/prisma";
import { ActionResult } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { CategorySchema } from "../schemas/category";


export async function getCategories() {
    return prisma.category.findMany({
        orderBy: { name: "asc" },
    });
}

export async function createCategory(formData: FormData): Promise<ActionResult> {
    try {
        await requireAdmin();

        // 1. Convert FormData to an object and Validate
        const validatedFields = CategorySchema.safeParse(
            Object.fromEntries(formData.entries())
        );

        // console.log(validatedFields)

        if (!validatedFields.success) {
            return {
                error: validatedFields.error.flatten().fieldErrors.name?.[0] || "Invalid input",
            };
        }

        const { id, name, slug } = validatedFields.data;

        await prisma.category.create({
            data: { name, slug },
        });

        return {
            success: true,
            message: "Category has been created."
        };

    } catch (error) {
        console.error("[CREATE_CATEGORY_ERROR]:", error);

        return {
            error: "An unexpected database error occurred. Please try again."
        };
    }
}

export async function updateCategory(formData: FormData): Promise<ActionResult> {

    try {
        await requireAdmin();

        const id = formData.get("id") as string;

        await prisma.category.update({
            where: { id },
            data: {
                name: formData.get("name") as string,
                slug: formData.get("slug") as string,
            },
        });

        return {
            success: true,
            message: "Category has been updated."
        };

    } catch (error) {
        console.error("[UPDATE_CATEGORY_ERROR]:", error);

        return {
            error: "An unexpected database error occurred. Please try again."
        };
    }


}

export async function deleteCategory(
    _: ActionResult | null,
    formData: FormData
): Promise<ActionResult> {
    try {
        //  Authorization Check
        await requireAdmin();

        const id = formData.get("id");
        if (!id || typeof id !== "string") {
            return { error: "Invalid category ID provided." };
        }

        const hasProducts = await prisma.product.findFirst({
            where: { categoryId: id },
            select: { id: true }
        });

        if (hasProducts) {
            return {
                error: "Cannot delete: This category is still linked to products.",
            };
        }

        await prisma.category.delete({
            where: { id }
        });

        revalidatePath("/admin/categories");

        return {
            success: true,
            message: "Category has been permanently removed."
        };
    } catch (error) {
        console.error("[DELETE_CATEGORY_ERROR]:", error);

        return {
            error: "An unexpected database error occurred. Please try again."
        };
    }

}

