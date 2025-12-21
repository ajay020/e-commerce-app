"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
    updateCartItem,
    removeCartItem,
} from "@/app/actions/cart";

export default function CartItemRow({ item }: { item: any }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    function updateQuantity(quantity: number) {
        startTransition(async () => {
            await updateCartItem(item.productId, quantity);
            router.refresh();
        });
    }

    function removeItem() {
        startTransition(async () => {
            await removeCartItem(item.productId);
            router.refresh();
        });
    }

    return (
        <div className=" flex items-center gap-4 border p-4 mt-2 rounded">
            <img
                src={item.imageUrl}
                className="w-16 h-16 object-cover"
            />

            <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">
                    ₹{(item.price / 100).toFixed(2)}
                </p>
            </div>

            <input
                type="number"
                min={1}
                value={item.quantity}
                disabled={isPending}
                onChange={(e) =>
                    updateQuantity(Number(e.target.value))
                }
                className="w-16 border p-1"
            />

            <button
                onClick={removeItem}
                disabled={isPending}
                className="text-red-500 "
            >
                {isPending ? "Removing..." : "Remove"}
            </button>
        </div>
    );
}
