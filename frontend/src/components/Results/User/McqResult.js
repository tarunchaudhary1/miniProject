import React from "react";
import { Table } from "react-bootstrap";
import "../../Questions/InnerLayout.css";
import Sidebar from "../../SideBarNav/SideBar";
import { useTheme } from "../../../Context";

const McqResult = () => {
  // Sample static data
  const staticData = [
    {
      _id: 1,
      username: "John Doe",
      quizName: "JavaScript Basics",
      totalMarks: 100,
      obtainedMarks: 85,
      percentage: 85,
      pass: true
    },
    {
      _id: 2,
      username: "Jane Smith",
      quizName: "React Fundamentals",
      totalMarks: 100,
      obtainedMarks: 92,
      percentage: 92,
      pass: true
    },
    // Add more static entries as needed
  ];

  // Pagination logic
  const recordPerPage = 5;
  const [currentPage, setCurrentPage] = React.useState(1);
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = staticData.slice(firstIndex, lastIndex);
  const npages = Math.ceil(staticData.length / recordPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  const prePage = () => {
    if(currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const changeCPage = (id) => setCurrentPage(id);

  const nextPage = () => {
    if(currentPage !== npages) setCurrentPage(currentPage + 1);
  };

  // Theme handling
  const theme = Boolean(useTheme());
  const themeClassName = theme ? "tableContainer_dark" : "tableContainer";
  const backCol = theme ? "#444444" : "#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  return (
    <>
      <Sidebar />
      <div className={themeClassName}>
        <h2 className="text-center">MCQ Quiz Results</h2>
        <div className="container my-table">
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
                <tr key={item._id}>
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
            <ul className='pagination'>
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
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default McqResult;