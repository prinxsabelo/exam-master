import React, { useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { useLocation } from "react-router";
const ExamForm = ({ exams, courses, exam, onChange, onSubmit }) => {
  const location = useLocation();

  // alert(id);
  useEffect(() => {

    if (location.pathname.search("/reload") !== -1) {
      window.location.href = `/admin/main/exam/${exam.id}`;
      // history.push(`/admin/main/exam/${exam.id}`);
    }


  }, [exam.id, location.pathname])
  let arr = [];
  for (let count = 1; count <= exam.questions_count; count++) {
    arr.push(count);
  }
  const timer_arr = [
    { value: 600, label: "10 Minutes" },
    { value: 900, label: "15 Minutes" },
    { value: 1200, label: "20 Minutes" },
    { value: 1800, label: "30 Minutes" },
    { value: 2700, label: "45 Minutes" },
    { value: 3600, label: "1 Hour" },
  ]
  console.log(exam);
  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="card p-2 shadow row ">
              <div className="card-title text-center h5">
                {exam.id ? "EDIT" : "ADD"} EXAM
              </div>
              <div className="card-body row">
                <TextField
                  name="exam_title"
                  label="Exam Title.."
                  value={exam.exam_title}
                  onChange={onChange}
                  className="col-md-12 mt-1 mb-1"
                />
                <select

                  className="col-md-12 mt-1 mb-1 form-control"
                  value={exam.course_id}
                  onChange={onChange}
                  name="course_id"
                >
                  <option disabled >Select Course</option>
                  {courses.map((course) => {
                    return (
                      <option value={course.id} key={course.id}>
                        {course.name} - {course.level}
                      </option>
                    );
                  })}
                </select>
                <div className="form-group col-md-12">
                  <TextField
                    name="instruction"
                    label="Instruction.."
                    value={exam.instruction}
                    onChange={onChange}
                    className="form-control mt-1 mb-1"
                  />
                </div>


                <div className="form-group col-md-6">
                  <select
                    name="questions_display"
                    className=" mt-1 mb-1 form-control"
                    value={exam.questions_display}
                    onChange={onChange}>
                    <option value={0} disabled >No of Questions to Display</option>

                    {arr.map((count) => {
                      return (
                        <option value={count} key={count}>
                          {count} {count > 1 ? 'Questions' : 'Question'}
                        </option>
                      );
                    })}
                  </select>

                </div>


                <div className="form-group col-md-6">
                  <select
                    value={exam.count_down}
                    name="count_down"
                    className="mt-1 mb-1 form-control"
                    onChange={onChange}
                  >
                    <option value={0} disabled >Countdown Timer</option>
                    {timer_arr.map((timer) => {
                      return (
                        <option value={timer.value} key={timer.value}>
                          {timer.label}
                        </option>
                      );
                    })}

                  </select>

                </div>
                <div className="form-group col-md-6">
                  <input placeholder="Begin Date" type="date" name="begin_date" value={exam.begin_date} onChange={onChange} />
                  <label className="pl-2"> Begin Date</label>
                </div>
                <div className="form-group col-md-6">
                  <input placeholder="End Date" type="date" name="end_date" value={exam.end_date} onChange={onChange} />
                  <label className="pl-2"> End Date</label>
                </div>

                {/* <TextField
                  name="begin_date"
                  label="Begin Time.."
                  value={exam.begin_date}
                  onChange={onChange}
                  className="col-md-5 mt-1 mb-1"
                /> */}
                <div className="col-md-2"></div>
                {/* <TextField
                  name="end_date"
                  label="End Time.."
                  value={exam.end_date}
                  onChange={onChange}
                  className="col-md-5 mt-1 mb-1"
                /> */}
              </div>
              <div className="card-footer">
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ExamForm;
