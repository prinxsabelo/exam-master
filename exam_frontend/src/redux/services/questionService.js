import HttpService from "./HttpService";
export const GetQuestionsService = (question) => {
  const http = new HttpService();
  question.token = localStorage.getItem("admin");
  let url = `get-questions`;
  return http
    .postExamData(question, url)
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
};

export const SaveQuestionService = (question) => {
  const http = new HttpService();
  let url = "save-question";
  return http
    .postExamData(question, url)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
export const DeleteQuestionSerice = (question) => {
  const http = new HttpService();
  let url = `delete-question/${question}`;
  return http
    .postExamData(question, url)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};
