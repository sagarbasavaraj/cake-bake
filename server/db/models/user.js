const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const OrderSchema = require("./order");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, trim: true, minlength: 1 },
  password: { type: String, required: true, minlength: 6 }
});

UserSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "user"
});

UserSchema.set("toObject", { virtuals: true });
UserSchema.set("toJSON", { virtuals: true });

//This is called a pre-hook, before the user information is saved in the database
//this function will be called, we'll get the plain text password, hash it and store it.
UserSchema.pre("save", async function(next) {
  //'this' refers to the current document about to be saved
  const user = this;
  //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
  //your application becomes.
  const hash = await bcrypt.hash(user.password, 10);
  //Replace the plain text password with the hash and then store it
  user.password = hash;
  //Indicates we're done and moves on to the next middleware
  next();
});

UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  //Hashes the password sent by the user for login and checks if the hashed password stored in the
  //database matches the one sent. Returns true if it does else false.
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
