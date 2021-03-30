import React from "react";
import { Button } from "@material-ui/core";

function ExamDetail({ exam, editExam, newQuestion }) {
  return (
    <>
      <div className="container-fluid">
        <div className="row shadow  ">
          <div className="col-md-8 ">
            <div className="p-1">
              <div className="row  ">
                <div className="col-md-2">Exam Title </div>
                <div className="col-md-10 initialism font-weight-bold">
                  {" "}
                  {exam.exam_title}
                </div>
              </div>
              <div className="row ">
                <div className="col-md-2">Course Detail </div>
                <div className="col-md-10 font-weight-bold  initialism">
                  {" "}
                  {exam.name} - {exam.code} - {exam.level}
                </div>
              </div>
              <div className="row">
                <div className="col-md-2">Instruction</div>
                <div className="col-md-10">{exam.instruction}</div>
              </div>
              <div className="row ">
                <div className="col-md-2">Countdown</div>
                <div className="col-md-10  initialism">
                  {exam.count_down / 60} Minutes..
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-1">
              <div className="row">
                <div className="col-md-5">Begin-Date</div>
                <div className="col-md-7">{exam.begin_date}</div>
              </div>
              <div className="row">
                <div className="col-md-5">End-Date</div>
                <div className="col-md-7">{exam.end_date}</div>
              </div>
              <div className="row initialism font-weight-bold">
                <div className="col-md-12">
                  {exam.questions_display} Visible Questions
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={(e) => editExam(exam)}
                  >
                    <span className="text-uppercase">Edit-Exam</span>
                  </Button>
                </div>
                <div className="col-md-7">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={newQuestion}
                  >
                    <span className="text-uppercase">add-Question</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ExamDetail;
