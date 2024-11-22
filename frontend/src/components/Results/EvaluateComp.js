import { React } from "react";
import Sidebar from "../SideBarNav/SideBar";
import "../Questions/InnerLayout.css";
import EvaluateIndividualQuestion from "./EvaluateIndividualQuestion";
import { Button } from "react-bootstrap";
import { useTheme } from "../../Context";

const EvaluateComp = () => {
  const questionList = {
    0: "Question 1",
    1: "Question 2",
    2: "Question 3"
  };
  
  const answerDetails = {
    "1": "Answer 1",
    "2": "Answer 2",
    "3": "Answer 3"
  };
  
  const marks = {
    "1": 5,
    "2": 3,
    "3": 4
  };

  const correctScore = 5;
  const evaluationDetails = {};

  const submitMarks = () => {
    window.location.href = "/all_comp_result";
  };

  const theme = Boolean(useTheme());
  const themeClassName = theme ? "tableContainer_dark" : "tableContainer";

  const backCol = theme ? "#444444" : "#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  return (
    <>
      <Sidebar />
      <div className={themeClassName}>
        <h4 className="header-top my-2 text-center">Answer Details</h4>
        {questionList &&
          Object.keys(questionList).map((keyName, i) => {
            const act_key = String(Number(keyName) + 1);
            return (
              <EvaluateIndividualQuestion
                i={i}
                questionList={questionList}
                keyName={act_key}
                answerDetails={answerDetails}
                marks={marks}
                setEvaluationDetails={evaluationDetails}
                correctScore={correctScore}
              />
            );
          })}
        <div
          style={{
            left: "88%",
            position: "relative",
            width: "fit-content",
          }}
        >
          <Button variant="success" onClick={submitMarks}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default EvaluateComp;