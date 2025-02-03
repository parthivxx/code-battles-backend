const mongoose = require('mongoose');
const bcrypt =require('bcryptjs');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String , 
        required : true
    } , 
    profilePricture :{
        type : String
    }
} , {
    timestamps : true
});

userSchema.methods.mathchePassword = async (enteredPassword) => {
    return await bcrypt.compare(enteredPassword , this.password)
}

const User = mongoose.model("User" , userSchema);

module.exports = User;