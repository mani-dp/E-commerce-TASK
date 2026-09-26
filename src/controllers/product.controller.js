import prisma from "../utils/prisma.js"
import { deleteFile } from "../utils/file.js";
import AppError from "../utils/AppError.js";

export const getProducts = async (request, response, next) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
            }
        });
        response.status(200).json({
            success: true,
            data: products,
            message: "Products fetched successfully",
        });
    } catch (err) {
        next(err)
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: {
                id,
            },
            include: {
                category: true,
            }
        })

        if (!product) {
            throw new AppError("Product not found", 404);
        }

        res.status(200).json({
            success: true,
            data: product,
            message: "Product fetch successfully",
        })
    } catch (err) {
        next(err)
    }
}

export const createProduct = async (req, res, next) => {
    let newImageUrl;

    try {
        const { name, description, price, stock, categoryId } = req.body;

        if (req.file) {
            newImageUrl = `/uploads/products/${req.file.filename}`;
        }

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: Number(price),
                stock: Number(stock),
                categoryId,
                imageUrl: newImageUrl ?? null,
            },
            include: {
                category: true,
            },
        });

        if (!product) {
                throw new AppError("Cannot create product", 500)
        }

        res.status(201).json({
            success: true,
            data: product,
            message: "Product created successfully",
        });

    } catch (err) {

        if (newImageUrl) {
            await deleteFile(newImageUrl);
        }

        next(err);
    }
};

export const updateProduct = async (req, res, next) => {

    let newImageUrl;
    try {
        const { id } = req.params;
        const { name, description, price, stock, categoryId } = req.body;

        const oldProduct = await prisma.product.findUnique({
            where: { id },
        });

        if (!oldProduct) {
            throw new AppError("Cannot update product", 500);
        }
        if (req.file) {
            newImageUrl = `/uploads/products/${req.file.filename}`;
        }

        const product = await prisma.product.update({
            where: { id },
            data: {
                ...(name !== undefined && { name }),
                ...(description !== undefined && { description }),
                ...(price !== undefined && { price: Number(price) }),
                ...(stock !== undefined && { stock: Number(stock) }),
                ...(categoryId !== undefined && { categoryId }),
                ...(newImageUrl !== undefined && {
                    imageUrl: newImageUrl,
                }),
            },
            include: {
                category: true,
            },
        });


        if (newImageUrl && oldProduct.imageUrl) {
            await deleteFile(oldProduct.imageUrl);
        }

        res.status(200).json({
            success: true,
            data: product,
            message: "Product updated successfully",
        });

    } catch (err) {

        if (newImageUrl) {
            await deleteFile(newImageUrl);
        }

        next(err);
    }
};


export const deleteProduct = async (req, res, next) => {

    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            throw new AppError("Cannot delete Product", 500);
        }
        await prisma.product.delete({
            where: { id },
        });
        if (product.imageUrl) {
            await deleteFile(product.imageUrl);
        }

        res.status(200).json({
            success: true,
            data: product,
            message: "Product deleted successfully",
        });

    } catch (err) {
        next(err);
    }
};