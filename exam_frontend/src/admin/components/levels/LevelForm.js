import React from "react";
import { TextField, Button } from "@material-ui/core";

const LevelForm = ({ level, onChange, onSubmit }) => {
  // console.log(level);
  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="card p-2 shadow">
              <div className="card-title text-center h3 pt-2">
                {level.id ? "EDIT" : "ADD"} LEVEL
              </div>
              <div className="card-body">
                <TextField
                  name="level"
                  label="Level"
                  value={level.level}
                  onChange={onChange}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="card-footer">
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default LevelForm;
