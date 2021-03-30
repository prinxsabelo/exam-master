import * as types from "../actions/actionTypes";
const initState = {
  exam_details: [],
};
export default function examDetailReducer(
  state = initState.exam_details,
  action
) {
  switch (action.type) {
    case types.EXAM_DETAILS_SUCCESS:
      console.log(action.exam_details);
      return action.exam_details;

    default:
      return state;
  }
}
