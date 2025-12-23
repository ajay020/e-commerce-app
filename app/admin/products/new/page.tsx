import prisma from "@/lib/prisma";
import { createProduct } from "@/app/actions/admin-products";
import ProductForm from "@/components/admin/product-form";

export default async function NewProductPage() {
    const categories = await prisma.category.findMany();

    return (
        <ProductForm
            categories={categories}
            action={createProduct}
        />
    );
}
