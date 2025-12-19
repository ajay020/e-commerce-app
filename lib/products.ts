import prisma from "./prisma";

export async function getProducts() {
    return prisma.product.findMany({
        include: {
            category: true,
        },
    });
}

export async function getProductBySlug(slug: string) {
    return prisma.product.findUnique({
        where: { slug },
        include: {
            category: true,
        },
    });
}
