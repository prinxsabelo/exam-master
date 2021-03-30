import * as types from "../actions/actionTypes";
const initState = {
  levels: [],
};
export default function levelReducer(state = initState.levels, action) {
  switch (action.type) {
    case types.GET_LEVELS_SUCCESS:
      console.log(action.levels);
      return action.levels;
    case types.DELETE_LEVEL_SUCCESS:
      return state.filter((level) => level.id !== action.level.id);
    case types.CREATE_LEVEL_SUCCESS:
      console.log(action.level);
      return [...state, { ...action.level }];
    case types.UPDATE_LEVEL_SUCCESS:
      return state.map((level) =>
        level.id === action.level.id ? action.level : level
      );
    default:
      return state;
  }
}
