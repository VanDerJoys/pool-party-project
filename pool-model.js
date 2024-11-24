const mongoose = require("mongoose");

const session = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    password: { type: String },
    status: { type: String, default: 'active' },
    price: { type: Number },
    date: { type: String },
    time: { type: String },
    address: { type: String }
});

module.exports = mongoose.model("pools", session);
