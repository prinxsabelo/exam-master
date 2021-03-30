import React from "react";

import { Grid, Button } from "@material-ui/core";
const ExamQuestions = ({ questions, question, onClick }) => {
  const { question_id } = question;
  return (
    <Grid container>
      {questions.map((question, index) => (
        <Grid item xs={2} style={{ margin: 10 }} key={question.question_id}>
          {question_id === question.question_id && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => onClick(question.question_id)}
            >
              {index + 1}
            </Button>
          )}
          {question_id !== question.question_id && (
            <Button
              variant="contained"
              color="inherit"
              onClick={() => onClick(question.question_id)}
            >
              {index + 1}
            </Button>
          )}
        </Grid>
      ))}
    </Grid>
  );
};
export default ExamQuestions;
