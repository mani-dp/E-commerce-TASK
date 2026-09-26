import AppError from "../utils/AppError.js";

const adminMiddleware = (req, res, next) => {
    // console.log("REQ.USER:", req.user);
    // console.log("ROLE:", req.user.role);
    if (req.user.role !== "ADMIN") {
        throw new AppError("Admin access required", 403)
    }
    next();
}

export default adminMiddleware;

