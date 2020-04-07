let express = require("express");
let router = express.Router();
let U = require("../db/user");

router.post("/:page", async(req, res ) => {
    let perPage = 10;
    let page = req.params.page || 1;
    let data = await U
        .find()
        .skip((perPage * page) - perPage)     //10*1-10 = 0,  20-10 = 10
        .limit(perPage);

    let dataCount = await U.find().count();   //95/10 -> 9.5 -> 10
    let pageSize = Math.ceil(dataCount / perPage);    

    res.send({
        perPage: perPage,
        page: page,
        data: data,
        totalRecord: dataCount,
        pageSize: pageSize
    })

});

module.exports = router;