import React from "react";
import { Button } from "@material-ui/core";
const LevelList = ({ levels, handleDelete, handleEdit }) => {
  return (
    <div>
      {levels.length > 0 && (
        <>
          {levels.map((level) => (
            <div className="row shadow p-2 m-2 h4" key={level.id}>
              <div className="col-md-8">{level.level}</div>
              <div className="col-md-4">
                <Button
                  variant="contained"
                  color="primary"
                  className="mr-2"
                  onClick={() => handleEdit(level)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(level)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </>
      )}
      {levels.length === 0 && (
        <div className="shadow p-3 m-3 initialism col-md-5">
          No Levels Found.. Kindly create one..
        </div>
      )}
    </div>
  );
};
export default LevelList;
