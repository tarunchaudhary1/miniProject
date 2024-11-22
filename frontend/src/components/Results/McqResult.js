import React from "react";
import "../Questions/InnerLayout.css";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTheme } from "../../Context";

const McqResult = () => {
  const theme = Boolean(useTheme());
  const backCol = theme ? "#444444" : "#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  const right = <Badge bg="success">&#x2713; </Badge>;
  const wrong = <Badge bg="danger">X</Badge>;

  // Sample static data
  const pass = true;
  const obtainedMarks = 8;
  const totalMarks = 10;
  const percentage = 80;

  const QuestionList = [
    {
      question: "Sample Question 1?",
      option1: "Option 1",
      option2: "Option 2",
      option3: "Option 3",
      option4: "Option 4",
      correct: 1,
    },
  ];

  const marksDetails = {
    1: 1, // 1 represents correct score
  };

  const correctScore = 1;

  return (
    <>
      <div>
        <Link
          to={`/quiz/attempt_quiz`}
          className={theme ? "button_dark" : "button_light"}
        >
          Exit Quiz
        </Link>
      </div>
      <br />

      <div className="question-div p-3">
        <div className={pass ? "alert alert-success" : "alert alert-danger"}>
          <span
            className={`badge ${pass ? "bg-success" : "bg-danger"} top-right`}
          >
            {pass ? "Pass" : "Fail"}
          </span>
          <h4>
            Marks Obtained: {obtainedMarks} out of {totalMarks}
            <br />
            <br />
            Percentage Obtained : {percentage}%
          </h4>
        </div>
      </div>

      <div className="result-screen p-3">
        <h2 className="heading-top text-center">Answers Attempted</h2>
        <br />
        <div>
          {QuestionList.map((item, index) => (
            <div className="question-div" key={index}>
              <div
                className={
                  marksDetails[index + 1] === correctScore
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
              >
                <span
                  className={`badge ${
                    marksDetails[index + 1] === correctScore
                      ? "bg-success"
                      : "bg-danger"
                  } top-right`}
                >
                  {marksDetails[index + 1] === correctScore
                    ? "Correct"
                    : "Incorrect"}
                </span>
                <h5>{item.question}</h5>
                <p>
                  {item.correct === 1 ? right : wrong}&nbsp; {item.option1}
                </p>
                <p>
                  {item.correct === 2 ? right : wrong}&nbsp; {item.option2}
                </p>
                {item.option3 && (
                  <p>
                    {item.correct === 3 ? right : wrong}&nbsp; {item.option3}
                  </p>
                )}
                {item.option4 && (
                  <p>
                    {item.correct === 4 ? right : wrong}&nbsp; {item.option4}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default McqResult;
