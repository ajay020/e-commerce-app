export default function ProductSkeleton() {
    return (
        <div className="border rounded-lg p-4 space-y-3 animate-pulse">
            <div className="bg-gray-200 h-48 w-full rounded-md" />
            <div className="bg-gray-200 h-6 w-3/4 rounded" />
            <div className="bg-gray-200 h-4 w-1/2 rounded" />
        </div>
    );
}

export function ProductGridSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <ProductSkeleton key={i} />
            ))}
        </div>
    );
}