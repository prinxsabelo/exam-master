import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";

function Result() {
  const [redirect, setRedirect] = useState(false);
  function logOut() {
    localStorage.removeItem("student");
  }
  return (
    <>
      {redirect && <Redirect to="/student" />}
      <div className="container">
        <div className="row justify-content-center mx-auto mt-5">
          <div className="col-md-5 shadow-lg p-3 m-3">
            <div className="card-block h3 text-uppercase text-center">
              Submitted
              <div className="p-4">
                {/* <button>Logout</button> */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    logOut();
                    setRedirect(true);
                  }}
                >
                  LogOut
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Result;
