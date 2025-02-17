const Mongoose = require("mongoose");

const user = new Mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    price:{
        type: Number,
        required: true
    }
})

const User = Mongoose.model("User", user);
module.exports = User;