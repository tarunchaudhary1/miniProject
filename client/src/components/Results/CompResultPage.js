import {React,useEffect,useState} from 'react'
import Sidebar from '../SideBarNav/SideBar'
import "../Questions/InnerLayout.css"
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'

const CompResult = (props) => {

  const [error, setError] = useState();
  const username = props.username;
  const userid = props.userid;
  const quizName = props.quizName;
  const quizid = props.quizid;
  let questionList =  [];
  props.QuestionList.map((item)=>{
    questionList.push(item.question)
  })
	const attemptedAnswer = props.answerDetails;
  const totalMarks = props.totalMarks;
  const obtainedMarks = {};
  const percentage = 0;
  const remainingAttempts = props.remainingAttempts;
  

  const handleSubmit = async (e) => {
    console.log(questionList)
    console.log("inside handleSubmit")
    // e.preventDefault();
    try {
      const url = "http://backend.healthynomad:8080/api/compResults";
      const Credentials = {
        username,
        userid,
        quizName,
        quizid,
        questionList,
        attemptedAnswer,
        totalMarks,
        obtainedMarks,
        percentage,
        remainingAttempts
      };

      console.log(Credentials)

      const { data: res } = await axios.post(url, Credentials);
      console.log(res)

      if (res.status === "SUCCESS") {
        console.log("Result Added")
        setError(null);

      }
    } catch (error) {
      console.log(error.response)
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    handleSubmit();

  }, []);
  
  return (
  <>
  <div>
    <Button  className='m-3 btn-primary'><Link to={`/quiz/attempt_quiz`} className="text-white text-decoration-none">Exit</Link></Button>
  <h3 className='header-top'>Answer Details</h3>
  <div>

  {props.answerDetails && Object.keys(props.answerDetails).map((keyName, i) => {
    const question = props.QuestionList[i].question;
    return (<div  className='question-container' key={Math.random()}>
        <h5>{i+1}. {question} </h5>
        <p className='p-style'> Answer : {props.answerDetails[keyName]}</p>
    </div>)
})}
  </div>
  </div>
  </>
  )
}

export default CompResult