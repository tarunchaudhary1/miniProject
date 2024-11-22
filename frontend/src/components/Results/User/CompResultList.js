import React from "react";
import { Table } from "react-bootstrap";
import "../../Questions/InnerLayout.css";
import Sidebar from "../../SideBarNav/SideBar";
import { useTheme } from "../../../Context";
import 'bootstrap/dist/css/bootstrap.min.css'

const CompResult = () => {
  const staticData = [
    {
      _id: 1,
      username: "John Doe",
      quizName: "JavaScript Basics",
      totalMarks: 100,
      obtainedMarks: { q1: 20, q2: 30, q3: 25 },
      percentage: 75,
      pass: true
    },
    {
      _id: 2,
      username: "Jane Smith",
      quizName: "React Fundamentals",
      totalMarks: 100,
      obtainedMarks: { q1: 15, q2: 25, q3: 20 },
      percentage: 60,
      pass: false
    }
  ];

  const theme = Boolean(useTheme());
  const themeClassName = theme ? "tableContainer_dark" : "tableContainer";

  const backCol = theme ? "#444444" : "#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  return (
    <>
      <Sidebar />
      <div className="tableContainer">
        <h2 className="text-center">Comprehensive Quiz Results</h2>
        <div className="container my-table">
          <Table
            className={`table-hover table-bordered ${
              theme ? "table-dark table-striped" : "table table-striped"
            }`}
          >
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Username</th>
                <th>Quizname</th>
                <th>Total Marks</th>
                <th>Obtained Marks</th>
                <th>Percentage</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {staticData.map((item, index) => {
                let finalMarks = 0;
                for (let value of Object.values(item.obtainedMarks)) {
                  finalMarks += Number(value);
                }

                return (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.quizName}</td>
                    <td>{item.totalMarks}</td>
                    <td>{finalMarks}</td>
                    <td>{item.percentage}</td>
                    <td>{item.pass ? "Pass" : "Fail"}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default CompResult;