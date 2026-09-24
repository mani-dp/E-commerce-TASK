import prisma from "../utils/prisma.js";

export const uploadUserImage = async (req, res, next) => {
    console.log("REQ USER:", req.user);
    console.log("USER ID:", req.user.id);
    try {
        const userId = req.user.id;
        const imageUrl = `/uploads/users/${req.file.filename}`;

        const userImage = await prisma.userImage.create({
            data: {
                imageUrl,
                userId,
            }
        });
        res.status(201).json({
            success: true,
            data: userImage,
            message: "User image uploaded successfully",

        })
    } catch (err) {
        next(err)
    }
};

export const getUserImages = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const images = await prisma.userImage.findMany({
            where: {
                userId,
            },
        });
        res.status(200).json({
            success: true,
            data: images,
            message: "User iamge fetched successfully",
        })
    } catch (err) {
        next(err)
    }
};

export const deleteUserImage = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const image = await prisma.userImage.findFirst({
            where: {
                id,
                userId,
            },
        });

        if (!image) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "User image not found",
            });
        }

        const deletedImage = await prisma.userImage.delete({
            where: {
                id,
            },
        });
        res.status(200).json({
            success: true,
            data: deletedImage,
            message: "User image deleted successfully",
        });
    } catch (err) {
        next(err);
    }
};