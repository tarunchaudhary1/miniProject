import React from "react";
import Sidebar from "../../SideBarNav/SideBar";
import { useState, useEffect } from "react";
import { Table,DropdownButton,Dropdown, Button } from "react-bootstrap";

import "../../Questions/Question bank/QuestionBank.css"

function ResultChoose() {
  const [type,setType] = useState();
  
  const handleTypeSelect = (e) => {
    setType(e);
    console.log(type);
    if(type && type === "mcq") {
      window.location.href = "/all_mcq_result";
    }
    if(type && type === "descriptive") {
      window.location.href = "/all_comp_result";
    }
  }

  useEffect(() => {
    handleTypeSelect();
  });

  return (
    <div >
      <Sidebar />
      <div
        className="tableContainer"
      >
        <h3 className="header-top">Results</h3>
        <div className="container">
          <DropdownButton
            align="end"
            title="Select the Question type"
            id="dropdown-menu-align-end"
            onSelect={handleTypeSelect}
          >
            <Dropdown.Item eventKey="mcq">MCQ</Dropdown.Item>
            <Dropdown.Item eventKey="descriptive">Descriptive</Dropdown.Item>
          </DropdownButton>
          
        </div>
      </div>
    </div>
  );
}

export default ResultChoose;
