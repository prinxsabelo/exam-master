import React from "react";
import { Route, Switch } from "react-router-dom";
import Overview from "./components/Overview";
import Dashboard from "./components/exam/Dashboard";
import Result from "./components/Result";

const Exam = (props) => {
  return (
    <div>
      <Switch>
        <Route
          exact
          path={`${props.match.path}/:exam_id`}
          component={Overview}
        />
        <Route path={`/exam/:exam_id/questions`} component={Dashboard} />
        <Route path={`/exam/:exam_id/result`} component={Result} />
      </Switch>
    </div>
  );
};
export default Exam;
