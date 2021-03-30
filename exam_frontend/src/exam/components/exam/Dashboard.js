import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import {
  startExam,
  markOption,
  getStudentExams,
} from "../../../redux/actions/studentActions";
import Header from "./Header";

export function getQuestionById(questions, question_id) {
  return questions.find((question) => question.question_id === question_id);
}

export function Dashboard({ student_exams, exam_questions, ...props }) {
  const [question, setQuestion] = useState({ ...props.question });
  function handleQuestionClick(question_id) {
    let get_question = getQuestionById(exam_questions, question_id);
    setQuestion(get_question);
  }
  function handleOptionClick(option) {
    let sender = {};
    sender.picked_answer = option;
    sender.id = question.id;
    // console.log(sender);
    props.markOption(sender);

    let index = exam_questions.findIndex(
      (x) => x.question_id === question.question_id
    );
    let questionChanger = {
      exam_id: exam_questions[index].exam_id,
      question: exam_questions[index].question,
      option_a: exam_questions[index].option_a,
      option_b: exam_questions[index].option_b,
      option_c: exam_questions[index].option_c,
      option_d: exam_questions[index].option_d,
      picked_answer: option,
      question_id: exam_questions[index].question_id,
      id: exam_questions[index].id,
    };

    setQuestion(questionChanger);
  }
  function checkTimer(timer) {
    console.log(timer);
  }
  function showResult() {
    let exam_id = Number(props.match.params.exam_id);
    props.history.push(`/exam/${exam_id}/result`);
  }
  function prevQuestion() {
    let index = exam_questions.findIndex((x) => x.id === question.id);
    if (index > 0) {
      setQuestion(exam_questions[--index]);
    }
  }
  function nextQuestion() {
    let index = exam_questions.findIndex((x) => x.id === question.id);
    if (index < exam_questions.length) {
      setQuestion(exam_questions[++index]);
    }
  }
  useEffect(() => {
    let exam_id = Number(props.match.params.exam_id);

    if (student_exams.length === 0) {
      props.getStudentExams();
    }

    if (exam_questions.length === 0) {
      props.startExam({ id: exam_id });
    }
    if (!question.question_id && exam_questions.length > 0) {
      setQuestion(exam_questions[0]);
    }
  }, [
    props,
    question.question_id,
    exam_questions,
    student_exams.length,
    exam_questions.length,
  ]);

  return (
    <>
      {props.exam && (
        <>
          <Header
            question={question}
            exam={props.exam}
            exam_questions={exam_questions}
            handleQuestionClick={handleQuestionClick}
            handleOptionClick={handleOptionClick}
            checkTimer={checkTimer}
            showResult={showResult}
            prevQuestion={prevQuestion}
            nextQuestion={nextQuestion}
          ></Header>
        </>
      )}
    </>
  );
}
const mapStateToProps = (state, ownProps) => {
  const exam_id = Number(ownProps.match.params.exam_id);
  const exam =
    exam_id && state.student_exams.length > 0
      ? getExamById(state.student_exams, exam_id)
      : "";
  return {
    exam,
    exam_questions: state.exam_questions,
    student_exams: state.student_exams,
  };
};
export function getExamById(exams, exam_id) {
  return exams.find((exam) => exam.id === exam_id);
}
const mapDispatchToProps = {
  startExam,
  markOption,
  getStudentExams,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
