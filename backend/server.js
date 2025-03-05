const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

console.log("Loading userRouter:", userRouter); // Debug log
console.log("Loading productRouter:", productRouter); // Debug log

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
});