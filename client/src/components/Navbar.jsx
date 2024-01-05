import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/create-recipe">CREATE RECIPE</Link>
        </li>
        <li>
          <Link to="/saved-recipe">SAVED RECIPE</Link>
        </li>
        <li>
          <Link to="/auth">LOGIN/REGISTER</Link>
        </li>
      </ul>
    </div>
  );
}
