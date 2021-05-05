import React from "react";
import { Route, Switch } from "react-router-dom";
import StudentLogin from "../auth/StudentLogin";
import { StudentVerify } from "../auth/StudentVerify";
import StudentMain from "./StudentMain";
const Student = (props) => {
  console.log(props.match.path);
  return (
    <div>
      <Switch>
        <Route exact path={`${props.match.path}`} component={StudentLogin} />
        <Route path={`${props.match.path}/login`} component={StudentLogin} />
        <Route path={`${props.match.path}/main`} component={StudentMain} />
      </Switch>
    </div>
  );
};

export default Student;
