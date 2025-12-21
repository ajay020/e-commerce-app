import { getCart } from "../actions/cart";
import CartItemRow from "@/components/cart-item-row";

export default async function CartPage() {
    const items = await getCart();

    const total = items.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
    );

    if (items.length === 0) {
        return <p className="p-8">Your cart is empty.</p>;
    }

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

            <div className="m-2">
                {items.map((item: any) => (
                    <CartItemRow key={item.productId} item={item} />
                ))}
            </div>
            
            <div className="mt-6 text-right font-semibold">
                Total: ₹{(total / 100).toFixed(2)}
            </div>
        </div>
    );
}
