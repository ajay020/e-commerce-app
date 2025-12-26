"use client"

import { ActionResult } from "@/lib/types";
import { Category, Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
    product?: Product;
    categories: Category[];
    action: (formData: FormData) => Promise<ActionResult>;
};

export default function ProductForm({
    product,
    categories,
    action,
}: Props) {

    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleAction = async (formData: FormData) => {
        startTransition(async () => {
            const result = await action(formData);

            if (result?.success) {
                toast.success(result.message || "Operation successful!");
                router.push("/admin/products")
            } else if (result?.error) {
                toast.error(result.error);
            }
        })
    }

    return (
        <form action={handleAction} className="space-y-4 flex flex-col border p-4 bg-gray-200">

            {product && <input type="hidden" name="id" value={product.id} />}

            <input
                name="name"
                placeholder="Name"
                className="border p-2"
                defaultValue={product?.name}
                required
            />

            <textarea
                name="description"
                placeholder="Description"
                className="border p-2"
                defaultValue={product?.description}
                required
            />

            <input
                name="price"
                className="border p-2"
                defaultValue={product?.price}
                placeholder="Price (paise)"
                required
            />

            <input
                name="stock"
                placeholder="Stock"
                className="border p-2"
                defaultValue={product?.stock}
                required
            />

            <input
                name="imageUrl"
                className="border p-2"
                placeholder="image url"
                defaultValue={product?.imageUrl}
                required
            />

            <select className="p-2 border" name="categoryId" required defaultValue={product?.categoryId}>
                <option value="">Select category</option>
                {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>

            <button
                type="submit"
                disabled={isPending}
                className="bg-blue-600 text-white cursor-pointer p-2 rounded disabled:bg-blue-300 flex items-center justify-center gap-2"
            >
                {isPending && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {product ? "Update Product" : "Create Product"}
            </button>
        </form>
    );
}
