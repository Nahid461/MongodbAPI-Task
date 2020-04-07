let jwt = require("jsonwebtoken");
let config = require("config");

function User(req, res, next) {
    let token = req.header("x-auth-token");
    if(!token){ return res.status(401).send({ message: "ACCESS DENIED!"}) };
    console.log(token);
    try{   
    let decoded = jwt.verify(token,config.get("ENV_PASSWORD"));
    console.log(decoded);
    console.log(req.user);
    req.users = decoded;
    console.log(req.user);
    next();
    }
    catch(ex) {
      return  res.status(403).send({ message: "Invalid token" });
    }
   
}

module.exports = User;