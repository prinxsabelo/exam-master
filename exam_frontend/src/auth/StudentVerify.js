import React, { useState } from "react";
import { connect } from "react-redux";
import { StudentVerifyDetail } from "../redux/actions/authActions";
import VerifyForm from "./VerifyForm";
import cloudHelper from './cloudabis';

export function StudentVerify(props) {
  const [auth, setAuth] = useState({ ...props.auth });
  const { authResponse } = props;
  function handleSubmit(e) {
    e.preventDefault();
    auth.templateXML = localStorage.getItem('templateXML')
    console.log(auth);

    console.log(auth, "AUTH")
    console.log(props, "PROPS")
    props.StudentVerifyDetail(auth, props.history);
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
    cloudH.captureBiometric('Verify');
  }

  return (
    <VerifyForm
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
  const auth = { templateXML: "", matric_no: "" };
  return {
    auth,
    authResponse: state.auth.authResponse,
  };
};
const mapDispatchToProps = {
  StudentVerifyDetail,
};
export default connect(mapStateToProps, mapDispatchToProps)(StudentVerify);
