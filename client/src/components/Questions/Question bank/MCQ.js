import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalTitle,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';

const MCQ = (props) => {
  

  //Define here local state that store the form Data
  const [question, setQuestion] = useState("");
  const [correct, setCorrect] = useState(null);
  const [error, setError] = useState("");
  const [optionCount, setOptionCount] = useState();
  const [optionField, setOptionField] = useState([]);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [success,setSuccess] = useState();
  const [alert,setAlert] = useState(<></>)
  

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(question, option1,option2,option3,option4, correct);
    console.log(typeof optionCount)
    try {
    const url = "http://backend.healthynomad.xyz:8080/api/mcqQs";
    let Credentials;
   switch (optionCount) {
      case "2":
        console.log("Case 2 selected")
        
         Credentials = 
         { 
           category : props.category,
          
          question : question,
          option1 : option1,
          option2 : option2,
          correct : correct,
         }
        break;
      case "3":
        console.log("Case 3 selected")
        
         Credentials =
         {
           category : props.category,
          question : question,
          option1 : option1,
          option2 : option2,
          option3 : option3,
          correct : correct,
         }
        break;
      case "4":
        console.log("Case 4 selected")
         Credentials = {
          question : question,
          category : props.category,
          option1 : option1,
          option2 : option2,
          option3 : option3,
          option4 : option4,
          correct : correct,
         }
        break;
    
      default:
        console.log("Nothing selected")
        Credentials = { 
        category : props.category,
        question : question,
          option1 : option1,
          option2 : option2,
          correct : correct,
      }
        break;
    }

    for (const item in Credentials) {
      
       if(Credentials[item].trim().length <=0){
        setAlert(<Alert variant="danger">
        <Alert.Heading>Question cannot be added</Alert.Heading>
        <p>
         Please Enter a valid Question or Answer
        </p>
        <hr />
      </Alert>)
        throw "Invalid Question OR Answer"
       }
    }
    
   

      const { data: res } = await axios.post(url, Credentials);
      if (res.status === "SUCCESS") {
        setSuccess(true)
        setAlert(<Alert variant="success">
        <Alert.Heading>Question addition successful</Alert.Heading>
        <p>You can now view the question in the Question Bank section</p>
        <hr />
      </Alert>)
        setTimeout(() => {
          window.location.reload()
        }, 3000);
      }
      
   
      

      
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setAlert(<Alert variant="danger">
        <Alert.Heading>Question cannot be added</Alert.Heading>
        <p>
         Please Enter a valid Question or Answer
        </p>
        <hr />
      </Alert>)

      }
    }
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
            console.log(e);

            let arr = [];

            for (let i = 1; i <= e; i++) {
              arr.push(
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Option ${i}`}
                    onChange={(e) => { 
                  switch (i) {
                    case 1:
                      setOption1(e.target.value)
                      break;
                    case 2:
                      setOption2(e.target.value)
                      break;
                    case 3:
                      setOption3(e.target.value)
                      break;
                    case 4:
                      setOption4(e.target.value)
                      break;
                  
                    default:
                      break;
                  }
                    }}
                  />
                </div>
              );
            }

            setOptionField(arr);

            console.log(optionField);
          }}
        >
          <Dropdown.Item eventKey="2">2</Dropdown.Item>
          <Dropdown.Item eventKey="3">3</Dropdown.Item>
          <Dropdown.Item eventKey="4">4</Dropdown.Item>
        </DropdownButton>
      </div>
      <div>
        <div className="form-group" autoComplete="off" autoSave="off">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter the Question"
          />
        </div>
        <div>
          {optionField.map((ele, idx) => {
            return <div key={idx}>{ele}</div>;
          })}
        </div>
        <div className="form-group mt-3">
          <input
            min={"1"}
            max={optionCount}
            type="number"
            className="form-control"
            placeholder="Correct Option"
            onChange={(e) => {
              if(Number(e.target.value)< 1 || Number(e.target.value)> optionCount){
                setError("Invalid Correct Option")
              }
              else{
                setError(null)
                setCorrect(e.target.value)
              }
            }}
          />
        </div>
        {error && <div className="error_msgs">{error}</div> }
        {alert}
          
    
        <Button
          type="submit"
          className="btn btn-success mt-4"
          onClick={handleSubmit}
        >
          Add Question
        </Button>
      </div>
      {}
    </div>
  );
};

export default MCQ;
