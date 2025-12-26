"use client";
import { useFormStatus } from "react-dom";
import { deleteCategory } from "@/app/actions/admin-categories";
import { toast } from "sonner";
import { useTransition } from "react";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button disabled={pending} className="cursor-pointer text-red-500">
            {pending ? "Deleting..." : "Delete"}
        </button>
    );
}

export default function DeleteCategoryButton(
    { id, onDelete }: { id: string, onDelete: () => void }
) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = async (formData: FormData) => {
        startTransition(async () => {
            onDelete();
            const result = await deleteCategory(null, formData)

            if (result.success) toast.success(result.message)
            else toast.error(result.error)
        })
    }

    return (
        <>
            <form action={(formData) => handleDelete(formData)}
            >
                <input type="hidden" name="id" value={id} />
                <SubmitButton />
            </form >
        </>
    );
}
