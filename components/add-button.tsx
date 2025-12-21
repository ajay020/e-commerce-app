"use client"

import { addToCart } from "@/app/actions/cart";
import { useTransition } from "react";

export default function AddToCartButton({ product }: { product: any }) {
    const [isPending, startTransition] = useTransition();

    async function handleAddToCart() {

        startTransition(async () => {
            await addToCart(
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    imageUrl: product.imageUrl,
                },
            )
        })
    }

    return (
        <button
            className=" bg-black text-white p-2 pointer rounded disabled:opacity-50"
            onClick={handleAddToCart}
        >
            {isPending ? "Adding..." : "Add to Cart"}
        </button>
    );
}


