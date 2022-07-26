import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "../../images/logo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/">
          <img className="logo" src={logo} alt="" />
          <h1>Bday</h1>
        </Link>
      </div>
      <div className="right">
        <Link to="/add">
          <h3 className="link">Add</h3>
        </Link>
        <Link to="/view">
          <h3 className="link">View</h3>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
