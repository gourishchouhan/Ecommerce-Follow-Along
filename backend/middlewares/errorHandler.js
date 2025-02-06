import { AuthenticationError } from "../utils/authErrors.js"

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"

  // Handle specific error types
  if (err instanceof AuthenticationError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    })
  }

  // Handle validation errors
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((el) => el.message)
    return res.status(400).json({
      status: "error",
      message: "Invalid input data",
      errors: errors,
    })
  }

  // Handle duplicate key errors
  if (err.code === 11000) {
    return res.status(400).json({
      status: "error",
      message: "Duplicate field value. Please use another value",
    })
  }

  // Default error
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  })
}

export default errorHandler

