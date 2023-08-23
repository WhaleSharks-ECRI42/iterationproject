import React from "react";
import Header from "/client/components/Header";
import Input from "/client/components/Input";
import TVDisplay from "/client/components/TVDisplay";
// import Main from // PATH
// import { Login } from './components/Login';
// import { Signup } from './components/signup';
// import { Routes, Route } from 'react-router-dom';

// declare our App and pass in child components
const Main = () => {
  return (
    <div>
      <Header />
      <Input />
      <TVDisplay />
    </div>
  );
};

export default Main;
