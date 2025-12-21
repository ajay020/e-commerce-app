import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function OrdersPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect("/login?redirect=/login");
    }

    const orders = await prisma.order.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>

            {orders.length === 0 && (
                <p>You have not placed any orders yet.</p>
            )}

            <ul className="space-y-4">
                {orders.map((order) => (

                    <Link key={order.id} href={`/orders/${order.id}`}>
                        <li
                            className="border rounded p-4 flex justify-between items-center"
                        >
                            <div>
                                <p className="font-mono text-sm">{order.id}</p>
                                <p className="text-gray-500 text-sm">
                                    {order.createdAt.toDateString()}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="font-semibold">
                                    ₹{(order.totalAmount / 100).toFixed(2)}
                                </p>
                                <p className="text-sm text-gray-600">{order.status}</p>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}
