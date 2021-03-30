import * as types from "./actionTypes";
import {
  GetLevelsService,
  DeleteLevelSerice,
  SaveLevelService,
} from "../services/levelService";

export function getLevelSuccess(levels) {
  return { type: types.GET_LEVELS_SUCCESS, levels };
}
export function deleteLevelSuccess(level) {
  return { type: types.DELETE_LEVEL_SUCCESS, level };
}
export function createLevelSuccess(level) {
  return { type: types.CREATE_LEVEL_SUCCESS, level };
}
export function updateLevelSuccess(level) {
  return { type: types.UPDATE_LEVEL_SUCCESS, level };
}

export function getLevels() {
  return function (dispatch) {
    GetLevelsService()
      .then((level) => {
        if (level.message.length > 0) {
          dispatch(getLevelSuccess(level.message));
        }
      })
      .catch((err) => {
        throw err;
      });
  };
}

export const deleteLevel = (level) => {
  return (dispatch) => {
    DeleteLevelSerice(level.id)
      .then((data) => {
        dispatch(deleteLevelSuccess(level));
      })
      .catch((err) => {
        throw err;
      });
  };
};

export const saveLevel = (level, history) => {
  return (dispatch) => {
    SaveLevelService(level).then((res) => {
      if (res.success === true) {
        level.id
          ? dispatch(updateLevelSuccess(res.message))
          : dispatch(createLevelSuccess(res.message));
        setTimeout(() => {
          history.push("/admin/main/levels");
        }, 2000);
      }
    });
  };
};
