import * as types from "../actions/actionTypes";
const initState = {
  students: [],
  results: [],
};
export default function studentReducer(state = initState.students, action) {
  switch (action.type) {
    case types.GET_STUDENT_SUCCESS:
      return action.students;
    case types.CREATE_STUDENT_SUCCESS:
      return [...state, { ...action.student }];
    case types.UPDATE_STUDENT_SUCCESS:
      console.log(action.student);
      return state.map((student) =>
        student.id === action.student.id ? action.student : student
      );

    case types.GET_STUDENT_RESULTS_SUCCESS:
      return action.results;
    case types.DELETE_STUDENT_SUCCESS:
      return state.filter((student) => student.id !== action.student.id);

    default:
      return state;
  }
}
