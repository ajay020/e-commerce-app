"use client"

import { ActionResult } from "@/lib/types";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
    category?: Category;
    action: (formData: FormData) => Promise<ActionResult>;
};

export default function CategoryForm({ category, action }: Props) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter()

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            const result = await action(formData);

            if (result?.success) {
                toast.success(result.message || "Operation successful!");
                router.push("/admin/categories")
            } else if (result?.error) {
                toast.error(result.error);
            }
        });
    };

    return (
        <form action={handleSubmit} className="space-y-4 max-w-md flex flex-col">
            {category && (
                <input type="hidden" name="id" value={category.id} />
            )}

            <input
                name="name"
                className="border p-2 rounded"
                placeholder="Category name"
                defaultValue={category?.name}
                required
            />

            <input
                name="slug"
                className="border p-2 rounded"
                placeholder="Slug (e.g. electronics)"
                defaultValue={category?.slug}
                required
            />

            <button
                type="submit"
                disabled={isPending}
                className="bg-blue-600 text-white cursor-pointer p-2 rounded disabled:bg-blue-300 flex items-center justify-center gap-2"
            >
                {isPending && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {category ? "Update Category" : "Create Category"}
            </button>
        </form>
    );
}
