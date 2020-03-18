let express = require("express");
let mongoose = require("mongoose");
let app = express();
let user = require("./routes/user");
let auth = require("./routes/auth/user");
let genre = require("./routes/genre");
let movie = require("./routes/movie");
let TMovie = require("./routes/movieAPI/movie");
let TUser = require("./routes/movieAPI/user");
let fawn = require("fawn");
let port = process.env.PORT || 4500;
app.use(express.json());
app.use("/api/users",user);
app.use("/api/login", auth);
app.use("/genre", genre);
app.use("/movie", movie);
app.use("/api/movie",TMovie);
app.use("/api/movie/user",TUser);

 

mongoose.connect("mongodb://localhost/pk", {useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("connected to db"))
        .catch(error => console.log(`something went wrong ${error.message}`));
        fawn.init(mongoose);
app.listen(port, () => console.log(`port is working on ${port}`));
     

