import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./client/components/Login";
import Main from "./client/components/Main";
import Signup from "./client/components/Signup";

// declare our App and pass in routes to the various pages we want
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/Auth/Signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
