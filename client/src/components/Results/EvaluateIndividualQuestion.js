import React, { useState,useEffect } from 'react'
import "../Questions/InnerLayout.css"

const EvaluateIndividualQuestion = (props) => {
  const marks = props.marks;
  const [error, setError] = useState();
  // const [inputMarks, setInputMarks] = useState();
  useEffect(() => {
    // setInputMarks("");
  }, [props.i]);
  return (
    <>
      <div className="question-container-with-marks-comp">
        <div>
          <h5>
            {props.i + 1}. {props.questionList[props.i]}
          </h5>
          
          {!props.answerDetails[props.keyName]?<div className="form-control m-3 p-3" type="text" readOnly>
            <i>Not Answered</i>
          </div> : <div className="form-control m-3 p-3" type="text" readOnly>
            {props.answerDetails[props.keyName]}
          </div>}
            
          {/* <div className="form-control m-3 p-3" type="text" readOnly>
            {props.answerDetails[props.keyName]}
          </div> */}
          <div className="float-left marks-input-box-left">
            <label className="sr-only" htmlFor="inlineFormInputName2">
              Prev. Marks
            </label>
            <div>
            <input
                value={marks && marks.hasOwnProperty(`${props.keyName}`) ? marks[props.keyName]:"None"}
                type="text"
                className="form-control mb-2 mr-sm-2"
                id="inlineFormInputName2"
                readOnly
              />
            </div>
          </div>
          <div className="float-right marks-input-box-right">
            <label className="sr-only" htmlFor="inlineFormInputName2">
              Assign Marks
            </label>
            <div>
              <input
                // value={marks && marks.hasOwnProperty(`${props.keyName}`) ? marks[props.keyName]:undefined}
                type="text"
                className="form-control mb-2 mr-sm-2"
                id="inlineFormInputName2"
                placeholder={"Out of " + props.correctScore}
                onChange={(e) => {
                  // setInputMarks(e.target.value);
                  // console.log(inputMarks);
                  console.log("correct", props.correctScore);
                  console.log("input", e.target.value);
                  if (e.target.value <= props.correctScore) {
                    setError(null);
                    props.setEvaluationDetails((obj) => {
                      obj[`${props.keyName}`] = `${e.target.value}`;
                      props.setEvaluationDetails(obj);
                    });
                  } else {
                    setError(
                      "Obtained score cannot be greater than correct score"
                    );
                  }
                }}

                // MODIFT FROM HERE, ADD FUNCTIONAL COMPONENT TO HANDLE ONCHANGE, AND TRY TO SET EVALUATIONDETAILS FROM INSIDE THAT. IF ONCHANGE HAPPENS THEN SET THE EVALUATIONDETAILS, ELSE SET MARKS DATA TO EVALUATIONDETAILS
              />
            </div>

            {/* <input
            value= {props.correctScore}
              type="text"
              className="form-control mb-2 mr-sm-2"
              id="inlineFormInputName2"
              placeholder=""
              
            /> */}
          </div>
        </div>
        <div>
        </div>
      </div>
      {error && <div className="error_msgs">{error}</div>} <br />
    </>
  );
};

export default EvaluateIndividualQuestion;