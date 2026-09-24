import express from "express";
import errorHandler from "./middleware/error.middleware.js";
import AuthRouter from "./routes/auth.routes.js";
import categoryRouter from "./routes/category.routes.js";
import productRouter from "./routes/product.routes.js";
import userImageRouter from "./routes/user-image.routes.js";
import favoriteRouter from "./routes/favorite.routes.js";
const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/auth", AuthRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/user-images", userImageRouter);
app.use("/api/favorites", favoriteRouter)
////////

app.use(errorHandler);

export default app;