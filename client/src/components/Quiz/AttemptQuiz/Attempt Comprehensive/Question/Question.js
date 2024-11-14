import React from "react";
import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { Button } from "react-bootstrap";
import "../AttemptComp.css";

const Question = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [inputAnswer,setInputAnswer] = useState()
  const [marks, setMarks] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const activeOption = useRef(null);

  

  useEffect(() => {
    setInputAnswer("")
    
  }, [props.question]);
  return (
    <>
      <div className="question m-3">
        <div className="question-count">
          <b>{props.currentQuestion}</b>
          of
          <b>{props.totalQuestions}</b>
        </div>
        <div className="main">
          <div className="question">
            <span>Question : </span>
            <p>{props.question.question}</p>
          </div>
          <div className="my-3">
            <textarea className="form-control p-3" id="exampleFormControlTextarea1" value={inputAnswer}  rows="5" onChange={(e)=>{
              setInputAnswer(e.target.value)
              props.setAnswerDetails((obj) => {
                obj[`${props.currentQuestion}`] = `${e.target.value}`;
                props.setAnswerDetails(obj);
                
              });
              
            }} autoFill="off" autoComplete="off"></textarea>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Question;
