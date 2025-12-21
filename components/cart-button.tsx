"use client";

import Link from "next/link";

export default function CartButton({ count }: { count: number }) {

    return (
        <Link href="/cart" className="relative">
            <span className="text-xl">🛒</span>

            {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1">
                    {count}
                </span>
            )}
        </Link>
    );
}
