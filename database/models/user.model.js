const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidators = require('mongoose-unique-validator');
const userSchema = new Schema({
  lastName: { type: String, require: false },
  firstName: { type: String, require: false },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  avatar: { type: String, require: false },
  createdAt: { type: Date, default: Date.now() },
  verified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER'
  },
  plan: {
    type: String,
    enum: ['FREE', 'TRIAL', 'PRO'],
    default: 'TRIAL'
  }
});


userSchema.statics.emailExist = function (email) {
  return this.findOne({ email })
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.toJSON = function () {
  const obj = this.toObject()

  delete obj.password

  return obj
}

userSchema.plugin(uniqueValidators);
module.exports = mongoose.model("User", userSchema);
