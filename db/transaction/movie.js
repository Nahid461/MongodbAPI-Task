let mongoose = require("mongoose");
let joi = require("@hapi/joi");
let movieSchema = new mongoose.Schema({
    name: { type: String, required:  true },
    genre: { type: String },
    stocks: { type: Number, required: true}
});

let movieModel = mongoose.model("mv", movieSchema, "movies");

function MovieValidationError(error) {
    let Schema = joi.object({
        name: joi.string().required(),
        genre: joi.string().required(),
        stocks: joi.number().required()
    });
    return Schema.validate(error);
}

module.exports = { movieModel, MovieValidationError, movieSchema };