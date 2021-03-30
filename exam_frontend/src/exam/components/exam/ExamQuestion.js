import React from "react";
import { Toolbar } from "@material-ui/core";
const ExamQuestion = ({ question, handleOptionClick }) => {
  // console.log(question);

  return (
    <>
      {question && (
        <>
          <Toolbar />
          <div className="container-fluid shadow-lg p-2">
            <div className="row">
              <div className="col-md-12">
                <div className="card-block shadow m-3 p-5">
                  {question.question}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                {question.option_a === question.picked_answer && (
                  <div
                    className="card-block shadow m-3 p-3 pl-5  option-pick"
                    onClick={(e) => handleOptionClick(question.option_a)}
                  >
                    {question.option_a}
                  </div>
                )}
                {question.option_a !== question.picked_answer && (
                  <div
                    className="card-block shadow m-3 p-3 pl-5  option"
                    onClick={(e) => handleOptionClick(question.option_a)}
                  >
                    {question.option_a}
                  </div>
                )}
              </div>

              <div className="col-md-12">
                {question.option_b === question.picked_answer && (
                  <div
                    className="card-block shadow m-3 p-3 pl-5  option-pick"
                    onClick={(e) => handleOptionClick(question.option_b)}
                  >
                    {question.option_b}
                  </div>
                )}
                {question.option_b !== question.picked_answer && (
                  <div
                    className="card-block shadow m-3 p-3 pl-5  option"
                    onClick={(e) => handleOptionClick(question.option_b)}
                  >
                    {question.option_b}
                  </div>
                )}
              </div>

              <div className="col-md-12">
                {question.option_c === question.picked_answer && (
                  <div
                    className="card-block shadow m-3 p-3 pl-5  option-pick"
                    onClick={(e) => handleOptionClick(question.option_c)}
                  >
                    {question.option_c}
                  </div>
                )}
                {question.option_c !== question.picked_answer && (
                  <div
                    className="card-block shadow m-3 p-3 pl-5  option"
                    onClick={(e) => handleOptionClick(question.option_c)}
                  >
                    {question.option_c}
                  </div>
                )}
              </div>

              <div className="col-md-12">
                {question.option_d === question.picked_answer && (
                  <div
                    className="card-block shadow m-3 p-3 pl-5  option-pick"
                    onClick={(e) => handleOptionClick(question.option_d)}
                  >
                    {question.option_d}
                  </div>
                )}
                {question.option_d !== question.picked_answer && (
                  <div
                    className="card-block shadow m-3 p-3 pl-5  option"
                    onClick={(e) => handleOptionClick(question.option_d)}
                  >
                    {question.option_d}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ExamQuestion;
