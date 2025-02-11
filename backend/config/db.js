const mongoose = require("mongoose");
const connectDB = async function () {
    try{
        await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log('Mango Connected :>');
    }catch(error){
        console.error('Mango Failed :<');
        process.exit(1);
    }
}
module.exports = connectDB;
