import React from "react";

export default function Auth() {
  return (
    <div>
      <h3>Login</h3>
      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
