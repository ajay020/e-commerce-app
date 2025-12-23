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
        <form action={action} className="space-y-4">
        
            {product && <input type="hidden" name="id" value={product.id} />}

            <input
                name="name"
                placeholder="Name"
                defaultValue={product?.name}
                required
            />

            <textarea
                name="description"
                defaultValue={product?.description}
                required
            />

            <input
                name="price"
                defaultValue={product?.price}
                placeholder="Price (paise)"
                required
            />

            <input
                name="stock"
                defaultValue={product?.stock}
                required
            />

            <input
                name="imageUrl"
                defaultValue={product?.imageUrl}
                required
            />

            <select name="categoryId" required defaultValue={product?.categoryId}>
                <option value="">Select category</option>
                {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>

            <button>
                {product ? "Update Product" : "Create Product"}
            </button>
        </form>
    );
}
