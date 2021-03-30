import React from "react";

import StudentForm from "./StudentForm";
import StudentResults from "./StudentResults";

function StudentDetail({
  student,
  levels,
  handleTextChange,
  handleSubmit,
  handleSelectChange,
  initForm,
  studentResultDetail,
  ...props
}) {
  // console.log(student);
  // console.log(levels);
  return (
    <>
      <StudentForm
        student={student}
        levels={levels}
        handleSelectChange={handleSelectChange}
        handleTextChange={handleTextChange}
        handleSubmit={handleSubmit}
        initForm={initForm}
      />
      <StudentResults
        studentResultDetail={studentResultDetail}
        results={student.results}
      />
    </>
  );
}
export default StudentDetail;
