import React, { useState } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';

const MCQ = () => {
  const [question, setQuestion] = useState("");
  const [correct, setCorrect] = useState(null);
  const [error, setError] = useState("");
  const [optionCount, setOptionCount] = useState();
  const [optionField, setOptionField] = useState([]);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [alert, setAlert] = useState(<></>);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let formData = {};
    switch (optionCount) {
      case "2":
        formData = { question, option1, option2, correct };
        break;
      case "3":
        formData = { question, option1, option2, option3, correct };
        break;
      case "4":
        formData = { question, option1, option2, option3, option4, correct };
        break;
      default:
        formData = { question, option1, option2, correct };
    }

    for (const item in formData) {
      if (formData[item]?.trim?.()?.length <= 0) {
        setAlert(
          <Alert variant="danger">
            <Alert.Heading>Question cannot be added</Alert.Heading>
            <p>Please Enter a valid Question or Answer</p>
          </Alert>
        );
        return;
      }
    }

    setAlert(
      <Alert variant="success">
        <Alert.Heading>Question addition successful</Alert.Heading>
        <p>Question has been added successfully</p>
      </Alert>
    );
  };

  return (
    <div className="container my-3">
      <div className="card-header m-3">
        <DropdownButton
          align="end"
          title="Select the no. of options"
          id="dropdown-menu-align-end"
          onSelect={(e) => {
            setOptionCount(e);
            let arr = [];
            for (let i = 1; i <= e; i++) {
              arr.push(
                <div className="form-group mt-3" key={i}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Option ${i}`}
                    onChange={(e) => {
                      switch (i) {
                        case 1: setOption1(e.target.value); break;
                        case 2: setOption2(e.target.value); break;
                        case 3: setOption3(e.target.value); break;
                        case 4: setOption4(e.target.value); break;
                      }
                    }}
                  />
                </div>
              );
            }
            setOptionField(arr);
          }}
        >
          <Dropdown.Item eventKey="2">2</Dropdown.Item>
          <Dropdown.Item eventKey="3">3</Dropdown.Item>
          <Dropdown.Item eventKey="4">4</Dropdown.Item>
        </DropdownButton>
      </div>

      <div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter the Question"
          />
        </div>
        <div>
          {optionField.map((ele, idx) => <div key={idx}>{ele}</div>)}
        </div>
        <div className="form-group mt-3">
          <input
            min="1"
            max={optionCount}
            type="number"
            className="form-control"
            placeholder="Correct Option"
            onChange={(e) => {
              if (Number(e.target.value) < 1 || Number(e.target.value) > optionCount) {
                setError("Invalid Correct Option");
              } else {
                setError(null);
                setCorrect(e.target.value);
              }
            }}
          />
        </div>
        {error && <div className="error_msgs">{error}</div>}
        {alert}
        
        <Button type="submit" className="btn btn-success mt-4" onClick={handleSubmit}>
          Add Question
        </Button>
      </div>
    </div>
  );
};

export default MCQ;