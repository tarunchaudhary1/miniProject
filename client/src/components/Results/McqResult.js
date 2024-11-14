import { React, useEffect, useState } from 'react'
import Sidebar from '../SideBarNav/SideBar'
import "../Questions/InnerLayout.css"
import { Button ,Badge} from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useTheme } from '../../Context'


const McqResult = (props) => {
  const [error, setError] = useState();
  const username = props.username;
  const userid = props.userid;
  const quizName = props.quizName;
  const quizid = props.quizid;
  const totalMarks = props.totalMarks;
  const obtainedMarks = props.obtainedMarks;
  const percentage = props.percentage;
  const minPercentage = props.minPercentage;
  const remainingAttempts = props.remainingAttempts;

  const pass = percentage >= minPercentage ? true:false;
  const theme = Boolean(useTheme());
	const themeClassName = theme ? "addQuestionContainer_dark":"addQuestionContainer";

    const backCol = theme ? "#444444" : "#ffffff";
    const textCol = theme ? "white" : "black";
    document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  



  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const url = "http://localhost:8080/api/mcqResults";
      const Credentials = {
        username,
        userid,
        quizName,
        quizid,
        totalMarks,
        obtainedMarks,
        percentage,
        pass,
        remainingAttempts
      };

      console.log(Credentials)

      const { data: res } = await axios.post(url, Credentials);

      if (res.status === "SUCCESS") {
        console.log("Result Added")
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
  };

  let right = <Badge bg="success">&#x2713; </Badge>;
  let wrong = <Badge bg="danger">X</Badge>;

  

  useEffect(() => {
    handleSubmit();
    // console.log(props.marksDetails)
    // console.log(props.QuestionList)
  }, []);

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

      {/* <div className='result-screen p-3'> */}
      <div className="question-div p-3">
        <div
          className={
            pass
              ? "alert alert-success"
              : "alert alert-danger"
          }
        >
          <span
            className={`badge ${
              pass ? "bg-success" : "bg-danger"
            } top-right`}
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
          {props.QuestionList.map((item, index) => {
            return (
              <div className="question-div">
                <div
                  className={
                    props.marksDetails[index + 1] === props.correctScore
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                >
                  <span
                    className={`badge ${
                      props.marksDetails[index + 1] === props.correctScore
                        ? "bg-success"
                        : "bg-danger"
                    } top-right`}
                  >
                    {props.marksDetails[index + 1] === props.correctScore
                      ? "Correct"
                      : "Incorrect"}
                  </span>
                  <h5>{item.question}</h5>
                  <p>
                    {" "}
                    {item.correct === 1 ? right : wrong}&nbsp; {item.option1}
                  </p>
                  <p>
                    {item.correct === 2 ? right : wrong}&nbsp; {item.option2}
                  </p>
                  {item.option3 && (
                    <p>
                      {" "}
                      {item.correct === 3 ? right : wrong}&nbsp; {item.option3}
                    </p>
                  )}
                  {item.option4 && (
                    <p>
                      {" "}
                      {item.correct === 4 ? right : wrong}&nbsp; {item.option4}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default McqResult
