import {
  AdminLoginService,
  StudentLoginService,
  StudentRegisterService,
  StudentVerifyService,
} from "../services/authService";
import * as types from "./actionTypes";

export const AdminLoginDetail = (credentials, history) => {
  return (dispatch) => {
    AdminLoginService(credentials, history).then(
      (res) => {
        console.log(res);
        if (res) {
          if (res.success === true) {
            localStorage.setItem("admin", "Bearer " + res.token);
            dispatch({ type: types.ADMIN_LOGIN_SUCCESS });
            setTimeout(() => {
              history.push("/admin/main");
            });
          } else {
            dispatch({ type: types.ADMIN_LOGIN_ERROR, payload: res.message });
          }
        }
      },
      (error) => {
        // alert("kkkd");
      }
    );
  };
};
export const StudentLoginDetail = (credentials, history) => {
  return (dispatch) => {
    StudentLoginService(credentials, history).then(
      (res) => {
        console.log(res);
        if (res) {
          if (res.success === true) {
            localStorage.setItem("student", "Bearer " + res.token);
            dispatch({ type: types.STUDENT_LOGIN_SUCCESS });
            setTimeout(() => {
              history.push("/student/main/reload");
            });
          } else {
            dispatch({ type: types.STUDENT_LOGIN_ERROR, payload: res.message });
          }
        }
      },
      (error) => {
        // alert("kkkd");
      }
    );
  };
};
export const StudentRegisterDetail = (credentials, history) => {
  return (dispatch) => {
    StudentRegisterService(credentials, history).then(
      (res) => {
        console.log(res);
        if (res) {
          if (res.success === true) {
            localStorage.setItem("student", "Bearer " + res.token);
            dispatch({ type: types.CREATE_STUDENT_SUCCESS });
            setTimeout(() => {
              history.push("/student/main");
            });
          } else {
            var dis = document.getElementById('errorMsg');
            dis.classList.remove('d-none')
            if (typeof (res.message) == 'string') {
              dis.innerHTML = res.message
            } else {
              for (var i in res.message) {
                dis.innerHTML = res.message[i][0]
              }
            }
            dispatch({ type: types.STUDENT_LOGIN_ERROR, payload: res.message });
          }
        }
      },
      (error) => {
        // alert("kkkd");
      }
    );
  };
};
export const StudentVerifyDetail = (credentials, history) => {
  return (dispatch) => {
    StudentVerifyService(credentials, history).then(
      (res) => {
        console.log(res);
        if (res) {
          if (res.success === true) {
            localStorage.setItem("student", "Bearer " + res.token);
            dispatch({ type: types.STUDENT_LOGIN_SUCCESS });
            setTimeout(() => {
              history.push("/student/main");
            });
          } else {
            var dis = document.getElementById('errorMsg');
            dis.classList.remove('d-none')
            if (typeof (res.message) == 'string') {
              dis.innerHTML = res.message
            } else {
              for (var i in res.message) {
                dis.innerHTML = res.message[i][0]
              }
            }
            dispatch({ type: types.STUDENT_LOGIN_ERROR, payload: res.message });
          }
        }
      },
      (error) => {
        // alert("kkkd");
      }
    );
  };
};