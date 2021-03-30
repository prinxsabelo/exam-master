import HttpService from "./HttpService";
export const getStudentsService = () => {
  const http = new HttpService();
  let url = `get-students`;
  return http
    .getStudentData(url)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
};
export const SaveStudentService = (student) => {
  const http = new HttpService();
  //   course.token = localStorage.getItem("admin");

  let url = "save-student";
  return http
    .postStudentData(student, url)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const getStudentExamsService = () => {
  const http = new HttpService();
  let student = {};
  student.token = localStorage.getItem("student");
  let url = `get-student-exams`;
  return http
    .postStudentExamData(student, url)
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
};
export const StartExamService = (ent) => {
  const http = new HttpService();
  ent.token = localStorage.getItem("student");
  let url = "start-exam";
  return http
    .postStudentExamData(ent, url)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const MarkOptionService = (question) => {
  const http = new HttpService();
  question.token = localStorage.getItem("student");
  let url = "mark-option";
  return http
    .postStudentExamData(question, url)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
export const saveTimerService = (exam) => {
  console.log(exam);
  const http = new HttpService();
  let url = "save-timer";
  return http
    .postStudentExamData(exam, url)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
export const resultDetailService = (exam) => {
  console.log(exam);
  const http = new HttpService();
  let url = "result-detail";
  return http
    .postStudentData(exam, url)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
