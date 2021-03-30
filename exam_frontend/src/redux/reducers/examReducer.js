import * as types from "../actions/actionTypes";
const initState = {
  exams: [],
};
export default function examReducer(state = initState.exams, action) {
  switch (action.type) {
    case types.GET_EXAMS_SUCCESS:
      console.log(action.exams);
      return action.exams;
    case types.DELETE_EXAM_SUCCESS:
      return state.filter((exam) => exam.id !== action.exam.id);
    case types.CREATE_EXAM_SUCCESS:
      console.log(action.exam);
      return [...state, { ...action.exam }];
    case types.UPDATE_EXAM_SUCCESS:
      return state.map((exam) =>
        exam.id === action.exam.id ? action.exam : exam
      );

    default:
      return state;
  }
}
