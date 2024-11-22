import React from 'react'
import "../Questions/InnerLayout.css"

const EvaluateIndividualQuestion = (props) => {
  return (
    <>
      <div className="question-container-with-marks-comp">
        <div>
          <h5>
            {props.i + 1}. {props.questionList[props.i]}
          </h5>
          
          {!props.answerDetails[props.keyName] ? 
            <div className="form-control m-3 p-3" type="text" readOnly>
              <i>Not Answered</i>
            </div> : 
            <div className="form-control m-3 p-3" type="text" readOnly>
              {props.answerDetails[props.keyName]}
            </div>
          }
            
          <div className="float-left marks-input-box-left">
            <label className="sr-only" htmlFor="inlineFormInputName2">
              Prev. Marks
            </label>
            <div>
              <input
                value={props.marks && props.marks.hasOwnProperty(`${props.keyName}`) ? props.marks[props.keyName] : "None"}
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
                type="text"
                className="form-control mb-2 mr-sm-2"
                id="inlineFormInputName2"
                placeholder={"Out of " + props.correctScore}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EvaluateIndividualQuestion;