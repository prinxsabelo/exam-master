import React, { useState } from "react";
import { connect } from "react-redux";
import { StudentLoginDetail } from "../redux/actions/authActions";
import LoginForm from "./LoginForm";
export function StudentLogin(props) {
  const [auth, setAuth] = useState({ ...props.auth });
  let authResponse;
  if(props.authResponse){
    const { authResponse } = props;
    console.log(authResponse)
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(auth);

    props.StudentLoginDetail(auth, props.history);
  }
  function handleChange(e) {
    const { id, value } = e.target;
    setAuth((prevAuth) => ({
      ...prevAuth,
      [id]: value,
    }));
  }
  return (
    <LoginForm
      onSubmit={handleSubmit}
      auth={auth}
      onChange={handleChange}
      user="STUDENT"
      // authResponse={authResponse}
    />
  );
}
const mapStateToProps = (state) => {
  const auth = { email: "", password: "" };
  return {
    auth,
    authResponse: state.auth.authResponse,
  };
};
const mapDispatchToProps = {
  StudentLoginDetail,
};
export default connect(mapStateToProps, mapDispatchToProps)(StudentLogin);
