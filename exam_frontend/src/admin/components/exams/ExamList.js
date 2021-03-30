import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
const ExamList = ({ handleEdit, handleDelete, exams, handleQuestions }) => {
  // console.log(exams);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    button: {
      marginLeft: theme.spacing(1),
    },
  }));

  const classes = useStyles();
  return (
    <div>
      {exams.length > 0 ? (
        <>
          {exams.map((exam) => (
            <div className="row shadow p-2 m-2 h4" key={exam.id}>
              <div className="col-md-8">
                <div className="text-uppercase">
                  {exam.exam_title} -  {exam.questions_display} / {exam.questions_count}  Questions Visible
                </div>
                <div>
                  {exam.name} - {exam.code} - {exam.level}
                </div>
              </div>
              <div className="col-md-4">
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={() => handleQuestions(exam)}
                >
                  Questions
                </Button>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(exam)}
                >
                  Edit
                </Button>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(exam)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </>
      ) :
        <div className="shadow p-3 m-3 initialism col-md-5">
          No exams Found.. Kindly create one..
        </div>
      }

    </div>
  );
};
export default ExamList;
