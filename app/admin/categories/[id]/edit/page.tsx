import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import CategoryForm from "@/components/admin/category-form";
import { updateCategory } from "@/app/actions/admin-categories";

export default async function EditCategoryPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const category = await prisma.category.findUnique({
        where: { id: id },
    });

    if (!category) notFound();

    return (
        <CategoryForm
            category={category}
            action={updateCategory}
        />
    );
}