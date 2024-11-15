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

import "../../../Questions/InnerLayout.css";
import Sidebar from "../../../SideBarNav/SideBar";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../Context";

const AddDescriptive = () => {
  const [Data, setData] = useState([]);
  const [quizData, setQuizData] = useState(null);
  const [RowData, SetRowData] = useState([]);
  const [ViewShow, SetViewShow] = useState(false);
  const [categ, setCateg] = useState("");

  //Define here local state that store the form Data
  const [category, setcategory] = useState("");
  const [question, setquestion] = useState("");
  const [answer, setanswer] = useState("");

  const [error, setError] = useState("");

  const [Delete, setDelete] = useState(false);
  const [sortedData, setSortedData] = useState(Data);
  const [addClick, setAddClick] = useState(false);
  const [existingArray, setExistingArray] = useState([]);
  const { id } = useParams();

  const GetQuizId = () => {
    //here we will get all employee data
    const url = `http://backend.healthynomad:8080/api/compQuizzes/${id}`;
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

  const Alert = () => {
    alert("Record Updated Successfully");
  };

  const GetQuestionData = () => {
    //here we will get all employee data
    const url = "http://backend.healthynomad:8080/api/compQs";
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
  };

  const handleAddQuestion = async (item) => {
    if (item) {
      try {
        const url = `http://backend.healthynomad:8080/api/compQuizzes/${id}`;
        const Credentials = {
          addcompQs: item,
        };
        const { data: res } = await axios.patch(url, Credentials);

        if (res.status === "SUCCESS") {
          console.log("Question added");
          GetExistingQuestions();
          // alert(res.message);
          setError(null);
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
        const url = `http://backend.healthynomad:8080/api/compQuizzes/${id}`;
        const Credentials = {
          delcompQs: item,
        };
        const { data: res } = await axios.patch(url, Credentials);

        if (res.status === "SUCCESS") {
          console.log("Question Removed");
          GetExistingQuestions();
          // window.location.reload();
          //alert(res.message);
          setError(null);
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

  const GetExistingQuestions = () => {
    const url = `http://backend.healthynomad:8080/api/compQuizzes/${id}`;
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
          setExistingArray(data.compQs);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const theme = Boolean(useTheme());
  const themeClassName = theme ? "tableContainer_dark" : "tableContainer";

  const backCol = theme ? "#444444" : "	#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  useEffect(() => {
    // console.log(id);
    GetExistingQuestions();
    GetQuizId();
    GetQuestionData();
    setSortedData(Data);
  }, []);
  return (
    <>
      <Sidebar />
      <div className="tableContainer">
        <h3 className={`header-top my-2 ${theme ? "text-white" : ""}`}>Add Comprehensive Questions</h3>

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
                  className={theme ? "search_bar_dark" : "search_bar"}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleSearch}
                />
              </form>
            </div>
            <div style={{marginTop : "30px",marginLeft : "50px"}}>
              <Link
                to={`/quiz/addnewquiz/add_comp_user/${id}`}
                className={theme ? "button_dark_success" : "button_light_success"}
                onClick={Alert}
              >
                Add Questions
              </Link>
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
                <th>Sample Answer</th>
              </tr>
            </thead>
            <tbody>
              {sortedData !== undefined &&
                sortedData.map((item, index) => {
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
                      <td>{item.answer}</td>
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

export default AddDescriptive;
