import React from "react";
import Sidebar from "../../SideBarNav/SideBar";
import { useState } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import McqBank from "./Mcq Question Bank/McqBank";
import DescriptiveBank from "./Descriptive Question Bank/DescriptiveBank";
import "./QuestionBank.css";
import { useTheme } from "../../../Context";

function Questionsbank() {
  const [type, setType] = useState();
  const theme = Boolean(useTheme());
  const themeClassName = theme ? "tableContainer_dark" : "tableContainer";
  const backCol = theme ? "#444444" : "#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  const handleTypeSelect = (e) => {
    setType(e);
  };

  return (
    <div>
      <Sidebar />
      <div className={themeClassName}>
        <h3 className="header-top">Question Bank</h3>
        <div>
          <DropdownButton
            align="end"
            title="Select the Question type"
            id="dropdown-menu-align-end"
            onSelect={handleTypeSelect}
          >
            <Dropdown.Item eventKey="mcq">MCQ</Dropdown.Item>
            <Dropdown.Item eventKey="descriptive">Descriptive</Dropdown.Item>
          </DropdownButton>

          {type === "mcq" && <McqBank />}
          {type === "descriptive" && <DescriptiveBank />}
        </div>
      </div>
    </div>
  );
}

export default Questionsbank;
