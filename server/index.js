import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { authRouter } from "./routes/auth.js";
import { recipeRouter } from "./routes/recipe.js";

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://jasor:jasor123@auth.ggmeqvc.mongodb.net/RecipeApp?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Mongo Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/auth", authRouter);
app.use("/recipes", recipeRouter);

app.listen(3001, () => {
  console.log("Server is listening!");
});
