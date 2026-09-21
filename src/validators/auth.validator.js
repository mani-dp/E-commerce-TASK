import { body } from "express-validator";

export const registerValidator = [
    body("name")
        .trim()
        .isString()
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .trim()
        .isEmail()
        .notEmpty()
        .withMessage("Please enter a valid email"),

    body("password")
        .isString()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters")
];