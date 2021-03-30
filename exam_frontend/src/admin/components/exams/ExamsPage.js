import React from "react";
import { getExams, deleteExam } from "../../../redux/actions/examActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ExamList from "./ExamList";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";

class ExamsPage extends React.Component {
  state = {
    redirectToAddExamPage: false,
  };
  handleDelete = async (exam) => {
    this.props.deleteExam(exam);
  };
  handleEdit = (exam) => {
    this.props.history.push(`/admin/main/exam/${exam.id}`);
  };
  handleQuestions = (exam) => {
    this.props.history.push(`/admin/main/exam/${exam.id}/questions`);
  };
  componentDidMount() {
    const { exams } = this.props;
    if (exams.length === 0) {
      this.props.getExams();
    }

    if (window.location.pathname.search("/reload") !== -1) {
      window.location.href = `/admin/main/exams`;
      // history.push(`/admin/main/exam/${exam.id}`);
    }



  }

  render() {
    const { exams } = this.props;
    // console.log(exams);
    return (
      <>
        {this.state.redirectToAddExamPage && <Redirect to="/admin/main/exam" />}
        <div className="container shadow-lg p-2">
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.setState({ redirectToAddExamPage: true })}
          >
            ADD EXAM
          </Button>
          <ExamList
            exams={exams}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
            handleQuestions={this.handleQuestions}
          />
        </div>
      </>
    );
  }
}
ExamsPage.propTypes = {
  exams: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => {
  return {
    exams: state.exams,
  };
};

const mapDispatchToProps = {
  getExams,
  deleteExam,
};
export default connect(mapStateToProps, mapDispatchToProps)(ExamsPage);
