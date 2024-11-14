import "./Style.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "../SideBarNav/SideBar";
import { useTheme } from "../../Context";

const Main = () => {
  const theme = useTheme();

  const backCol = theme ? "var(--bg_dark)" : "var(--bg_light)";
  const textCol = theme ? "white" : "black";
  const themeClassName = theme ? "tableContainer_dark" : "tableContainer";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  return (
    <div className="main-content-1">
      <SideBar />
      <div className="title">
        <h1><b>Dashboard</b></h1>
      </div>{" "}
      <br />
      <div className="dashboard">
        <main>
          <div>
            <div className={`${theme ? "custom_cards_dark" : "custom_cards"}`}>
              <div className="card-header">Users</div>

              <hr></hr>
              <Link
                className="text-decoration-none card-text"
                to={"/users/userlist"}
              >
                <div className="card-body">View Details</div>
              </Link>
            </div>
          </div>

          <div>
            <div className={`${theme ? "custom_cards_dark" : "custom_cards"}`}>
              <div className="card-header">Questions</div>

              <hr></hr>
              <Link
                className="text-decoration-none card-text"
                to={"/questions/questionbank"}
              >
                <div className="card-body">View Details</div>
              </Link>
            </div>
          </div>

          <div>
            <div className={`${theme ? "custom_cards_dark" : "custom_cards"}`}>
              <div className="card-header">Quizzes</div>

              <hr></hr>
              <Link
                className="text-decoration-none card-text"
                to={"/quiz/quizList"}
              >
                <div className="card-body">View Details</div>
              </Link>
            </div>
          </div>

          <div>
            <div className={`${theme ? "custom_cards_dark" : "custom_cards"}`}>
              <div className="card-header">Results</div>
              <hr></hr>
              <Link
                className="text-decoration-none card-text"
                to={"/all_results"}
              >
                <div className="card-body">View Details</div>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Main;
