import prisma from "../utils/prisma.js";
import { deleteFile } from "../utils/file.js";


export const uploadUserImage = async (req, res, next) => {
    let imageUrl;

    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                data: null,
                message: "Image file is required",
            });
        }

        const userId = req.user.id;

        imageUrl = `/uploads/users/${req.file.filename}`;

        const userImage = await prisma.userImage.create({
            data: {
                imageUrl,
                userId,
            },
        });

        res.status(201).json({
            success: true,
            data: userImage,
            message: "User image uploaded successfully",
        });

    } catch (err) {

        // اگر DB شکست خورد، فایل اضافه را حذف کن
        if (imageUrl) {
            await deleteFile(imageUrl);
        }

        next(err);
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
        await prisma.userImage.delete({
            where: { id },
        });

        if (image.imageUrl) {
            await deleteFile(image.imageUrl);
        }

        res.status(200).json({
            success: true,
            data: image,
            message: "User image deleted successfully",
        });

    } catch (err) {
        next(err);
    }
};