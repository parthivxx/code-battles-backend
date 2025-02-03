const jwt = require('jsonwebtoken');
const User = require('../models/user.models.js');

const protect = async (req , res , next) => {
    let token;
    if(req.headers && req.headers.authorization){
        try{
        token = req.headers.authorization;
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user = User.findById(decoded.id).select("-password");
        next();
        }catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
          }
    }

    if(!token){
        res.status(401);
        throw new Error("Not authorized, no token");
    }
}

module.exports = protect;
