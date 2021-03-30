import React from "react";
import { getCourses, deleteCourse } from "../../../redux/actions/courseAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  };
  componentDidMount() {
    const { courses } = this.props;
    if (courses.length === 0) {
      this.props.getCourses();
    }
  }
  handleDelete = async (course) => {
    this.props.deleteCourse(course);
  };
  handleEdit = (course) => {
    this.props.history.push(`/admin/main/course/${course.id}`);
  };
  render() {
    const { courses } = this.props;

    return (
      <>
        {this.state.redirectToAddCoursePage && (
          <Redirect to="/admin/main/course" />
        )}
        <div className="container shadow-lg p-2">
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.setState({ redirectToAddCoursePage: true })}
          >
            ADD COURSE
          </Button>
          <CourseList
            courses={courses}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
          />
        </div>
        ;
      </>
    );
  }
}
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  deleteCourse: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    courses: state.courses,
  };
};
const mapDispatchToProps = {
  getCourses,
  deleteCourse,
};
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
