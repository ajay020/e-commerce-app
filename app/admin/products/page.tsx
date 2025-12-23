import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Products</h1>

            <Link href="/admin/products/new" className="btn">
                + Add Product
            </Link>

            <table className="w-full mt-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>₹{(p.price / 100).toFixed(2)}</td>
                            <td>{p.stock}</td>
                            <td>
                                <a href={`/admin/products/${p.id}/edit`}>
                                    Edit
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
