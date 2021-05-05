
import React from "react";

import { Grid } from "@material-ui/core";
function StudentList({ students, student, onClick }) {
  const { id } = student;
  return (
    <Grid container>
      {students.length === 0 && (
        <div className="card-block shadow-lg p-3 m-3 initialism">
          No Student Found..
        </div>
      )}
      <div className="container-fluid ">
        {students.map((student,id) => (
          <div
            className="row"
            key={id}
            onClick={() => onClick(student.id)}
          >
            <div className="col-md-12">
              <div
                className="card-block shadow p-2 m-2 initialism"

                style={{
                  backgroundColor: id === student.id && '#3F51B5',
                  color: id === student.id ? '#fff' : '#000',
                  cursor: 'pointer',
                }}
              >
                {/* //Insert Passport here when ready.. */}
                <i>{student.level}</i> - {student.lastname} {student.firstname} - {student.matric_no}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Grid>
  );
}

export default StudentList;
// style={{ cursor: "pointer" }}