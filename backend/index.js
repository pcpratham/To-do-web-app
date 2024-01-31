const express = require("express");
const app = express();
require("dotenv").config();
const dbConnect = require("./config/database");
const router = require("./routes/route");
const PORT = 4000 || process.env.PORT



app.use(express.json());

dbConnect();

app.listen(PORT,async(req,res)=>{
    console.log(`App started @ ${PORT} `);
});


app.get("/",async(req,res)=>{
    res.send("Hi there!!");
})

app.use("/api/v1",router);