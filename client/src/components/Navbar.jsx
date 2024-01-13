import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
import logo1 from "../assets/wwlogo.png";
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
        {/* <p className={classes.navText}>Water Web</p> */}
        <img src={logo1} alt="web logo" className={classes.logo} />
        <NavLink
          to="/grievance"
          style={{ textDecoration: "none", color: "#dbdbdb" }}
        >
          Grievance
        </NavLink>
        <NavLink
          to="/status"
          style={{ textDecoration: "none", color: "#dbdbdb" }}
        >
          Status
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
