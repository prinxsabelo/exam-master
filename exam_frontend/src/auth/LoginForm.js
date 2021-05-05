import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';

const LoginForm = ({ onSubmit, onChange, auth, user }) => {
  // console.log(authResponse)
  return (
    <Container
      maxWidth="sm"
      style={{ height: '80vh' }}
      className="mt-5 pt-5 shadow"
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography style={{ textAlign: 'center', paddingTop: 30 }}>
            <span className="h2"> {user} LOGIN HERE</span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={onSubmit}>
            <Grid spacing={2} container>
              <Grid item xs={12}>
                {/* {user === "ADMIN" && ( */}
                <TextField
                  type="email"
                  label="Email Here.."
                  value={auth.email}
                  id="email"
                  onChange={onChange}
                  style={{ margin: 8 }}
                  fullWidth
                  variant="outlined"
                />
                {/* )} */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  label="Password Here.."
                  value={auth.password}
                  id="password"
                  onChange={onChange}
                  style={{ margin: 8 }}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <button type="submit" className="btn btn-lg btn-primary ml-2">LogIn</button>
          </form>

          {/* {authResponse} */}
        </Grid>
      </Grid>
    </Container>
  );
};
LoginForm.propTypes = {
  // authResponse: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default LoginForm;
