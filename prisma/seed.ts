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
                            "https://m.media-amazon.com/images/I/81S-9DCV0JL._AC_SL1500_.jpg",
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
                            "https://m.media-amazon.com/images/I/811rWDv3zbL._AC_.jpg",
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
                            "https://m.media-amazon.com/images/I/81Y2-4uiMSL._AC_SL1500_.jpg",
                    },
                    {
                        name: "Leather Backpack",
                        slug: "leather-backpack",
                        description: "Stylish leather backpack for work and travel.",
                        price: 599900,
                        stock: 10,
                        imageUrl:
                            "https://m.media-amazon.com/images/I/91nYgA8pGrL._AC_SX679_.jpg",
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
                        imageUrl: "https://m.media-amazon.com/images/I/61evWZB8a2L._AC_SL1500_.jpg",
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
