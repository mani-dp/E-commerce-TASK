import AppError from "../utils/AppError.js";

const adminMiddleware = (req, res, next) => {
    if (req.user.role !== "ADMIN") {
        throw new AppError("Admin access required", 403)
    }
    next();
}

export default adminMiddleware;

