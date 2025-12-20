"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function registerUser(
    email: string,
    password: string,
    name?: string
) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existing = await prisma.user.findUnique({
        where: { email },
    });

    if (existing) {
        throw new Error("Email already exists");
    }

    await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });
}
