import { updateProduct } from '@/app/actions/admin-products';
import ProductForm from '@/components/admin/product-form';
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation';

export default async function EditProduct(
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    const product = await prisma.product.findUnique({
        where: { id: id }
    })

    if (!product) notFound();

    const categories = await prisma.category.findMany();

    return (
        <ProductForm
            product={product}
            categories={categories}
            action={updateProduct}
        />
    );
}
