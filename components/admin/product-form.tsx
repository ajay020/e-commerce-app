import { Category, Product } from "@prisma/client";

type Props = {
    product?: Product;
    categories: Category[];
    action: (formData: FormData) => Promise<void>;
};

export default function ProductForm({
    product,
    categories,
    action,
}: Props) {
    return (
        <form action={action} className="space-y-4 flex flex-col border p-4 bg-gray-200">

            {product && <input type="hidden" name="id" value={product.id} />}

            <input
                name="name"
                placeholder="Name"
                className="border p-2"
                defaultValue={product?.name}
                required
            />

            <textarea
                name="description"
                placeholder="Description"
                className="border p-2"
                defaultValue={product?.description}
                required
            />

            <input
                name="price"
                className="border p-2"
                defaultValue={product?.price}
                placeholder="Price (paise)"
                required
            />

            <input
                name="stock"
                placeholder="Stock"
                className="border p-2"
                defaultValue={product?.stock}
                required
            />

            <input
                name="imageUrl"
                className="border p-2"
                placeholder="image url"
                defaultValue={product?.imageUrl}
                required
            />

            <select className="p-2 border" name="categoryId" required defaultValue={product?.categoryId}>
                <option value="">Select category</option>
                {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>

            <button className="bg-blue-500 p-4 text-white cursor-pointer">
                {product ? "Update Product" : "Create Product"}
            </button>
        </form>
    );
}
