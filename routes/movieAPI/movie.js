let express = require("express");
let router = express.Router();
let movieModel = require("../../db/transaction/movie");


router.post("/movieShow", async (req, res ) => {
   let { error } = movieModel.MovieValidationError(req.body);
   if (error) { return res.status(400).send({ message: error.details[0].
   message }) };
    let data = new movieModel.movieModel({
       name: req.body.name,
       genre: req.body.genre,
       stocks: req.body.stocks
});
 let items = await data.save();
 res.send({ i: item });

});



module.exports = router;