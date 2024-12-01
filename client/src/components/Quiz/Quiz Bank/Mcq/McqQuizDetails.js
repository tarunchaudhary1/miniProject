import React from "react";
import Sidebar from "../../../SideBarNav/SideBar";
import { Button } from "react-bootstrap";
import MCQ from "./MCQquiz/MCQ";
//import USER from "../User/User";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../../../Questions/InnerLayout.css"

const McqQuizDetails = (props) => {
  const [Data, setData] = useState({});
  const [QArray, setQArray] = useState([]);
  //const [UArray, setUArray] = useState([]);

  const {id} = useParams();
  const GetMCQQuizData = () => {
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
          setData(data);
          setQArray(data.mcqQs);
          //setUArray(data.users);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetMCQQuizData();

    return () => {
      // Cleanup
    };
  }, [QArray]);

  return (
    <>
    <Sidebar/>
      <div className="tableContainer">
      <div className="display-row">
        <div className="mx-3">
          <Button variant="success">
            <Link className="text-decoration-none text-white"  to={"/quiz/mcq_quiz_list"} >
              Back to Quiz List
            </Link>
          </Button>
        </div>
      </div>
      <div className="mx-3">
        <h5 className="header-top text-center">{Data.name}</h5>
      </div>
      QUESTIONS
      <div>
        {QArray.length !== 0 && (
          <div>
            {QArray.map((ques, index) => {
              return (
                <MCQ
                  ques={ques}
                  key={ques._id}
                  index={index}
                  quizId={id}
                  length={QArray.length}
                />
              );
            })}
          </div>
        )}
      </div>
      USERS
      {/* <div>
        {UArray.length !== 0 && (
          <div>
            {UArray.map((user, index) => {
              return (
                <USER
                  user={user}
                  key={user._id}
                  index={index}
                  userId={id}
                  length={UArray.length}
                />
              );
            })}
          </div>
        )}
      </div> */}

      </div>
    </>
  );
};

export default McqQuizDetails;
