import * as types from "./actionTypes";
import {
  GetCoursesService,
  DeleteCourseSerice,
  SaveCourseService,
} from "../services/courseService";
export function getCourseSuccess(courses) {
  return { type: types.GET_COURSES_SUCCESS, courses };
}
export function deleteCourseSuccess(course) {
  return { type: types.DELETE_COURSE_SUCCESS, course };
}
export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}
export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function getCourses() {
  return function (dispatch) {
    GetCoursesService()
      .then((course) => {
        console.log(course);
        if (course.message.length > 0) {
          dispatch(getCourseSuccess(course.message));
        }
      })
      .catch((err) => {
        throw err;
      });
  };
}
export const deleteCourse = (course) => {
  return (dispatch) => {
    DeleteCourseSerice(course.id)
      .then((data) => {
        dispatch(deleteCourseSuccess(course));
      })
      .catch((err) => {
        throw err;
      });
  };
};

export const saveCourse = (course, history) => {
  return (dispatch) => {
    SaveCourseService(course).then((res) => {
      if (res.success === true) {
        course.id
          ? dispatch(updateCourseSuccess(res.message))
          : dispatch(createCourseSuccess(res.message));
        setTimeout(() => {
          history.push("/admin/main/courses");
        }, 2000);
      }
    });
  };
};
