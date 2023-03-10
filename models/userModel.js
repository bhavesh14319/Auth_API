const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"User Name is mandatory"]
    },
    email:{
        type:String,
        rquired:[true,"Email Address is mandatory"],
        unique:[true,"Email Already Registered"]
    },
    password:{
        type:String,
        required:[true,"Password is mandatory"]
    }
},{
    timestamps:true,
})

module.exports=mongoose.model("user",userSchema);