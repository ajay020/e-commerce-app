"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function CategoryFilter({
    categories,
    selected,
    query,
}: {
    categories: { id: string; name: string; slug: string }[];
    selected?: string;
    query?: string;
}) {
    const router = useRouter();

    function onChange(slug: string) {
        const params = new URLSearchParams();
        if (query) params.set("query", query);
        if (slug) params.set("category", slug);
        router.push(`/products?${params.toString()}`);
    }

    return (
        <select
            value={selected ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className="border px-3 py-2 rounded"
        >
            <option value="">All Categories</option>
            {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                    {c.name}
                </option>
            ))}
        </select>
    );
}


// export default function CategoryFilter({ categories }: { categories: any[] }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const currentCategory = searchParams.get("category") || "";

//   const handleCategoryChange = (id: string) => {
//     const params = new URLSearchParams(searchParams);
//     params.set("page", "1"); // Always reset to page 1

//     if (id) {
//       params.set("category", id);
//     } else {
//       params.delete("category");
//     }

//     router.push(`/products?${params.toString()}`);
//   };

//   return (
//     <select
//       value={currentCategory}
//       onChange={(e) => handleCategoryChange(e.target.value)}
//       className="border p-1 rounded-md bg-white"
//     >
//       <option value="">All Categories</option>
//       {categories.map((cat) => (
//         <option key={cat.id} value={cat.id}>
//           {cat.name}
//         </option>
//       ))}
//     </select>
//   );
// }