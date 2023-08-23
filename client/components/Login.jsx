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
  console.log(userInfo);
  const { username, password } = userInfo;

  const setPassword = (password) => {
    dispatch(updatePassword(password));
  };
  const setUsername = (username) => {
    dispatch(updateUsername(username));
  };
  const getUsername = (event) => {
    console.log("about to call update username");
    setUsername(event.target.value);
    // console.log(event.target.value);
  };

  const getPassword = (event) => {
    console.log("about to call update password");
    setPassword(event.target.value);
    // console.log(event.target.value);
  };

  const validate = async () => {
    console.log("Validate", username, password);
    try {
      const response = await fetch("http://localhost:3000/auth/hashedLogin", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include", // Checking JWT token... CORS related?
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
      <div className="container d-flex justify-content-center align-items-center mt-5">
        <div className="row border border-2 rounded-3 shadow">
          <div className="col">
            <img
              src="/assets/popcat-left.gif"
              style={{ width: 400 }}
              className="img-fluid border rounded-3 m-2"
            />
          </div>
          <div className="col p-3 align-items-center">
            <h3 className="mb-3">The Art Gallery</h3>
            <h6>Sign into your account</h6>
            <div className="form-floating">
              <input
                className="form-control mb-2"
                onChange={getUsername}
                type="text"
                placeholder="Username"
                id="username"
              />
              <label for="username">Username</label>
            </div>
            <div className="form-floating">
              <input
                className="form-control mb-3"
                onChange={getPassword}
                type="password"
                placeholder="Password"
                id="password"
              />
              <label for="password">Password</label>
            </div>
            <button onClick={validate} className="btn btn-danger w-100 mb-2">
              Login
            </button>
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={() => navigate("/signup")}>
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