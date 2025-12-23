import prisma from "@/lib/prisma";
import Link from "next/link";
import { deleteCategory } from "@/app/actions/admin-categories";

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany();

    return (
        <div className="space-y-4">
            <Link href="/admin/categories/new">
                + Add Category
            </Link>

            <ul>
                {categories.map((c) => (
                    <li key={c.id} className="flex gap-4">
                        <span>{c.name}</span>

                        <Link href={`/admin/categories/${c.id}/edit`}>
                            Edit
                        </Link>

                        <form
                            action={async () => {
                                "use server";
                                await deleteCategory(c.id);
                            }}
                        >
                            <button type="submit">Delete</button>
                        </form>
                    </li>
                ))}
            </ul>
        </div>
    );
}
