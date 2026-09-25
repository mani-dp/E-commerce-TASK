import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new AppError("Authentication required", 401);
        }
        const token = authHeader.split(" ")[1];

        if (!token) {
            throw new AppError("Token is missing", 401);
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};

export default authMiddleware;