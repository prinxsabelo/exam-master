import React from "react";
import { NavLink } from "react-router-dom";
class AdminDashboard extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row mt-5 justify-content-center">
          <div className="col-md-8 text-center  font-weight-bold">
            <div className="shadow p-2 m-2 mt-5">
              <div className="h4">FEEL FREE TO VISIT THE LINKS BELOW</div>
              <div className="row justify-content-center justify-content-between p-4">
                <NavLink to="/admin/main/levels" className="col-md-5 bg-primary p-3 text-white">
                  LEVELS
                </NavLink>
                <NavLink to="/admin/main/students" className="col-md-5 bg-primary p-3 text-white">
                  STUDENTS
                </NavLink>

              </div>
              <div className="row justify-content-center justify-content-between p-4">
                <NavLink to="/admin/main/courses" className="col-md-5 bg-primary p-3 text-white">
                  COURSES
                </NavLink>
                <NavLink to="/admin/main/exams" className="col-md-5 bg-primary p-3 text-white">
                  EXAMS
                </NavLink>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AdminDashboard;
