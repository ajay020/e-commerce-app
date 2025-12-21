import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function OrderDetailsPage({
    params,
}: {
    params: Promise<{ orderId: string }>
}) {
    const { orderId } = await params
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect("/login");
    }

    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            userId: session.user.id,
        },
        include: {
            items: true,
        },
    });

    if (!order) notFound();

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">
                Order Details
            </h1>

            <p className="text-sm text-gray-500 mb-6">
                Order ID: {order.id}
            </p>

            <ul className="space-y-4">
                {order.items.map((item) => (
                    <li
                        key={item.id}
                        className="flex justify-between border-b pb-2"
                    >
                        <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">
                                Qty: {item.quantity}
                            </p>
                        </div>

                        <p>
                            ₹{((item.price * item.quantity) / 100).toFixed(2)}
                        </p>
                    </li>
                ))}
            </ul>

            <div className="mt-6 text-right font-bold">
                Total: ₹{(order.totalAmount / 100).toFixed(2)}
            </div>
        </div>
    );
}
