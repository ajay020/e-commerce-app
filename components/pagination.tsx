import Link from "next/link";

export default function Pagination({
    currentPage,
    totalPages,
    query,
    category
}: {
    currentPage: number;
    totalPages: number;
    query?: string;
    category?: string
}) {
    if (totalPages <= 1) return null;

    const createUrl = (page: number) => {
        const params = new URLSearchParams();
        if (query) params.set("query", query);
        if (category) params.set("category", category);
        params.set("page", page.toString());
        return `/products?${params.toString()}`;
    };

    return (
        <div className="flex justify-center gap-4 mt-8">
            {currentPage > 1 && (
                <Link href={createUrl(currentPage - 1)}>
                    ← Previous
                </Link>
            )}

            <span>
                Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages && (
                <Link href={createUrl(currentPage + 1)}>
                    Next →
                </Link>
            )}
        </div>
    );
}
