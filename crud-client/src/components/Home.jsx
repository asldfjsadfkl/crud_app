import React, { useEffect } from "react";
import "../index.css";
import "../../src/index.css";
import { refreshToken } from "../refreshToken";

const Home = () => {
  useEffect(() => {
    refreshToken();
  }, []);

  return <div className="app">CRUD-APP</div>;
};
export default Home;
