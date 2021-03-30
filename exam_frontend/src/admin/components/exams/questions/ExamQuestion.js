import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function ExamQuestion(question) {
  return (
    <div className="row ">
      <div className="col-md-12  ">
        <ReactQuill placeholder="Insert Question Here.." />
      </div>
    </div>
  );
}
export default ExamQuestion;
