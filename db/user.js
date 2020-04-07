let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
let config = require("config");

let userSchema = new mongoose.Schema({
    firstName: { type:String, min:4, max:100, required:true},
    lastName: { type:String, min:4, max:200, required:true},
    Address: { type: String, required: true },
    UserLogin: {
        emailId: { type: String, required: true, unique:true},
        passWord: { type: String, required: true },
    },
    isAdmin:{type: Boolean}
});

userSchema.methods.jwtToken = function () {
    let token = jwt.sign({_id: this._id, firstName: this.firstName, 
    isAdmin:this.isAdmin},config.get("ENV_PASSWORD") ); 
    return token;
}



let userModel = mongoose.model("userDetails", userSchema);
module.exports = userModel;