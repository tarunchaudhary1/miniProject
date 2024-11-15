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

import "../../InnerLayout.css";
import { useTheme } from "../../../../Context";

const DescriptiveList = () => {
  const theme = Boolean(useTheme());

  const backCol = theme ? "#444444" :"#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

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

  const GetQuestionData = () => {
    //here we will get all employee data
    const url = "http://backend.healthynomad.xyz:8080/api/compQs";
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
      const url = "http://backend.healthynomad.xyz:8080/api/compQs";
      const Credentials = { category, question, answer };
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
      const url = `http://backend.healthynomad.xyz:8080/api/compQs/${id}`;
      const Credentials = { category, question, answer };
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
    const url = `http://backend.healthynomad.xyz:8080/api/compQs/${id}`;
    axios
      .delete(url)
      .then((response) => {
        const result = response.data;
        const { status, message } = result;
        if (status !== "SUCCESS") {
          alert(message, status);
        } else {
          alert(message);
          GetQuestionData();
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
  //call this function in useEffect
  // console.log(ViewShow, RowData)
  useEffect(() => {
    GetQuestionData();
    setSortedData(Data);
  }, []);
  return (
    <div className="my-body">
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
        
            <input
              className={theme ? "search_bar_dark no-outline_dark" : "search_bar no-outline"}
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={handleSearch}
            />
          
        </div>
      </div>

      <div className="container my-table">
        <Table
          className={`table-hover table-bordered ${
            theme ? "table-dark table-striped" : "table table-striped"
          }`}
        >
          <thead>
            <tr>
              <th colSpan={1}>Question No.</th>
              <th colSpan={1}>Category</th>
              <th>Questions</th>
              {/* <th>Sample Answer</th> */}
              <th colSpan={3}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedData !== undefined &&
              sortedData.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.category}</td>
                    <td>{item.question}</td>
                    {/* <td>{item.answer}</td> */}
                    <td style={{ minWidth: 190 }}>
                      <button
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
                        className={`${
                          theme ? "button_dark_small_warning" : "button_light_small_warning"
                        }`}
                        onClick={() => {
                          handleEditShow(SetRowData(item), setId(item._id));
                        }}
                      >
                        Edit
                      </button>
                      
                      <button
                        className={`${
                          theme ? "button_dark_small_danger" : "button_light_small_danger"
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
          <Modal.Header closeButton className={theme ? "custom_modal_dark" : "custom_modal"}>
            <Modal.Title>View Question</Modal.Title>
          </Modal.Header>
          <Modal.Body className={theme ? "custom_modal_dark" : "custom_modal"}>
            <div>
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  className="form-control"
                  value={RowData.category}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <label>Question</label>
                <input
                  type="text"
                  className="form-control"
                  value={RowData.question}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <label>Answer</label>
                <input
                  type="answer"
                  className="form-control"
                  value={RowData.answer}
                  readOnly
                />
              </div>

              {Delete && (
                <button
                  type="submit"
                  className={theme ? "button_dark_small_danger mt-2" : "button_light_small_danger mt-2"}
                  onClick={handleDelete}
                >
                  Delete Question
                </button>
              )}
            </div>
          </Modal.Body>
          {theme ? <Modal.Footer style={{ backgroundColor: "var(--bg_dark)" }}>
            <button className={theme ? "button_dark" : 'button_light'} onClick={hanldeViewClose}>
              Close
            </button>
          </Modal.Footer>
          :
          <Modal.Footer style={{ backgroundColor: "var(--bg_light)" }}>
            <button className={theme ? "button_dark" : 'button_light'} onClick={hanldeViewClose}>
              Close
            </button>
          </Modal.Footer>}
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
          <Modal.Header closeButton className={theme ? "custom_modal_dark" : "custom_modal"}>
            <Modal.Title>Add New Question</Modal.Title>
          </Modal.Header>
          <Modal.Body className={theme ? "custom_modal_dark" : "custom_modal"}>
            <div>
              <div className="form-group" autoComplete="off" autoSave="off">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setcategory(e.target.value)}
                  placeholder="Please enter Category"
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setquestion(e.target.value)}
                  placeholder="Please enter Question"
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="answer"
                  className="form-control"
                  autoComplete="off"
                  autoSave="off"
                  onChange={(e) => setanswer(e.target.value)}
                  placeholder="Please enter Answer"
                />
              </div>
              {error && <div className="error_msgs">{error}</div>} <br />
              <button
                type="submit"
                className={theme ? "button_dark" : "button_light"} 
                onClick={handleSubmit}
              >
                Add Question
              </button>
            </div>
          </Modal.Body>
          {theme ? <Modal.Footer style={{ backgroundColor: "var(--bg_dark)" }}>
            <Button variant="secondary" onClick={hanldePostClose}>
              Close
            </Button>
          </Modal.Footer>
          :
          <Modal.Footer style={{ backgroundColor: "var(--bg_light)" }}>
            <Button variant="secondary" onClick={hanldePostClose}>
              Close
            </Button>
          </Modal.Footer>}
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
          <Modal.Header closeButton className={theme ? "custom_modal_dark" : "custom_modal"}>
            <Modal.Title>Edit Question</Modal.Title>
          </Modal.Header>
          <Modal.Body className={theme ? "custom_modal_dark" : "custom_modal"}>
            <div>
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setcategory(e.target.value)}
                  placeholder="Please enter First Name"
                  defaultValue={RowData.category}
                />
              </div>
              <div className="form-group mt-3">
                <label>Question</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setquestion(e.target.value)}
                  placeholder="Please enter Last Name"
                  defaultValue={RowData.question}
                />
              </div>
              <div className="form-group mt-3">
                <label>Answer</label>
                <input
                  type="answer"
                  className="form-control"
                  onChange={(e) => setanswer(e.target.value)}
                  placeholder="Please enter answer"
                  defaultValue={RowData.answer}
                />
              </div>
              {error && <div className="error_msgs">{error}</div>} <br />
              <button
                type="submit"
                className={theme ? "button_dark_small_warning" : "button_light_small_warning"}
                onClick={handleEdit}
              >
                Edit Question
              </button>
            </div>
          </Modal.Body>
          {theme ? <Modal.Footer style={{ backgroundColor: "var(--bg_dark)" }}>
            <button className={theme ? "button_dark" : "button_light"} onClick={hanldeEditClose}>
              Close
            </button>
          </Modal.Footer> : <Modal.Footer style={{ backgroundColor: "var(--bg_light)" }}>
            <button className={theme ? "button_dark" : "button_light"} onClick={hanldeEditClose}>
              Close
            </button>
          </Modal.Footer>}
        </Modal>
      </div>
    </div>
  );
};

export default DescriptiveList;
