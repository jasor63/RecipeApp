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
      <ul className="nav--parent">
        <li>
          <Link className="nav--home" to="/">
            HOME
          </Link>
        </li>
        <li>
          <Link className="nav--cr" to="/create-recipe">
            CREATE RECIPE
          </Link>
        </li>
        {cookie.access_token ? (
          <>
            <li>
              <Link className="nav--sr" to="/saved-recipe">
                SAVED RECIPE
              </Link>
            </li>
            <li>
              <button className="nav--btn" onClick={logout}>
                LOGOUT
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link className="nav--lr" to="/auth">
              LOGIN/REGISTER
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
