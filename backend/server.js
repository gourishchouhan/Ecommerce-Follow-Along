const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Add CORS middleware

const port = process.env.PORT || 5000;

app.use("/api/user", userRouter);
try {
  app.use("/api/products", productRouter);
} catch (error) {
  console.log("Product routes not loaded yet—skipping for now.");
}

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
});