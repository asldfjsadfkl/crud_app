import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { refreshToken } from "../refreshToken";
import "../css/nav.css";

const Nav = () => {
  useEffect(() => {
    refreshToken();
  }, []);
  return (
    <header>
      <NavLink className="navlinks" to="/All">
        All Lists
      </NavLink>

      <NavLink className="navlinks" to="/create">
        Create
      </NavLink>

      <NavLink className="navlinks" to="/profile">
        Profile
      </NavLink>
    </header>
  );
};

export default Nav;
