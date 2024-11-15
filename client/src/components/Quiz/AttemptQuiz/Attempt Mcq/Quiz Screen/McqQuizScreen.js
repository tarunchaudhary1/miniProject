import React from "react";
import { useState, useEffect, useRef } from "react";
import Question from "../Question/Question";
import McqResult from "../../../../Results/McqResult";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import "../AttemptMcq.css";
import { useTheme } from "../../../../../Context";
import Camera from "../../../../Webcam/Camera";
import "../../../../Questions/InnerLayout.css"

const McqQuizScreen = (props) => {
  const [error, setError] = useState();
  const [currQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [markedAnswers, setMarkedAnswers] = useState(
    new Array(props.QuestionList.length)
  );
  const [answerDetails, setAnswerDetails] = useState({});
  const [marksDetails,setMarksDetails] = useState({});
  const [isQuestionEnd, setIsQuestionEnd] = useState(
    currQuestionIndex === props.QuestionList.length
  );

  
  const totalMarks = props.QuestionList.length * props.quizDetails.correctScore;
  
  const [obtainedMarks, setObtainedMarks] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [pass, setPass] = useState();
  const theme = Boolean(useTheme());
  const themeClassName = theme ? "tableContainer_dark" : "tableContainer";

  const backCol = theme ? "#444444" : "	#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  const username = `${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}`;
  const userid = localStorage.getItem("userid");
  const quizName = props.quizDetails.name ;
  const quizid = props.quizDetails._id;
  const minPercentage = props.quizDetails.minPerc;
  const remainingAttempts = 0;
  const Ref = useRef(null);
  let finalMarks = 0;
  // The state for our timer
  const [timer, setTimer] = useState(
    `0${Math.floor(props.quizDetails.duration / 60)}:${
      props.quizDetails.duration % 60
    }:00`
  );

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);

    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);

    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    } else {
      finishQuiz();
    }
  };

  const clearTimer = (e) => {
    if (props.quizDetails.duration % 60 < 10) {
      setTimer(
        `0${Math.floor(props.quizDetails.duration / 60)}:0${
          props.quizDetails.duration % 60
        }:00`
      );
    } else {
      setTimer(
        `0${Math.floor(props.quizDetails.duration / 60)}:${
          props.quizDetails.duration % 60
        }:00`
      );
    }

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let dt = new Date();
    let deadline = new Date(
      dt.getTime() + props.quizDetails.duration * 60 * 1000
    );
    deadline.setSeconds(deadline.getSeconds());
    return deadline;
  };

  const finishQuiz = () => {
    setIsQuestionEnd(props.QuestionList.length);
    // console.log("Marks Obtained",marksDetails)

    
    
    for (let [key, value] of Object.entries(marksDetails)) {
      finalMarks += value;
  }
  // console.log(finalMarks)
  setObtainedMarks(finalMarks)
  if(finalMarks >= 0){
    //console.log(percentage, minPercentage);
    setPercentage(Math.round(((finalMarks/totalMarks)*100),2));
    // if(percentage >= minPercentage) {
    //   setPass(true);
    // }
    // else {
    //   setPass(false);
    // }
  }
  else{
    setPercentage(0);
    // setPass(false);
  }



  // console.log("Marks Obtained",finalMarks)
  // handleSubmit();

  

  };
  const goToNextQuestion = () => {
    console.log(props.QuestionList)
    setCurrentQuestionIndex((prev) => {
      setCurrentQuestionIndex(prev + 1);
    });
  };
  const goToPrevQuestion = () => {
    console.log(currQuestionIndex);
    setCurrentQuestionIndex !== 0 &&
      setCurrentQuestionIndex((prev) => {
        setCurrentQuestionIndex(prev - 1);
      });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const url = "http://backend.healthynomad.xyz:8080/api/mcqResults";
      const Credentials = {
        username,
        userid,
        quizName,
        quizid,
        totalMarks,
        obtainedMarks,
        percentage,
        // pass,
        remainingAttempts
      };

      console.log(Credentials)

      const { data: res } = await axios.post(url, Credentials);

      if (res.status === "SUCCESS") {
        console.log("Result Added")
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
  };


  

  useEffect(() => {
   console.log(props.quizDetails)
    clearTimer(getDeadTime());
  }, []);
  const onClickReset = () => {
    clearTimer(getDeadTime());
    
  };

  return (
    <div>
      {isQuestionEnd ? (
        <McqResult 
       
        username = {username}
        userid = {userid}
        quizName = {quizName}
        quizid = {quizid}
        percentage = {percentage}
        remainingAttempts = {remainingAttempts}
        obtainedMarks={obtainedMarks} 
        totalMarks={totalMarks}
        correctScore = {props.quizDetails.correctScore}
        marksDetails = {marksDetails}
        minPercentage = {minPercentage}
        // pass = {pass}
        QuestionList = {props.QuestionList}
        />
        
      ) : (
        <>
          <div className="control">
            <button className={theme ? "button_dark_success" : "button_light_success"} onClick={finishQuiz}>
            Submit
            </button>
          </div>
          <div className="card-header m-2">
            <h2>
              Time Left : <span> {timer}</span>
            </h2>
          </div>

          <Question
          setMarksDetails = {setMarksDetails}
            setAnswerDetails={setAnswerDetails}
            question={props.QuestionList[currQuestionIndex]}
            totalQuestions={props.QuestionList.length}
            currentQuestion={currQuestionIndex + 1}
            setAnswer={(index) => {
              setMarkedAnswers((arr) => {
                let newArr = [...arr];
                newArr[currQuestionIndex - 1] = index;
                return newArr;
              });
              setCurrentQuestionIndex(currQuestionIndex + 1);
            }}
           correctMarks={props.quizDetails.correctScore}
           incorrectMarks = {props.quizDetails.incorrectScore}
            setObtainedMarks={setObtainedMarks}
          />
          <div
            style={{
              float: "left",
            }}
          >
            <button
            className={theme ? "button_dark_small" : "button_light_small"}
              onClick={goToPrevQuestion}
              disabled={currQuestionIndex === 0}
            >
              Previous
            </button>
          </div>
          <div className="end">
            <div className="proctor">
              <Camera />
            </div>
            <div className="next">
            <button
            className={theme ? "button_dark_small_success" : "button_light_small_success"}
              onClick={goToNextQuestion}
              disabled={currQuestionIndex === props.QuestionList.length - 1}
            >
              Next
            </button>
            </div>
          </div>

          
        </>
      )}
    </div>
  );
};

export default McqQuizScreen;
