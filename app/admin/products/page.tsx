import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Products</h1>

            <Link href="/admin/products/new" className="bg-blue-500 p-2 text-white rounded">
                + Add Product
            </Link>

            <table className="w-full mt-4 border border-gray-200 rounded overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Price</th>
                        <th className="p-2 text-left">Stock</th>
                        <th className="p-2" />
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p.id} className="border-t hover:bg-gray-50">
                            <td className="p-2">{p.name}</td>
                            <td className="p-2">₹{(p.price / 100).toFixed(2)}</td>
                            <td className="p-2">{p.stock}</td>
                            <td className="p-2">
                                <Link
                                    href={`/admin/products/${p.id}/edit`}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}
