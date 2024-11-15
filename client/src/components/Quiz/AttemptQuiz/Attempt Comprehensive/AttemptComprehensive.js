import React from 'react'
import Sidebar from '../../../SideBarNav/SideBar'
import "../../../Questions/InnerLayout.css"
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CompQuizScreen from './Quiz Screen/CompQuizScreen';
import JoinCompScreen from './Join Screen/JoinCompScreen';

const AttemptComprehensive = () => {
  const [Data, setData] = useState([]);
  const [sortedData, setSortedData] = useState(Data);
  const [isQuizStarted,setIsQuizStarted] = useState(false);
  const [quizDetails,setQuizDetails] = useState({})
  const [QuestionList,setQuestionList] = useState([]);
  const {id} = useParams();
  const GetCompQuizData = () => {
    //here we will get all employee data
    const url = `http://backend.healthynomad:8080/api/compQuizzes/${id}`;
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        //console.log(result);
        const { status, message, data } = result;
        if (status !== "SUCCESS") {
          alert(message, status);
        } else {
          setQuizDetails(data)
          setQuestionList(data.compQs)
          console.log(data)

        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {

    GetCompQuizData();
    setSortedData(Data);

  }, []);
  return (
    <>
      <Sidebar />
      <div className='tableContainer'>
        {isQuizStarted
          ?
          (<CompQuizScreen id={id} QuestionList={QuestionList} quizDetails={quizDetails} />) :
          (<JoinCompScreen id={id} QuestionList={QuestionList} setIsQuizStarted={setIsQuizStarted} />)}
      </div>
    </>
  )
}

export default AttemptComprehensive