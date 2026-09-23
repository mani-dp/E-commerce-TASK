import prisma from "./src/utils/prisma.js";

const checkUser = async () => {
    const user = await prisma.user.findUnique({
        where: {
            id: "ce9f0ab7-7b7e-46db-8159-94782300f2c5",
        },
    });

    console.log("USER:", user);

    await prisma.$disconnect();
};

checkUser();