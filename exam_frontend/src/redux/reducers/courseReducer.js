import * as types from "../actions/actionTypes";
const initState = {
  courses: [],
};
export default function courseReducer(state = initState.courses, action) {
  switch (action.type) {
    case types.GET_COURSES_SUCCESS:
      console.log(action.courses);
      return action.courses;
    case types.DELETE_COURSE_SUCCESS:
      return state.filter((course) => course.id !== action.course.id);
    case types.CREATE_COURSE_SUCCESS:
      console.log(action.course);
      return [...state, { ...action.course }];
    case types.UPDATE_COURSE_SUCCESS:
      return state.map((course) =>
        course.id === action.course.id ? action.course : course
      );
    default:
      return state;
  }
}
