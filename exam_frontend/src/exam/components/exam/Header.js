  import React, { useState } from "react";
import { AppBar, Typography, Button } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import ExamQuestions from "./ExamQuestions";
import ExamQuestion from "./ExamQuestion";
import { saveTimer } from "../../../redux/actions/studentActions";
const drawerWidth = 320;
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
export function Header({
  exam,
  exam_questions,
  question,
  handleQuestionClick,
  handleOptionClick,
  showResult,
  prevQuestion,
  nextQuestion,

  ...props
}) {
  const index = exam_questions.findIndex((x) => x.id === question.id);
  const classes = useStyles();
  const [timer, setTimer] = useState(exam.timer);
  if(exam_questions.length > 0)  timer > 0 ? setTimeout(() => setTimer(timer - 1), 1000) : saveTimer();

  function convertNumToTime(num) {
    num = Number(num);
    var h = Math.floor(num / 3600);
    var m = Math.floor((num % 3600) / 60);
    var s = Math.floor((num % 3600) % 60);
    var hDisplay = h > 0 ? h : "0 : ";
    var mDisplay = m > 0 ? m + " : " : " 0: ";
    var sDisplay = s > 0 ? s + " " : " 0 ";
    return hDisplay + mDisplay + sDisplay;
  }
  function finish() {
    setTimer(0);
  }
  function saveTimer() {
    // alert(exam.student_id);
    let sender = {};
    sender.student_id = exam.student_id;
    sender.exam_id = exam.id;
    sender.timer = timer;

    if (timer === 0) {
      sender.submitted = "Y";
      // alert("submit" + timer);
    } else {
      sender.submitted = "N";
      // alert("normal" + timer);
    }
    props.saveTimer(sender);
  }
  if (timer === 0) {
    console.log(props);
    showResult();
    // props.history.push(`/exam/${exam.id}/result`);
  }
  const viewTimer = convertNumToTime(timer);
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography className="mr-5 pr-5"> {exam.exam_title}</Typography>
          <Typography className="ml-5 pl-5">{viewTimer}</Typography>
          <div className="offset-7">
            {exam.lastname} {exam.firstname} - {exam.student_id}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />

        <div className={classes.drawerContainer} onClick={() => saveTimer()}>
          <ExamQuestions
            questions={exam_questions}
            onClick={handleQuestionClick}
            question={question}
          />
        </div>
      </Drawer>
      {exam_questions.length > 0 ?
       <main className={classes.content} onClick={() => saveTimer()}>
       <ExamQuestion
         question={question}
         questions={exam_questions}
         handleOptionClick={handleOptionClick}
       />
       {index > 0 && (
         <Button
           className="float-left mt-3 mr-3"
           variant="contained"
           color="primary"
           onClick={(e) => prevQuestion()}
         >
           Prev Question
         </Button>
       )}
       {index < exam_questions.length - 1 && (
         <Button
           className="float-left mt-3"
           variant="contained"
           color="primary"
           onClick={(e) => nextQuestion()}
         >
           Next Question
         </Button>
       )}

       <Button
         className="float-right mt-3"
         variant="contained"
         color="secondary"
         onClick={finish}
       >
         Finish Exam
       </Button>
     </main>:
      <div  className=" mt-5 pt-5" >
          <div className="m-5 ">
             NO QUESTION FOUND
             <div>

             <Button
              className="float-right mt-3"
              variant="contained"
              color="secondary"
              onClick={finish}
            >
              Cancel
            </Button>
            </div>
          </div>
       </div>
      }
     
    </div>
  );
}

const mapDispatchToProps = {
  saveTimer,
};

export default connect("", mapDispatchToProps)(Header);
