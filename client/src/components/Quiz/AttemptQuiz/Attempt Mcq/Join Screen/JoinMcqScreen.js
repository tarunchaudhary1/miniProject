import React from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "../AttemptMcq.css";
import { useTheme } from "../../../../../Context";
import "../../../../Questions/InnerLayout.css";

const JoinMcqScreen = (props) => {
  const [QuestionList, setQuestionList] = useState([]);
  const [UserList, setUserList] = useState([]);
  const [AttempetedList, setAttemptedList] = useState([]);
  const [Expiry, setExpiry] = useState([]);

  const theme = useTheme();
  const themeClassName = theme ? "text-white" : "text-black";

  const backCol = theme ? "#444444" :"#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  const GetMcqQuizData = () => {
    const url = `http://backend.healthynomad:8080/api/mcqQuizzes/${props.id}`;
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        //console.log(result);
        const { status, message, data } = result;
        if (status !== "SUCCESS") {
          alert(message, status);
        } else {
          setQuestionList(data.mcqQs);
          setUserList(data.users);
          setAttemptedList(data.attempted);
          setExpiry(data.expiryTime);
          //console.log(data.mcqQs);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAttempt = async (e) => {
    navigator.getMedia =
      navigator.getUserMedia || // use the proper vendor prefix
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    navigator.getMedia(
      { video: true },
      function () {
        // webcam is available
      },
      function () {
        console.log("Camera not available")
        alert("Quiz cannot be attempted without Camera");
       return;
      }
    );
    e.preventDefault();

    const expTime = Expiry;
    const currTime = new Date().toISOString();
    if (expTime < currTime) {
      alert("Quiz has already expired!");
      window.location.href = "/quiz/attempt_quiz";
    }

    props.setIsQuizStarted(true);
    let uID = localStorage.getItem("userid");
    let attempted = [];

    if (UserList.length !== 0) {
      UserList.map((user, index) => {
        if (user._id === uID) {
          if (AttempetedList[index] == true) {
            alert("Quiz already attempted!");
            window.location.href = "/quiz/attempt_quiz";
          }
          //console.log(user);
          //console.log(uID);
          attempted.push(true);
        } else {
          attempted.push(AttempetedList[index]);
        }
      });
    }

    try {
      const url = `http://backend.healthynomad:8080/api/mcqQuizzes/${props.id}`;
      const Credentials = { attempted };
      const { data: res } = await axios.patch(url, Credentials);

      if (res.status !== "SUCCESS") {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetMcqQuizData();
  }, []);

  return (
    <div className="join-screen">
      <h2 className={themeClassName}>Join Quiz</h2>
      {/* <Button onClick={()=>{
          props.setIsQuizStarted(true)
        }}>Start Quiz</Button> */}
      <button
        onClick={handleAttempt}
        className={theme ? "button_dark" : "button_light"}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default JoinMcqScreen;
