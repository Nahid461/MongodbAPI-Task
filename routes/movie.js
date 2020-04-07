let express = require("express");
let router = express.Router();
let joi = require("@hapi/joi");
let movieModel = require("../db/movie/movie");
let G = require("../db/genre/genre");


router.post("/api/createMovie", async (req, res) =>{
     let { error } = MovieValidationError(req.body);
     if (error) { return res.status(400).send({ message: error.details[0]
    .message }) };
    let genre = await G.genreModel.findById(req.body.genreId);
    if(!genre) { return res.status(403).send({ message: "Invalid genre id"}) };

    let movie = new movieModel({
        name: req.body.name,
        genre: {
            name:genre.name
        },
        stocks: req.body.stocks,
        actor:req.body.actor,
        price: req.body.price
    })
    let data = await movie.save();
    res.send({ item: data });

});

function MovieValidationError(error) {
    let Schema = joi.object({
        name: joi.string().required(),
        genreId: joi.string().required(),
        stocks: joi.number().required(),
        actor: joi.string().required(),
        price: joi.number().required()
    });
    return Schema.validate(error);
    
}

module.exports = router;