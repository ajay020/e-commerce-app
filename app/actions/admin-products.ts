"use server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { ActionResult } from "@/lib/types";

export async function createProduct(formData: FormData): Promise<ActionResult> {
    try {
        await requireAdmin();

        const categoryId = formData.get("categoryId") as string;

        if (!categoryId) {
            return {
                error: "Category Id is Incorrect"
            }
        }

        await prisma.product.create({
            data: {
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                price: Number(formData.get("price")),
                stock: Number(formData.get("stock")),
                imageUrl: formData.get("imageUrl") as string,
                slug: crypto.randomUUID(),
                categoryId,
            },
        });

        return {
            success: true,
            message: "Product created!"
        }
    } catch (error) {
        console.error("[CREATE_PRODUCT_ERROR]:", error);

        return {
            error: "An unexpected database error occurred."
        };
    }
}


export async function updateProduct(formData: FormData) {

    try {
        await requireAdmin();

        const id = formData.get("id") as string;

        await prisma.product.update({
            where: { id },
            data: {
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                price: Number(formData.get("price")),
                stock: Number(formData.get("stock")),
                imageUrl: formData.get("imageUrl") as string,
                categoryId: formData.get("categoryId") as string,
            },
        });

        return {
            success: true,
            message: "Product updated!"
        }
    } catch (error) {
        console.error("[UDPATE_PRODUCT_ERROR]:", error);

        return {
            error: "An unexpected database error occurred."
        };
    }



}
