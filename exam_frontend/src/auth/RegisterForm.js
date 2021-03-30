import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import { getLevels } from '../redux/actions/levelActions';
import { NavLink } from 'react-router-dom';



const RegisterForm = ({ onSubmit, onChange, auth, user, authResponse, captureBiometric, levels, getLevels, ...props }) => {
  useEffect(() => {
    if (levels.length === 0) {
      getLevels();
    }

  }, [props.level, getLevels, levels.length]);
  return (

    <Container
      maxWidth="sm"
      style={{ height: '98vh' }}
      className=" p-5 shadow"
    >
      <label className="w-100 alert alert-danger py-1  mb-0 text-center d-none" id="errorMsg"></label>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography style={{ textAlign: 'center', paddingTop: 20, }}>
            {user} REGISTER HERE
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={onSubmit}>
            <Grid spacing={2} container>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    label="Firstname"
                    value={auth.firstname}
                    id="firstname"
                    onChange={onChange}
                    style={{ margin: 8 }}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    label="Lastname"
                    value={auth.lastname}
                    id="lastname"
                    onChange={onChange}
                    style={{ margin: 8 }}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    label="Matric No"
                    value={auth.matric_no}
                    id="matric_no"
                    onChange={onChange}
                    style={{ margin: 8 }}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <TextField
                  type="email"
                  label="Email"
                  value={auth.email}
                  id="email"
                  onChange={onChange}
                  style={{ margin: 8 }}
                  fullWidth
                  variant="outlined"
                />
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    label="Password"
                    value={auth.password}
                    id="password"
                    onChange={onChange}
                    style={{ margin: 8 }}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
            <select value={auth.level} onChange={onChange} id="level" className="d-block form-control ml-2"
              style={{ background: "transparent", height: "3.1876em", borderColor: "rgba(0, 0, 0, 0.23)" }}>
              {levels.map((level) => {
                return (

                  <option value={level.id} key={level.id}>
                    {level.level}
                  </option>
                );
              })}

            </select>
            <input type="button" className="btn btn-outline-primary ml-2 mt-2" name="biometricCapture" value="Biometric Capture" onClick={captureBiometric}></input>
            <input type="hidden" name="templateXML" id="templateXML" value={auth.templateXML}></input>
            <button type="submit" className="form-control ml-2 mt-2 btn btn-success">Register</button>
            <label id="serverResult" className="d-block text-center mt-2" style={{ fontWeight: 'bold', fontSize: '14px' }}></label>
          </form>
          {authResponse}
        </Grid>
        <div className=" px-4">
          <NavLink to="/verify">Verify Student </NavLink>
        </div>
      </Grid>
    </Container>
  );
};
RegisterForm.propTypes = {
  authResponse: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  getLevels: PropTypes.func.isRequired,
};
const mapStateToProps = (state, ownProps) => {
  return {
    levels: state.levels,
  };
}
const mapDispatchToProps = {
  getLevels,
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);

// export default RegisterForm;
