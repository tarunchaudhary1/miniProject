import React, { useState } from "react";
import { Table } from "react-bootstrap";
import "../../Questions/InnerLayout.css"
import Sidebar from "../../SideBarNav/SideBar";
import { useTheme } from "../../../Context";

const AllResultsList = () => {
  // Static data
  const staticData = [
    { _id: 1, username: "user1", quizName: "Quiz 1", totalMarks: 100, obtainedMarks: 85, percentage: 85, pass: true },
    { _id: 2, username: "user2", quizName: "Quiz 2", totalMarks: 100, obtainedMarks: 75, percentage: 75, pass: true },
    { _id: 3, username: "user3", quizName: "Quiz 1", totalMarks: 100, obtainedMarks: 45, percentage: 45, pass: false },
  ];

  const [Data] = useState(staticData);
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = Data.slice(firstIndex, lastIndex);
  const npages = Math.ceil(Data.length / recordPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  function prePage() {
    if(currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if(currentPage !== npages) {
      setCurrentPage(currentPage + 1);
    }
  }

  const theme = Boolean(useTheme());
  const themeClassName = theme ? "tableContainer_dark" : "tableContainer";          
  const backCol = theme ? "#444444" : "#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  return (
    <>
      <Sidebar/>
      <div className={themeClassName}>
        <h1>MCQ Result List</h1>
        <Table className={`table-hover table-bordered ${theme ? "table-dark table-striped" : "table table-striped"}`}>
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
            {records.map((item, index) => (
              <tr key={item._id} className="p-3">
                <td>{index + 1}</td>
                <td>{item.username}</td>
                <td>{item.quizName}</td>
                <td>{item.totalMarks}</td>
                <td>{item.obtainedMarks}</td>
                <td>{item.percentage}</td>
                <td>{item.pass ? "Pass" : "Fail"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <nav>
          <ui className='pagination'>
            <li className='page-item'>
              <a href='#' className="page-link" onClick={prePage}>Prev</a>
            </li>
            {numbers.map((n, i) => (
              <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                <a href='#' className='page-link' onClick={() => changeCPage(n)}>{n}</a>
              </li>
            ))}
            <li className='page-item'>
              <a href='#' className="page-link" onClick={nextPage}>Next</a>
            </li>
          </ui>
        </nav>
      </div>
    </>
  );
};

export default AllResultsList;