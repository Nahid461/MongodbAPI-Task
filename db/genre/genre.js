let mongoose = require("mongoose");

let GenreSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true }
});

let genreModel = mongoose.model("genre", GenreSchema);

module.exports = {GenreSchema, genreModel};