const errorHandler = (err, req, res, next) => {
    console.error("🔥 ERROR:", err);

    // Prisma: Unique constraint
    if (err.code === "P2002") {
        return res.status(409).json({
            success: false,
            data: null,
            message: "A record with this value already exists",
        });
    }

    // Prisma: Record not found
    if (err.code === "P2025") {
        return res.status(404).json({
            success: false,
            data: null,
            message: "Requested record was not found",
        });
    }

    // Multer errors
    if (err.name === "MulterError") {
        return res.status(400).json({
            success: false,
            data: null,
            message: err.message,
        });
    }

    // Custom application errors
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            success: false,
            data: null,
            message: err.message,
        });
    }

    // Unknown errors
    return res.status(500).json({
        success: false,
        data: null,
        message: "Internal Server Error",
    });
};

export default errorHandler;