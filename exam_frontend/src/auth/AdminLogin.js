import React, { useState } from "react";
import { connect } from "react-redux";
import { AdminLoginDetail } from "../redux/actions/authActions";
import LoginForm from "./LoginForm";
export function AdminLogin(props) {
  const [auth, setAuth] = useState({ ...props.auth });
  const { authResponse } = props;
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(auth);
    props.AdminLoginDetail(auth, props.history);
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
      user="ADMIN"
      authResponse={authResponse}
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
  AdminLoginDetail,
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
