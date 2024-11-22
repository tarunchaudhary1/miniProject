import "./Style.css";
import React from "react";
import { Link } from "react-router-dom";
import { useTheme, useThemeUpdate } from "../../Context";
import * as BsIcons from "react-icons/bs";

const Landing = () => {
  const theme = Boolean(useTheme());
  const toggleTheme = useThemeUpdate();
  const backCol = theme ? "#252831" : "#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  return (
    <div className="landing-container">
      <nav className="landing-nav">
        <Link className="landing-brand" to="/">
          Decentralized Examination Portal
        </Link>

        <div className="theme-toggle">
          <input
            type="checkbox"
            checked={theme}
            className="checkbox"
            id="checkbox"
            onChange={() => toggleTheme(!theme)}
          />
          <label htmlFor="checkbox" className="label">
            <BsIcons.BsSun className="fas fa-moon" />
            <BsIcons.BsFillMoonFill className="fas fa-sun" />
            <div className="ball" />
          </label>
        </div>
      </nav>

      <main className="landing-main">
        <div className="landing-content">
          <h1 className="landing-title">
            Welcome to <br />
            <strong className="brand-name">DEP</strong>
          </h1>
          <p className="landing-subtitle">
            Create and Manage Online Quizzes & Exams with Proctoring Features
          </p>
          <div className="landing-buttons">
            <Link
              to="/login_admin"
              className={`landing-button ${
                theme ? "button-dark" : "button-light"
              }`}
            >
              Login as Admin
            </Link>
            <Link
              to="/login_user"
              className={`landing-button ${
                theme ? "button-dark" : "button-light"
              }`}
            >
              Login as User
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
