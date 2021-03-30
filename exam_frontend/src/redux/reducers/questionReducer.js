import * as types from "../actions/actionTypes";
const initState = {
  questions: [],
};
export default function QuestionReducer(state = initState.questions, action) {
  switch (action.type) {
    case types.GET_QUESTIONS_SUCCESS:
      return action.questions;
    case types.CREATE_QUESTION_SUCCESS:
      return [...state, { ...action.question }];
    case types.UPDATE_QUESTION_SUCCESS:
      return state.map((question) =>
        question.id === action.question.id ? action.question : question
      );
    case types.DELETE_QUESTION_SUCCESS:
      return state.filter((question) => question.id !== action.question.id);
    default:
      return state;
  }
}
