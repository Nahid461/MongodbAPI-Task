let express = require("express");
let mongoose = require("mongoose");
let app = express();
let user = require("./routes/user");
let auth = require("./routes/auth/user");

let port = process.env.PORT || 4500;
app.use(express.json());
app.use("/api/users",user);
app.use("/api/", auth);




mongoose.connect("mongodb://localhost/pk", {useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("connected to db"))
        .catch(error => console.log(`something went wrong ${error.message}`));
app.listen(port, () => console.log(`port is working on ${port}`));
     