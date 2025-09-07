const foodPartnerModel = require('../models/foodPartner.models')
const jwt = require('jsonwebtoken');

async function authFoodPartnerMiddleware(req,res,next) {
    
    const token = req.cookie.token;
    if(!token){
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
     const decoded =   jwt.verify(token, process.env.JWT_SECRET )

     const foodPartner = await foodPartnerModel.findById(decoded.id);
     
     req.foodPartner = foodPartner

     next()


    } catch (error) {
        
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}

module.exports = {
    authFoodPartnerMiddleware,
}