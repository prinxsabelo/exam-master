import React from "react";
import { TextField, Button } from "@material-ui/core";
import OptionForm from "./OptionForm";

const QuestionForm = ({
  question,
  handleTextChange,
  handleOptionChange,
  handleSubmit,
  handleDelete,
  controlQuestion,
  formError,
}) => {
  // console.log(question);
  return (
    <>
      {formError && (
        <div className="alert alert-danger" role="alert">
          {formError}
        </div>
      )}
      <form
        className="mt-3 shadow-lg p-4"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="row">
          <div className="col-md-12">
            <TextField
              id="question"
              label="Question Here.."
              variant="outlined"
              style={{ width: "100%" }}
              value={question.question}
              onChange={handleTextChange}
            />
          </div>
        </div>

        <div className="row">
          <OptionForm
            correct_option={question.correct_option}
            label="Option A"
            name="options"
            id="option_a"
            option_value="option_a"
            value={question.option_a}
            handleOptionChange={handleOptionChange}
            handleTextChange={handleTextChange}
          />
          <OptionForm
            correct_option={question.correct_option}
            label="Option B"
            name="options"
            id="option_b"
            option_value="option_b"
            value={question.option_b}
            handleOptionChange={handleOptionChange}
            handleTextChange={handleTextChange}
          />
          <OptionForm
            correct_option={question.correct_option}
            label="Option C"
            name="options"
            id="option_c"
            option_value="option_c"
            value={question.option_c}
            handleOptionChange={handleOptionChange}
            handleTextChange={handleTextChange}
          />
          <OptionForm
            correct_option={question.correct_option}
            label="Option D"
            name="options"
            id="option_d"
            option_value="option_d"
            value={question.option_d}
            handleOptionChange={handleOptionChange}
            handleTextChange={handleTextChange}
          />
        </div>
        <div className="row mt-2">
          <div className="col-md-3 offset-6">
            <Button variant="contained" color="primary" type="submit">
              {question.id ? "Update Question" : "Create Question"}
            </Button>
          </div>
          <div className="col-md-3 ">
            {controlQuestion > 0 && (
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => handleDelete(question)}
              >
                Delete Question
              </Button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};
export default QuestionForm;
