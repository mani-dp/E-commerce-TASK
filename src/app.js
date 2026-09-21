import express from "express";
import errorHandler from "./middleware/error.middleware.js";
import prisma from "./utils/prisma.js";
import AuthRouter from "./routes/auth.routes.js";

const app = express();

app.use(express.json());

// routes
app.use("/api/auth", AuthRouter);

////////

app.use(errorHandler);

export default app;