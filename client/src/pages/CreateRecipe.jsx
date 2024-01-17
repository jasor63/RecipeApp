import React from "react";
import axios from "axios";
import useUserId from "../hooks/useUserId";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function CreateRecipe() {
  const userId = useUserId();

  const [cookie, _] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const [recipe, setRecipe] = React.useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    time: 0,
    user: userId,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  // console.log(recipe);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipes/", recipe, {
        headers: { auth: cookie.access_token },
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create--recipe--parent">
      <h1>Create Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Recipe Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={recipe.name}
          onChange={handleChange}
        />
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            id="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button type="button" onClick={addIngredient}>
          Add Ingredient
        </button>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          cols="30"
          rows="10"
          type="text"
          name="instructions"
          id="instructions"
          value={recipe.instructions}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">Image Url</label>
        <input
          type="text"
          name="imageUrl"
          id="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
        />
        <label htmlFor="time">Cooking Time</label>
        <input
          type="number"
          name="time"
          id="time"
          value={recipe.time}
          onChange={handleChange}
        />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
}
