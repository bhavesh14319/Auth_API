const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//@desc Register User
//@route POST api/user/register
//@access public
const registerUser =asyncHandler( async(req,res)=>{
    const{username,email,password}=req.body;

    if(!username||!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({email});

    if(userAvailable){
        res.status(400);
        throw new Error("User Already Registered");
    }
    //hash pass
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("hashed passwoed: ",hashedPassword);

    const newUser = await User.create({
        username,
        email,
        password:hashedPassword
    })

    if(newUser){
        res.status(201).json({_id:newUser.id,username:newUser.username,email:newUser.email});
    }else{
        res.status(400);
        throw new Error("Invalid Request");
    }

    // res.json("registerd user: ", newUser);
})


//@desc Login User
//@route POST api/user/login
//@access public
const loginUser = asyncHandler( async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("All Fields are mandatory");
    }

    const user = await User.findOne({email});
    //compare password with hashed password


    if(user && await bcrypt.compare(password,user.password)){
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                _id:user.id
            }
        },process.env.JWT_SECRET,{expiresIn:"1m"})
        res.status(200);
        res.json({accessToken})
    }else{
        res.status(401);
        throw new Error("Email/password invalid")
    }

    res.json("login user");
})


//@desc get current user
//@route GET api/user/current
//@access private
const getUser =asyncHandler( async(req,res)=>{
    res.json("Get Current User");
})


module.exports={registerUser,loginUser,getUser};