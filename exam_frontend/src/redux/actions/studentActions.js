import {
  getStudentsService,
  SaveStudentService,
  getStudentExamsService,
  StartExamService,
  MarkOptionService,
  saveTimerService,
  resultDetailService,
} from "../services/studentService";

import * as types from "./actionTypes";
export function getStudentSuccess(students) {
  return { type: types.GET_STUDENT_SUCCESS, students };
}
export function deleteStudentSuccess(student) {
  return { type: types.DELETE_STUDENT_SUCCESS, student };
}
export function createStudentSuccess(student) {
  return { type: types.CREATE_STUDENT_SUCCESS, student };
}
export function updateStudentSuccess(student) {
  return { type: types.UPDATE_STUDENT_SUCCESS, student };
}
export function getStudentResults(results) {
  return { type: types.GET_STUDENT_RESULTS_SUCCESS, results };
}
export function getStudentExamSuccess(student_exams) {
  return { type: types.GET_STUDENT_EXAMS_SUCCESS, student_exams };
}
export function startExamSuccess(exam_questions) {
  return { type: types.START_EXAM_SUCCESS, exam_questions };
}
export function markOptionSuccess(question) {
  return { type: types.MARK_OPTION_SUCCESS, question };
}
export function examDetailSuccess(exam_details) {
  return { type: types.EXAM_DETAILS_SUCCESS, exam_details };
}
export function resultDetailSuccess(result_details) {
  return { type: types.RESULT_DETAILS_SUCCESS, result_details };
}

export function getStudents() {
  return function (dispatch) {
    getStudentsService()
      .then((student) => {
        console.log(student);
        if (student.message.length > 0) {
          dispatch(getStudentSuccess(student.message));
        }
      })
      .catch((err) => {
        throw err;
      });
  };
}

export const saveStudent = (student, history) => {
  return (dispatch) => {
    SaveStudentService(student).then((res) => {
      if (res.success === true) {
        student.id
          ? dispatch(updateStudentSuccess(res.message))
          : dispatch(createStudentSuccess(res.message));
        // setTimeout(() => {
        //   history.push("/admin/main/students");
        // }, 2000);

      }
      window.location.reload(false);
    });
  };
};

export const getStudentExams = () => {
  return (dispatch) => {
    getStudentExamsService()
      .then((exam) => {
        // console.log(exam);
        dispatch(getStudentExamSuccess(exam.message));
      })
      .catch((err) => {
        throw err;
      });
  };
};

export const resultDetail = (exam) => {
  return (dispatch) => {
    resultDetailService(exam).then((res) => {
      dispatch(resultDetailSuccess(res.message));
    });
  };
};

export const startExam = (exam) => {
  // alert('xxx');
  return (dispatch) => {
    StartExamService(exam).then((res) => {
      if(res && res.exam_questionsp){
        dispatch(startExamSuccess(res.exam_questions));
      }     else{
        alert('not regsterd')
      }
    });
  };
};
export const markOption = (question) => {
  return (dispatch) => {
    MarkOptionService(question).then((res) => {
      dispatch(markOptionSuccess(res.message));
    });
  };
};
export const saveTimer = (exam) => {
  console.log(exam);
  return (dispatch) => {
    saveTimerService(exam).then((res) => {
      console.log(res);
    });
  };
};
