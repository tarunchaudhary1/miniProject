import React, { useEffect, useState } from "react";
import {
  button,
  Modal,
  ModalTitle,
  Table,
  Dropdown,
  Dropdownbutton,
  Badge,
  Row,
} from "react-bootstrap";
import axios from "axios";
import Sidebar from "../../../SideBarNav/SideBar";
import "../../../Questions/InnerLayout.css";
import CompQuizDetails from "./CompQuizDetails";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../Context";

const CompQuizList = () => {
  const [Data, setData] = useState([]);
  const [RowData, SetRowData] = useState([]);
  const [ViewShow, SetViewShow] = useState(false);
  const [categ, setCateg] = useState("");
  const handleViewShow = () => {
    SetViewShow(true);
  };
  const hanldeViewClose = () => {
    SetViewShow(false);
    setDelete(false);
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
    setName("");
    setDesc("");
    setMaxAttempt("");
    setMinPerc("");
    setCorrectScore("");
    setIncorrectScore("");
    setDuration("");
  };

  //Define here local state that store the form Data
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [maxAttempt, setMaxAttempt] = useState();
  const [minPerc, setMinPerc] = useState();
  const [correctScore, setCorrectScore] = useState();
  const [incorrectScore, setIncorrectScore] = useState();
  const [duration, setDuration] = useState();
  const [expiryTime, setExpiryTime] = useState();
  const [currQuizId, setCurrQuizId] = useState("");
  const [error, setError] = useState("");
  const [component, setComponent] = useState("");
  const [Delete, setDelete] = useState(false);
  const [sortedData, setSortedData] = useState(Data);

  //Id for update record and Delete
  const [id, setId] = useState("");

  const GetCompQuizData = () => {
    //here we will get all employee data
    const url = "http://backend.healthynomad.xyz:8080/api/compQuizzes";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://backend.healthynomad.xyz:8080/api/compQuizzes";
      const Credentials = {
        name,
        desc,
        maxAttempt,
        minPerc,
        correctScore,
        incorrectScore,
        duration,
      };
      const { data: res } = await axios.post(url, Credentials);

      if (res.status === "SUCCESS") {
        alert(res.message);
        window.location.reload();
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
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://backend.healthynomad.xyz:8080/api/compQuizzes/${id}`;
      const Credentials = {
        name,
        desc,
        maxAttempt,
        minPerc,
        correctScore,
        incorrectScore,
        duration,
        expiryTime,
      };
      const { data: res } = await axios.patch(url, Credentials);

      if (res.status === "SUCCESS") {
        alert(res.message);
        window.location.reload();
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
  };

  const handleDelete = () => {
    const url = `http://backend.healthynomad.xyz:8080/api/compQuizzes/${id}`;
    axios
      .delete(url)
      .then((response) => {
        const result = response.data;
        const { status, message } = result;
        if (status !== "SUCCESS") {
          alert(message, status);
        } else {
          alert(message);
          GetCompQuizData();
          window.location.reload();
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
        if (element.name.includes(e.target.value)) {
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

  const handleViewDetails = () => {
    setComponent(<CompQuizDetails quizId={id} />);
  };

  const handleAddQuestions = () => {
    window.location = `/quiz/addnewquiz/add_desc/${id}`;
  };

  function locTime(expTime) {
    var d = new Date(expTime);
    const locTime =
      d.toLocaleDateString("en-GB") + " | " + d.toLocaleTimeString();
    // console.log(locTime);
    return locTime;
  }
  const theme = Boolean(useTheme());
  const themeClassName = theme ? "tableContainer_dark" : "tableContainer";

  const backCol = theme ? "#444444" : "	#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;
  //call this function in useEffect
  // console.log(ViewShow, RowData)
  useEffect(() => {
    setComponent(null);
    GetCompQuizData();
    setSortedData(Data);
  }, [id]);
  return (
    <>
      <Sidebar />
      <div className={themeClassName}>
        <div className="my-body">
          <div className="m-3">
            <Link
              className={`${theme ? "button_dark" : "button_light"}`}
              to={"/quiz/quizList"}
            >
              Back
            </Link>
          </div>

          <h3 className="text-center header-top">Comprehensive Quiz List</h3>
          <div className="container my-table">
            <div className="mt-5 mb-4 display-row">
              <div className="m-1">
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
            </div>
            <Table
              className={`table-hover table-bordered ${
                theme ? "table-dark table-striped" : "table table-striped"
              }`}
            >
              <thead>
                <tr>
                  <th colSpan={1}>S.No.</th>
                  <th colSpan={1}>Name</th>
                  <th colSpan={1}>Description</th>
                  {/* <th>Max Attempts</th> */}
                  <th>Min Percentage</th>
                  <th>Correct Score</th>
                  <th>Incorrect Score</th>
                  <th>Duration</th>
                  <th>Expiry Date & Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedData !== undefined &&
                  sortedData.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.desc}</td>
                        {/* <td>{item.maxAttempt}</td> */}
                        <td>{item.minPerc}</td>
                        <td>{item.correctScore}</td>
                        <td>{item.incorrectScore}</td>
                        <td>{item.duration}</td>
                        <td>{locTime(item.expiryTime)}</td>
                        <td style={{ minWidth: 300 }}>
                          <button
                            s
                            className={`${
                              theme ? "button_dark_small" : "button_light_small"
                            }`}
                            onClick={() => {
                              handleViewShow(SetRowData(item));
                            }}
                          >
                            View
                          </button>

                          <button
                            s
                            className={`${
                              theme
                                ? "button_dark_small_warning"
                                : "button_light_small_warning"
                            }`}
                            onClick={() => {
                              handleEditShow(SetRowData(item), setId(item._id));
                            }}
                          >
                            Edit
                          </button>

                          <button
                            className={`${
                              theme
                                ? "button_dark_small_danger"
                                : "button_light_small_danger"
                            }`}
                            onClick={() => {
                              handleViewShow(
                                SetRowData(item),
                                setId(item._id),
                                setDelete(true)
                              );
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
          {/* View Modal */}
          <div className="model-box-view">
            <Modal
              show={ViewShow}
              onHide={hanldeViewClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header
                closebutton
                className={theme ? "custom_modal_dark" : "custom_modal"}
              >
                <Modal.Title>View Quiz</Modal.Title>
              </Modal.Header>
              <Modal.Body
                className={theme ? "custom_modal_dark" : "custom_modal"}
              >
                <div>
                  <div className="form-group">
                    <label>Quiz Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={RowData.name}
                      readOnly
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Quiz Description</label>
                    <input
                      type="text"
                      className="form-control"
                      value={RowData.desc}
                      readOnly
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Max Attempts</label>
                    <input
                      type="answer"
                      className="form-control"
                      value={RowData.maxAttempt}
                      readOnly
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Min Percentage</label>
                    <input
                      type="answer"
                      className="form-control"
                      value={RowData.minPerc}
                      readOnly
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label>Quiz Duration</label>
                    <input
                      type="answer"
                      className="form-control"
                      value={RowData.duration}
                      readOnly
                    />
                  </div>

                  {Delete && (
                    <button
                      className={`my-1 ${
                        theme
                          ? "button_dark_small_danger"
                          : "button_light_small_danger"
                      }`}
                      onClick={handleDelete}
                    >
                      Delete Quiz
                    </button>
                  )}
                </div>
              </Modal.Body>
              {theme ? (
                <Modal.Footer style={{ backgroundColor: "var(--bg_dark)" }}>
                  <button
                    onClick={hanldeViewClose}
                    className={
                      theme ? "button_dark_small" : "button_light_small"
                    }
                  >
                    Close
                  </button>
                </Modal.Footer>
              ) : (
                <Modal.Footer style={{ backgroundColor: "var(--bg_light)" }}>
                  <button
                    onClick={hanldeViewClose}
                    className={
                      theme ? "button_dark_small" : "button_light_small"
                    }
                  >
                    Close
                  </button>
                </Modal.Footer>
              )}
            </Modal>
          </div>
          {/* Modal for submit data to database */}
          <div className="model-box-view">
            <Modal
              show={ViewPost}
              onHide={hanldePostClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header
                closebutton
                className={theme ? "custom_modal_dark" : "custom_modal"}
              >
                <Modal.Title>Add New Question</Modal.Title>
              </Modal.Header>
              <Modal.Body
                className={theme ? "custom_modal_dark" : "custom_modal"}
              >
                <div>
                  <div className="form-group" autoComplete="off" autoSave="off">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Please enter Category"
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setDesc(e.target.value)}
                      placeholder="Please enter Question"
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="answer"
                      className="form-control"
                      autoComplete="off"
                      autoSave="off"
                      onChange={(e) => setMaxAttempt(e.target.value)}
                      placeholder="Please enter Answer"
                    />
                  </div>
                  {error && <div className="error_msgs">{error}</div>} <br />
                  <button
                    type="submit"
                    className="btn btn-success mt-4"
                    onClick={handleSubmit}
                  >
                    Add Question
                  </button>
                </div>
              </Modal.Body>
              {theme ? (
                <Modal.Footer style={{ backgroundColor: "var(--bg_dark)" }}>
                  <button
                    className={
                      theme ? "button_dark_small" : "button_light_small"
                    }
                    onClick={hanldePostClose}
                  >
                    Close
                  </button>
                </Modal.Footer>
              ) : (
                <Modal.Footer style={{ backgroundColor: "var(--bg_light)" }}>
                  <button
                    className={
                      theme ? "button_dark_small" : "button_light_small"
                    }
                    onClick={hanldePostClose}
                  >
                    Close
                  </button>
                </Modal.Footer>
              )}
            </Modal>
          </div>
          {/* Modal for Edit employee record */}
          <div className="model-box-view">
            <Modal
              show={ViewEdit}
              onHide={hanldeEditClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header
                closebutton
                className={theme ? "custom_modal_dark" : "custom_modal"}
              >
                <Modal.Title>Edit Quiz</Modal.Title>
              </Modal.Header>
              <Modal.Body
                className={theme ? "custom_modal_dark" : "custom_modal"}
              >
                <div>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Please enter First Name"
                      defaultValue={RowData.name}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Description</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setDesc(e.target.value)}
                      placeholder="Please enter Last Name"
                      defaultValue={RowData.desc}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Max Attempts</label>
                    <input
                      type="answer"
                      className="form-control"
                      onChange={(e) => setMaxAttempt(e.target.value)}
                      placeholder="Please enter answer"
                      defaultValue={RowData.maxAttempt}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Min. Percentage</label>
                    <input
                      type="answer"
                      className="form-control"
                      onChange={(e) => {
                        if (e.target.value < 1 || e.target.value > 100) {
                          setError("Min. Percentage must be between 1 and 100");
                          setMinPerc("");
                        } else {
                          setMinPerc(e.target.value);
                          setError(null);
                        }
                      }}
                      placeholder="Please enter the min. percentage"
                      defaultValue={RowData.minPerc}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Correct Score</label>
                    <input
                      type="answer"
                      className="form-control"
                      onChange={(e) => {
                        if (e.target.value < 1 || e.target.value > 100) {
                          setError("Correct score must be between 1 and 100");
                          setCorrectScore("");
                        } else {
                          setCorrectScore(e.target.value);
                          setError(null);
                        }
                      }}
                      placeholder="Please enter the score for correct answer"
                      defaultValue={RowData.correctScore}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Incorrect Score</label>
                    <input
                      type="answer"
                      className="form-control"
                      onChange={(e) => {
                        if (e.target.value < 1 || e.target.value > 100) {
                          setError("Incorrect score must be between 1 and 100");
                          setIncorrectScore("");
                        } else {
                          setIncorrectScore(e.target.value);
                          setError(null);
                        }
                      }}
                      placeholder="Please enter the score for incorrect answer"
                      defaultValue={RowData.incorrectScore}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Duration</label>
                    <input
                      type="answer"
                      className="form-control"
                      onChange={(e) => {
                        if (e.target.value < 10 || e.target.value > 180) {
                          setError(
                            "Duration must be between 10 and 180 minutes"
                          );
                          setDuration("");
                        } else {
                          setDuration(e.target.value);
                          setError(null);
                        }
                      }}
                      placeholder="Please enter answer"
                      defaultValue={RowData.duration}
                      min={"10"}
                      max={"180"}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Expiry Date & Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      onChange={(e) => setExpiryTime(e.target.value)}
                      placeholder="Please enter the quiz expiry date and time"
                      defaultValue={RowData.expiryTime}
                    />
                  </div>
                  {error && <div className="error_msgs">{error}</div>} <br />
                  {/* <button
                    
                    

                  > */}
                  <Link
                    className={
                      theme ? "button_dark_small" : "button_light_small"
                    }
                    to={`/quiz/addnewquiz/add_desc/${id}`}
                    type="submit"
                  >
                    Add more questions
                  </Link>
                  {/* </button>
                  <button
                    type="submit"
                   

                  > */}
                  <Link
                    className={
                      theme
                        ? "button_dark_small_danger"
                        : "button_light_small_danger"
                    }
                    to={`/quiz/addnewquiz/add_comp_user/${id}`}
                    type="submit"
                  >
                    Add/Remove Users
                  </Link>
                  {/* </button> */}
                </div>
              </Modal.Body>
              {theme ? (
                <Modal.Footer style={{ backgroundColor: "var(--bg_dark)" }}>
                  <button
                    type="submit"
                    className={`${
                      theme
                        ? "button_dark_small_warning"
                        : "button_light_small_warning"
                    }`}
                    onClick={handleEdit}
                    disabled={error}
                  >
                    Edit Quiz
                  </button>
                  <button
                    className={
                      theme ? "button_dark_small" : "button_light_small"
                    }
                    onClick={hanldeEditClose}
                  >
                    Close
                  </button>
                </Modal.Footer>
              ) : (
                <Modal.Footer style={{ backgroundColor: "var(--bg_light)" }}>
                  <button
                    className={
                      theme ? "button_dark_small" : "button_light_small"
                    }
                    onClick={handleEdit}
                    disabled={error}
                  >
                    Edit Quiz
                  </button>
                  <button
                    className={
                      theme ? "button_dark_small" : "button_light_small"
                    }
                    onClick={hanldeEditClose}
                  >
                    Close
                  </button>
                </Modal.Footer>
              )}
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompQuizList;
