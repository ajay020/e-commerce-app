import { cookies } from "next/headers";
import { CartProductSnapshot } from "./types";

const CART_COOKIE = "guest_cart";

export type GuestCartItem = {
    productId: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
};

export async function getGuestCart(): Promise<GuestCartItem[]> {
    const cookieStore = await cookies()
    const cart = cookieStore.get(CART_COOKIE)
    return cart ? JSON.parse(cart.value) : [];
}

export async function setGuestCart(cart: GuestCartItem[]) {
    const cookieStore = await cookies();

    cookieStore.set(CART_COOKIE, JSON.stringify(cart), {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
    });
}

export async function addToGuestCart(
    product: CartProductSnapshot,
    quantity: number
) {
    const cart = await getGuestCart();

    const existing = cart.find(
        (item) => item.productId === product.id
    );

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity,
        });
    }

    setGuestCart(cart);
}
