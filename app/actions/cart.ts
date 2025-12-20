"use server";

import { addToGuestCart } from "@/lib/guest-cart";
import prisma from "@/lib/prisma";
import { CartProductSnapshot, GuestCartItem } from "@/lib/types";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

export async function mergeCart(userId: string, guestCart: GuestCartItem[]) {
    const cart =
        (await prisma.cart.findUnique({
            where: { userId },
            include: { items: true },
        })) ??
        (await prisma.cart.create({
            data: { userId },
            include: { items: true },
        }));

    for (const item of guestCart) {
        const existing = cart.items.find(
            (i) => i.productId === item.productId
        );

        if (existing) {
            await prisma.cartItem.update({
                where: { id: existing.id },
                data: { quantity: existing.quantity + item.quantity },
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
}

export async function addToCart(
    product: CartProductSnapshot,
    quantity = 1
) {
    const session = await getServerSession();

    // 🟡 GUEST USER
    if (!session?.user) {
        addToGuestCart(product, quantity);
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