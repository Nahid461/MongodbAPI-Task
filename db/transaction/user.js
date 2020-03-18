let mongoose = require("mongoose");
let joi = require("@hapi/joi");
let movie = require("../transaction/movie");
let userSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true},
    movie: { type: movie.movieSchema }
});

let userModel = mongoose.model("users", userSchema);


function UserMovieValidation(error) {
    let Schema = joi.object({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        email: joi.required(),
        movieId: joi.string().required()
    });

    return Schema.validate(error);
}

module.exports = { userModel, UserMovieValidation};