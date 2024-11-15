import React, { useEffect, useState } from "react";
import { Button, Modal, ModalTitle, Table } from "react-bootstrap";
import axios from "axios";
import SideBar from "../SideBarNav/SideBar";
import "../Questions/InnerLayout.css";
import { useTheme } from "../../Context";

function Userlist() {
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
  const [error, setError] = useState("");

  const [Delete, setDelete] = useState(false);

  //Id for update record and Delete
  const [id, setId] = useState("");

  const theme = Boolean(useTheme());
  const themeClassName = theme ? "tableContainer_dark" : "tableContainer";

  const backCol = theme ? "#444444" : "	#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  const GetUserData = () => {
    //here we will get all employee data

    const url = "http://backend.healthynomad.xyz:8080/api/users";
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
      const url = "http://backend.healthynomad.xyz:8080/api/users";
      const Credentials = { firstName, lastName, email, password };
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
      const url = `http://backend.healthynomad.xyz:8080/api/users/${id}`;
      const Credentials = { firstName, lastName, email };
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
    const url = `http://backend.healthynomad.xyz:8080/api/users/${id}`;
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
  //call this function in useEffect
  // console.log(ViewShow, RowData)
  useEffect(() => {
    GetUserData();
  }, []);
  return (
    <>
      <SideBar />
      <h1>
        <b>User List</b>
      </h1>
      <div className="format">
        <div className=" mb-4">
          <button
            className={theme ? "button_dark" : "button_light"}
            onClick={() => {
              handlePostShow();
            }}
          >
            Add New
          </button>
        </div>

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
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td style={{ minWidth: 190 }}>
                  <button
                    className={`${
                      theme ? "button_dark_small" : "button_light_small"
                    }`}
                    size="sm"
                    onClick={() => {
                      handleViewShow(SetRowData(item));
                    }}
                  >
                    View
                  </button>
                  <button
                    className={`${
                      theme
                        ? "button_dark_small_warning"
                        : "button_light_small_warning"
                    }`}
                    size="sm"
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
                    size="sm"
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

        {/* View Modal */}
        <div className="model-box-view">
          <Modal
            show={ViewShow}
            onHide={hanldeViewClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header
              closeButton
              className={theme ? "custom_modal_dark" : "custom_modal"}
            >
              <Modal.Title>View User Data</Modal.Title>
            </Modal.Header>
            <Modal.Body
              className={theme ? "custom_modal_dark" : "custom_modal"}
            >
              <div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    value={RowData.firstName}
                    readOnly
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    value={RowData.lastName}
                    readOnly
                  />
                </div>
                <div className="form-group mt-3">
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
                    className={`mt-2 ${
                      theme
                        ? "button_dark_small_danger"
                        : "button_light_small_danger"
                    }`}
                    onClick={handleDelete}
                  >
                    Delete User
                  </button>
                )}
              </div>
            </Modal.Body>
            {theme ? (
              <Modal.Footer style={{ backgroundColor: "var(--bg_dark)" }}>
                <button
                  className={theme ? "button_dark" : "button_light"}
                  onClick={hanldeViewClose}
                >
                  Close
                </button>
              </Modal.Footer>
            ) : (
              <Modal.Footer style={{ backgroundColor: "var(--bg_light)" }}>
                <button
                  className={theme ? "button_dark" : "button_light"}
                  onClick={hanldeViewClose}
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
              closeButton
              className={theme ? "custom_modal_dark" : "custom_modal"}
            >
              <Modal.Title>Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body
              className={theme ? "custom_modal_dark" : "custom_modal"}
            >
              <div>
                <div className="form-group" autoComplete="off" autoSave="off">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setfirstName(e.target.value)}
                    placeholder="Please enter First Name"
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setlastName(e.target.value)}
                    placeholder="Please enter Last Name"
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
                  className={`${
                    theme ? "button_dark_success" : "button_light_success"
                  }`}
                  onClick={handleSubmit}
                >
                  Add User
                </button>
              </div>
            </Modal.Body>
            {theme ? (
              <Modal.Footer style={{ backgroundColor: "var(--bg_dark)" }}>
                <button
                  className={theme ? "button_dark" : "button_light"}
                  onClick={hanldePostClose}
                >
                  Close
                </button>
              </Modal.Footer>
            ) : (
              <Modal.Footer style={{ backgroundColor: "var(--bg_light)" }}>
                <button
                  className={theme ? "button_dark" : "button_light"}
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
              closeButton
              className={theme ? "custom_modal_dark" : "custom_modal"}
            >
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body
              className={theme ? "custom_modal_dark" : "custom_modal"}
            >
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
                  className={
                    theme
                      ? "button_dark_small_warning"
                      : "button_light_small_warning"
                  }
                  onClick={handleEdit}
                >
                  Edit User
                </button>
              </div>
            </Modal.Body>
            {theme ? (
              <Modal.Footer style={{ backgroundColor: "var(--bg_dark)" }}>
                <button
                  className={theme ? "button_dark" : "button_light"}
                  onClick={hanldeEditClose}
                >
                  Close
                </button>
              </Modal.Footer>
            ) : (
              <Modal.Footer style={{ backgroundColor: "var(--bg_light)" }}>
                <button
                  className={theme ? "button_dark" : "button_light"}
                  onClick={hanldeEditClose}
                >
                  Close
                </button>
              </Modal.Footer>
            )}
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Userlist;
