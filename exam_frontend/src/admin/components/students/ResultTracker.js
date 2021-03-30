import React from "react";
const ResultTracker = ({ tracker }) => {
  return (
    <div>
      {tracker.map((track, index) => (
        <div className="row shadow p-2" key={track.id}>
          <div className="col-md-1">{index + 1}</div>
          <div className="col-md-11">
            <div className="row p-3">
              <div className="col-md-1 initialism">Question: </div>
              <div className="col-md-11">{track.question}</div>
            </div>
            {track.correct_option === track.picked_answer && (
              <div className="row">
                <div className="col-md-6 p-2 shadow bg-success text-white">
                  {track.picked_answer}
                </div>
              </div>
            )}
            {track.correct_option !== track.picked_answer && (
              <div className="row">
                <div className="col-md-6 p-2 shadow bg-danger text-white">
                  {track.picked_answer}
                </div>
                <div className="col-md-6 p-2 shadow bg-success text-white">
                  {track.correct_option}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default ResultTracker;
