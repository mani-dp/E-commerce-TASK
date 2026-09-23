import express from "express";

import {
    getProductById,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import validate from "../middleware/validation.middleware.js";
import { createProductValidator, updateProductValidator } from "../validators/product.validator.js";
import upload from "../middleware/upload.middleware.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);

// by ADMIN ROLE =======
productRouter.post(
    "/create",
    authMiddleware,
    adminMiddleware,
    upload.single("image"),
    createProductValidator,
    validate,
    createProduct
);
productRouter.patch(
    "/update/:id",
    authMiddleware,
    adminMiddleware,
    upload.single("image"),
    updateProductValidator,
    validate,
    updateProduct
);
productRouter.delete(
    "/delete/:id",
    authMiddleware,
    adminMiddleware,
    deleteProduct
);
// ==============

export default productRouter;