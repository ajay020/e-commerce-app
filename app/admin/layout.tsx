import { requireAdmin } from "@/lib/admin";
import Link from "next/link";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await requireAdmin();

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-gray-900 text-white p-4">
                <nav className="flex flex-col">
                    <Link href="/admin/products">Products</Link>
                    <Link href="/admin/orders">Orders</Link>
                </nav>
            </aside>

            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
