const User = require('../models/user.models.js');
const bcrypt = require('bcryptjs');
const axios = require('axios');

const validCfHandle = async (username) =>{
    const response = await axios.get(process.env.CF_API_ENDPOINT+`handles=${username}`);
    if(response.status == 400) return false;
    return response.data.result[0];
}

const registerController =  async (req , res) => {
    const {username , password} = req.body;
    if(!username || !password){
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const cfUser = await validCfHandle(username);
    if(!cfUser){
        throw new Error("Please enter a valid Codeforces handle");
    }
    const profilePricture = cfUser.titlePhoto;
    const userExists = await User.findOne({username});
    if(userExists){
        res.status(409);
        throw new Error("User with this username already exists!!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt);

    const newUser = await User.create({
        username : username , 
        password : hashedPassword,
        profilePricture : profilePricture
    }); 

    if(newUser){
        res.status(200).json({
            id : newUser._id , 
            username : newUser.username,
            token : generateToken(newUser._id)
        })
    }else{
        res.status(400);
        throw new Error("Failed to create a user");
    }
}

const loginController = async (req , res) => {
    const {username , password} = req.body;
    const user = await User.findOne({username});
    if(user && (await user.matchPassword(password))){
        res.json({
            id : user._id,
            username : user.username , 
            profilePicture : user.profilePicture ,
            token : generateToken(user._id),
        })
    }else{
        res.status(401);
        throw new Error("Not authorized");
    }
}

module.exports = {registerController , loginController};