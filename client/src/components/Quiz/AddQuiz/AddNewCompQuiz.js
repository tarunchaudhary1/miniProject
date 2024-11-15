import React from "react";
import SideBar from "../../SideBarNav/SideBar";
import "../../Questions/InnerLayout.css";
import { useState } from "react";
import {
  Alert,
  Button,
  Modal,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import axios from "axios";
import AddQuestion from "../AddQuestions/AddQuestion";
import AddDescriptive from "../AddQuestions/AddDescriptive/AddDescriptive";
import { useTheme } from "../../../Context";

function AddNewCompQuiz() {
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [maxAttempt, setMaxAttempt] = useState();
  const [minPerc, setMinPerc] = useState();
  const [correctScore, setCorrectScore] = useState();
  const [incorrectScore, setIncorrectScore] = useState();
  const [duration, setDuration] = useState();
  const [expiryTime, setExpiryTime] = useState();
  const [error, setError] = useState();
  // const [alert, setAlert] = useState(<></>);
  const [viewForm, setViewForm] = useState(true);
  const [credentials, setCredentials] = useState();

  const theme = Boolean(useTheme());
	const themeClassName = theme ? "addQuestionContainer_dark":"addQuestionContainer";
  const themeLabelName = theme ? "label-text-dark" : "label-text"

  const backCol = theme ? "#444444" : "	#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://backend.healthynomad:8080/api/compQuizzes";
      const Credentials = {
        name,
        desc,
        maxAttempt,
        minPerc,
        correctScore,
        incorrectScore,
        duration,
        expiryTime
      };
      setCredentials(Credentials);
      const { data: res } = await axios.post(url, Credentials);

      if (res.status === "SUCCESS") {
        setError(null);
        setViewForm(false);
        window.location = `/quiz/addnewquiz/add_desc/${res.data._id}`;
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
  const setTheViewForm = () => {
    setViewForm((prev) => {
      setViewForm(!prev);
    });
  };

  return (
    <div>
      <SideBar />
      {viewForm ? (
        <div className={themeClassName}>
          <div className="container">
            <h3 className="header-top my-2">Add New Comprehensive Quiz</h3>
          </div>
          <div className="p-3 container">
            <div className="form-group" autoComplete="off" autoSave="off">
              <label className={themeLabelName}>Please Enter Quiz Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label className={themeLabelName}>
                Please Enter Quiz Description
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            {/* <div className="form-group mt-3">
              <label className={themeLabelName}>Please enter max attempts</label>
              <input
                type="number"
                className="form-control"
                autoComplete="off"
                autoSave="off"
                onChange={(e) => {
                  if (e.target.value < 1 || e.target.value > 3) {
                    setError("Max Attempts should be 1 or less than 3");
                    setMaxAttempt("");
                  } else {
                    setMaxAttempt(e.target.value);
                    setError(null);
                  }
                }}
                min={"1"}
                max={"3"}
              />
            </div> */}
            <div className="form-group mt-3">
              <label className={themeLabelName}>Please enter min percentage</label>
              <input
                type="number"
                className="form-control"
                autoComplete="off"
                autoSave="off"
                onChange={(e) => {
                  if (e.target.value < 1 || e.target.value > 100) {
                    setError("Value must be between 1 and 100");
                    setMinPerc("");
                  } else {
                    setMinPerc(e.target.value);
                    setError(null);
                  }
                }}
                min={"1"}
                max={"100"}
              />
            </div>
            <div className="form-group mt-3">
              <label className={themeLabelName}>Please enter correct score</label>
              <input
                type="number"
                className="form-control"
                autoComplete="off"
                autoSave="off"
                onChange={(e) => {
                  if (e.target.value < 0 || e.target.value > 100) {
                    setError("Value must be between 1 and 100");
                    setCorrectScore("");
                  } else {
                    setCorrectScore(e.target.value);
                    setError(null);
                  }
                }}
                min={"0"}
                max={"100"}
              />
            </div>
            <div className="form-group mt-3">
              <label className={themeLabelName}>Please enter incorrect score</label>
              <input
                type="number"
                className="form-control"
                autoComplete="off"
                autoSave="off"
                onChange={(e) => {
                  if (e.target.value < 0 || e.target.value > 100) {
                    setError("Value must be between 1 and 100");
                    setIncorrectScore("");
                  } else {
                    setIncorrectScore(e.target.value);
                    setError(null);
                  }
                }}
                min={"0"}
                max={"100"}
              />
            </div>
            <div className="form-group mt-3">
              <label className={themeLabelName}>
                Please enter the quiz duration
              </label>
              <input
                type="number"
                className="form-control"
                autoComplete="off"
                autoSave="off"
                onChange={(e) => {
                  if (e.target.value < 10 || e.target.value > 180) {
                    setError("Duration must be between 10 and 180 minutes");
                    setDuration("");
                  } else {
                    setDuration(e.target.value);
                    setError(null);
                  }
                }}
                min={"10"}
                max={"180"}
              />
            </div>
            <div className="form-group mt-3">
              <label className={themeLabelName}>
                Please enter the quiz expiry date & time
              </label>
              <input
                type="datetime-local"
                className="form-control"
                autoComplete="off"
                autoSave="off"
                onChange={(e) => {
                  setExpiryTime(e.target.value);
                  setError(null);
                }}
              />
            </div>
            {error && <div className="error_msgs">{error}</div>} <br />
            {/* {alert} */}
            <Button
              type="submit"
              className="btn btn-success mt-4"
              onClick={handleSubmit}
            >
              Add Questions
            </Button>
          </div>
        </div>
      ) : (
        <AddDescriptive
          setViewForm={setTheViewForm}
          credentials={credentials}
        />
      )}
    </div>
  );
}

export default AddNewCompQuiz;
