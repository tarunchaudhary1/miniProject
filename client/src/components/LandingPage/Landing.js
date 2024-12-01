import "./Style.css";

import React, { useEffect, useState, useContext } from "react";
import { ReactDOM } from "react";
import { Button } from "bootstrap/dist/js/bootstrap.bundle";
import { NavLink } from "react-bootstrap";
import LandingDesign from "./LandingDesign";
import { Link } from "react-router-dom";
import { useTheme, useThemeUpdate } from "../../Context";
import * as BsIcons from "react-icons/bs";

const Landing = () => {
  const theme = Boolean(useTheme());
  const toggleTheme = useThemeUpdate();
  const backCol = theme ? "#252831" : "	#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  return (
    <>
      <div className="bgcolor">
        <div className="nav_bg">
          <div className="inner_bg">
            <Link
              className="navbar-brand"
              style={{
                fontSize: 25,
                color: "rgb(42,144,222)",
              }}
              to="/"
            >
              Employee Examination Portal
            </Link>
          </div>

          <div className="inner_bg">
            <Link
              className="nav-link"
              style={{
                fontSize: 20,
                textTransform: "capitalize",
              }}
              to={"/about"}
            >
              About Us
            </Link>
          </div>

          <div className="Themebody">
            {theme && (
              <input
                type="checkbox"
                defaultChecked="true"
                className="checkbox"
                id="checkbox"
                onChange={() => {
                  toggleTheme(!theme);
                }}
              />
            )}
            {!theme && (
              <input
                type="checkbox"
                className="checkbox"
                id="checkbox"
                onChange={() => {
                  toggleTheme(!theme);
                }}
              />
            )}
            <label htmlFor="checkbox" className="label">
              <BsIcons.BsSun className="fas fa-moon" />
              <BsIcons.BsFillMoonFill className="fas fa-sun" />
              <div className="ball" />
            </label>
          </div>
        </div>
        <div className="content_bg">
          <LandingDesign />
        </div>
      </div>
    </>

    // <div>
    //   <nav className="navbars">
    //     <div className="logo">
    //       <img src={logo} width="50px" height="50" />
    //     </div>
    //   </nav>
    //   <div className="loginContainer">
    //     <Link to="/login">
    //       <button className='Mybutton' >Login
    //       </button>
    //     </Link>
    //   </div>
  );
};
export default Landing;
