import HttpService from "./HttpService";

export const AdminLoginService = (credentials, propsHistory) => {
  const http = new HttpService();
  let url = "login";
  return http
    .postAdminData(credentials, url)
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
};
export const StudentLoginService = (credentials, propsHistory) => {
  const http = new HttpService();
  let url = "login";
  return http
    .postStudentData(credentials, url)
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
};
export const StudentRegisterService = (credentials, propsHistory) => {
  const http = new HttpService();
  let url = "register";
  return http
    .postStudentData(credentials, url)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
};
export const StudentVerifyService = (credentials, propsHistory) => {
  const http = new HttpService();
  let url = "verify";
  return http
    .postStudentData(credentials, url)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
};