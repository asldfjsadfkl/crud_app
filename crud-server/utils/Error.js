const errorMiddleware = (req, res, next, err) => {
  err.message = err.message || "internal server error!";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
module.exports = errorMiddleware;
