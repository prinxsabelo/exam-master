import React, { useEffect } from "react";
import { connect } from "react-redux";
import { resultDetail } from "../../../redux/actions/studentActions";
import ResultTracker from "./ResultTracker";

export function ResultDetail({
  result_details,
  student_id,
  exam_id,
  resultDetail,
  ...props
}) {
  useEffect(() => {
    let sender = {};
    sender.student_id = student_id;
    sender.exam_id = exam_id;
    // alert(student_id + " " + exam_id);
    if (result_details.length === 0) {
      resultDetail(sender);
      console.log(result_details);
    }
  }, [
    student_id,
    exam_id,
    resultDetail,
    result_details.length,
    result_details,
  ]);
  return (
    <div className="container-fluid">
      {result_details.map((result) => (
        <div
          className="row justify-content-center  shadow p-3 m-3"
          key={result.id}
        >
          <div className="col-md-10 initialism font-weight-bold ">
            {result.exam_title}
          </div>
          <div className="col-md-2  text-uppercase">Score = {result.score}</div>
          <div className="col-md-12 font-weight-bold text-uppercase">
            {result.lastname} {result.firstname}
          </div>

          <div className="col-md-12">
            <ResultTracker tracker={result.tracker} />
          </div>
        </div>
      ))}
    </div>
  );
}
const mapStateToProps = (state, ownProps) => {
  const student_id = Number(ownProps.match.params.student_id);
  const exam_id = Number(ownProps.match.params.exam_id);
  // console.log(state.result_details);
  return {
    result_details: state.result_details,
    student_id,
    exam_id,
  };
};
const mapDispatchToProps = {
  resultDetail,
};
export default connect(mapStateToProps, mapDispatchToProps)(ResultDetail);
