import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

import CircularProgress from "@mui/material/CircularProgress";

function Login() {
  const email = useRef();
  const password = useRef();

  // eslint-disable-next-line no-unused-vars
  const { user, isFecthing, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted", email.current.value, password.current.value);
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  console.log(user);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">LamaSocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you with us
          </span>
        </div>

        <div className="loginRight">
          <form onSubmit={handleSubmit} className="loginBox">
            <input
              className="loginInput"
              required
              type="email"
              placeholder="Email"
              ref={email}
            />
            <input
              required
              className="loginInput"
              placeholder="Password"
              type="password"
              ref={password}
              minLength={6}
            />
            <button className="loginButton" disabled={isFecthing}>
              {isFecthing ? (
                <CircularProgress color="white" size="25px" />
              ) : (
                "Log in"
              )}
            </button>
            <span className="loginForgot">Forgot password?</span>
            <button className="registerButton">
              {" "}
              {isFecthing ? (
                <CircularProgress color="white" size="25px" />
              ) : (
                "Create a new account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
