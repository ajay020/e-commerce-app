"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function AuthButton({
    session,
}: {
    session: any;
}) {
    if (!session?.user) {
        return (
            <Link href="/login" className="px-3 py-1 border rounded">
                Login
            </Link>
        );
    }

    return (
        <button
            onClick={() => signOut()}
            className="px-3 py-1 border rounded"
        >
            Logout
        </button>
    );
}
