import React, { useState } from "react";
import { connect } from "react-redux";
import { StudentRegisterDetail } from "../redux/actions/authActions";
import RegisterForm from "./RegisterForm";
import cloudHelper from './cloudabis';

//Fetch Levels 


export function StudentRegister(props) {
  const [auth, setAuth] = useState({ ...props.auth });
  const { authResponse } = props;
  function handleSubmit(e) {
    e.preventDefault();
    auth.templateXML = localStorage.getItem('templateXML')
    console.log(auth);

    props.StudentRegisterDetail(auth, props.history);
  }
  function handleChange(e) {
    const { id, value } = e.target;
    setAuth((prevAuth) => ({
      ...prevAuth,
      [id]: value,
    }));
  }
  function captureBiometric() {
    var cloudH = new cloudHelper();
    cloudH.captureBiometric('Register');
  }

  return (
    <RegisterForm
      onSubmit={handleSubmit}
      auth={auth}
      onChange={handleChange}
      user="STUDENT"
      authResponse={authResponse}
      captureBiometric={captureBiometric}
    />
  );
}
const mapStateToProps = (state) => {
  const auth = { email: "", password: "", firstname: "", lastname: "", level: "1", templateXML: "", matric_no: "" };
  return {
    auth,
    authResponse: state.auth.authResponse,
  };
};
const mapDispatchToProps = {
  StudentRegisterDetail,
};
export default connect(mapStateToProps, mapDispatchToProps)(StudentRegister);
