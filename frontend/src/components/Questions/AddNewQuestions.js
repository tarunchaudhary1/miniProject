import React from "react";
import SideBar from "../SideBarNav/SideBar";
import Dropdown from "react-bootstrap/Dropdown";
import { DropdownButton } from "react-bootstrap";
import { useState } from "react";
import AddMcq from "./AddMcq/AddMcq";
import AddDescriptive from "./AddDescriptive/AddDescriptive";
import "./InnerLayout.css";
import { useTheme } from "../../Context";

function Addnewquestions() {
  const [category, setCategory] = useState(null);
  const [type, setType] = useState();

  const handleCategorySelect = (e) => {
    setCategory(e);
  };

  const handleTypeSelect = (e) => {
    setType(e);
  };

  const theme = Boolean(useTheme());
  const themeClassName = theme
    ? "addQuestionContainer_dark"
    : "addQuestionContainer";

  return (
    <div>
      <SideBar />
      <div className={themeClassName}>
        <div className="display-row my-2">
          <div>
            <DropdownButton
              align="start"
              title="Select the Category of Question"
              id="dropdown-menu-align-end"
              onSelect={handleCategorySelect}
            >
              <Dropdown.Item eventKey="1">Science</Dropdown.Item>
              <Dropdown.Item eventKey="2">Maths</Dropdown.Item>
              <Dropdown.Item eventKey="3">Technology</Dropdown.Item>
              <Dropdown.Item eventKey="4">English</Dropdown.Item>
              <Dropdown.Item eventKey="5">Sports</Dropdown.Item>
            </DropdownButton>
          </div>

          {category !== null && (
            <div className="my-1 mx-3">
              <DropdownButton
                align="end"
                title="Select the Question Type"
                id="dropdown-menu-align-end"
                onSelect={handleTypeSelect}
              >
                <Dropdown.Item eventKey="mcq">
                  Multiple Choice Type
                </Dropdown.Item>
                <Dropdown.Item eventKey="descriptive">
                  Descriptive Type
                </Dropdown.Item>
              </DropdownButton>
            </div>
          )}
        </div>
        <div>
          {type === "mcq" && <AddMcq category={category} />}
          {type === "descriptive" && <AddDescriptive category={category} />}
        </div>
      </div>
    </div>
  );
}

export default Addnewquestions;
