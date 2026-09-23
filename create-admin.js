//      email   : "admin@example.com"

import bcrypt from "bcrypt";
import prisma from "./src/utils/prisma.js";

const createAdmin = async () => {
    try {
        const hashedPassword = await bcrypt.hash("Admin123456", 10);

        const admin = await prisma.user.create({
            data: {
                name: "Admin",
                email: "admin@example.com",
                password: hashedPassword,
                role: "ADMIN",
            },
        });

    } catch (error) {
        console.error("Error creating admin:", error);
    } finally {
        await prisma.$disconnect();
    }
};

createAdmin();