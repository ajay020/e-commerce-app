"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function placeOrder() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    const userId = session.user.id;

    // 1. Fetch cart
    const cart = await prisma.cart.findUnique({
        where: { userId },
        include: { items: true },
    });

    if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
    }

    // 2. Calculate total
    const totalAmount = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // 3. Create order + order items
    const order = await prisma.order.create({
        data: {
            userId,
            totalAmount,
            status: "PENDING",
            items: {
                create: cart.items.map((item) => ({
                    productId: item.productId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
            },
        },
    });

    // 4. Clear cart
    await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
    });

    return order.id;
}
