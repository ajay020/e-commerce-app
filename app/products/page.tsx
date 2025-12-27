import CategoryFilter from "@/components/category/category-filter";
import ProductList from "@/components/product/product-list";
import { ProductGridSkeleton } from "@/components/product/product-skeleton";
import { Suspense } from "react";
import { getCategories } from "../actions/admin-categories";

export default async function ProductsPage(
    { searchParams }: { searchParams: Promise<{ query?: string, page?: string, category?: string }> }
) {
    const { query, page, category } = await searchParams
    const currentKey = `${query}-${page}-${category}`;

    const categories = await getCategories()

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-6">Products</h1>
            <CategoryFilter categories={categories} selected={category} query={query} />

            <Suspense key={currentKey} fallback={<ProductGridSkeleton />}>
                <ProductList query={query} page={page} category={category} />
            </Suspense>
        </main>
    );
}
