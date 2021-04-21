/* User Model */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : String, 
        required : true, 
        unique : true 
    },
    password : {
        type : String,
        required : true
    },
    firstname : {
        type : String,
        required : true
    },
   lastname : {
        type : String,
        required : true
    }
}, {
    collection : "User"
});


const modelUser = mongoose.model("User", userSchema);
module.exports = modelUser;