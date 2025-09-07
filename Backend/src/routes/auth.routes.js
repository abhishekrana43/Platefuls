const express = require('express');
const authController = require('../controllers/auth.controllers');
const {registerUser, loginUser} = require("../controllers/auth.controllers")

const router = express.Router();

// user auth APIs
router.post('/user/register', authController.registerUser)
router.post('/user/login', authController.loginUser)
router.get('/user/logout', authController.logoutUser)

// food Partner APIs
router.post('/food-partner/register', authController.registerFoodPartner)
router.post('/food-partner/login', authController.loggedoutFoodPartner)
router.get('/food-partner/logout', authController.logoutUser)

module.exports = router;