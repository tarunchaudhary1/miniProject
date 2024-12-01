import React, { useEffect, useState } from "react";
import { Button, Modal, ModalTitle, Table } from "react-bootstrap";
import axios from "axios";
import SideBar from "../SideBarNav/SideBar";
import "../Questions/InnerLayout.css";
import { useTheme } from "../../Context";

function Adminlist() {
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

    setfirstName("");
    setlastName("");
    setemail("");
    setpassword("");
  };

  //Define here local state that store the form Data
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [contactNo, setcontactNo] = useState("");
  const [error, setError] = useState("");

  const [Delete, setDelete] = useState(false);

  //Id for update record and Delete
  const [id, setId] = useState("");

  const theme = Boolean(useTheme());
  const themeClassName = theme ? "tableContainer_dark" : "tableContainer";

  const backCol = theme ? "#444444" : "	#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;


      // For pagination 
const [currentPage, setCurrentPage] = useState(1)
const recordPerPage = 10; 
const lastIndex = currentPage * recordPerPage;
const firstIndex = lastIndex - recordPerPage;
const records = Data.slice(firstIndex, lastIndex);
const npages = Math.ceil(Data.length / recordPerPage)
const numbers = [...Array(npages + 1).keys()].slice(1)

function prePage(){
  if(currentPage !== firstIndex){
    setCurrentPage(currentPage - 1)
  }
}

function changeCPage(id) {
   setCurrentPage(id)
}

