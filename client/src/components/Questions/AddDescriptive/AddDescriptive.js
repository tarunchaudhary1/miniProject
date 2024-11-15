import React from "react";
import { useState } from "react";
import axios from "axios";
import { Dropdown, Alert, DropdownButton, Button } from "react-bootstrap";
import { useTheme } from "../../../Context";

const Descriptive = (props) => {
  const [question, setQuestion] = useState("");

  const [error, setError] = useState("");
  const [sampleAnswer, setSampleAnswer] = useState("");
  const [success, setSuccess] = useState();
  const [flag,setFlag] = useState(true)
  const [alert,setAlert] = useState(<></>)

  const theme = Boolean(useTheme());
  const themeClassName = theme ? "tableContainer_dark" : "tableContainer";

  const backCol = theme ? "#444444" : "	#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(typeof optionCount);
    try {
      const url = "http://backend.healthynomad:8080/api/compQs";
      let Credentials =
      {
        category : props.category,
        question : question,
        answer : sampleAnswer

      }

      console.log(Credentials);
      
      

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

        {error && <div className="error_msgs">{error}</div>}
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
