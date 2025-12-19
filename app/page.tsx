import { getProducts } from "@/lib/products";
import Link from "next/link";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="border rounded-lg p-4 hover:shadow"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-40 w-full object-cover mb-4"
            />
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-500">
              ₹{(product.price / 100).toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
