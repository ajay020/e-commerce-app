"use server";

import { requireAdmin } from "@/lib/admin";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createCategory(formData: FormData) {
    await requireAdmin();

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;

    await prisma.category.create({
        data: { name, slug },
    });

    redirect("/admin/categories");
}

export async function updateCategory(formData: FormData) {
    await requireAdmin();

    const id = formData.get("id") as string;

    await prisma.category.update({
        where: { id },
        data: {
            name: formData.get("name") as string,
            slug: formData.get("slug") as string,
        },
    });

    redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
    await requireAdmin();

    // safety: prevent delete if products exist
    const productsCount = await prisma.product.count({
        where: { categoryId: id },
    });

    if (productsCount > 0) {
        throw new Error("Category has products");
    }

    await prisma.category.delete({
        where: { id },
    });

    redirect("/admin/categories");
}
