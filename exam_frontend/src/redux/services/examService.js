import HttpService from "./HttpService";
export const GetExamsService = () => {
  const http = new HttpService();
  let exam = { token: null };
  exam.token = localStorage.getItem("admin");
  let url = `get-exams`;
  return http
    .postExamData(exam, url)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};
export const DeleteExamSerice = (exam) => {
  const http = new HttpService();
  let url = `delete-exam/${exam}`;
  return http
    .postExamData(exam, url)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};
export const SaveExamService = (exam) => {
  const http = new HttpService();
  exam.token = localStorage.getItem("admin");

  let url = "save-exam";
  return http
    .postExamData(exam, url)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
