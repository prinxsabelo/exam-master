import React from "react";
const StudentExamList = ({ exams, handleExamClick }) => {
  console.log(exams)
  return (
    <div className="container shadow-lg p-2">
      {exams.length > 0 ? (
        <>
          {exams.map((exam) => (
            <div key={exam.id}>
              {exam.finish === 0 ?
                <div
                  className="row justify-content-center p-4"
                  key={exam.id}
                  onClick={(e) => handleExamClick(exam)}
                >
                  <div
                    className="col-md-12 text-uppercase h5 text-center p-3 shadow"
                    style={{ cursor: "pointer" }}
                  >
                    {exam.exam_title} - {exam.level}
                  </div>
                </div>
                :
                <div
                  className="row justify-content-center mt-5 bg-warning m-3 p-2"
                  key={exam.id}

                >
                  <div
                    className="col-md-12 text-uppercase h5 text-center "

                  >
                    {exam.exam_title}
                  </div>
                  <div className="col-md-12 text-center">
                    You have done exam already.
                  </div>
                </div>
              }
            </div>

          ))}
        </>
      ) :
        <div className="shadow p-3 m-3 initialism col-md-5">
          You have no exam to write..
        </div>
      }
    </div>
  );
};
export default StudentExamList;
