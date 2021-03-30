import React from "react";
import { Button } from "@material-ui/core";
const Introducton = ({ intro, startExam, exam_questions }) => {
  console.log(exam_questions);
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-7">
          <div className="card-block shadow p-2 m-2 text-center">
            <div className="p-1 h5 text-uppercase">
              <div>{intro.exam_title}</div>
            </div>
            <div className="p-1 initialism">
              <div>{intro.instruction}</div>
            </div>
            <div className="p-3">
              <Button
                onClick={(e) => startExam(intro.id)}
                variant="contained"
                color="primary"
              >
                Start
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Introducton;
