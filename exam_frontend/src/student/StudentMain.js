import React from "react";
import { Route, Switch } from "react-router-dom";
import StudentHeader from "./layouts/StudentHeader";
import StudentExam from "./components/StudentExam";

const StudentMain = (props) => {
  if (window.location.pathname.search("/reload") !== -1) {
    window.location.href = `/student/main/exams`;
  }
  return (
    <div>
      <StudentHeader />
      <Switch>
        <Route
          exact
          path={`${props.match.path}`}
          component={StudentExam}
        />
        <Route
          path={`${props.match.path}/dashboard`}
          component={StudentExam}
        />
        <Route path={`${props.match.path}/exams`} component={StudentExam} />
      </Switch>
    </div>
  );
};
export default StudentMain;
