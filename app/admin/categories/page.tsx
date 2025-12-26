import prisma from "@/lib/prisma";
import Link from "next/link";
import CategoryList from "@/components/admin/category-list";

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany();

    return (
        <div className="space-y-4">
            <Link href="/admin/categories/new">
                + Add Category
            </Link>

            <CategoryList categories={categories} />

        </div>
    );
}
