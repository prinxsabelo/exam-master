import * as types from "../actions/actionTypes";
const initState = {
  student_exams: [],
};
export default function entExamReducer(
  state = initState.student_exams,
  action
) {
  switch (action.type) {
    case types.GET_STUDENT_EXAMS_SUCCESS:
      return action.student_exams;

    default:
      return state;
  }
}
