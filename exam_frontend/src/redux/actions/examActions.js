import * as types from "./actionTypes";
import {
  GetExamsService,
  SaveExamService,
  DeleteExamSerice,
} from "../services/examService";
export function getExamSuccess(exams) {
  return { type: types.GET_EXAMS_SUCCESS, exams };
}
export function createExamSuccess(exam) {
  return { type: types.CREATE_EXAM_SUCCESS, exam };
}
export function updateExamSuccess(exam) {
  return { type: types.UPDATE_EXAM_SUCCESS, exam };
}
export function deleteExamSuccess(exam) {
  return { type: types.DELETE_EXAM_SUCCESS, exam };
}
export function getExams() {
  return function (dispatch) {
    GetExamsService()
      .then((exam) => {
        if (exam.message.length > 0) {
          dispatch(getExamSuccess(exam.message));
        }
      })
      .catch((err) => {
        throw err;
      });
  };
}
export const saveExam = (exam, history) => {
  return (dispatch) => {
    SaveExamService(exam).then((res) => {
      if (res.success === true) {
        exam.id
          ? dispatch(updateExamSuccess(res.message))
          : dispatch(createExamSuccess(res.message));
        setTimeout(() => {
          history.push("/admin/main/exams");
        }, 2000);
      }
    });
  };
};
export const deleteExam = (exam) => {
  return (dispatch) => {
    DeleteExamSerice(exam.id)
      .then((data) => {
        dispatch(deleteExamSuccess(exam));
      })
      .catch((err) => {
        throw err;
      });
  };
};

