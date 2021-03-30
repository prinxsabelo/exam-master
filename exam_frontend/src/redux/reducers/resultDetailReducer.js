import * as types from "../actions/actionTypes";
const initState = {
  result_details: [],
};
export default function resultDetailReducer(
  state = initState.result_details,
  action
) {
  switch (action.type) {
    case types.RESULT_DETAILS_SUCCESS:
      state = [];
      state = [...action.result_details];
      return state;
    default:
      return state;
  }
}
