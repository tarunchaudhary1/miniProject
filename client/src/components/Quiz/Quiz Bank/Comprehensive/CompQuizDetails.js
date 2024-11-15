import React from 'react';
import { useState,useEffect } from 'react';
import Sidebar from '../../../SideBarNav/SideBar'
import axios from 'axios';
import Comprehensive from "./CompQuiz/Comprehensive"
import { Button } from 'react-bootstrap';
import "../../../Questions/InnerLayout.css"
import { Link, useParams } from 'react-router-dom';
import { useTheme } from "../../../../Context";

const CompQuizDetails = (props) => {
  const [Data, setData] = useState({});
  const [QArray,setQArray] = useState([]);

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
          setData(data);
          setQArray(data.compQs)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const theme = Boolean(useTheme());
	const themeClassName = theme ? "tableContainer_dark":"tableContainer";
    
  const backCol = theme ? "#444444" : "#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;
  
  useEffect(() => {
    
    GetCompQuizData();

   
    return () => {
      
    };
   
  }, [QArray]);
  return (
    <>
   
   
   <Sidebar/>
   <div className={themeClassName}>
   <Button variant='success'><Link to={"/quiz/comp_quiz_list"} className="text-white">Back to Quiz List</Link></Button>
  
  <div className='mx-3'><h5 className='header-top'>{Data.name}</h5></div>
 
  <div>
  {QArray.length !== 0 && 
  <div>
   { QArray.map((ques,index)=>{
    return <Comprehensive ques={ques} key={ques._id} index={index} quizId={id} length={QArray.length}/>
  })}
  </div>}
  </div>
   </div>
    </>
  )
}

export default CompQuizDetails