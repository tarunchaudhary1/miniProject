import React from 'react'
import { Button } from 'react-bootstrap'
import "../Comprehensive/CompQuiz/Comprehensive.css"
import { useState ,useEffect} from 'react'
import axios from 'axios'

const User = (props) => {

  const [delUser, setDelUser] = useState("");
  const [error, setError] = useState(null);
  
  return (
    <>
    {props.length === 0 ? <h3>Quiz is empty</h3>: <div className='questionBox'>
       {error && <div className="error_msgs">{error}</div>} <br />
      {/* <div className='rightButton'><Button variant='danger' onClick={()=>{
        handleDeleteQuestion(props.ques)
      }}>Delete</Button></div><br></br> */}
    <div>
    <h5>{props.index+1}. {props.user.firstName}</h5>
    <br></br>
    <h5>{props.user.lastName}</h5>
    <br></br>
    <h5>{props.user.email}</h5>
    {/* <div className='answerBox'>Ans. {props.ques.answer}</div> */}
    </div>
    </div>}
    </>
  )
}

export default User