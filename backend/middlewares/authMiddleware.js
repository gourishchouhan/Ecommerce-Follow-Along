const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  try {
    // Log full authorization header
    console.log("Full Auth Header:", req.headers.authorization);
    
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ 
        status: "error", 
        message: "Authorization header missing" 
      });
    }

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        status: "error", 
        message: "Invalid authorization format" 
      });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        status: "error", 
        message: "No token provided" 
      });
    }

    console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log("Decoded token:", {
      userId: decoded.id,
      exp: decoded.exp,
      iat: decoded.iat
    });

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", {
      name: error.name,
      message: error.message,
      expiredAt: error.expiredAt
    });

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        status: "error", 
        message: "Token has expired" 
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        status: "error", 
        message: "Invalid token" 
      });
    }

    res.status(500).json({ 
      status: "error", 
      message: "Authentication error" 
    });
  }
};

module.exports = authMiddleware;