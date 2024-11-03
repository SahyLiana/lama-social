import { useRef } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const username = useRef();
  const password = useRef();
  const email = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords dont match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post("http://localhost:8800/api/auth/register", user);
        navigate("/login");
      } catch (e) {
        console.log(e);
      }
    }
  };

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
              ref={username}
              placeholder="Username"
            />
            <input
              className="loginInput"
              required
              type="email"
              ref={email}
              placeholder="Email"
            />
            <input
              className="loginInput"
              required
              type="password"
              ref={password}
              placeholder="Password"
            />
            <input
              className="loginInput"
              required
              type="password"
              ref={passwordAgain}
              placeholder="Password again..."
            />
            <button className="loginButton" type="submit">
              Sign up
            </button>
            <button className="registerButton">Login into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
