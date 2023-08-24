import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { updatePassword, updateUsername } from "../slices/showSlice";

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const [username, setUsername] = useState("");
  //const [password, setPassword] = useState("");

  const userInfo = useSelector((state) => state.shows.userInfo);
  //console.log(userInfo);
  const { username, password } = userInfo;

  const setPassword = (password) => {
    dispatch(updatePassword(password));
  };
  const setUsername = (username) => {
    dispatch(updateUsername(username));
  };
  const getUsername = (event) => {
    //console.log("about to call update username");
    setUsername(event.target.value);
    // console.log(event.target.value);
  };

  const getPassword = (event) => {
    //console.log("about to call update password");
    setPassword(event.target.value);
    // console.log(event.target.value);
  };

  const validate = async () => {
    console.log("Validate", username, password);
    try {
      const response = await fetch("http://localhost:3000/Auth/Login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }, // Checking JWT token... CORS related?
        body: JSON.stringify({ username: username, password: password }),
      });
      if (response.status === 200) {
        navigate("/main");
      } else {
        alert("Log in failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="curtain-background">
        <div className="row border border-2 rounded-3 shadow">
          <div className="col p-3 align-items-center" style={{backgroundColor: '#20101E'}}>
            <h3 className="welcome" style={{color: '#FAF5F9'}}>MiniCinema</h3>
            <h6 style={{color: '#FAF5F9'}}>Sign into your account</h6>
            <div className="form-floating">
              <input
                className="form-control mb-2"
                onChange={getUsername}
                type="text"
                placeholder="Username"
                id="username"
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating">
              <input
                className="form-control mb-3"
                onChange={getPassword}
                type="password"
                placeholder="Password"
                id="password"
              />
              <label htmlFor="password">Password</label>
            </div>
            <button onClick={validate} className="btn btn-danger w-100 mb-2">
              Login
            </button>
            <p style={{color: '#FAF5F9'}}>
              Don't have an account?{" "}
              <a href="#" onClick={() => navigate("/Auth/Signup")}>
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
