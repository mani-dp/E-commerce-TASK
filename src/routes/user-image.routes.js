import express from "express";
import {
    uploadUserImage,
    getUserImages,
    deleteUserImage,
} from "../controllers/user-image.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/user-upload.middleware.js";

const userImageRouter = express.Router();

userImageRouter.post(
    "/",
    authMiddleware,
    upload.single("image"),
    uploadUserImage
);
userImageRouter.get(
    "/",
    authMiddleware,
    getUserImages
);
userImageRouter.delete(
    "/:id",
    authMiddleware,
    deleteUserImage
);

export default userImageRouter;