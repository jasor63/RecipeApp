import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  return (
    <div className="form--super--parent">
      <Login />
      <Register />
    </div>
  );
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [cookie, setCookie] = useCookies(["access_token"]);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      // console.log(response);
      setCookie("access_token", response.data.token);
      localStorage.setItem("UID", response.data.userId);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form
      name="LOGIN"
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    try {
      axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("registration success");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form
      name="REGISTER"
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

function Form({
  username,
  setUsername,
  password,
  setPassword,
  name,
  handleSubmit,
}) {
  return (
    <div className="form--parent">
      <h3 className="form--heading">{name}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form--username">
          <label>
            Username &nbsp;
            <input
              type="text"
              name="username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              value={username}
            />
          </label>
        </div>
        <div className="form--password">
          <label>
            Password &nbsp;
            <input
              type="password"
              name="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={password}
            />
          </label>
        </div>
        <button className="form--button">{name}</button>
      </form>
    </div>
  );
}
