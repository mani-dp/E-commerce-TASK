import AppError from "../utils/AppError.js";
import prisma from "../utils/prisma.js"

export const getCategories = async (req, res, next) => {
    try {
        const categories = await prisma.category.findMany();
        res.json({
            success: true,
            data: categories,
            message: "Categories fetched successfully",
        })
    } catch (err) {
        next(err)
    }
}

export const getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const category = await prisma.category.findUnique({
            where: {
                id: id,
            },
        });


        if (!category) {
            throw new AppError("Category not found", 404)
        }

        res.json({
            success: true,
            data: category,
            message: "Category fetched successfully",
        });

    } catch (err) {

    }
}

export const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const category = await prisma.category.create({
            data: {
                name,
            }
        });

        res.status(201).json({
            success: true,
            data: category,
            message: "Category created successfully",
        });
    } catch (err) {
        next(err)
    }
};

export const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const category = await prisma.category.update({
            where: { id, },
            data: {
                name,
            }
        });

        if (!category) {
            throw new AppError("Cannot update category", 500);
        }
        res.status(200).json({
            success: true,
            data: category,
            message: "Category updated successfully",
        })
    } catch (err) {
        next(err)
    }
};

export const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await prisma.category.delete({
            where: { id, }
        })

        if (!category) {
            throw new AppError("Cannot delete category", 500);
        }

        res.status(200).json({
            success: true,
            data: category,
            message: "Category deleted successfully",
        })
    } catch (err) {
        next(err)
    }
}
