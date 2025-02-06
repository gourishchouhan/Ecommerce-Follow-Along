const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  })
}

export default errorHandler

