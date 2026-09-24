import express from "express";
import { addFavorite, getFavorites, removeFavorite } from "../controllers/favorite.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const favoriteRouter = express.Router();

favoriteRouter.get("/", authMiddleware, getFavorites);
favoriteRouter.post("/add", authMiddleware, addFavorite);
favoriteRouter.delete("/", authMiddleware, removeFavorite);

export default favoriteRouter;