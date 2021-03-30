import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getStudentExams } from "../../redux/actions/studentActions";
import StudentExamList from "./StudentExamList";

export function StudentExams({ student_exams, getStudentExams, ...props }) {
  useEffect(() => {
    if (student_exams.length === 0) {
      getStudentExams();
    }
  });
  function handleExamClick(exam) {
    // alert(exam.id);
    props.history.push(`/exam/${exam.id}`);
  }
  return (
    <StudentExamList exams={student_exams} handleExamClick={handleExamClick} />
  );
}

const mapStateToProps = (state, ownProps) => {
  return { student_exams: state.student_exams };
};
const mapDispatchToProps = {
  getStudentExams,
};
export default connect(mapStateToProps, mapDispatchToProps)(StudentExams);
