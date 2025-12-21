import { getCartItemCount } from "@/app/actions/cart";
import AddToCartButton from "@/components/add-button";
import CartButtonWrapper from "@/components/Cart-button-wrapper";
import { getProductBySlug } from "@/lib/products";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const product = await getProductBySlug(slug);

    console.log("Session>>>", getServerSession())

    return {
        title: product?.name,
        description: product?.description,
    };
}

export default async function ProductDetailsPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    const cartCount = await getCartItemCount();

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

                <AddToCartButton product={
                    {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        imageUrl: product.imageUrl
                    }
                } />

            </div>
        </main>
    );
}
