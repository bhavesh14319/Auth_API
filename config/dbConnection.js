const mongoose = require('mongoose');

const connectDb = async ()=>{
    try{
        mongoose.set('strictQuery',true);
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Connected to ",connect.connection.host,connect.connection.name);
    }catch(err){
        console.log(err);
        process.exit(1);

    }
}

module.exports=connectDb;