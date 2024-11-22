import React, { useState } from "react";
import { Table } from "react-bootstrap";
import "../../Questions/InnerLayout.css";
import Sidebar from "../../SideBarNav/SideBar";
import { Link } from "react-router-dom";
import { useTheme } from "../../../Context";

const AllResultsList = () => {
  // Static data
  const staticData = [
    {
      _id: "1",
      username: "john_doe",
      quizName: "JavaScript Basics",
      totalMarks: 100,
      obtainedMarks: { q1: 25, q2: 25, q3: 25 },
      percentage: 75,
      pass: true
    },
    {
      _id: "2",
      username: "jane_smith",
      quizName: "React Fundamentals",
      totalMarks: 100,
      obtainedMarks: null,
      percentage: "Unevaluated",
      pass: false
    }
  ];

  const [sortedData, setSortedData] = useState(staticData);

  const handleSearch = (e) => {
    if (e.target.value.trim().length !== 0) {
      const filtered = staticData.filter(element => 
        element.username.includes(e.target.value)
      );
      setSortedData(filtered);
    } else {
      setSortedData(staticData);
    }
  };

  const theme = Boolean(useTheme());
  const themeClassName = theme ? "tableContainer_dark" : "tableContainer";
  const backCol = theme ? "#444444" : "#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  return (
    <>
      <Sidebar />
      <div className={themeClassName}>
        <h2 className="text-center header-top m-3">Comprehensive Result</h2>
      </div>
    </>
  );
};

export default AllResultsList;
