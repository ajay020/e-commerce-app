import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CartButton from "./cart-button";
import AuthButton from "./auth-button";
import { getCartItemCount } from "@/app/actions/cart";

export default async function Navbar() {
    const session = await getServerSession(authOptions);
    const cartCount = await getCartItemCount();

    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b">
            <Link href="/" className="font-bold text-lg">
                Shop
            </Link>

            <div className="flex items-center gap-4">
                <CartButton count={cartCount} />

                <AuthButton session={session} />
            </div>
        </nav>
    );
}