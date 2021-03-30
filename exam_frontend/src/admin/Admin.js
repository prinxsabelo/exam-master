import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminLogin from "../auth/AdminLogin";
import AdminMain from "./AdminMain";
const Admin = (props) => {
  console.log(props.match.path);
  return (
    <div>
      <Switch>
        <Route exact path={`${props.match.path}`} component={AdminLogin} />
        <Route path={`${props.match.path}/login`} component={AdminLogin} />
        <Route path={`${props.match.path}/main`} component={AdminMain} />
      </Switch>
    </div>
  );
};

export default Admin;
