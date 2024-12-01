import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalTitle,
  Table,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import axios from "axios";

import "../../Questions/InnerLayout.css";
import Sidebar from "../../SideBarNav/SideBar";
import { Link } from "react-router-dom";
import { useTheme } from "../../../Context";

const AllResultsList = () => {
  const [Data, setData] = useState([]);
  const [RowData, SetRowData] = useState([]);
  const [ViewShow, SetViewShow] = useState(false);
  const [categ, setCateg] = useState("");
  const handleViewShow = () => {
    SetViewShow(true);
  };
  const hanldeViewClose = () => {
    SetViewShow(false);
  };
  //FOr Edit Model
  const [ViewEdit, SetEditShow] = useState(false);
  const handleEditShow = () => {
    SetEditShow(true);
  };
  const hanldeEditClose = () => {
    SetEditShow(false);
  };
  //FOr Delete Model
  const [ViewDelete, SetDeleteShow] = useState(false);
  const handleDeleteShow = () => {
    SetDeleteShow(true);
  };
  const hanldeDeleteClose = () => {
    SetDeleteShow(false);
  };
  //FOr Add New Data Model
  const [ViewPost, SetPostShow] = useState(false);
  const handlePostShow = () => {
    SetPostShow(true);
  };
  const hanldePostClose = () => {
    SetPostShow(false);
    setcategory("");
    setquestion("");
    setanswer("");
  };

  //Define here local state that store the form Data
  const [category, setcategory] = useState("");
  const [question, setquestion] = useState("");
  const [answer, setanswer] = useState("");

  const [error, setError] = useState("");

  const [Delete, setDelete] = useState(false);
  const [sortedData, setSortedData] = useState(Data);

  //Id for update record and Delete
  const [id, setId] = useState("");

  const GetResultData = () => {
    //here we will get all employee data
    const url = "http://localhost:8080/api/compResults";
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        //console.log(result);
        const { status, message, data } = result;
        if (status !== "SUCCESS") {
          alert(message, status);
        } else {
          setData(data);
          setSortedData(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (e) => {
    let sorted = [];

    if (e.target.value.trim().length !== 0) {
      Data.map((element) => {
        if (element.username.includes(e.target.value)) {
          sorted.push(element);
        }
      });

      setSortedData((data) => {
        setSortedData(sorted);
      });
    } else {
      setSortedData(Data);
    }
  };
  //call this function in useEffect
  // console.log(ViewShow, RowData)
  useEffect(() => {
    GetResultData();
    setSortedData(Data);
  }, []);

  const theme = Boolean(useTheme());
	const themeClassName = theme ? "tableContainer_dark":"tableContainer";
    
  const backCol = theme ? "#444444" : "	#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  return (
    <>
      <Sidebar />

      <div className={themeClassName}>
        <h2 className="text-center header-top m-3">
          Comprehensive Result List
        </h2>
        <div className="container my-table">
          <div className="mt-5 mb-4 display-row">
            <div className="m-1">
              <form className="d-flex" role="search">
                <input
                  className={`${theme ? "search_bar_dark no-outline_dark" : "search_bar no-outline"}`}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleSearch}
                />
              </form>
            </div>
          </div>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.length !== 0 &&
                sortedData.map((item, index) => {
                  
                  let finalMarks;
                  if (item.obtainedMarks) {
                    finalMarks = 0;
                    for (let [key, value] of Object.entries(item.obtainedMarks)) {
                      finalMarks += Number(value);
                    }
                  }
                  else {
                    finalMarks = "Unevaluated";
                  }

                  let percentage = finalMarks === "Unevaluated"?"Unevaluated":item.percentage;
                  return (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.username}</td>

                      <td>{item.quizName}</td>

                      <td>{item.totalMarks}</td>
                      <td>{finalMarks}</td>
                      <td>{percentage}</td>
                      <td>
                        {percentage === "Unevaluated"?"Unevaluated":(item.pass?"Pass":"Fail")}
                      </td>
                      <td>
                        <div className="m-2">
                        {percentage === "Unevaluated"?<Link
                          className={`${theme ? "button_dark_small_warning" : "button_light_small_warning"}`}
                          to={`/all_comp_result/evaluate_comp/${item._id}`}
                        >
                          Evaluate
                        </Link>:
                        <Link
                        className={`${theme ? "button_dark_small" : "button_light_small"}`}
                          to={`/all_comp_result/evaluate_comp/${item._id}`}
                        >
                          Re-Evaluate
                        </Link>}
                        </div>
                      </td>
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

export default AllResultsList;
