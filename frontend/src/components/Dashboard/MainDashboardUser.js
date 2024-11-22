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
    <div>
      <SideBar />
      <div className="title">
        <h1>Dashboard</h1>
      </div>
     
      <div className="dashboard">
        <main>
          <div>
            <div
              className={`${theme ? "custom_cards_dark" : "custom_cards"}`}
              // style={{ maxWidth: "40rem" }}
            >
              <div className="card-header">Users</div>
              <div className="card-body">
                <hr></hr>
                <Link
                  className="text-decoration-none card-text"
                  to={"/dashboard"}
                >
                  <div className="card-body">View Details</div>
                </Link>
              </div>
            </div>
          </div>

          <div>
            <div
              className={`${theme ? "custom_cards_dark" : "custom_cards"}`}
              // style={{ maxWidth: "40rem" }}
            >
              <div className="card-header">Quizzes</div>
              <div className="card-body">
                <hr></hr>
                <Link
                  className="text-decoration-none card-text"
                  to={"/quiz/attempt_quiz"}
                >
                  <div className="card-body">View Details</div>
                </Link>
              </div>
            </div>
          </div>

          <div>
            <div
              className={`${theme ? "custom_cards_dark" : "custom_cards"}`}
              // style={{ maxWidth: "40rem" }}
            >
              <div className="card-header">Results</div>
              <div className="card-body">
                <hr></hr>
                <Link
                  className="text-decoration-none card-text"
                  to={"/mcq_result"}
                >
                  <div className="card-body">View Details</div>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Main;
