const mongoose = require("mongoose");

const session = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    password: { type: String },
});

module.exports = mongoose.model("locataires", session);
