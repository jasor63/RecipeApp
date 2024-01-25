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
    <div className="home--parent">
      <h1 className="cr--heading">SAVED RECIPES</h1>
      <ul className="home--card">
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h3>{recipe.name}</h3>
            </div>
            <div className="home--ingredients">{`${recipe.ingredients
              .map((str) => str + " |")
              .join("")
              .substring(0, 5)}...`}</div>
            <div>
              <p className="home--instructions">{`${recipe.instructions.substring(
                0,
                30
              )}...`}</p>
            </div>
            <div className="home--recipe--img--parent">
              <img
                className="home--recipe--img"
                src={recipe.imageUrl}
                alt={`${recipe.name}-img`}
              />
            </div>

            <h5 className="home--time">{`Cooking Time: ${recipe.time} minutes`}</h5>
          </li>
        ))}
      </ul>
    </div>
  );
}
