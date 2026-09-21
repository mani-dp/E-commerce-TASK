const errorHandler = (err, req, res, next) => {
  console.log("🔥 ERROR:", err);
  res.status(err.statusCode || 500).json({
    success: false,
    data: null,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;