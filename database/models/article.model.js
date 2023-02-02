const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const articleSchema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  isPublished: { type: Boolean, require: false },
  image: { type: String, require: true },
  userId: { type: String, require: false },
  plan: { type: String, require: false, default: 'PRO' },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    }
  ],
  createdAt: { type: Date, default: Date.now() },
  content: { type: String, require: false },
  date: {
    type: String, require: false
  },
  auteur: {
    type: String, require: false
  }
});

module.exports = mongoose.model("Article", articleSchema);
