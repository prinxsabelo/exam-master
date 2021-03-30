import * as types from "../actions/actionTypes";
const initState = {
  exam_questions: [],
};
export default function examQuestionReducer(
  state = initState.exam_questions,
  action
) {
  switch (action.type) {
    case types.START_EXAM_SUCCESS:
      // console.log(action.exam_questions);
      return action.exam_questions;

    case types.MARK_OPTION_SUCCESS:
      // console.log(
      //   state.map((question) =>
      //     question.id === action.question.id ? action.question : question
      //   )
      // );
      return state.map((question) =>
        question.id === action.question.id ? action.question : question
      );

    default:
      return state;
  }
}
