import HttpService from "./HttpService";
export const GetLevelsService = () => {
  const http = new HttpService();

  let url = `get-levels`;
  return http
    .getExamData(url)
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
};
export const DeleteLevelSerice = (level) => {
  const http = new HttpService();
  let url = `delete-level/${level}`;
  return http
    .postExamData(level, url)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};
export const SaveLevelService = (level) => {
  const http = new HttpService();
  let url = "save-level";
  return http
    .postExamData(level, url)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
export const CreateLevelService = (level) => {
  const http = new HttpService();
  let url = "create-level";
  return http
    .postExamData(level, url)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};
export const UpdateLevelService = (level) => {
  const http = new HttpService();
  let url = `update-level/${level.id}`;
  return http
    .postExamData(level, url)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};
