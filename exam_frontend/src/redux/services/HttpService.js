class HttpService {
  admin_url = "http://localhost:8000/api/admin";
  exam_url = "http://localhost:8000/api/exam";
  student_url = "http://localhost:8000/api/student";

  // You can work here Dev.. on the code below..
  postStudentData = async (item, added_url) => {
    const token = await localStorage.getItem("student");
    let requestOptions = {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify(item),
    };
    return fetch(
      this.student_url + "/" + added_url,
      requestOptions
    ).then((response) => response.json());
    // .catch((err) => alert("err"));
  };
  getStudentData = async (added_url) => {
    const token = await localStorage.getItem("student");
    let requestOptions = {
      method: "GET",
      headers: { Authorization: token, "Content-Type": "application/json" },
    };
    return fetch(
      this.student_url + "/" + added_url,
      requestOptions
    ).then((response) => response.json());
  };
  //Student code stops here..

  postAdminData = async (item, added_url) => {
    const token = await localStorage.getItem("admin");
    let requestOptions = {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify(item),
    };
    return fetch(this.admin_url + "/" + added_url, requestOptions)
      .then((response) => response.json())
      .catch((err) => alert("err"));
  };

  getAdminData = async (added_url) => {
    const token = await localStorage.getItem("admin");
    let requestOptions = {
      method: "GET",
      headers: { Authorization: token, "Content-Type": "application/json" },
    };
    return fetch(
      this.admin_url + "/" + added_url,
      requestOptions
    ).then((response) => response.json());
  };

  postExamData = async (item, added_url) => {
    const token = await localStorage.getItem("admin");
    let requestOptions = {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify(item),
    };
    return fetch(
      this.exam_url + "/" + added_url,
      requestOptions
    ).then((response) => response.json());
    // .catch((err) => alert("err"));
  };

  getExamData = async (added_url) => {
    const token = await localStorage.getItem("admin");
    let requestOptions = {
      method: "GET",
      headers: { Authorization: token, "Content-Type": "application/json" },
    };
    return fetch(
      this.exam_url + "/" + added_url,
      requestOptions
    ).then((response) => response.json());
  };

  getStudentExamData = async (added_url) => {
    const token = await localStorage.getItem("student");
    let requestOptions = {
      method: "GET",
      headers: { Authorization: token, "Content-Type": "application/json" },
    };
    return fetch(
      this.student_url + "/" + added_url,
      requestOptions
    ).then((response) => response.json());
  };

  postStudentExamData = async (item, added_url) => {
    const token = await localStorage.getItem("student");
    let requestOptions = {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify(item),
    };
    return fetch(
      this.exam_url + "/" + added_url,
      requestOptions
    ).then((response) => response.json());
    // .catch((err) => alert("err"));
  };
}

export default HttpService;
