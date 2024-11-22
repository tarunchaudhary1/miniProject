import React from "react";
import SideBar from "../SideBarNav/SideBar";
import { useState, useEffect } from "react";
import { Table, DropdownButton, Dropdown, Button } from "react-bootstrap";
import CompQuizList from "./Quiz Bank/Comprehensive/CompQuizList";
import McqQuizList from "./Quiz Bank/Mcq/McqQuizList";
import { Link } from "react-router-dom";
import { useTheme } from "../../Context";

function QuizList() {
  const [type, setType] = useState();

  const handleTypeSelect = (e) => {
    setType(e);

    // if (e === "mcq") {
    //   window.location = "/quiz/mcq_quiz_list";
    // } else if (e === "comprehensive") {
    //   window.location = "/quiz/comp_quiz_list";
    // }
  };

  const theme = Boolean(useTheme());
	const themeClassName = theme ? "tableContainer_dark":"tableContainer";
    
  const backCol = theme ? "#444444" : "#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  useEffect(() => {}, []);
  return (
    <div>
      <SideBar />
      <div className={themeClassName}>
        <h3 className="header-top">Quiz List</h3>

        <div className="container">
        
          
          <DropdownButton
            align="end"
            title="Select the Quiz Category"
            id="dropdown-menu-align-end"
            
          >
            <Dropdown.Item eventKey="mcq" href="/quiz/mcq_quiz_list">MCQ</Dropdown.Item>
            <Dropdown.Item eventKey="comprehensive" href="/quiz/comp_quiz_list">Comprehensive</Dropdown.Item>
          </DropdownButton>
          
        </div>
      </div>
    </div>
  );
}

export default QuizList;
