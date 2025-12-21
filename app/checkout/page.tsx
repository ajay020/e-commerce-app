"use server"

import { notFound, redirect } from "next/navigation";
import { getCartForCheckout } from "../actions/cart";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import PlaceHolderButton from "./place-holder-button";

export default async function CheckoutPage() {
    const session = await getServerSession(authOptions);
    // if user is not sign in, redirect to login page
    if (!session?.user) {
        redirect("/login?redirect=/checkout");
    }

    const items = await getCartForCheckout();
    if (!items.length) notFound();

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <main className="max-w-3xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Checkout</h1>

            <ul className="space-y-4">
                {items.map((item) => (
                    <li key={item.productId} className="flex gap-4">
                        <img src={item.imageUrl} className="w-16 h-16 rounded" />
                        <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p>Qty: {item.quantity}</p>
                        </div>
                        <p>₹{((item.price * item.quantity) / 100).toFixed(2)}</p>
                    </li>
                ))}
            </ul>

            <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{(total / 100).toFixed(2)}</span>
            </div>

            <div className="mt-4">
                <PlaceHolderButton />
            </div>

        </main>
    );
}
