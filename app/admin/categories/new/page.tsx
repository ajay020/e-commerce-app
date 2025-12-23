import CategoryForm from "@/components/admin/category-form";
import { createCategory } from "@/app/actions/admin-categories";

export default function NewCategoryPage() {
    return <CategoryForm action={createCategory} />;
}
