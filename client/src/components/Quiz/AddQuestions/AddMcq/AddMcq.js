import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  Badge,
  Table,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import "../../../Questions/InnerLayout.css";
import Sidebar from "../../../SideBarNav/SideBar";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../../../../Context";
const AddMcq = (props) => {
  const [Data, setData] = useState([]);
  const [addedQues, setAddedQues] = useState([]);
  const [sortedData, setSortedData] = useState(Data);
  const [categ, setCateg] = useState("");
  const [disableAdd, setDisableAdd] = useState(false);
  const [disableRemove, setDisableRemove] = useState(true);
  const [error, setError] = useState("");
  const [RowData, setRowData] = useState([]);
  const [quizData, setQuizData] = useState(null);
  const [existingArray, setExistingArray] = useState([]);

  const { id } = useParams();

  const theme = Boolean(useTheme());
  const themeClassName = theme ? "tableContainer_dark" : "tableContainer";

  const backCol = theme ? "#444444" : "#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  const GetQuizId = () => {
    //here we will get all employee data
    const url = `http://localhost:8080/api/mcqQuizzes/${id}`;
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        //console.log(result);
        const { status, message, data } = result;
        if (status !== "SUCCESS") {
          alert(message, status);
        } else {
          setQuizData(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Alert =() =>{
    alert("Record Updated Successfully")
  }

  const GetMcqQuestions = () => {
    //here we will get all employee data
    const url = "http://localhost:8080/api/mcqQs";
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        //console.log(result);
        const { status, message, data } = result;
        if (status !== "SUCCESS") {
          alert(message, status);
        } else {
          // console.log(data);
          setData(data);
          setSortedData(data);
          //console.log(data)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCategorySelect = (e) => {
    setCateg(e);
    let sorted = [];
    console.log(!Number(e));
    if (Number(e)) {
      Data.map((element) => {
        console.log(typeof element.category, typeof category);

        if (Number(element.category) === Number(e)) {
          sorted.push(element);
        }
      });

      setSortedData((data) => {
        setSortedData(sorted);
      });
    } else {
      setSortedData(Data);
    }

    console.log(sorted);
  };

  const handleSearch = (e) => {
    let sorted = [];

    if (e.target.value.trim().length !== 0) {
      Data.map((element) => {
        if (element.question.includes(e.target.value)) {
          sorted.push(element);
        }
      });

      setSortedData((data) => {
        setSortedData(sorted);
      });
    } else {
      setSortedData(Data);
    }

    console.log(sorted);
  };

  const handleAddQuestion = async (item) => {
    if (item) {
      try {
        const url = `http://localhost:8080/api/mcqQuizzes/${id}`;
        // console.log(url);
        // console.log(item);
        const Credentials = {
          addmcqQs: item,
        };
        const { data: res } = await axios.patch(url, Credentials);
        // console.log(`length`, existingArray.length);
        if (res.status === "SUCCESS") {
          console.log("Question Added");
          GetExistingQuestions();
        }
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
    }
  };
  const handleRemove = async (item) => {
    if (item) {
      try {
        const url = `http://localhost:8080/api/mcqQuizzes/${id}`;
        const Credentials = {
          delmcqQs: item,
        };
        const { data: res } = await axios.patch(url, Credentials);

        if (res.status === "SUCCESS") {
          console.log("Question Removed");
          GetExistingQuestions();
        }
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
    }
  };

  let right = <Badge bg="success">&#x2713;</Badge>;
  let wrong = <Badge bg="danger">X</Badge>;

  const GetExistingQuestions = () => {
    const url = `http://localhost:8080/api/mcqQuizzes/${id}`;
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        //console.log(result);
        const { status, message, data } = result;
        if (status !== "SUCCESS") {
          alert(message, status);
        } else {
          // console.log(data);
          setExistingArray(data.mcqQs);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    // console.log(id);
    GetExistingQuestions();
    GetQuizId();
    GetMcqQuestions();
    setSortedData(Data);
  }, []);
  return (
    <>
      <Sidebar />
        <div className={themeClassName}>
        {/* <h3 className="header-top my-2">Add MCQ Questions</h3> */}
        <h1>Add MCQ Questions</h1>

       
        <div className="container my-table">
          <div className="mt-5 mb-4 display-row">
            <div>
              <DropdownButton
                align="end"
                title="Sort By Question Category"
                id="dropdown-menu-align-end"
                onSelect={handleCategorySelect}
              >
                <Dropdown.Item eventKey="-">-----</Dropdown.Item>
                <Dropdown.Item eventKey="1">1</Dropdown.Item>
                <Dropdown.Item eventKey="2">2</Dropdown.Item>
                <Dropdown.Item eventKey="3">3</Dropdown.Item>
                <Dropdown.Item eventKey="4">4</Dropdown.Item>
                <Dropdown.Item eventKey="5">5</Dropdown.Item>
              </DropdownButton>
            </div>
            <div>
              <form className="d-flex" role="search">
                <input
                  className={`${
                    theme
                      ? "search_bar_dark no-outline_dark"
                      : "search_bar no-outline"
                  }`}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleSearch}
                />
              </form>
            </div>
            <div style={{marginTop : "30px"}}>
             
                <Link onClick={Alert} to={`/quiz/addnewquiz/add_mcq_user/${id}`} className={`${theme ? "button_dark_success" : "button_light_success"}`}>Add Questions</Link>
             
            </div>
          </div>
          <Table className={`table-hover table-bordered ${
                theme ? "table-dark table-striped" : "table table-striped"
              }`}>
            <thead>
              <tr>
                <th>Select Questions</th>
                <th>Question No.</th>
                <th>Category</th>
                <th>Questions</th>
                <th>Options</th>
                {/* <th > Correct Option</th> */}
              </tr>
            </thead>
            <tbody>
              {sortedData !== undefined &&
                sortedData.map((item, index) => {
                  let count = Object.keys(item).length;
                  let i = 1;
                  let options;

                  switch (count - 5) {
                    case 2:
                      options = (
                        <div>
                          <p>
                            {item.correct === i++ ? right : wrong}&nbsp;{" "}
                            {item.option1}
                          </p>
                          <p>
                            {item.correct === i++ ? right : wrong}&nbsp;{" "}
                            {item.option2}
                          </p>
                        </div>
                      );
                      break;
                    case 3:
                      options = (
                        <div>
                          <p>
                            {item.correct === i++ ? right : wrong}&nbsp;{" "}
                            {item.option1}
                          </p>
                          <p>
                            {item.correct === i++ ? right : wrong}&nbsp;{" "}
                            {item.option2}
                          </p>
                          <p>
                            {item.correct === i++ ? right : wrong}&nbsp;{" "}
                            {item.option3}
                          </p>
                        </div>
                      );
                      break;
                    case 4:
                      options = (
                        <div>
                          <p>
                            {item.correct === i++ ? right : wrong}&nbsp;{" "}
                            {item.option1}
                          </p>
                          <p>
                            {item.correct === i++ ? right : wrong}&nbsp;{" "}
                            {item.option2}
                          </p>
                          <p>
                            {item.correct === i++ ? right : wrong}&nbsp;{" "}
                            {item.option3}
                          </p>
                          <p>
                            {item.correct === i++ ? right : wrong}&nbsp;{" "}
                            {item.option4}
                          </p>
                        </div>
                      );
                      break;

                    default:
                      options = (
                        <div>
                          <p>
                            {item.correct === i++ ? right : wrong}&nbsp;{" "}
                            {item.option1}
                          </p>
                          <p>
                            {item.correct === i++ ? right : wrong}&nbsp;{" "}
                            {item.option2}
                          </p>
                        </div>
                      );
                      break;
                  }
                  return (
                    <tr key={item._id}>
                      <td>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={existingArray.find(
                            (q) => q._id === item._id
                          )}
                          onChange={(event) => {
                            if (event.target.checked) {
                              console.log("✅ Checkbox is checked");
                              handleAddQuestion(item);
                            } else {
                              console.log("⛔️ Checkbox is NOT checked");
                              handleRemove(item);
                            }
                          }}
                          value=""
                          id="flexCheckDefault"
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{item.category}</td>
                      <td>{item.question}</td>
                      <td>{options}</td>
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

export default AddMcq;
