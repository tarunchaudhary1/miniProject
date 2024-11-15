import React from 'react'
import { Button } from 'react-bootstrap'
import "./Comprehensive.css"
import { useState ,useEffect} from 'react'
import axios from 'axios'

const Comprehensive = (props) => {

  const [delQues, setDelQues] = useState("");
  const [error, setError] = useState(null);

  const handleDeleteQuestion = async (item) => {
    
    

    if(props.length >= 2 )
    {
      if(item){
        try {
          const url = `http://backend.healthynomad:8080/api/compQuizzes/${props.quizId}`;
          const Credentials = {
            delcompQs: item,
          };
          const { data: res } = await axios.patch(url, Credentials);
    
          if (res.status === "SUCCESS") {
            console.log("Question Removed");
            alert(res.message);
            setError(null)
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
    }}
    else{
      setError("Quiz cannot be empty")
    }
  };


  
  return (
    <>
    {props.length === 0 ? <h3>Quiz is empty</h3>: <div className='questionBox'>
       {error && <div className="error_msgs">{error}</div>} <br />
      <div className='rightButton'><Button variant='danger' onClick={()=>{
        handleDeleteQuestion(props.ques)
      }}>Delete</Button></div><br></br>
    <div >
    <h5>{props.index+1}. {props.ques.question}</h5>
    <br></br>
    <div className='answerBox'>Ans. {props.ques.answer}</div>
    </div>
    </div>}
    </>
  )
}

export default Comprehensive