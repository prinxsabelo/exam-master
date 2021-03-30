import React from "react";
import { TextField, Button } from "@material-ui/core";
const StudentForm = ({
  student,
  levels,
  handleTextChange,
  handleSubmit,
  initForm,
}) => {
  return (
    <form className=" shadow p-2" autoComplete="off" onSubmit={handleSubmit}>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-6">
                <TextField
                  id="lastname"
                  label="Lastname Here.."
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={student.lastname}
                  className="initialism"
                  onChange={handleTextChange}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id="firstname"
                  label="Firstname Here.."
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={student.firstname}
                  onChange={handleTextChange}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-5">
                <TextField
                  id="email"
                  label="Email Here.."
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={student.email}
                  onChange={handleTextChange}
                />
              </div>
              <div className="col-md-4">
                <select
                  style={{ width: "100%" }}
                  value={student.level_id}
                  onChange={handleTextChange}
                  name="level_id"
                  id="level_id"
                  className="form-control h-100"
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
              <div className="col-md-3">

                <TextField
                  id="matric_no"
                  label="Matric No"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={student.matric_no}
                  onChange={handleTextChange}
                />
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-md-12">
                <Button variant="contained" color="primary" type="submit">
                  {student.id ? "Update Student" : "Create Student"}
                </Button>
                {student.id && (
                  <Button
                    variant="contained"
                    color="primary"
                    className="ml-4"
                    onClick={initForm}
                  >
                    Register new Student{" "}
                  </Button>
                )}
              </div>
            </div>
          </div>
          {/* <div className="col-md-2">
            <div>

              <img src="..." className="img-thumbnail" alt="work here.." />
            </div>
            <div>
              <button> Save</button>
            </div>
          </div> */}
        </div>
      </div>
    </form>
  );
};
export default StudentForm;
