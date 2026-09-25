import express from "express";
import {
    addFavorite,
    getFavorites,
    removeFavorite,
} from "../controllers/favorite.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const favoriteRouter = express.Router();
favoriteRouter.get("/", authMiddleware, getFavorites);
favoriteRouter.post("/:productId", authMiddleware, addFavorite);
favoriteRouter.delete("/:productId", authMiddleware, removeFavorite);

export default favoriteRouter;