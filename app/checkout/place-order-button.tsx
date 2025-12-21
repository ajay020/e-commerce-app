"use client";

import { placeOrder } from "../actions/cart";

export default function PlaceOrderButton({ total }: { total: number }) {
    return (
        <button
            className="w-full bg-black text-white py-3 rounded"
            onClick={async () => {
                await placeOrder();
                window.location.href = "/order-success";
            }}
        >
            Place Order
        </button>
    );
}
