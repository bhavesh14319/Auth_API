const express = require('express');
const app = express();
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
dotenv.config();



app.use(express.json());
app.use("/api/user",require("./routes/userroutes"));
app.use(errorHandler);


connectDb().then(()=>{
    app.listen(process.env.PORT,()=>console.log(`server running on ${process.env.port}`))
})
