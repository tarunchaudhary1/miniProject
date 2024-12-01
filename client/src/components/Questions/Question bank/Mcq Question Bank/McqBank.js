import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalTitle,
  Table,
  Dropdown,
  DropdownButton,
  Badge,
} from "react-bootstrap";
import axios from "axios";
import Sidebar from "../../../SideBarNav/SideBar";
import "../../InnerLayout.css";
import _ from "lodash";
import Pagination from "../../../Pagination";
import { useTheme } from "../../../../Context";

const pageSize = 2;
const MCQList = () => {

  const theme = Boolean(useTheme());
  const themeClassName = theme ? "tableContainer_dark" : "tableContainer";
  const backCol = theme ? "#444444" : "	#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);

  const [indexOfLastPost, setIndexOfLastPost] = useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(postsPerPage);

  const [Data, setData] = useState([]);
  const [RowData, SetRowData] = useState([]);
  const [ViewShow, SetViewShow] = useState(false);
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
    setoption1("");
    setoption2("");
    setoption3("");
    setoption4("");
    setcorrect("");
  };

  //Define here local state that store the form Data
  const [category, setcategory] = useState("");
  const [question, setquestion] = useState("");
  const [option1, setoption1] = useState("");
  const [option2, setoption2] = useState("");
  const [option3, setoption3] = useState("");
  const [option4, setoption4] = useState("");
  const [correct, setcorrect] = useState("");
  const [error, setError] = useState("");
  const [optionCount, setOptionCount] = useState();
  const [Delete, setDelete] = useState(false);
  const [categ, setCateg] = useState("");
  const [sortedData, setSortedData] = useState(Data);
  const [currentPosts, setCurrentPosts] = useState([]);
  //Id for update record and Delete
  const [id, setId] = useState("");
  //   const [pageCount,setPageCount] = useState(0);
  //  const [pages,setPages] = useState([])

  const GetUserData = () => {
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
          console.log(data.length);
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
      const url = "http://localhost:8080/api/mcqQs";
      let Credentials;
      switch (optionCount) {
        case "2":
          console.log("Case 2 selected");

          Credentials = {
            category: category,

            question: question,
            option1: option1,
            option2: option2,
            correct: correct,
          };
          break;
        case "3":
          console.log("Case 3 selected");

          Credentials = {
            category: category,
            question: question,
            option1: option1,
            option2: option2,
            option3: option3,
            correct: correct,
          };
          break;
        case "4":
          console.log("Case 4 selected");
          Credentials = {
            question: question,
            category: category,
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4,
            correct: correct,
          };
          break;

        default:
          console.log("Nothing selected");
          Credentials = {
            category: category,
            question: question,
            option1: option1,
            option2: option2,
            correct: correct,
          };
          break;
      }

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
      const url = `http://localhost:8080/api/mcqQs/${id}`;
      const Credentials = {
        category,
        question,
        option1,
        option2,
        option3,
        option4,
        correct,
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
    const url = `http://localhost:8080/api/mcqQs/${id}`;
    axios
      .delete(url)
      .then((response) => {
        const result = response.data;
        const { status, message } = result;
        if (status !== "SUCCESS") {
          alert(message, status);
        } else {
          alert(message);
          GetUserData();
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
    console.log(!Number(e))
    if(Number(e)){
      Data.map((element) => {
        console.log(typeof element.category, typeof category);
        
        if (Number(element.category) === Number(e)) {
          sorted.push(element);
        }
      });

      
      setSortedData((data) => {
        setSortedData(sorted);
        
      });
    }
    else{
      setSortedData(Data)
    }
    
    console.log(sorted);

    
  };

  const handleSearch = (e) => {
    let sorted = [];
    
    if(e.target.value.trim().length !== 0){
      Data.map((element) => {
        if (element.question.includes(e.target.value)) {
          sorted.push(element);
        }
      });

      
      setSortedData((data) => {
        setSortedData(sorted);
        
      });
    }
    else{
      setSortedData(Data)
    }
    
  };
  const [rowData,setRowData] = useState(<></>)

  let right = <Badge bg="success">&#x2713; </Badge>;
  let wrong = <Badge bg="danger">X</Badge>;
  //call this function in useEffect
  // console.log(ViewShow, RowData)
  useEffect(() => {
    GetUserData();
    setSortedData(Data);
    // console.log(Data.length)
    
    // setRowData()
  }, []);






  

  return (
    <div className={themeClassName}>
      <div className=" mb-4 display-row">
        <div>
          <DropdownButton
            // align="end"
            title="Sort By Question Category"
            id="dropdown-menu-align-end"
            onSelect={handleCategorySelect}
          >
            <Dropdown.Item eventKey="-">-----</Dropdown.Item>
            <Dropdown.Item eventKey="1">Coding</Dropdown.Item>
            <Dropdown.Item eventKey="2">OS</Dropdown.Item>
            <Dropdown.Item eventKey="3">Database</Dropdown.Item>
            <Dropdown.Item eventKey="4">DevOps</Dropdown.Item>
            <Dropdown.Item eventKey="5">AWS</Dropdown.Item>
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
      {/* </div> */}
      <div className="container my-table">
      <Table className={`table-hover table-bordered ${theme ? "table-dark table-striped" : "table table-striped"}`}>
          <thead>
            <tr>
              {/* <th>Question No.</th> */}
              <th>Category</th>
              <th>Questions</th>
              {/* <th>Options</th> */}
              {/* <th > Correct Option</th> */}
              <th colSpan={3}>Actions</th>
            </tr>
          </thead>
          <tbody>
      {sortedData !== undefined &&
        sortedData.map((item, index) => {
          
          return (
            <tr key={item._id}>
              {/* <td>{index + 1}</td> */}
              <td>{item.category}</td>
              <td>{item.question}</td>

              <td style={{ minWidth: 190 }}>
                <button className={`${theme ? "button_dark_small" : "button_light_small"}`}
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    handleViewShow(SetRowData(item));
                  }}
                >
                  View
                </button>
                
                <button className={`${theme ? "button_dark_small_warning" : "button_light_small_warning"}`}
                  size="sm"
                  variant="warning"
                  onClick={() => {
                    handleEditShow(SetRowData(item), setId(item._id));
                  }}
                >
                  Edit
                </button>
                
                <button className={`${theme ? "button_dark_small_danger" : "button_light_small_danger"}`}
                  size="sm"
                  variant="danger"
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
        {/* <Pagination
          postsPerPage={postsPerPage}
          totalPosts={Data.length}
          setCurrentPage={setCurrentPage}
        /> */}
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
                  onInput={(e) => {
                    setcategory(e.target.value);
                  }}
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
                <label>Option1</label>
                <input
                  type="text"
                  className="form-control"
                  value={RowData.option1}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <label>Option2</label>
                <input
                  type="text"
                  className="form-control"
                  value={RowData.option2}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <label>Option3</label>
                <input
                  type="text"
                  className="form-control"
                  value={RowData.option3}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <label>Option4</label>
                <input
                  type="text"
                  className="form-control"
                  value={RowData.option4}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <label>Correct Option</label>
                <input
                  type="text"
                  className="form-control"
                  value={RowData.correct}
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
            <button className={theme ? "button_dark" : "button_light"} onClick={hanldeViewClose}>
              Close
            </button>
          </Modal.Footer>
          :
          <Modal.Footer style={{ backgroundColor: "var(--bg_light)" }}>
            <button className={theme ? "button_dark" : "button_light"} onClick={hanldeViewClose}>
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
          <Modal.Header closeButton>
            <Modal.Title>Add New Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="form-group" autoComplete="off" autoSave="off">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setcategory(e.target.value)}
                  placeholder="Please enter the Category"
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setquestion(e.target.value)}
                  placeholder="Please enter the Question"
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  autoSave="off"
                  onChange={(e) => setoption1(e.target.value)}
                  placeholder="Please enter Option 1"
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  autoSave="off"
                  onChange={(e) => setoption2(e.target.value)}
                  placeholder="Please enter Option 2"
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  autoSave="off"
                  onChange={(e) => setoption3(e.target.value)}
                  placeholder="Please enter Option 3"
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  autoSave="off"
                  onChange={(e) => setoption4(e.target.value)}
                  placeholder="Please enter Option 4"
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  autoSave="off"
                  onChange={(e) => setcorrect(e.target.value)}
                  placeholder="Please enter the Correct Option"
                />
              </div>
              {error && <div className="error_msgs">{error}</div>} <br />
              <button
                type="submit"
                className={theme ? "button_dark_small_success" : "button_light_small_success"}
                onClick={handleSubmit}
              >
                Add Question
              </button>
            </div>
          </Modal.Body>
          {theme ? <Modal.Footer style={{ backgroundColor: "var(--bg_dark)" }}>
            <button className={theme ? "button_dark" : "button_light"} onClick={hanldePostClose}>
              Close
            </button>
          </Modal.Footer>
          :
          <Modal.Footer style={{ backgroundColor: "var(--bg_light)" }}>
            <button className={theme ? "button_dark" : "button_light"} onClick={hanldePostClose}>
              Close
            </button>
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
                  placeholder="Please enter the Category"
                  defaultValue={RowData.category}
                />
              </div>
              <div className="form-group mt-3">
                <label>Question</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setquestion(e.target.value)}
                  placeholder="Please enter the Question"
                  defaultValue={RowData.question}
                />
              </div>
              <div className="form-group mt-3">
                <label>Option 1</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setoption1(e.target.value)}
                  placeholder="Please enter Option 1"
                  defaultValue={RowData.option1}
                />
              </div>
              <div className="form-group mt-3">
                <label>Option 2</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setoption2(e.target.value)}
                  placeholder="Please enter Option 2"
                  defaultValue={RowData.option2}
                />
              </div>
              <div className="form-group mt-3">
                <label>Option 3</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setoption3(e.target.value)}
                  placeholder="Please enter Option 3"
                  defaultValue={RowData.option3}
                />
              </div>
              <div className="form-group mt-3">
                <label>Option 4</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setoption4(e.target.value)}
                  placeholder="Please enter Option 4"
                  defaultValue={RowData.option4}
                />
              </div>
              <div className="form-group mt-3">
                <label>Correct Option</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setcorrect(e.target.value)}
                  placeholder="Please enter the Correct Option"
                  defaultValue={RowData.correct}
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
          </Modal.Footer>:
          <Modal.Footer style={{ backgroundColor: "var(--bg_light)" }}>
            <button className={theme ? "button_dark" : "button_light"} onClick={hanldeEditClose}>
              Close
            </button>
          </Modal.Footer>}
        </Modal>
      </div>
    </div>
  );
};

export default MCQList;