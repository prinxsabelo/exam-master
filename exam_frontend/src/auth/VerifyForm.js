import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const VerifyForm = ({ onSubmit, onChange, auth, user, authResponse, captureBiometric }) => {
  return (
    <Container
      maxWidth="sm"
      style={{ height: '80vh' }}
      className="mt-5 pt-5 shadow"
    >
      <label className="w-100 alert alert-danger py-1 mt-2 mb-0 text-center d-none" id="errorMsg"></label>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography style={{ textAlign: 'center', paddingTop: 30 }}>
            {user} LOGIN HERE
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={onSubmit}>
            <Grid spacing={2} container>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Matric number"
                  value={auth.matric_no}
                  id="matric_no"
                  onChange={onChange}
                  style={{ margin: 8 }}
                  fullWidth
                  variant="outlined"
                />
                {/* )} */}
              </Grid>
            </Grid>
            <input type="button" className="btn btn-outline-primary ml-2 mt-2" name="biometricCapture" value="Biometric Capture" onClick={captureBiometric}></input>
            <input type="hidden" name="templateXML" id="templateXML" value={auth.templateXML}></input>
            <button type="submit" className="btn btn-success form-control ml-2 mt-3">LogIn</button>
            <label id="serverResult" className="d-block text-center mt-2" style={{ fontWeight: 'bold', fontSize: '14px' }}></label>
          </form>
          {authResponse}
        </Grid>
        <div className="px-4">
          <NavLink to="/register">Register Student </NavLink>
        </div>
      </Grid>
    </Container>
  );
};
VerifyForm.propTypes = {
  authResponse: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default VerifyForm;
