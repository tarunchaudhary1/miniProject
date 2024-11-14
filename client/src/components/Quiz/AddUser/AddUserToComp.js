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
import "../../Users/Style.css";
import Sidebar from "../../SideBarNav/SideBar";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../../../Context";
const AddUser = (props) => {
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

  const theme = Boolean(useTheme());
  const themeClassName = theme ? "tableContainer_dark" : "tableContainer";

  const backCol = theme ? "#444444" : "	#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  const { id } = useParams();

  const GetQuizId = () => {
    const url = `http://localhost:8080/api/compQuizzes/${id}`;
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

  const GetExistingUsers = () => {
    const url = `http://localhost:8080/api/compQuizzes/${id}`;
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
          setExistingArray(data.users);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const Alert =() =>{
    alert("Record Updated Successfully")
  }
  const GetUsers = () => {
    //here we will get all employee data
    const url = "http://localhost:8080/api/users";
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

  const handleAddUser = async (item) => {
    if (item) {
      try {
        const url = `http://localhost:8080/api/compQuizzes/${id}`;
        // console.log(url);
        // console.log(item);
        const Credentials = {
          addUsers: item
        };
        const { data: res } = await axios.patch(url, Credentials);
        // console.log(`length`, existingArray.length);
        if (res.status === "SUCCESS") {
          console.log("User Added");
          GetExistingUsers();
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
  const handleAddAllUser = async () => {
    
      try {
        const url = `http://localhost:8080/api/compQuizzes/${id}`;
        const Credentials = {
          addAllUsers: Data,
          delAllUsers : []
        };
        const { data: res } = await axios.patch(url, Credentials);
        // console.log(`length`, existingArray.length);
        if (res.status === "SUCCESS") {
          console.log("Users Added");
          
          GetExistingUsers();
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

  const handleRemoveAllUser = async () => {
   
      try {
        const url = `http://localhost:8080/api/compQuizzes/${id}`;
       

        const Credentials = {
          addAllUsers : [],
          delAllUsers: Data
        };
        const { data: res } = await axios.patch(url, Credentials);
        console.log(res)
        if (res.status === "SUCCESS") {
          console.log("Users Removed");
          
          GetExistingUsers();
        }
      } catch (error) {
        console.log("Users not Removed");
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
    
  };
  const handleRemove = async (item) => {
    if (item) {
      try {
        const url = `http://localhost:8080/api/compQuizzes/${id}`;
        const Credentials = {
          delUsers: item
        };
        const { data: res } = await axios.patch(url, Credentials);

        if (res.status === "SUCCESS") {
          console.log("User Removed");
          GetExistingUsers();
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

  

  useEffect(() => {
    // console.log(id);
    GetExistingUsers();
    GetQuizId();
    GetUsers();
    setSortedData(Data);
  }, []);
  return (
    <>
      <Sidebar />
        <div className="tableContainer">
        <h3 className="header-top my-2">Add Users</h3>

       
        <div className="container my-table">
          <div className="mt-5 mb-4 display-row">
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
            <div style={{marginTop : "30px", marginLeft : "50px"}}>
              
                <Link to={`/quiz/comp_quiz_list`} className={theme ? "button_dark_success" : "button_light_success"} onClick={Alert}>Add Users</Link>
            
            </div>
          </div>
          <Table className={`table-hover table-bordered ${
                theme ? "table-dark table-striped" : "table table-striped"
              }`}>
            <thead>
              <tr>
                <th><input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                          checked = {existingArray.length === Data.length}
                          
                          onChange={(event) => {
                            
                            if (event.target.checked) {
                              console.log("✅ Checkbox is checked");
                              handleAddAllUser()
                            } else {
                              console.log("⛔️ Checkbox is NOT checked");
                              // setExistingArray([])
                              handleRemoveAllUser()
                            }
                          }}
                        /></th>
                <th>Sl. No.</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                {/* <th > Correct Option</th> */}
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
                              handleAddUser(item);
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
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.email}</td>
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

export default AddUser;