import { Category } from "@prisma/client";

type Props = {
    category?: Category;
    action: (formData: FormData) => Promise<void>;
};

export default function CategoryForm({ category, action }: Props) {
    return (
        <form action={action} className="space-y-4 max-w-md">
            {category && (
                <input type="hidden" name="id" value={category.id} />
            )}

            <input
                name="name"
                placeholder="Category name"
                defaultValue={category?.name}
                required
            />

            <input
                name="slug"
                placeholder="Slug (e.g. electronics)"
                defaultValue={category?.slug}
                required
            />

            <button>
                {category ? "Update Category" : "Create Category"}
            </button>
        </form>
    );
}
