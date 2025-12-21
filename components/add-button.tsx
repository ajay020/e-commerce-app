"use client"

import { addToCart } from "@/app/actions/cart";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function AddToCartButton({ product }: { product: any }) {
    const [isPending, startTransition] = useTransition();
    const router =  useRouter()

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
            
            router.refresh();
        })
    }

    return (
        <button
            disabled={isPending}
            className={
                `${isPending ? "opacity-50 cursor-not-allowed" : ""}
             bg-black text-white p-2 cursor-pointer rounded disabled:opacity-50`
            }
            onClick={handleAddToCart}
        >
            {isPending ? "Adding..." : "Add to Cart"}
        </button>
    );
}


