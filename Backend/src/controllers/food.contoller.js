const foodModel = require('../models/foodItem.models');
const storageService = require('../services/storages.service');
const {v4: uuid} = require('uuid')


async function createFood(req,res) {
    console.log(req.foodPartner);
    console.log(req.body);

    console.log(req.file);

    const fileUploadresult = await storageService.uploadFile(req.file.buffer, uuid())


    const foodItem = await foodModel.create({
        nema: req.body.description,
        video: fileUploadresult.url,
        foodPartner: req.foodPartner._id
    })


    res.send("food item created")
    res.status(201).json({
        message: "food created successfully",
        food: foodItem
    })
}

async function getFoodItems(req, res, next) {
    const foodItem = await foodModel.find({})

    res.status(200).json({
        message:"Food items fetched successfully",
        foodItem
    })
    
}


module.exports = {
    createFood,
    getFoodItems
}