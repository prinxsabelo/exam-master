import React from "react";
import { Route, Switch } from "react-router-dom";

import AdminHeader from "./layouts/AdminHeader";
import AdminDashboard from "./components/AdminDashboard";
import LevelsPage from "./components/levels/LevelsPage";
import ManageLevel from "./components/levels/ManageLevel";
import CoursesPage from "./components/courses/CoursesPage";
import ManageCourse from "./components/courses/ManageCourse";
import ExamsPage from "./components/exams/ExamsPage";
import ManageExam from "./components/exams/ManageExam";
import ExamDashboard from "./components/exams/questions/ExamDashboard";
import StudentsPage from "./components/students/StudentsPage";
import ResultDetail from "./components/students/ResultDetail";

const AdminMain = (props) => {
  return (
    <div>
      <AdminHeader />
      <Switch>
        <Route exact path={`${props.match.path}`} component={AdminDashboard} />
        <Route
          path={`${props.match.path}/dashboard`}
          component={AdminDashboard}
        />
        <Route
          path={`${props.match.path}/level/:level_id`}
          component={ManageLevel}
        />
        <Route path={`${props.match.path}/level`} component={ManageLevel} />
        <Route path={`${props.match.path}/levels`} component={LevelsPage} />
        <Route
          path={`${props.match.path}/course/:course_id`}
          component={ManageCourse}
        />
        <Route path={`${props.match.path}/course`} component={ManageCourse} />
        <Route path={`${props.match.path}/courses`} component={CoursesPage} />
        <Route
          path={`${props.match.path}/exam/:exam_id/questions`}
          component={ExamDashboard}
        />
        <Route
          path={`${props.match.path}/exam/:exam_id`}
          component={ManageExam}
        />

        <Route path={`${props.match.path}/exam`} component={ManageExam} />
        <Route path={`${props.match.path}/exams`} component={ExamsPage} />

        <Route
          path={`${props.match.path}/result-detail/:student_id/:exam_id`}
          component={ResultDetail}
        />
        {/* Work here if required */}
        <Route path={`${props.match.path}/students`} component={StudentsPage} />
      </Switch>
    </div>
  );
};

export default AdminMain;
