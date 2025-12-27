import Pagination from "../pagination";
import ProductCard from "./product-card";
import { getProducts } from "@/lib/products";

export default async function ProductList(
    { query, page, category }: { query?: string, page?: string, category?: string }
) {
    const currentPage = Number(page) || 1;

    const { products, totalPages } = await getProducts({ query, category, page: currentPage })

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                category={category}
            />
        </div>
    );
}