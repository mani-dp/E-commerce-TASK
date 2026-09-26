import prisma from "../utils/prisma.js";
import { deleteFile } from "../utils/file.js";
import AppError from "../utils/AppError.js";


export const uploadUserImage = async (req, res, next) => {
    let imageUrl;

    try {

        if (!red.file) {
            throw new AppError("Image file is required", 400)
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
            throw new AppError("User image not found", 404)
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