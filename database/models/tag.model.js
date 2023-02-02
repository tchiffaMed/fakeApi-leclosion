const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name: { type: String, require: true },
    createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Tag", tagSchema);
