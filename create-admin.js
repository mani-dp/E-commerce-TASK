import bcrypt from "bcrypt";
import prisma from "./src/utils/prisma.js";

const createAdmin = async () => {
    try {
        const hashedPassword = await bcrypt.hash("mwwm1234", 10);

        const admin = await prisma.user.create({
            data: {
                name: "mani",
                email: "admin@gmail.com",
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