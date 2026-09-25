import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import validate from "../middleware/validation.middleware.js";
import {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} from "../controllers/category.controller.js";
import { createCategoryValidator, updateCategoryValidator } from "../validators/category.validator.js";


const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getCategoryById);

// by  ADMIN ROLE ========
categoryRouter.post(
    "/create",
    createCategoryValidator,
    validate,
    authMiddleware,
    adminMiddleware,
    createCategory
);

categoryRouter.patch(
    "/:id",
    updateCategoryValidator,
    validate,
    authMiddleware,
    adminMiddleware,
    updateCategory
);
categoryRouter.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteCategory
);
export default categoryRouter;