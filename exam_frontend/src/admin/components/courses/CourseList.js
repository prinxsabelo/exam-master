import React from "react";

import Button from "@material-ui/core/Button";

const CourseList = ({ courses, handleDelete, handleEdit }) => {
  return (
    <div>
      {courses.length > 0 && (
        <>
          {courses.map((course) => (
            <div className="row shadow p-2 m-2 h4" key={course.id}>
              <div className="col-md-6">
                {course.name} - {course.code}
              </div>
              <div className="col-md-2">{course.course}</div>
              <div className="col-md-4">
                <Button
                  variant="contained"
                  color="primary"
                  className="mr-2"
                  onClick={() => handleEdit(course)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(course)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </>
      )}
      {courses.length === 0 && (
        <div className="shadow p-3 m-3 initialism col-md-5">
          No courses Found.. Kindly create one..
        </div>
      )}
    </div>
  );
};
export default CourseList;
