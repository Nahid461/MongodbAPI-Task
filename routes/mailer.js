let express = require("express");
let router = express.Router();
let crypto = require("crypto");
let usermodel = require("../db/user");
let nodemailer = require("nodemailer");


router.post("/sendMail", async (req, res) =>{
    let token = crypto.randombytes(32).toString("hex");
    let user = await usermodel.findOne({ "UserLogin.emailId": req.body.userLogin.emailId });
    if (!user) { return res.status(404).send({ message: " Invalid email Id"}) };
    user.resetPasswordToken = token;
    user.resetPasswordExpires = date.now() + 3600000 // 1 hrs
    await user.save();
})


module.exports = router;