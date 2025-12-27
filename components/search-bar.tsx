"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const [query, setQuery] = useState(
        searchParams.get("query") ?? ""
    );

    function onSearch(e: React.FormEvent) {
        e.preventDefault();

        startTransition(() => {
            const params = new URLSearchParams();

            if (query) params.set("query", query);

            router.push(`/products/?${params.toString()}`);
        });
    }

    return (
        <form onSubmit={onSearch} className="relative">
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="border rounded px-3 py-1 w-80"
            />

            <button type="submit" className="bg-black rounded px-2 py-1 text-white cursor-pointer ml-2">
                Search
            </button>
            {isPending && (
                <span className="absolute right-2 top-1 text-sm">...</span>
            )}
        </form>
    );
}
