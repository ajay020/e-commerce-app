import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function OrderSuccessPage(
    { params }: { params: Promise<{ orderId: string }> }
) {
    const { orderId } = await params
    const order = await prisma.order.findUnique({
        where: { id: orderId },
    });

    if (!order) notFound();

    return (
        <div className="max-w-xl mx-auto p-6 text-center">
            <h1 className="text-3xl font-bold text-green-600">
                Order Placed Successfully 🎉
            </h1>

            <p className="mt-4">Order ID:</p>
            <p className="font-mono text-sm">{order.id}</p>

            <p className="mt-4">
                Total Amount: ₹{(order.totalAmount / 100).toFixed(2)}
            </p>

            <p className="mt-2 text-gray-600">
                Status: {order.status}
            </p>
        </div>
    );
}
