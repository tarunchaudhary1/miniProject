import React from "react";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useTheme } from "../../../Context";

const Descriptive = (props) => {
  const [question, setQuestion] = useState("");
  const [sampleAnswer, setSampleAnswer] = useState("");
  const [alert, setAlert] = useState(<></>);

  const theme = Boolean(useTheme());
  const themeClassName = theme ? "tableContainer_dark" : "tableContainer";

  const backCol = theme ? "#444444" : "#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (question.trim().length <= 0 || sampleAnswer.trim().length <= 0) {
      setAlert(
        <Alert variant="danger">
          <Alert.Heading>Question cannot be added</Alert.Heading>
          <p>Please Enter a valid Question or Answer</p>
          <hr />
        </Alert>
      );
      return;
    }

    setAlert(
      <Alert variant="success">
        <Alert.Heading>Question addition successful</Alert.Heading>
        <p>Question has been added successfully</p>
        <hr />
      </Alert>
    );
  };

  return (
    <div className="container my-3 question-input-body">
      <div>
        <div className="form-group m-2" autoComplete="off" autoSave="off">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter the Question"
          />
        </div>
        <div className="form-group m-2" autoComplete="off" autoSave="off">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setSampleAnswer(e.target.value)}
            placeholder="Enter the Sample Answer"
          />
        </div>

        {alert}

        <button
          type="submit"
          className={theme ? "button_dark_success" : "button_light_success"}
          onClick={handleSubmit}
        >
          Add Question
        </button>
      </div>
    </div>
  );
};

export default Descriptive;