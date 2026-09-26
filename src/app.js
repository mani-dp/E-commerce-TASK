import express, { request, response } from "express";
import errorHandler from "./middleware/error.middleware.js";
import AuthRouter from "./routes/auth.routes.js";
import categoryRouter from "./routes/category.routes.js";
import productRouter from "./routes/product.routes.js";
import userImageRouter from "./routes/user-image.routes.js";
import favoriteRouter from "./routes/favorite.routes.js";
import prisma from "./utils/prisma.js";
const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/auth", AuthRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/user-images", userImageRouter);
app.use("/api/favorites", favoriteRouter);
////////

app.get("/:id", async (request, response, next) => {
    try {
        const { id } = request.params.id;
        const product = await prisma.product.findUnique({
            where: { id, },
            include: {
                category: true,
            },
        });
        if (!product) {
            return response.status(404).json({
                success: false,
                data: null,
                message: "product was not found please try agin",
            });
        };
        response.status(200).json({
            success: true,
            data: product,
            message: "product fetched was successfully",
        })
    } catch (err) {
        next(err)
    }
});

app.post("/create", async(request, response, next) => {
    try {
        const { name, description, stock, price, categoryId } = request.body;
        const product = await prisma.product.create({
            data: {
                name, description, stock,
                price, categoryId
            },
            include : {
                category : true,
            },
        });
        if (!product) {
            return response.status()   
        }
    } catch (err) {
        next(err)
    }
})

app.use(errorHandler);

export default app;

// finished