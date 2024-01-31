const mongoose = require("mongoose");

const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log("db connected successfully")})
    .catch((err)=>{console.log("Error in DB connection",err.message)});
}

module.exports = dbConnect;