const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes');

const app = express()
app.use(express.json())

const port = process.env.PORT || 5000

app.use('/api/user', userRouter)
app.use('/api/products', productRouter);


connectDB()
app.listen(port,function(){
  console.log(`Server is running on ${port}`)
});
