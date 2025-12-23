"use server";

import { addToGuestCart, clearGuestCart, getGuestCart, setGuestCart } from "@/lib/guest-cart";
import prisma from "@/lib/prisma";
import { CartProductSnapshot } from "@/lib/types";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CART_COOKIE } from "@/utils/contstant";

export async function mergeGuestCart(userId: string) {
    const guestItems = await getGuestCart();

    if (guestItems.length === 0) return;

    //  Get or create user cart
    const cart =
        (await prisma.cart.findUnique({
            where: { userId },
            include: { items: true },
        })) ??
        (await prisma.cart.create({
            data: { userId },
            include: { items: true },
        }));

    // Merge items
    for (const item of guestItems) {
        const existing = cart.items.find(
            (i) => i.productId === item.productId
        );

        if (existing) {
            await prisma.cartItem.update({
                where: { id: existing.id },
                data: {
                    quantity: existing.quantity + item.quantity,
                },
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId: item.productId,
                    name: item.name,
                    price: item.price,
                    imageUrl: item.imageUrl,
                    quantity: item.quantity,
                },
            });
        }
    }

    // Clear guest cart after merging
    const cookiesStore = await cookies();
    cookiesStore.delete(CART_COOKIE)
}

export async function addToCart(
    product: CartProductSnapshot,
    quantity = 1
) {
    const session = await getServerSession(authOptions);

    // 🟡 GUEST USER
    if (!session?.user) {
        await addToGuestCart(product, quantity);
        return;
    }

    // 🟢 LOGGED-IN USER
    const userId = session.user.id
    const cart =
        (await prisma.cart.findUnique({
            where: { userId },
        })) ??
        (await prisma.cart.create({
            data: { userId },
        }));

    const existing = await prisma.cartItem.findUnique({
        where: {
            cartId_productId: {
                cartId: cart.id,
                productId: product.id,
            },
        },
    });

    if (existing) {
        await prisma.cartItem.update({
            where: { id: existing.id },
            data: {
                quantity: existing.quantity + quantity,
            },
        });
    } else {
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity,
            },
        });
    }
}

export async function getCartItemCount() {
    const session = await getServerSession(authOptions);

    // 👤 Logged-in user
    if (session?.user) {
        const cart = await prisma.cart.findUnique({
            where: { userId: session.user.id },
            include: {
                items: true,
            },
        });

        return (
            cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0
        );
    }

    // 🧑 Guest user
    const cookieStore = await cookies()
    const guestCart = cookieStore.get("guest_cart");
    if (!guestCart) return 0;

    const items = JSON.parse(guestCart.value) as {
        quantity: number;
    }[];

    return items.reduce((sum, item) => sum + item.quantity, 0);
}

export async function getCart() {
    const session = await getServerSession(authOptions);

    // Logged-in user
    if (session?.user) {
        const cart = await prisma.cart.findUnique({
            where: { userId: session.user.id },
            include: { items: true },
        });

        return cart?.items ?? [];
    }

    // get Guest user cart
    return await getGuestCart();
}

export async function updateCartItem(
    productId: string,
    quantity: number
) {
    const session = await getServerSession(authOptions);

    // 🔐 Logged-in user
    if (session?.user) {
        await prisma.cartItem.updateMany({
            where: {
                productId,
                cart: { userId: session.user.id },
            },
            data: { quantity },
        });
        return;
    }

    // 👤 Guest user
    const cart = await getGuestCart();

    const updatedCart = cart.map((item) =>
        item.productId === productId
            ? { ...item, quantity }
            : item
    );

    await setGuestCart(updatedCart);
}

export async function removeCartItem(productId: string) {
    const session = await getServerSession(authOptions);

    // 🔐 Logged-in user
    if (session?.user) {
        await prisma.cartItem.deleteMany({
            where: {
                productId,
                cart: { userId: session.user.id },
            },
        });
        return;
    }

    // 👤 Guest user
    const cart = await getGuestCart();
    const updatedCart = cart.filter(
        (item) => item.productId !== productId
    );

    await setGuestCart(updatedCart);
}


export async function getCartForCheckout() {
    const session = await getServerSession(authOptions);

    // Logged-in user
    if (session?.user) {
        const cart = await prisma.cart.findUnique({
            where: { userId: session.user.id },
            include: { items: true },
        });

        return cart?.items ?? [];
    }

    // Guest
    return await getGuestCart();
}


