let express = require("express");
let model = require("../db/user");
let router = express.Router();
let joi = require("@hapi/joi");

 //FETCH THE Data
router.get("/allUsers", async (req, res) =>{
     let users = await model.find();
     res.send({ data:users });
});

//find the data by id
router.get("/user/:id", async (req, res) =>{
    let user = await model.findById(req.params.id);
    if(!user) {return res.status(404).send({ message: "Invalid user"}) };
    res.send({ data: user });
});

//create the user data
router.post("/user/newUser", async (req, res) =>{
    let user = await model.find({ "UserLogin.emailId": req.body
    .UserLogin.emailId });
    console.log(user);

if (user) { return res.status(403).send({message:"emailId already exist"})
}

    let { error } = ValidationError(req.body);
    if (error) { return res.send(error.details[0].message) };
    let newData = new model({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        Address: req.body.Address,
        UserLogin: req.body.UserLogin
    });
    let data = await newData.save();
    res.send({ message: "thank you", d: data });
});

router.put("/user/updateUser/:id", async (req, res) =>{
     let user = await model.findById(req.params.id);
     if (!user) { return res.status(404).send({ message: "Invalid id"})
    };
    let { error } = ValidationError(req.body);
    if (error) { return res.send(error.details[0].message) };
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    await user.save();
    res.send({ message: "user data got updated" });

});

router.delete("/user/removeUser/:id", async (req, res) =>{
    let user = await model.findByIdAndRemove(req.params.id);
    if (!user) { return res.status(404).send({ message: "Invalid id"})
   };


   res.send({ message: "user data got removed" });
});


function ValidationError(error) {
    let Schema = joi.object({
        firstName: joi.string().min(4).max(100).required(),
        lastName: joi.string().min(4).max(200).required(),
        Address: joi.string().required(),
        UserLogin: {
            emailId: joi.string().required().email(),
            passWord: joi.string().required()
        }
    });
    return Schema.validate(error);
}
module.exports = router;