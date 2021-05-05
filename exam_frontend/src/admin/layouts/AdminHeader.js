import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
const AdminHeader = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>

          <Typography variant="h6" className={classes.title}>
            <NavLink to="/admin/main/" className="text-white font-weight-bolder">
              LAUTECH - CSE ADMIN
            </NavLink>
          </Typography>

          <NavLink to="/admin/main/levels" >
            <Button className="text-white font-weight-bold">Levels</Button>
          </NavLink>
          <NavLink to="/admin/main/courses">
            <Button className="text-white font-weight-bold">Courses</Button>
          </NavLink>
          <NavLink to="/admin/main/exams/reload">
            <Button className="text-white font-weight-bold">Exams</Button>
          </NavLink>
          <NavLink to="/admin/main/students">
            <Button className="text-white font-weight-bold">Students</Button>
          </NavLink>
          <NavLink to="/admin">
            <Button className="text-white font-weight-bold">LogOut</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: "80px" }}></div>
    </div>
  );
};

export default AdminHeader;
