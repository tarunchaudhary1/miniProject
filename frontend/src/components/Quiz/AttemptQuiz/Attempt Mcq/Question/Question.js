import React from "react";
import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { Button } from "react-bootstrap";
import "../AttemptMcq.css";
import { useTheme } from "../../../../../Context";

const Question = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setselectedOption] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [marks, setMarks] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const activeOption = useRef(null);

  const theme = Boolean(useTheme());
  const questionTheme = theme ? "question-count_dark" : "question-count";
  const titleTheme = theme ? "title_dark" : "title";

  const Options = [
    props.question.option1,
    props.question.option2,
    props.question.option3 ? props.question.option3 : null,
    props.question.option4 ? props.question.option4 : null,
  ];

  useEffect(() => {
    if (selectedAnswers.hasOwnProperty(`${props.currentQuestion}`)) {
      setIsDisabled(false);
      setselectedOption(selectedAnswers[`${props.currentQuestion}`].toString());
    } else {
      setselectedOption(null);
      setIsDisabled(true);
    }
    // console.log(Options);
    // if(JSON.stringify(selectedAnswers) === '{}' || !selectedAnswers.hasOwnProperty(`${props.currentQuestion}`)){
    //   setIsDisabled(true)
    // }

    // console.log("previously selected : ", selectedAnswers);
    // console.log("Marks Details", marks);
  }, [props.question, selectedAnswers, marks]);
  return (
    <>
      <div className="question">
        <div className={questionTheme}>
          <b>{props.currentQuestion}</b>
          of
          <b>{props.totalQuestions}</b>
        </div>
        <div className="main">
          <div className="question">
            <p>{props.question.question}</p>
          </div>
          <div className="options">
            {Options.length &&
              Options.map((option, index) => {
                return (
                  option !== null && (
                    <div
                      onClick={() => {
                        setselectedOption(index.toString());

                        setSelectedAnswers((obj) => {
                          obj[`${props.currentQuestion}`] = index;
                          setSelectedAnswers(obj);
                        });

                        if (index + 1 === props.question.correct) {
                          setMarks((obj) => {
                            obj[`${props.currentQuestion}`] = Number(
                              props.correctMarks
                            );
                            setMarks(obj);
                          });
                        } else {
                          setMarks((obj) => {
                            obj[`${props.currentQuestion}`] = -Number(
                              props.incorrectMarks
                            );
                            setMarks(obj);
                          });
                        }

                        setIsDisabled(false);

                        props.setAnswerDetails(selectedAnswers);
                        props.setMarksDetails(marks);
                      }}
                      className={
                        index.toString() === selectedOption
                          ? "option active"
                          : "option"
                      }
                      key={index}
                    >
                      {option}
                    </div>
                  )
                );
              })}
          </div>
        </div>
      </div>
      <button
        className={theme ? "button_dark_small_warning mx-3" : "button_light_small_warning mx-3"}
        disabled={isDisabled}
        onClick={() => {
          setselectedOption(-1);
          // console.log(props.currentQuestion);
          setSelectedAnswers((obj) => {
            delete obj[`${props.currentQuestion}`];
            setSelectedAnswers(obj);
          });
          setMarks((marksObj) => {
            marksObj[`${props.currentQuestion}`] = Number(0);
            setMarks(marksObj);
          });
          setIsDisabled(true);
        }}
      >
        Clear Selection
      </button>
    </>
  );
};

export default Question;
