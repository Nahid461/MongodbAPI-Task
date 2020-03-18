let express = require("express");
let router = express.Router();
let g = require("../db/genre/genre.js");
let joi = require("@hapi/joi");

router.post("/api/genre", async (req, res) => {
    let { error } = GenreValidationError(req.body);
    if(error) { return res.status(400).send({message: error.details[0]
        .message}) };
        let data = new g.genreModel({
            name:req.body.name
        });
        let result = await data.save();
        res.send({ item: result });
});

function GenreValidationError(error) {
    let Schema = joi.object({
        name: joi.string().required()
    });
    return Schema.validate(error);
};

module.exports = router;