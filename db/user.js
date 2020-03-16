let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    firstName: { type:String, min:4, max:100, required:true},
    lastName: { type:String, min:4, max:100, required:true},
    Address: { type: String, required: true },
    UserLogin: {
        emailId: { type: String, required: true },
        passWord: { type: String, required: true },
    }
});

let userModel = mongoose.model("userDetails", userSchema);
module.exports = userModel;