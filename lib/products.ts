import { Prisma } from "@/prisma/generated/prisma";
import prisma from "./prisma";

const PAGE_SIZE = 6;

export async function getProducts({
    query = "",
    page = 1,
    category = ""
}: {
    query?: string;
    page?: number;
    category?: string;
}) {
    const whereClause: any = {};

    if (query) {
        whereClause.OR = [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
        ];
    }

    if (category) {
        whereClause.category = {
            slug: category,
        };
    }

    // simulate dealy
    await new Promise(res => setTimeout(res, 3000))

    const [total, products] = await Promise.all([
        prisma.product.count({ where: whereClause }),
        prisma.product.findMany({
            where: whereClause,
            include: { category: true },
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * PAGE_SIZE,
            take: PAGE_SIZE,
        }),
    ]);

    return {
        products,
        total,
        totalPages: Math.ceil(total / PAGE_SIZE),
        page,
        pageSize: PAGE_SIZE,
    };
}


export async function getProductBySlug(slug: string) {
    return prisma.product.findUnique({
        where: { slug },
        include: {
            category: true,
        },
    });
}
