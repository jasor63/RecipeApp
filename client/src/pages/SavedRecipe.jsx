import { React, useState, useEffect } from "react";
import axios from "axios";
import useUserId from "../hooks/useUserId";

export default function SavedRecipe() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userId = useUserId();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userId}`
        );
        setSavedRecipes(response.data.savedRecipe);
        // console.log(response.data.savedRecipe);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipe();
  }, []);

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h3>{recipe.name}</h3>
            </div>
            <div>
              <h4>{recipe.ingredients}</h4>
            </div>
            <div>
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={`${recipe.name}-img`} />
            <h5>{`Cooking Time: ${recipe.time} minutes`}</h5>
          </li>
        ))}
      </ul>
    </div>
  );
}
