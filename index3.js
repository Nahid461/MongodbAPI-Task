let bcrypt = require("bcrypt");
async function Salt() {
    let salt = await bcrypt.genSalt(10);
    console.log(salt);
    let data = await bcrypt.hash("Nahid", salt);
    console.log(data);
}

Salt();