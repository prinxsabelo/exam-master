import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import ExamDetail from "./ExamDetail";
import QuestionList from "./QuestionList";
import AdminHeader from "../../../layouts/AdminHeader";
import {
  getQuestions,
  saveQuestion,
  deleteQuestion,
} from "../../../../redux/actions/questionActions";
import QuestionForm from "./QuestionForm";
import { getExams } from "../../../../redux/actions/examActions";
const drawerWidth = 320;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
    justifyContent: "center",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),

    width: "100%",
  },
}));

export function ExamDashboard({
  getExams,
  getQuestions,
  deleteQuestion,
  saveQuestion,
  ...props
}) {
  const [exam, setExam] = useState({ ...props.exam });
  const [errors, setErrors] = useState({});
  // console.log(props.question.correct_option);
  const [value] = React.useState(props.question.correct_option);
  const [question, setQuestion] = useState({ ...props.question });
  useEffect(() => {
    // props.questions = [];
    let exam = { exam_id: props.exam_id };
    if (props.questions.length === 0) {
      getQuestions(exam);
      // console.log("xxx");
    }
    if (props.exams.length === 0) {
      getExams();
    } else {
      setExam({ ...props.exam });
    }
  }, [
    getExams,
    getQuestions,
    props.exam,
    props.exams.length,
    props.exam_id,
    props.questions.length,
    props.questions,
  ]);
  function handleQuestionClick(question_id) {
    let question = getQuestionById(props.questions, question_id);
    setQuestion(question);
  }
  function newQuestion() {
    let question = {
      question: "",
      option_a: "",
      option_b: "",
      option_c: "",
      option_d: "",
      correct_option: "",
    };
    setQuestion(question);
  }
  function handleTextChange(event) {
    const { id, value } = event.target;
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      [id]: value,
    }));
    // console.log(question.question);
  }
  function handleOptionChange(event) {
    // console.log(event.target);

    let questionChanger;
    if (question.id) {
      questionChanger = {
        id: question.id,
        question: question.question,
        option_a: question.option_a,
        option_b: question.option_b,
        option_c: question.option_c,
        option_d: question.option_d,
        correct_option: event.target.value,
        exam_id: props.exam_id,
      };
    } else {
      questionChanger = {
        question: question.question,
        option_a: question.option_a,
        option_b: question.option_b,
        option_c: question.option_c,
        option_d: question.option_d,
        correct_option: event.target.value,
        exam_id: props.exam_id,
      };
    }

    setQuestion(questionChanger);
    if (!formIsValid()) return;
    saveQuestion(questionChanger);
  }
  function handleSubmit(event) {

    event.preventDefault();
    if (!question.exam_id) {
      question.exam_id = props.id;
    }
    // alert(question.exam_id);
    if (!formIsValid()) return;


    console.log(question);
    saveQuestion(question);
    initQuestion();
  }
  function handleDelete(question) {
    deleteQuestion(question);
    initQuestion();
  }
  function formIsValid() {
    const { option_a, option_b, option_c, option_d, correct_option } = question;
    const errors = {};

    if (!option_a) errors.option_a = "Option A is required.";
    if (!option_b) errors.option_b = "Option B is required.";
    if (!option_c) errors.option_c = "Option C is required.";
    if (!option_d) errors.option_d = "Option D is required.";
    if (!correct_option) errors.correct_option = "Correct Option is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }
  function editExam(exam) {
    props.history.push(`/admin/main/exam/${exam.id}/reload`);
  }
  function initQuestion() {
    setQuestion({
      question: "",
      option_a: "",
      option_b: "",
      option_c: "",
      option_d: "",
      correct_option: "",
    });
  }
  const classes = useStyles();
  const { questions } = props;
  // console.log(exam.exam_title);
  return (
    <div className={classes.root}>
      <AdminHeader />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />

        <div className={classes.drawerContainer}>
          <QuestionList
            questions={questions}
            onClick={handleQuestionClick}
            question={question}
          />
        </div>
      </Drawer>
      <main className={classes.content}>
        <ExamDetail exam={exam} newQuestion={newQuestion} editExam={editExam} />
        <QuestionForm
          question={question}
          handleTextChange={handleTextChange}
          handleOptionChange={handleOptionChange}
          value={value}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          controlQuestion={questions.length}
          errors={errors}
        />
      </main>
    </div>
  );
}
export function getQuestionById(questions, question_id) {
  return questions.find((question) => question.id === question_id);
}
export function getExamById(exams, exam_id) {
  return exams.find((exam) => exam.id === exam_id);
}
const mapStateToProps = (state, ownProps) => {
  const exam_id = Number(ownProps.match.params.exam_id);

  const exam =
    exam_id && state.exams.length > 0
      ? getExamById(state.exams, exam_id)
      : {
        exam_title: "",
        name: "",
        code: "",
        level: "",
        count_down: "",
        questions_display: "",
      };
  const question = {
    question: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_option: "",
  };
  return {
    exam_id,
    questions: state.questions,
    exams: state.exams,
    exam,
    question,
  };
};
const mapDispatchToProps = {
  getQuestions,
  getExams,
  saveQuestion,
  deleteQuestion,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamDashboard);
