"use server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
    await requireAdmin();

    const categoryId = formData.get("categoryId") as string;

    if (!categoryId) {
        throw new Error("Category is required");
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

    redirect("/admin/products");
}


export async function updateProduct(formData: FormData) {
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

    redirect("/admin/products");
}
