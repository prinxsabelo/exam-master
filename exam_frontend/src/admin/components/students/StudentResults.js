import React from "react";
export default function StudentResults({
  studentResultDetail,
  results,
  ...props
}) {
  if (results) {
    if (results.length === 0) {
      return (
        <div className="container-fluid mt-2 pt-2 pb-2 shadow">
          <div className="row">
            <div className="col-md-6 ">
              <div className="card-block  shadow m-1 p-3 initialism">
                No result found..
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container-fluid mt-2 pt-2 pb-2 shadow">
        <div className="row">
          {results.length > 0 ? (
            <>
              {results.map((result) => (
                <div
                  className="col-md-6 "
                  key={result.id}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => studentResultDetail(result)}
                >
                  <div className="card-block  shadow m-1 p-3 initialism">
                    <div>
                      Course Detail:{result.name} - {result.code}
                    </div>
                    <div>Score: {result.score} </div>
                  </div>
                </div>
              ))}
            </>
          ) :
            <div className="col-md-12">
              No result  available..
            </div>
          }
        </div>
      </div>
    );
  }
  return <div></div>;
}
