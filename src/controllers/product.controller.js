import prisma from "../utils/prisma.js"

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
            return res.status(404).json({
                success: false,
                data: null,
                message: "Product not found",
            })
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
    try {
        const {
            name,
            description,
            price,
            stock,
            categoryId,
        } = req.body;

        const imageUrl = req.file ? `/uploads/products/${req.file.filename}` : null;

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: Number(price),
                stock: Number(stock),
                categoryId,
                imageUrl,
            },
            include: {
                category: true,
            }

        })
        res.status(201).json({
            success: true,
            data: product,
            message: "Product created successfully",
        })

    } catch (err) {
        next(err)
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const {
            name,
            description,
            price,
            stock,
            categoryId,
        } = req.body;

        const imageUrl = req.file
            ? `/uploads/products/${req.file.filename}`
            : undefined;

        const product = await prisma.product.update({
            where: {
                id,
            },
            data: {
                ...(name !== undefined && { name }),
                ...(description !== undefined && { description }),
                ...(price !== undefined && { price: Number(price) }),
                ...(stock !== undefined && { stock: Number(stock) }),
                ...(categoryId !== undefined && { categoryId }),
                ...(imageUrl !== undefined && { imageUrl }),
            },
            include: {
                category: true
            }
        });
        res.status(200).json({
            success: true,
            data: product,
            message: "product updated successfully"
        })
    } catch (err) {
        next(err)
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.delete({
            where: {
                id,
            },
        })
        res.status(200).json({
            success: true,
            data: product,
            message: "product deleted successfully"
        })
    } catch (err) {
        next(err)
    }
}