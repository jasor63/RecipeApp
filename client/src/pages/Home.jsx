import { React, useState, useEffect } from "react";
import axios from "axios";
import useUserId from "../hooks/useUserId";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookie, _] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const userId = useUserId();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userId}`
        );
        setSavedRecipes(response.data.savedRecipes);
        // console.log(savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipe();
    if (cookie.access_token) fetchSavedRecipe();
  }, []);

  async function savedRecipe(recipeId) {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes",
        {
          recipeId,
          userId,
        },
        {
          headers: { auth: cookie.access_token },
        }
      );
      setSavedRecipes(response.data.savedRecipes);
      // console.log(response.data.savedRecipes);
      navigate("/saved-recipe");
    } catch (err) {
      console.log(err);
    }
  }

  const isSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="home--parent">
      <h1 className="cr--heading">RECIPES</h1>
      <ul className="home--card">
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h3>{recipe.name}</h3>
              <button
                className="home--save--button"
                onClick={() => savedRecipe(recipe._id)}
                disabled={isSaved(recipe._id)}
              >
                {isSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div className="home--ingredients">
              {`${recipe.ingredients
                .map((str) => str + " |")
                .join("")
                .substring(0, 5)}...`}
            </div>
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
