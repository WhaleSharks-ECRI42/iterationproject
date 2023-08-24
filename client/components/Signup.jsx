import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePassword, updateUsername } from "../slices/showSlice";
import styles from "../styles.css";

export function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  const userInfo = useSelector((state) => state.shows.userInfo);
  const { username, password } = userInfo;

  const setPassword = (password) => {
    dispatch(updatePassword(password));
  };
  const setUsername = (username) => {
    dispatch(updateUsername(username));
  };
  const getUsername = (event) => {
    setUsername(event.target.value);
    console.log(event.target.value);
  };

  const getPassword = (event) => {
    setPassword(event.target.value);
  };

  const signup = async () => {
    console.log("signup called");
    try {
      const response = await fetch("http://localhost:3000/Auth/Signup", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      console.log(response);
      if(response.ok){
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="curtain-background" >
        <div className="row border border-2 rounded-3 shadow" >
          <div className="col p-3 align-items-center" style={{backgroundColor: '#20101E'}}>
            <h3 className="mb-3" style={{color: '#FAF5F9'}}>The TV Show Recommendation Platform</h3>
            <h6 style={{color: '#FAF5F9'}}>Sign up</h6>
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
            <button onClick={signup} className="btn btn-danger w-100 mb-2">
              Sign up
            </button>
            <p style={{color: '#FAF5F9'}}>
              Already have an account?{" "}
              <a href="/" onClick={() => navigate("/")}>
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;