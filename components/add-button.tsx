"use client"

import { addToCart } from "@/app/actions/cart";

export default function AddToCartButton({ product }: { product: any }) {
    return (
        <button
            onClick={() =>
                addToCart(
                    {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        imageUrl: product.imageUrl,
                    },
                    1
                )
            }
        >
            Add to Cart
        </button>
    );
}


