let express = require("express");
let router = express.Router();
let model = require("../../db/user");

router.post("/auth", async (req, res) => {
    let user = await model.find( {"UserLogin.emailId": req.body.
    UserLogin.emailId } );
    console.log(user);
    if(!user) { return res.status(404).send({ message: "Invalid emailId"
    }) }

    let PassWord = await model.find({ "UserLogin.password": req.body.
UserLogin.passWord });
if (!passWord) { return res.status(404).send({ message: "Invalid password" }) };
res.send({ message: "LOGIN Done" });

});

module.export = router;
