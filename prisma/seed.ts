import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
    adapter
});

async function main() {
    console.log("🌱 Seeding database...");

    // Clean DB (optional but recommended)
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    await prisma.category.create({
        data: {
            name: "Electronics",
            slug: "electronics",
            products: {
                create: [
                    {
                        name: "Wireless Headphones",
                        slug: "wireless-headphones",
                        description: "High quality wireless sound with noise cancellation.",
                        price: 299900,
                        stock: 15,
                        imageUrl:
                            "https://images.unsplash.com/photo-1518441986872-5a1a1c3c33b1",
                    },
                    {
                        name: "Smart Watch",
                        slug: "smart-watch",
                        description: "Track fitness, heart rate and notifications.",
                        price: 499900,
                        stock: 20,
                        imageUrl:
                            "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
                    },
                    {
                        name: "Bluetooth Speaker",
                        slug: "bluetooth-speaker",
                        description: "Portable speaker with deep bass.",
                        price: 199900,
                        stock: 30,
                        imageUrl:
                            "https://images.unsplash.com/photo-1585386959984-a41552231693",
                    },
                ],
            },
        },
    });

    await prisma.category.create({
        data: {
            name: "Fashion",
            slug: "fashion",
            products: {
                create: [
                    {
                        name: "Men's Sneakers",
                        slug: "mens-sneakers",
                        description: "Comfortable everyday sneakers.",
                        price: 349900,
                        stock: 25,
                        imageUrl:
                            "https://images.unsplash.com/photo-1528701800489-20be3c6a28c4",
                    },
                    {
                        name: "Leather Backpack",
                        slug: "leather-backpack",
                        description: "Stylish leather backpack for work and travel.",
                        price: 599900,
                        stock: 10,
                        imageUrl:
                            "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
                    },
                ],
            },
        },
    });

    await prisma.category.create({
        data: {
            name: "Gaming",
            slug: "gaming",
            products: {
                create: [
                    {
                        name: "Mechanical Keyboard",
                        slug: "mechanical-keyboard",
                        description: "RGB backlit mechanical keyboard with blue switches.",
                        price: 899900,
                        stock: 15,
                        imageUrl: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
                    },
                    {
                        name: "Pro Gaming Mouse",
                        slug: "pro-gaming-mouse",
                        description: "High-precision 16000 DPI optical sensor mouse.",
                        price: 459900,
                        stock: 30,
                        imageUrl: "https://unsplash.com/photos/black-and-yellow-logitech-computer-mouse-Pv--vb5vwzQ",
                    },
                ],
            },
        },
    });

    

    console.log("✅ Seeding completed");
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
