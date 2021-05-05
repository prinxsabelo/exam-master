import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Admin from "./admin/Admin";
import Student from "./student/Student";
import StudentRegister from './auth/StudentRegister';
import StudentVerify from './auth/StudentVerify';
import Exam from "./exam/Exam";
import { StudentLogin } from "./auth/StudentLogin";

function App(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Student} />
        <Route path="/admin" component={Admin} />
        <Route path="/student" component={Student} />
        <Route path="/exam" component={Exam} />
        <Route path="/register" component={StudentRegister} />
        <Route path="/verify" component={StudentVerify} />
        <Route path="/login" component={StudentLogin} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
