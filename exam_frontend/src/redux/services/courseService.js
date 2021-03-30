import HttpService from "./HttpService";
export const GetCoursesService = () => {
  const http = new HttpService();

  let url = `get-courses`;
  return http
    .getExamData(url)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
};
export const DeleteCourseSerice = (course) => {
  const http = new HttpService();
  let url = `delete-course/${course}`;
  return http
    .postExamData(course, url)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};
export const SaveCourseService = (course) => {
  const http = new HttpService();
  course.token = localStorage.getItem("admin");

  let url = "save-course";
  return http
    .postExamData(course, url)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
export const CreateCourseService = (course) => {
  const http = new HttpService();
  course.token = localStorage.getItem("admin");
  let url = "create-Course";
  return http
    .postExamData(course, url)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};
export const UpdateCourseService = (course) => {
  const http = new HttpService();
  let url = `update-Course/${course.id}`;
  return http
    .postExamData(course, url)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};
