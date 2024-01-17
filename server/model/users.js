import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String, required: true },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
});

export const userModel = mongoose.model("user", userSchema);
