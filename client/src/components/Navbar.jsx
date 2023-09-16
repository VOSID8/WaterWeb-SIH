import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
const Navbar = () => {
  return (
    <>
      <div className={classes.container}>
        <NavLink to="/" style={{ textDecoration: "none", color: "#dbdbdb" }}>
          Home
        </NavLink>
        <NavLink
          to="/dashboard"
          style={{ textDecoration: "none", color: "#dbdbdb" }}
        >
          Dashboard
        </NavLink>
        <p className={classes.navText}>Water Web</p>
        <NavLink
          to="/grievance"
          style={{ textDecoration: "none", color: "#dbdbdb" }}
        >
          Grievance
        </NavLink>
        <NavLink
          to="/general"
          style={{ textDecoration: "none", color: "#dbdbdb" }}
        >
          General
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
