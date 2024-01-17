import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [cookie, setCookie] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const logout = () => {
    setCookie("access_token", "");
    localStorage.removeItem("UID");
    navigate("/auth");
  };

  return (
    <div>
      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/create-recipe">CREATE RECIPE</Link>
        </li>
        {cookie.access_token ? (
          <>
            <li>
              <Link to="/saved-recipe">SAVED RECIPE</Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/auth">LOGIN/REGISTER</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
