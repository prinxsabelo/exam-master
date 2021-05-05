import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AdminHeader from "../../layouts/AdminHeader";
import StudentList from "./StudentList";
import {
  getStudents,
  saveStudent,
  resultDetail,
} from "../../../redux/actions/studentActions";
import StudentDetail from "./StudentDetail";
import { getLevels } from "../../../redux/actions/levelActions";
const drawerWidth = 400;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
    justifyContent: "center",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),

    width: "100%",
  },
}));
export function StudentsPage({
  getLevels,
  getStudents,
  saveStudent,
  ...props
}) {
  const [student, setStudent] = useState({ ...props.student });
  // console.log(student);
  useEffect(() => {
    // props.students = [];
    // let student = { student_id: props.id };
    if (props.students.length === 0) {
      getStudents();
    } else {
      setStudent({ ...props.student });
    }
    if (props.levels.length === 0) {
      getLevels();
    }
  }, [
    getStudents,
    getLevels,
    props.id,
    props.student,
    props.students,
    props.levels.length,
  ]);
  const classes = useStyles();
  const { students } = props;
  const { levels } = props;
  function handleStudentClick(student_id) {
    let student = getStudentById(props.students, student_id);

    setStudent(student);
  }
  function handleSelectChange(event) {
    setStudent(event.target.value);
  }
  function handleTextChange(event) {
    const { id, value } = event.target;
    if (id === "email") {
      setStudent((prevStudent) => ({
        ...prevStudent,
        [id]: value,
      }));
    } else {
      setStudent((prevStudent) => ({
        ...prevStudent,
        [id]: value.toUpperCase(),
      }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (student.level_id === "") {
      if (levels.length > 0) {
        student.level_id = levels[0].id;
      }
    }
    if (!student.password) {
      student.password = "password";
    }
    saveStudent(student, props.history);
    initStudent();
    getStudents();
    // if(student){

    // }
    }
  function initForm() {
    initStudent();
  }
  function initStudent() {
    setStudent({
      lastname: "",
      firstname: "",
      email: "",
      level_id: "",
      matric_no: "",
      id: "",
      password: "",
    });
  }
  function studentResultDetail(exam) {
    let sender = {};
    sender.student_id = exam.student_id;
    sender.exam_id = exam.exam_id;
    props.resultDetail(sender);
    props.history.push(
      `/admin/main/result-detail/${exam.student_id}/${exam.exam_id}`
    );
  }
  return (
    <div className={classes.root}>
      <AdminHeader />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerContainer}>
          <Toolbar />
          <StudentList
            students={students}
            student={student}
            onClick={handleStudentClick}
          />
        </div>
      </Drawer>
      <main className={classes.content}>
        <StudentDetail
          studentResultDetail={studentResultDetail}
          levels={levels}
          student={student}
          handleTextChange={handleTextChange}
          handleSubmit={handleSubmit}
          handleSelectChange={handleSelectChange}
          initForm={initForm}
        />
      </main>
    </div>
  );
}

StudentsPage.propTypes = {
  students: PropTypes.array.isRequired,
};
export function getStudentById(students, id) {
  return students.find((student) => student.id === id);
}
const mapStateToProps = (state) => {
  const student = {
    lastname: "",
    firstname: "",
    email: "",
    level_id: "",
    matric_no: "",
    id: "",
    password: "",
  };
  return {
    students: state.students,
    student,
    levels: state.levels,
  };
};

const mapDispatchToProps = {
  getStudents,
  saveStudent,
  getLevels,
  resultDetail,
};
export default connect(mapStateToProps, mapDispatchToProps)(StudentsPage);
