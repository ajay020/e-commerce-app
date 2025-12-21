"use client";

import { useOptimistic, useTransition } from "react";
import { useRouter } from "next/navigation";
import CartButton from "./cart-button";
import { addToCart } from "@/app/actions/cart";

export default function CartButtonWrapper({
    initialCount,
    product,
}: {
    initialCount: number;
    product: any;
}) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [count, addOptimistic] = useOptimistic(
        initialCount,
        (state, increment: number) => state + increment
    );

    async function handleAddToCart() {
        // 🚀 Optimistic update
        addOptimistic(1);

        startTransition(async () => {
            await addToCart(
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    imageUrl: product.imageUrl,
                },
                1
            )
            // 🔄 Sync server state
            router.refresh();
        });
    }

    return (
        <div>
            <button
                onClick={handleAddToCart}
                disabled={isPending}
                className="mt-2 px-4 py-2 bg-black text-white rounded"
            >
                {isPending ? "Adding..." : "Add to Cart"}
            </button>
        </div>
    );
}
