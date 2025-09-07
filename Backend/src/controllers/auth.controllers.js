const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const foodPartnerModel = require("../models/foodPartner.models");
const { mongo, default: mongoose } = require("mongoose");


async function registerUser(req, res) {

    const {fullName, email, password} = req.body;

    const isAlreadyExist = await userModel.findOne({
        email
    })

    if(isAlreadyExist){
        return res.status(400).json({
            message: "User alredy exists"
        })
    }

    const hashPassword = await bcrypt.hash(password,10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashPassword
    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            email:user.email,
            fullName: user.fullName
        }
    })
    
}

async function loginUser(req, res) {
    const {email, password} = req.body;

    const user = await userModel.findOne({
        email
    })

    if(!user){
        return res.send(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Ivalid email or password"
        })
    }

    const token  = jwt.sign({
        id: user._id,

    },  process.env.JWT_SECRET)
    res.cookie("token", token)

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
    
}

async function logoutUser(req,res) {
    res.clearCookie("token")
    res.status(200).json({
        message:"User logged out successfully"
    });
    
}

async function registerFoodPartner(req, res) {

    const {name, email,password} = req.body;

    const isAccountAlreadyExist = await foodPartnerModel.findOne({
        email
    })

    if(isAccountAlreadyExist){
      return res.status(400).json({
            message: "Food partner account already exists"
        })
    }

    const hashPassword = await bcrypt.hash(password,10);

    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password: hashPassword
    })

    const token = jwt.sign({
        _id: foodPartner._id,
    },  process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "Food partner registered successfully",
        foodPartner:{
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    })    
}

async function loginFoodPartne(req,res) {
    const {email, password} = req.body;

    const foodPartner = await foodPartnerModel.findOne({
        email
    })

    if(!foodPartner){
        return res.status(400).json({
            message:"Invalid email or Password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or Password"
        })
    }

    const token = jwt.sign({
        id: foodPartner._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message:"Food Partner logged in successfully",
        foodPartner:{
            _id: foodPartner._id,
            email,
            name: foodPartner.name
        }
    })
    
}

function loggedoutFoodPartner(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message: "Food partner logged out successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartne,
    loggedoutFoodPartner,

}