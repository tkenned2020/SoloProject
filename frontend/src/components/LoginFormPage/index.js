import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

    return (
      <div className="form-container">
        <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <h4>Welcome to the realm of anime</h4>
        <div class="form-input">
            <span>Email of Username</span>
            <input type="text"
            name="email"
            placeholder="email or username"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required >
            </input>

            <br/>
            <span>Password</span>
            <input type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required >
            </input>

             <button type="submit">Log In</button>
        </div>
         <div class="sign-and-demo">
          <button> <a href="/signup"  class="sign-up-btn" id="sign-up">Sign up</a></button>
          <button> <a href="/users/demo" class="demo-user-btn" id="demo-user">Demo User</a></button>
             <p id='demo-reminder'><strong>Friendly Reminder: A demo user's data  is temporary. Upon logout, all data will be erased.</strong></p>
        </div>

        </form>
      </div>
    )

}

export default LoginFormPage;
