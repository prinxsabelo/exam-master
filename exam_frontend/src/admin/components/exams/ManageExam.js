import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { saveExam, getExams } from "../../../redux/actions/examActions";
import ExamForm from "./ExamForm";
import { getCourses } from "../../../redux/actions/courseAction";
export function ManageExam({ exams, courses, getExams, getCourses, ...props }) {
  const [exam, setExam] = useState({ ...props.exam });
  useEffect(() => {
    console.log(exams);
    if (exams.length === 0) {
      getExams();
    } else {
      setExam({ ...props.exam });
    }
    if (courses.length === 0) {
      getCourses();
    }
  }, [props.exam, exams.length, courses.length, getCourses, getExams, exams]);
  function handleChange(event) {
    const { name, value } = event.target;

    if ((event.target.name === "instruction") || (name === "count_down") ||
      (name === "begin_date") || (name === "end_date")) {
      setExam((prevExam) => ({
        ...prevExam,
        
        [name]: value,
      }));
    } else {
      setExam((prevExam) => ({
        ...prevExam,

        [name]: value.toUpperCase(),
      }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (exam.course_id === "") {
      if (courses.length > 0) {
        exam.course_id = courses[0].id;
      }
    }
    console.log(exam);
    if (!exam.questions_display) {
      exam.questions_display = 0;
    }
    if(exam.count_down == ""){
      exam.count_down = 600;
    }
    props.saveExam(exam, props.history);
  }
  return (
    <ExamForm
      onChange={handleChange}
      onSubmit={handleSubmit}
      exam={exam}
      exams={exams}
      courses={courses}
    />
  );
}
ManageExam.propTypes = {
  exams: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
};
export function getExamById(exams, exam_id) {
  return exams.find((exam) => exam.id === exam_id);
}
const mapStateToProps = (state, ownProps) => {
  const newExam = {
    id: "",
    exam_title: "",
    course_id: "",
    instruction: "",
    count_down: "",
    questions_display: "",
    begin_date: "",
    end_date: "",
  };
  const exam_id = Number(ownProps.match.params.exam_id);
  const exam =
    exam_id && state.exams.length > 0
      ? getExamById(state.exams, exam_id)
      : newExam;
  return {
    exams: state.exams,
    courses: state.courses,
    exam,
  };
};
const mapDispatchToProps = {
  saveExam,
  getExams,
  getCourses,
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageExam);
