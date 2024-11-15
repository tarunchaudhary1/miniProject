import React from "react";
import "./MCQ.css";
import { Badge, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const MCQ = (props) => {
  const [delQues, setDelQues] = useState("");
  const [error, setError] = useState("");
  const handleDeleteQuestion = async (item) => {
   

    if (props.length >= 2) {
      if(item){
        try {
          const url = `http://backend.healthynomad.xyz:8080/api/mcqQuizzes/${props.quizId}`;
          const Credentials = {
            delmcqQs: item,
          };
          const { data: res } = await axios.patch(url, Credentials);
  
          if (res.status === "SUCCESS") {
            console.log("Question Removed");
            alert(res.message);
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
      }
    } else {
      setError("Quiz cannot be empty");
    }
  };
  let right = <Badge bg="success">&#x2713; </Badge>;
  let wrong = <Badge bg="danger">X</Badge>;
  return (
    <div>
      {props.length === 0 ? (
        <div className="questionBox">
          <h3>Oops! No Questions to show</h3>
        </div>
      ) : (
        <div className="questionBox">
          {error && <div className="error_msgs">{error}</div>} <br />
          <div className="rightButton">
            <Button
              variant="danger"
              onClick={() => {
                handleDeleteQuestion(props.ques);
              }}
            >
              Delete
            </Button>
          </div>
          <br></br>
          <div>
            <h5>
              {props.index + 1}. {props.ques.question}
            </h5>

            <div className="answerBox">
            <p>
              {" "}
              {props.ques.correct === 1 ? right : wrong} {props.ques.option1}
            </p>

            <p>
              {props.ques.correct === 2 ? right : wrong} {props.ques.option2}
            </p>

            {props.ques.option3 !== undefined && (
              <p>
                {props.ques.correct === 3 ? right : wrong} {props.ques.option3}
              </p>
            )}

            {props.ques.option4 !== undefined && (
              <p>
                {props.ques.correct === 4 ? right : wrong} {props.ques.option4}
              </p>
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MCQ;
