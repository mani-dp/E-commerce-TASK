import { body } from "express-validator";

export const createProductValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Product name must be between 2 and 100 characters"),

    body("description")
            .trim()
        .notEmpty()
        .withMessage("Product description is required"),

    body("price")
        .notEmpty()
        .withMessage("Price is required")
        .isFloat({ min: 0 })
        .withMessage("Price must be a positive number"),

    body("stock")
        .notEmpty()
        .withMessage("Stock is required")
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer"),

    body("categoryId")
        .trim()
        .notEmpty()
        .withMessage("Category ID is required")
        .isUUID()
        .withMessage("Category ID must be a valid UUID"),
];

export const updateProductValidator = [
    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Product name cannot be empty")
        .isLength({ min: 2, max: 100 })
        .withMessage("Product name must be between 2 and 100 characters"),

    body("description")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Product description cannot be empty"),

    body("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Price must be a positive number"),

    body("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer"),

    body("categoryId")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Category ID cannot be empty")
        .isUUID()
        .withMessage("Category ID must be a valid UUID"),
];