function nextPage() {
    if(currentPage !== lastIndex){
      setCurrentPage(currentPage + 1)
    }
}


  const GetAdminData = () => {
    //here we will get all employee data

    const url = "http://localhost:8080/api/admin";
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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/admin";
      const Credentials = { firstName, lastName, contactNo, email, password };
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
      const url = `http://localhost:8080/api/admin/${id}`;
      const Credentials = { firstName, lastName, contactNo, email };
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
    const url = `http://localhost:8080/api/admin/${id}`;
    axios
      .delete(url)
      .then((response) => {
        const result = response.data;
        const { status, message } = result;
        if (status !== "SUCCESS") {
          alert(message, status);
        } else {
          alert(message);
          GetAdminData();
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  //call this function in useEffect
  // console.log(ViewShow, RowData)
  useEffect(() => {
    GetAdminData();
  }, []);
  return (
    <>
      <SideBar />
      
        {/* <h3 className="text-center header-top">Admins List</h3> */}
        <h1 ><b>Admins List</b></h1>
        <div className='format_1' >
          <div className=""> 
            <button
              className={theme ? "button_dark" : "button_light"}
              onClick={() => {
                handlePostShow();
              }}
            >
              Add New
            </button>
        
          <Table
            className={`table-hover table-bordered ${
              theme ? "table-dark table-striped" : "table table-striped"
            }`}
          >
            <thead>
              <tr>
                <th>SI No.</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Contact No.</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.contactNo}</td>
                  <td>{item.email}</td>

                  <td style={{ minWidth: 190 }}>
                    <button
                      className={`${theme ? "button_dark_small" :
                        "button_light_small"
                      }`}
                      size="sm"
                      variant="primary"
                      onClick={() => {
                        handleViewShow(SetRowData(item));
                      }}
                    >
                      View
                    </button>
                    <button
                      className={`${theme ? "button_dark_small_warning" :
                        "button_light_small_warning"
                      }`}
                      size="sm"
                      variant="warning"
                      onClick={() => {
                        handleEditShow(SetRowData(item), setId(item._id));
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className={`${theme ? "button_dark_small_danger" :
                       "button_light_small_danger"
                      }`}
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
              ))}
            </tbody>
          </Table>
        
        <nav>
            <ui className='pagination'>
              <li className='page-item'>
                <a href='#' className="page-link"
                onClick={prePage}>Prev</a>
              </li>
                {
                  numbers.map((n, i) =>(
                    <li className={`page-item ${currentPage === n ? 'active' : '' }`} key={i}>
                      <a href='#' className='page-link'
                      onClick={()=> changeCPage(n)}>{n}</a>

                    </li>
                  ))
                }
                <li className='page-item'>
                <a href='#' className="page-link"
                onClick={nextPage}>Next</a>
              </li>
            </ui>
          </nav>




        </div>
        <div className="model-box-view">
          <Modal
            show={ViewShow}
            onHide={hanldeViewClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton  className={theme ? "custom_modal_dark" : "custom_modal"}>
              <Modal.Title>View Admin Data</Modal.Title>
            </Modal.Header>
            <Modal.Body  className={theme ? "custom_modal_dark" : "custom_modal"}>
              <div>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={RowData.firstName}
                    readOnly
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={RowData.lastName}
                    readOnly
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Contact No.</label>
                  <input
                    type="text"
                    className="form-control"
                    value={RowData.contactNo}
                    readOnly
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={RowData.email}
                    readOnly
                  />
                </div>

                {Delete && (
                  <button
                    type="submit"
                    className={theme ? "button_dark_small_danger mt-2" : "button_light_small_danger mt-2"}
                    onClick={handleDelete}
                  >
                    Delete Admin
                  </button>
                )}
              </div>
            </Modal.Body>
            {theme ? <Modal.Footer style={{backgroundColor : "var(--bg_dark"}}>
              <button className={theme ? "button_dark" : "button_light"} onClick={hanldeViewClose}>
                Close
              </button>
            </Modal.Footer> : <Modal.Footer style={{backgroundColor : "var(--bg_light"}} >
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
            <Modal.Header closeButton className={theme ? "custom_modal_dark" : "custom_modal"}>
              <Modal.Title>Add New Admin</Modal.Title>
            </Modal.Header>
            <Modal.Body className={theme ? "custom_modal_dark" : "custom_modal"}>
              <div>
                <div className="form-group" autoComplete="off" autoSave="off">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setfirstName(e.target.value)}
                    placeholder="Please enter first name"
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setlastName(e.target.value)}
                    placeholder="Please enter last name"
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    autoComplete="off"
                    autoSave="off"
                    onChange={(e) => setcontactNo(e.target.value)}
                    placeholder="Please enter contact Number"
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="email"
                    className="form-control"
                    autoComplete="off"
                    autoSave="off"
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Please enter email"
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="password"
                    className="form-control"
                    autoComplete="off"
                    autoSave="off"
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="Please enter password"
                  />
                </div>
                {error && <div className="error_msgs">{error}</div>} <br />
                <button
                  type="submit"
                  className={theme ? "button_dark_success" : "button_light_success"}
                  onClick={handleSubmit}
                >
                  Add Admin
                </button>
              </div>
            </Modal.Body>
            {theme ? <Modal.Footer style={{backgroundColor : "var(--bg_dark)"}}>
              <button className={theme ? "button_dark" : "button_light"} onClick={hanldePostClose}>
                Close
              </button>
            </Modal.Footer> : <Modal.Footer style={{backgroundColor : "var(--bg_light)"}}>
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
              <Modal.Title>Edit Admin</Modal.Title>
            </Modal.Header>
            <Modal.Body className={theme ? "custom_modal_dark" : "custom_modal"}>
              <div>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setfirstName(e.target.value)}
                    placeholder="Please enter First Name"
                    defaultValue={RowData.firstName}
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setlastName(e.target.value)}
                    placeholder="Please enter Last Name"
                    defaultValue={RowData.lastName}
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Contact No.</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setcontactNo(e.target.value)}
                    placeholder="Please enter contact number"
                    defaultValue={RowData.contactNo}
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Please enter email"
                    defaultValue={RowData.email}
                  />
                </div>
                {error && <div className="error_msgs">{error}</div>} <br />
                <button
                  type="submit"
                  className={theme ? "button_dark_small_warning" : "button_light_small_warning"}
                  onClick={handleEdit}
                >
                  Edit Admin
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
     
    </>
  );
}

export default Adminlist;
