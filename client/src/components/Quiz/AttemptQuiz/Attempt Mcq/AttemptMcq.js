import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../../../SideBarNav/SideBar";
import { useParams, useLocation } from "react-router-dom";
import "../../../Questions/InnerLayout.css";
import axios from "axios";
import McqQuizScreen from "./Quiz Screen/McqQuizScreen";
import JoinMcqScreen from "./Join Screen/JoinMcqScreen";
import { useTheme } from "../../../../Context";

const AttemptMcq = () => {
  const [Data, setData] = useState([]);
  const [sortedData, setSortedData] = useState(Data);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [quizDetails, setQuizDetails] = useState({});
  const [QuestionList, setQuestionList] = useState([]);

  const theme = useTheme();
  const themeClassName = theme ? "tableContainer_dark" : "tableContainer";

  const backCol = theme ? "#444444" : "	#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;
  //Id for update record and Delete

  const { id } = useParams();
  const GetMcqQuizData = () => {
    const url = `http://backend.healthynomad.xyz:8080/api/mcqQuizzes/${id}`;
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        //console.log(result);
        const { status, message, data } = result;
        if (status !== "SUCCESS") {
          alert(message, status);
        } else {
          setQuizDetails(data);
          setQuestionList(data.mcqQs);
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetMcqQuizData();
    setSortedData(Data);
  }, []);

  return (
    <>
      <Sidebar />
      <div className={themeClassName}>
        {isQuizStarted ? (
          <McqQuizScreen
            id={id}
            QuestionList={QuestionList}
            quizDetails={quizDetails}
          />
        ) : (
          <JoinMcqScreen
            id={id}
            QuestionList={QuestionList}
            setIsQuizStarted={setIsQuizStarted}
          />
        )}
      </div>
    </>
  );
};

export default AttemptMcq;
