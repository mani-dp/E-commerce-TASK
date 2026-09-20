class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.name = "AppError";

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;

// for example.....

// if (!product) {
//   throw new AppError("Product not found", 404);
// }