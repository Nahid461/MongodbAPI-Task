let express = require("express");
let router = express.Router();
let fawn = require("fawn");
let userModel = require("../../db/transaction/user")
let movie = require("../../db/transaction/movie")

router.post("/movie/user", async (req, res) => {
   let { error } = userModel.UserMovieValidation(req.body);
   if (error) { return res.status(400).send({ message: error.details[0].
message }) };
 
let m = await movie.movieModel.findById(req.body.movieId);
    if(m.stock ===  0) { return res.status(403).send({ message: 
    "OUT OF STOCK "}) };

let user = new userModel.userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email, 
    movie: { 
        name: m.name,
        stocks: m.stocks
    }
});

await fawn
   .Task()
   .save("users", user)
   .update("movies", {_id: m._id }, {
    $inc: {
        stocks: -1
    }
}).run();
    
res.send(user);


// let data = await user.save();
// m.stock--;
// await m.update();

   
});

module.exports = router;
 