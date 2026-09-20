import express from "express";
import errorHandler from "./middleware/error.middleware.js";
import prisma from "./utils/prisma.js";

const app = express();

app.use(express.json());

// routes
app.get("/test-db", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();

    res.json({
      success: true,
      data: users,
      message: "Database connection works",
    });
  } catch (error) {
    next(error);
  }
});
// 

app.use(errorHandler);

export default app;