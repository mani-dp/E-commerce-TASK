import AppError from "../utils/AppError.js";
import prisma from "../utils/prisma.js";


export const getFavorites = async (req, res, next) => {
    try {
        const { userId } = req.user.id;
        const favorite = await prisma.favorite.findMany({
            where: {
                userId,
            },
            include: {
                product: {
                    include: {
                        category: true
                    }
                }
            }
        });
        res.status(200).json({
            success: true,
            data: favorite,
            message: "Product fetched successfully  ",
        })
    } catch (err) {
        next(err)
    }
}

export const addFavorite = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        const favorite = await prisma.favorite.create({
            data: {
                userId,
                productId,
            },
        });
        res.status(201).json({
            success: true,
            data: favorite,
            message: "Product added to favorites successfully ",
        });
    } catch (err) {
        next(err)
    }
};

export const removeFavorite = async (req, res, next) => {
    try {
        const { userId } = req.user.id;
        const { productId } = req.params;

        const favorite = await prisma.favorite.findFirst({
            where: {
                userId,
                productId,
            },
        });

            if (!favorite) {
                throw new AppError("Product is not in favorite", 404)
            }

        await prisma.favorite.delete({
            where: {
                id: favorite.id,
            },
        });

        res.status(200).json({
            success: true,
            data: null,
            message: "product emoved from favorites successfully"

        })

    } catch (err) {
        next(err)
    }
}