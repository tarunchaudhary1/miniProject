import { React, useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Sidebar from "../SideBarNav/SideBar";
import "../Questions/InnerLayout.css";
import axios from "axios";
import EvaluateIndividualQuestion from "./EvaluateIndividualQuestion";
import { Button } from "react-bootstrap";
import { useTheme } from "../../Context";

const EvaluateComp = () => {
  const [Data, setData] = useState([]);
  const [sortedData, setSortedData] = useState(Data);
  const [questionList, setQuestionList] = useState([]);
  const [answerDetails, setAnswerDetails] = useState({});
  const [quizId, setQuizId] = useState();
  const [correctScore, setCorrectScore] = useState();
  const [minPercentage, setMinPercentage] = useState();
  const [evaluationDetails, setEvaluationDetails] = useState({});
  // const [inputMarks, setInputMarks] = useState();
  const [error, setError] = useState();
  const [marks, setMarks] = useState();

  const { id } = useParams();
  const GetResultData = () => {
    //here we will get all employee data
    const url = `http://localhost:8080/api/compResults/${id}`;
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        //console.log(result);
        const { status, message, data } = result;
        if (status !== "SUCCESS") {
          alert(message, status);
        } else {
          // console.log(data);
          setData(data);
          setSortedData(data);
          setAnswerDetails(data.attemptedAnswer);
          setQuestionList(data.questionList);
          setQuizId(data.quizid);
          setMarks(data.obtainedMarks);
          //setEvaluationDetails(data.obtainedMarks);
          const quizId = data.quizid;
          const url = `http://localhost:8080/api/compQuizzes/${quizId}`;
          axios
            .get(url)
            .then((response) => {
              const result = response.data;
              //console.log(result);
              const { status, message, data } = result;
              if (status !== "SUCCESS") {
                alert(message, status);
              } else {
                // console.log("YAYY");
                setCorrectScore(data.correctScore);
                setMinPercentage(data.minPerc);
                // console.log("minPerc", data.minPerc);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const GetQuizData = () => {
  //   //here we will get all employee data
  //   const url = `http://localhost:8080/api/compQuizzes/${quizId}`;
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       const result = response.data;
  //       //console.log(result);
  //       const { status, message, data } = result;
  //       if (status !== "SUCCESS") {
  //         alert(message, status);
  //       } else {
  //         setCorrectScore(data.correctScore);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const submitMarks = async () => {
    let finalMarks = 0;
    // let eval_flag = 0;
    for (let [key, value] of Object.entries(answerDetails)) {
      // console.log(key, value);
      const curr_val = evaluationDetails[key];
      if (curr_val !== undefined) {
        finalMarks += Number(curr_val);
        // eval_flag = 1;
      } else {
        const prev_val = marks && marks[key] ? marks[key] : undefined;
        if (prev_val !== undefined) {
          finalMarks += Number(prev_val);
          evaluationDetails[key] = prev_val;
          // eval_flag = 1;
        } else {
          finalMarks += 0;
          // eval_flag = 1;
        }
      }
    }
    console.log(finalMarks, Data.totalMarks);

    const percentage = ((finalMarks * 100) / Data.totalMarks).toFixed(2);
    const pass = percentage >= minPercentage ? true : false;

    try {
      const url = `http://localhost:8080/api/compResults/${id}`;
      // console.log(url);
      // console.log(item);
      const Credentials = {
        obtainedMarks: evaluationDetails,
        percentage: percentage,
        pass: pass,
      };
      const { data: res } = await axios.patch(url, Credentials);
      // console.log(`length`, existingArray.length);
      if (res.status === "SUCCESS") {
        console.log("Marks Added");
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
    window.location.href = "/all_comp_result";
  };

  const theme = Boolean(useTheme());
  const themeClassName = theme ? "tableContainer_dark" : "tableContainer";

  const backCol = theme ? "#444444" : "	#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  useEffect(() => {
    // console.log(questionList);
    // console.log(answerDetails);

    GetResultData();
    // GetQuizData();
    setSortedData(Data);
  }, []);
  return (
    <>
      <Sidebar />
      <div className={themeClassName}>
        <h4 className="header-top my-2 text-center">Answer Details</h4>
        {/* {answerDetails &&
          Object.keys(answerDetails).map((keyName, i) => {
            // console.log(questionList[i])
            // console.log(correctScore);
            // console.log("marks", marks);
            return (
              <EvaluateIndividualQuestion
                i={i}
                questionList={questionList}
                keyName={keyName}
                answerDetails={answerDetails}
                marks={marks}
                setEvaluationDetails={setEvaluationDetails}
                correctScore = {correctScore}
              />
            );
          })} */}

        {questionList &&
          Object.keys(questionList).map((keyName, i) => {
            // console.log(keyName, i);
            // console.log(correctScore);
            // console.log("marks", marks);

            const act_key = String(Number(keyName) + 1);
            // if(!answerDetails[act_key]) {
            //   console.log(i);
            //   answerDetails[act_key] = "Not Answered";
            // }

            return (
              <EvaluateIndividualQuestion
                i={i}
                questionList={questionList}
                keyName={act_key}
                answerDetails={answerDetails}
                marks={marks}
                setEvaluationDetails={setEvaluationDetails}
                correctScore={correctScore}
              />
            );
          })}
        <div
          style={{
            // border: "solid red",
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
