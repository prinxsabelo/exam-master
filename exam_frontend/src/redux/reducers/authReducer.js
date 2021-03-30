import * as types from "../actions/actionTypes";
const init = {
  authResponse: "",
};
const AdminAuthReducer = (state = init, action) => {
  switch (action.type) {
    case types.ADMIN_LOGIN_SUCCESS:
      console.log(action);
      return {
        ...state,
        authResponse: "Admin Login successful..",
      };
    case types.ADMIN_LOGIN_ERROR:
      console.log(action);
      return {
        ...state,
        authResponse: action.payload,
      };
    default:
      return state;
  }
};
export default AdminAuthReducer;
