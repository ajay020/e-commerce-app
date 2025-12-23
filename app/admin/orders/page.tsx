import prisma from "@/lib/prisma";

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        include: { user: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div>
            <h1 className="text-2xl font-bold">Orders</h1>

            <ul className="mt-4 space-y-4">
                {orders.map((o) => (
                    <li key={o.id} className="border p-4">
                        <p>Order: {o.id}</p>
                        <p>User: {o.user.email}</p>
                        <p>Status: {o.status}</p>
                        <p>Total: ₹{(o.totalAmount / 100).toFixed(2)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
