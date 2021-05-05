import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getStudentExams } from "../../redux/actions/studentActions";
import Introducton from "./Introduction";

export function Overview({
  student_exams,
  getStudentExams,
  exam_questions,
  intro,
  ...props
}) {
  useEffect(() => {
    if (student_exams.length === 0) {
      getStudentExams();
    }
  });
  function startExam(exam_id) {
    // alert(exam_id)
    // console.log(props.match.path);
    props.history.push(`/exam/${exam_id}/questions`);
  }
  return (
    <div>
      {intro && (
        <>
          {}
          <Introducton
            intro={intro}
            startExam={startExam}
            exam_questions={exam_questions}
          />
        </>
      )}
    </div>
  );
}

export function getExamById(exams, exam_id) {
  return exams.find((exam) => exam.id === exam_id);
}
const mapStateToProps = (state, ownProps) => {
  const exam_id = Number(ownProps.match.params.exam_id);

  const intro =
    exam_id && state.student_exams.length > 0
      ? getExamById(state.student_exams, exam_id)
      : "";
  if (intro) {
    console.log(intro);
  }
  // console.log(state.exam_questions);
  return {
    student_exams: state.student_exams,
    exam_questions: state.exam_questions,
    intro,
  };
};
const mapDispatchToProps = {
  getStudentExams,
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
