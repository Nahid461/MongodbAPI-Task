let mongoose = require("mongoose");
let G = require("../genre/genre");
let movieSchema = new mongoose.Schema({
    name: { type: String, required: true, trim:true },
    genre: { type: G.GenreSchema, required: true },
    actor: { type: String, required: true},
    stocks: { type: Number, required: true },
    price: { type: Number, required: true}
});

let movieModel = mongoose.model("movie", movieSchema);

module.exports = movieModel;