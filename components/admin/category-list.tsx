"use client"
import { Category } from '@prisma/client'
import Link from 'next/link';
import { useOptimistic } from 'react'
import DeleteCategoryButton from './delete-category-btn';

export default function CategoryList(
    { categories }: { categories: Category[] }
) {
    const [optimisticCategories, removeOptimistic] = useOptimistic(
        categories,
        (state, categoryId: string) => state.filter((c) => c.id !== categoryId)
    );

    return (
        <ul>
            {optimisticCategories.map((c) => (
                <li key={c.id} className="flex gap-4 p-2 border-b">
                    <span>{c.name}</span>
                    <Link className='cursor-pointer' href={`/admin/categories/${c.id}/edit`}>Edit</Link>

                    <DeleteCategoryButton id={c.id} onDelete={() => removeOptimistic(c.id)} />
                </li>
            ))}
        </ul>
    )
}
