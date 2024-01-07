import React, { useState } from "react";
import axios from "axios";

export default function Auth() {
  return (
    <div>
      <Login />
      <Register />
    </div>
  );
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Form
      name="Login"
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
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
      name="Register"
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
    <div>
      <h3>{name}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username
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
        <div>
          <label>
            Password
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
        <button>{name}</button>
      </form>
    </div>
  );
}
