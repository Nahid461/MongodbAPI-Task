let express = require("express");
let router = express.Router();
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let config = require("config");
let model = require("../../db/user");


router.post("/auth", async (req, res) => {
    let user = await model.findOne( {"UserLogin.emailId": req.body.
    UserLogin.emailId } );
    console.log(user);
    if(!user) { return res.status(404).send({ message: "Invalid emailId"
    }) }

    //let passWord = await model.findOne({ "UserLogin.passWord": req.body.
    //UserLogin.passWord });
    let validPassWord = await bcrypt.compare(req.body.UserLogin.passWord,
     user.UserLogin.passWord);

    if (!validPassWord) { return res.status(404).send({ message: "Invalid password" }) };
    // let token = jwt.sign({_id: user._id, firstName: user.firstName},
    // config.get("ENV_PASSWORD") );
    let token = user.jwtToken();
    res.header("x-auth-token", token).send({ message: "LOGIN DONE" });

    });

    module.exports = router;
