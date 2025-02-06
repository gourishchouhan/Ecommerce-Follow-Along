export class AuthenticationError extends Error {
    constructor(message) {
      super(message)
      this.name = "AuthenticationError"
      this.statusCode = 401
    }
  }
  
  export const handleAuthError = (error, res) => {
    if (error instanceof AuthenticationError) {
      return res.status(error.statusCode).json({
        status: "error",
        message: error.message,
      })
    }
  
    // Handle other types of errors
    return res.status(500).json({
      status: "error",
      message: "An error occurred during authentication",
    })
  }
  
  