import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  instructions: String,
  imageUrl: String,
  time: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

export const recipeModel = mongoose.model("recipe", recipeSchema);
