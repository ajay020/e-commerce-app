"use client";

import Link from "next/link";

export default function CartButton() {
    return (
        <Link href="/cart" className="relative">
            🛒
        </Link>
    );
}
