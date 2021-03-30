import React from "react";
import { TextField, Radio } from "@material-ui/core";
const OptionForm = ({
  option,
  correct_option,
  label,
  name,
  value,
  handleTextChange,
  handleOptionChange,
  id,
}) => (
  <div className="col-md-6  mt-4">
    <div className="row">
      <div className="col-md-1">
        <Radio
          checked={correct_option === value}
          onChange={handleOptionChange}
          value={value}
          name={name}
          color="primary"
        />
      </div>
      <div className="col-md-11">
        <TextField
          id={id}
          label={label}
          variant="outlined"
          value={value}
          style={{ width: "100%" }}
          onChange={handleTextChange}
        />
      </div>
    </div>
  </div>
);
export default OptionForm;
