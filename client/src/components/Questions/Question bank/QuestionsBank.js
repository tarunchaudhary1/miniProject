import React from "react";
import Sidebar from "../../SideBarNav/SideBar";
import { useState, useEffect } from "react";
import { Table, DropdownButton, Dropdown, Button } from "react-bootstrap";

import McqBank from "./Mcq Question Bank/McqBank";
import DescriptiveBank from "./Descriptive Question Bank/DescriptiveBank";
import "./QuestionBank.css";
import { useTheme } from "../../../Context";

function Questionsbank() {
  const [type, setType] = useState();

  const theme = Boolean(useTheme());
  const themeClassName = theme
    ? "tableContainer_dark"
    : "tableContainer";

  const backCol = theme ? "#444444" : "	#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  const handleTypeSelect = (e) => {
    setType(e);
  };

  useEffect(() => {}, []);
  return (
    <div>
      <Sidebar />
      <div className={themeClassName}>
        <h3 className="header-top">Question Bank</h3>

        {theme ? (
          <div>
            <DropdownButton
              align="end"
              title="Select the Question type"
              // variant=""
              id="dropdown-menu-align-end"
              onSelect={handleTypeSelect}
              style={{}}
              // className={`${theme ? "dropdown_dark_small" : "dropdown_light_small"}`}
            >
              <Dropdown.Item eventKey="mcq">MCQ</Dropdown.Item>
              <Dropdown.Item eventKey="descriptive">Descriptive</Dropdown.Item>
            </DropdownButton>

            {type === "mcq" && <McqBank />}
            {type === "descriptive" && <DescriptiveBank />}
          </div>
        ) : (
          <div>
            <DropdownButton
              align="end"
              title="Select the Question type"
              // variant=""
              id="dropdown-menu-align-end"
              onSelect={handleTypeSelect}
              style={{}}
              // className={`${theme ? "dropdown_dark_small" : "dropdown_light_small"}`}
            >
              <Dropdown.Item eventKey="mcq">MCQ</Dropdown.Item>
              <Dropdown.Item eventKey="descriptive">Descriptive</Dropdown.Item>
            </DropdownButton>

            {type === "mcq" && <McqBank />}
            {type === "descriptive" && <DescriptiveBank />}
          </div>
        )}
      </div>
    </div>
  );
}

export default Questionsbank;
