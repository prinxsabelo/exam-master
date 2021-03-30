import React from "react";

import { Grid, Button } from "@material-ui/core";
function QuestionList({ questions, question, onClick }) {
  const { id } = question;
  return (
    <Grid container>
      {questions.length === 0 && (
        <div className="card-block shadow-lg p-3 m-3 initialism">
          No Question Found..
        </div>
      )}
      {questions.map((question, index) => (
        <Grid item xs={2} style={{ margin: 10 }} key={question.id}>
          {id === question.id && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => onClick(question.id)}
            >
              {index + 1}
            </Button>
          )}
          {id !== question.id && (
            <Button variant="contained" onClick={() => onClick(question.id)}>
              {index + 1}
            </Button>
          )}
        </Grid>
      ))}
    </Grid>
  );
}

export default QuestionList;
