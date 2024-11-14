import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalTitle,
  Table,
  Dropdown,
  DropdownButton,
  Badge,
  Row,
} from "react-bootstrap";
import axios from "axios";
import Sidebar from '../../SideBarNav/SideBar'
import "../../Questions/InnerLayout.css"
import McqList from "./Quizzes List/McqList";
import ExpiredMcqList from "./Quizzes List/ExpiredMcqList";
import ComprehensiveList from "./Quizzes List/ComprehensiveList";
import ExpiredCompList from "./Quizzes List/ExpiredCompList";
import { useTheme } from "../../../Context";

const AttemptQuiz = () => {
  
  const theme = useTheme();
  const themeClassName = theme ? "tableContainer_dark":"tableContainer";

  const backCol = theme ? "#444444" : "	#ffffff";
  const textCol = theme ? "white" : "black";

  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  return (
    <>
      <Sidebar />
      <div className={themeClassName}>
        <h3 className="header-top">Attempt a Quiz</h3>
        <div>
          <McqList />
        </div>
        <div>
          <ExpiredMcqList />
        </div>
        <div>
          <ComprehensiveList />
        </div>
        <div>
          <ExpiredCompList />
        </div>
      </div>
    </>
  );
}

export default AttemptQuiz