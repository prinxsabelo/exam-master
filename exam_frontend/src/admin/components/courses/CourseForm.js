import React from "react";
import { TextField, Button } from "@material-ui/core";

const CourseForm = ({ course, levels, onChange, onSubmit }) => {
  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="card p-2 shadow">
              <div className="card-title text-center h5">
                {course.id ? "EDIT" : "ADD"} COURSE
              </div>
              <div className="card-body">
                <TextField
                  name="name"
                  label="Course Name"
                  value={course.name}
                  onChange={onChange}
                  style={{ width: "100%", marginBottom: "10px" }}
                />

                <TextField
                  name="code"
                  label="Course Code"
                  value={course.code}
                  onChange={onChange}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
                <select
                  style={{ width: "100%", marginBottom: "10px" }}
                  value={course.level_id}
                  onChange={onChange}
                  className="form-control"
                  name="level_id"
                >
                  {levels.map((level) => {
                    return (
                      <option value={level.id} key={level.id}>
                        {level.level}
                      </option>
                    );
                  })}
                </select>
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
export default CourseForm;
