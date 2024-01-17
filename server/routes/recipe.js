import express from "express";
import { recipeModel } from "../model/recipes.js";
import { userModel } from "../model/users.js";
import { verifyToken } from "./auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const recipes = await recipeModel.find({});
    res.json(recipes);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const recipe = new recipeModel(req.body);
    const newRecipe = await recipe.save();
    res.json(newRecipe);
  } catch (err) {
    res.json(err);
  }
});

router.put("/", verifyToken, async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.body.recipeId);
    const user = await userModel.findById(req.body.userId);
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedRecipes/ids/:userId", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedRecipes/:userId", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    const savedRecipe = await recipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipe });
  } catch (err) {
    res.json(err);
  }
});

export { router as recipeRouter };
