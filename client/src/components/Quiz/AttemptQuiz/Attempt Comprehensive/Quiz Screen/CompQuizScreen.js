import React from "react";
import { useState, useEffect, useRef } from "react";
import Question from "../Question/Question";
import CompResult from "../../../../Results/CompResultPage";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const CompQuizScreen = (props) => {
  const [error, setError] = useState();
  const [currQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const [markedAnswers, setMarkedAnswers] = useState(
  //   new Array(props.QuestionList.length)
  // );
  const [answerDetails, setAnswerDetails] = useState({});
  // const [marksDetails,setMarksDetails] = useState({});
  const [isQuestionEnd, setIsQuestionEnd] = useState(
    currQuestionIndex === props.QuestionList.length
  );

  
  const totalMarks = props.QuestionList.length * props.quizDetails.correctScore;
  
  

  const username = `${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}`
  const userid = localStorage.getItem("userid")
  const quizName = props.quizDetails.name 
  const quizid = props.quizDetails._id
  const remainingAttempts = 0;
  const Ref = useRef(null);
  
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
    // console.log(answerDetails)
    setIsQuestionEnd(props.QuestionList.length);
    
  // window.location = "/comp_result";

  

  };
  const goToNextQuestion = () => {
    console.log(answerDetails)
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

  // const handleSubmit = async (e) => {
  //   // e.preventDefault();
  //   try {
  //     const url = "http://localhost:8080/api/CompResults";
  //     const Credentials = {
  //       username,
  //       userid,
  //       quizName,
  //       quizid,
  //       totalMarks,
  //       obtainedMarks,
  //       percentage,
  //       remainingAttempts
  //     };

  //     console.log(Credentials)

  //     const { data: res } = await axios.post(url, Credentials);

  //     if (res.status === "SUCCESS") {
  //       console.log("Result Added")
  //       setError(null);

  //     }
  //   } catch (error) {
  //     if (
  //       error.response &&
  //       error.response.status >= 400 &&
  //       error.response.status <= 500
  //     ) {
  //       setError(error.response.data.message);
  //     }
  //   }
  // };


  

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
        <CompResult 
        username = {username}
        userid = {userid}
        quizName = {quizName}
        quizid = {quizid}
        remainingAttempts = {remainingAttempts}
        totalMarks={totalMarks} 
        answerDetails = {answerDetails}
        QuestionList = {props.QuestionList}
        />
        
      ) : (
        <>
          <div className="control">
            <Button variant="success" onClick={finishQuiz}>
            Submit
            </Button>
          </div>
          <div className="card-header m-2">
            <h2>
              Time Left : <span> {timer}</span>
            </h2>
          </div>

          <Question
          
            question={props.QuestionList[currQuestionIndex]}
            totalQuestions={props.QuestionList.length}
            currentQuestion={currQuestionIndex + 1}
            setAnswerDetails={setAnswerDetails}
         
          />
          <div
            style={{
              float: "left",
            }}
          >
            <Button
              onClick={goToPrevQuestion}
              disabled={currQuestionIndex === 0}
            >
              Previous
            </Button>
          </div>
          <div className="control">
            <Button
              onClick={goToNextQuestion}
              disabled={currQuestionIndex === props.QuestionList.length - 1}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CompQuizScreen;