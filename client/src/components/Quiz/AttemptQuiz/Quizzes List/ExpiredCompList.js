import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalTitle,
  Table,
  Dropdown,
  DropdownButton,
  Badge,
  Row,
} from "react-bootstrap";
import axios from "axios";
import Sidebar from "../../../SideBarNav/SideBar";
import "../../../Questions/InnerLayout.css"
import { Link } from "react-router-dom";
import { useTheme } from "../../../../Context";

const ExpiredCompList = () => {
  const [Data, setData] = useState([]);
  const [Indices, setIndices] = useState([]);
  const [Expiry, setExpiry] = useState([]);
  const [RowData, SetRowData] = useState([]);
  const [ViewShow, SetViewShow] = useState(false);
  const [categ, setCateg] = useState("");
  const [component, setComponent] = useState("")
  const handleViewShow = () => {
    SetViewShow(true);
  };
  const hanldeViewClose = () => {
    SetViewShow(false);
    setDelete(false)
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
    setExpiryTime("");
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

  const [error, setError] = useState("");

  const [Delete, setDelete] = useState(false);
  const [sortedData, setSortedData] = useState(Data);

  //Id for update record and Delete
  const [id, setId] = useState("");
  const theme = useTheme();

  const GetMcqQuizData = () => {

    const url = "http://backend.healthynomad:8080/api/compQuizzes";

    //let _email = localStorage.getItem("email");
    let uID = localStorage.getItem("userid");
    
    // const user_url = `http://backend.healthynomad:8080/api/users/${_email}`;
    // axios
    //   .get(user_url)
    //   .then((response) => {
    //     const result = response.data;
    //     const { status, message, data } = result;
    //     if (status !== "SUCCESS") {
    //       alert(message, status);
    //     } else {
    //       setUserData(data);
    //       console.log(userData);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        //console.log(result);
        const { status, message, data } = result;
        
        if (status !== "SUCCESS") {
          //console.log("Quiz Error");
          alert(message, status);
        } else {
          //console.log("Quiz Success");
          //console.log(userData);
          // const uID = userData._id;
          let show = [];
          if (data.length !== 0) {
            data.map((element) => {
              //console.log(uData);
              //DEBUG FROM HERE
              //console.log(element.users);
              //console.log(uID);
              const users = element.users;
              if(users.length != 0) {
                users.map((user, index) => {
                  //console.log(user._id);
                  if(user._id === uID) {
                    //console.log(index);
                    const expTime = element.expiryTime
                    //console.log(expTime);
                    const currTime = (new Date()).toISOString();
                    //console.log(currTime);
                    if(expTime < currTime) {
                      show.push(element);
                    }
                    // console.log(indices);
                    //index.push(element.attempted);
                  }
                });
              }
              // if (element.users.includes(uID)) {
              //   console.log(uData);
              //   show.push(element);
              // }
            });

            setData(show);
            setSortedData(show);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (e) => {
    let sorted = [];

    if (e.target.value.trim().length !== 0) {
      Data.map((element, index) => {
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

  function locTime(expTime) {
    var d = new Date(expTime);
    const locTime = d.toLocaleDateString("en-GB") + " | " + d.toLocaleTimeString();
    // console.log(locTime);
    return locTime;
  }

  useEffect(() => {
    setComponent(null);
    // GetMcqQuizData().then(() => {
    //   GetExpiryData();
    // });
    GetMcqQuizData();
    setSortedData(Data);
  }, [id]);
  
  return (
    <>
      { sortedData.length > 0 &&
      <div className="quiz-body">


        <h5 className="text-center">Expired Comprehensive Quizzes</h5>
        

        <div className="container my-table">
          <div className="mt-5 mb-4 display-row">
            <div className="m-1">
              <form className="d-flex" role="search">
                <input
                  className={theme ? "search_bar_dark no-outline_dark" : "search_bar no-outline"}
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
                {/* <th colSpan={1}>S.No.</th> */}
                <th colSpan={1}>Name</th>
                <th colSpan={1}>Description</th>
              
                <th>Min Percentage</th>
                <th>Correct Score</th>
                <th>Incorrect Score</th>
                <th>Duration</th>
                <th>Expiry Date & Time</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {sortedData !== undefined &&
                sortedData.map((item) => {
                    return (
                      <tr key={item._id}>
                        {/* <td>{index + 1}</td> */}
                        <td>{item.name}</td>
                        <td>{item.desc}</td>
                        {/* <td>{item.maxAttempt}</td> */}
                        <td>{item.minPerc}</td>
                        <td>{item.correctScore}</td>
                        <td>{item.incorrectScore}</td>
                        <td>{item.duration}</td>
                        <td>{locTime(item.expiryTime)}</td>
                        {/* <td style={{ minWidth: 100 }}>
  
                          
                          <Link to={`/quiz/attempt_quiz/attempt_comp/${item._id}`} className=""><Button variant="primary">Attempt</Button></Link>
                          
  
                          
                          
                        </td> */}
                      </tr>
                    );
                })}
            </tbody>
          </Table>
          
        </div>
      </div>
      }
    </>
  )
}

export default ExpiredCompList