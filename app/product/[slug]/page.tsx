import { getProductBySlug } from "@/lib/products";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const product = await getProductBySlug(slug);

    return {
        title: product?.name,
        description: product?.description,
    };
}


export default async function ProductPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    const product = await getProductBySlug(slug);

    if (!product) notFound();

    return (
        <main className="p-8 bg-white grid md:grid-cols-2 gap-8">
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full rounded-lg"
            />

            <div>
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <p className="text-gray-600 my-4">{product.description}</p>
                <p className="text-xl font-semibold">
                    ₹{(product.price / 100).toFixed(2)}
                </p>

                <button className="mt-6 px-6 py-3 bg-black text-white rounded">
                    Add to Cart
                </button>
            </div>
        </main>
    );
}
