import { Product } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="border rounded-lg p-4 hover:shadow"
        >
            <img
                src={product.imageUrl}
                alt={product.name}
                className="h-40 w-full object-cover mb-4"
            />
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-500">
                ₹{(product.price / 100).toFixed(2)}
            </p>
        </Link>
    )
}
