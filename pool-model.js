const mongoose = require("mongoose");

const session = new mongoose.Schema({
    label: { type: String },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, //user of type COACH
    status: { type: String, default: 'active' },
    createdAt: { type: String },
    price: { type: Number },
    updatedAt: { type: String }
});

module.exports = mongoose.model("pools", session);
