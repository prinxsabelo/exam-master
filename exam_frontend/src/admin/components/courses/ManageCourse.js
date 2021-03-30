import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { saveCourse, getCourses } from "../../../redux/actions/courseAction";
import CourseForm from "./CourseForm";
import { getLevels } from "../../../redux/actions/levelActions";
export function ManageCourse({
  courses,
  levels,
  getCourses,
  getLevels,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  useEffect(() => {
    if (courses.length === 0) {
      getCourses();
    } else {
      setCourse({ ...props.course });
    }
    if (levels.length === 0) {
      getLevels();
    }
  }, [props.course, getCourses, courses.length, getLevels, levels.length]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,

      [name]: value.toUpperCase(),
    }));
  }
  function handleSubmit(event) {
    event.preventDefault();

    console.log(course);
    if (course.level_id === "") {
      if (levels.length > 0) {
        course.level_id = levels[0].id;
      }
    } else if (course.level !== "") {
      if (levels.length > 0) {
        let level_index = levels.findIndex(
          (level) => level.level === course.level
        );
        if(!course.level_id){
          course.level_id = levels[level_index].id;
        }
     
      }
    }
    console.log(course);
    props.saveCourse(course, props.history);
  }
  // console.log(courses);
  return (
    <CourseForm
      onChange={handleChange}
      course={course}
      courses={courses}
      levels={levels}
      onSubmit={handleSubmit}
    />
  );
}
ManageCourse.propTypes = {
  courses: PropTypes.array.isRequired,

  course: PropTypes.object.isRequired,
  getCourses: PropTypes.func.isRequired,
  getLevels: PropTypes.func.isRequired,
};
export function getCourseById(courses, course_id) {
  return courses.find((course) => course.id === course_id);
}
const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  const newCourse = { id: "", name: "", code: "", level_id: "" };
  const course_id = Number(ownProps.match.params.course_id);
  const course =
    course_id && state.courses.length > 0
      ? getCourseById(state.courses, course_id)
      : newCourse;
  return {
    course,
    courses: state.courses,
    levels: state.levels,
  };
};
const mapDispatchToProps = {
  saveCourse,
  getCourses,
  getLevels,
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageCourse);
