const express = require('express');
const {registerController , loginController} = require('../controllers/auth.controllers.js');

const authRouter = express.Router();

authRouter.post("/login" , loginController);
authRouter.post("/register" , registerController);

module.exports = authRouter;