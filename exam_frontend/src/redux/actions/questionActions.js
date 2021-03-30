import * as types from "./actionTypes";
import {
  GetQuestionsService,
  SaveQuestionService,
  DeleteQuestionSerice,
} from "../services/questionService";
export function getQuestionSuccess(questions) {
  return { type: types.GET_QUESTIONS_SUCCESS, questions };
}
export function createQuestionSuccess(question) {
  return { type: types.CREATE_QUESTION_SUCCESS, question };
}
export function updateQuestionSuccess(question) {
  return { type: types.UPDATE_QUESTION_SUCCESS, question };
}
export function deleteQuestionSuccess(question) {
  return { type: types.DELETE_QUESTION_SUCCESS, question };
}
export function getQuestions(question) {
  return function (dispatch) {
    GetQuestionsService(question).then((res) => {
      if (res.message) {
        dispatch(getQuestionSuccess(res.message));
      }
    });
  };
}
export const saveQuestion = (question, history) => {
  return (dispatch) => {
    SaveQuestionService(question).then((res) => {
      if (res.success === true) {
        question.id
          ? dispatch(updateQuestionSuccess(res.message))
          : dispatch(createQuestionSuccess(res.message));
        // setTimeout(() => {
        // history.push("/admin/main/questions");
        // }, 2000);
        console.log(res.message);
      }
    });
  };
};

export const deleteQuestion = (question) => {
  return (dispatch) => {
    DeleteQuestionSerice(question.id)
      .then((data) => {
        dispatch(deleteQuestionSuccess(question));
      })
      .catch((err) => {
        throw err;
      });
  };
};
