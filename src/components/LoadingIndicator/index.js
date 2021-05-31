import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingIndicator = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Spinner
        animation="border"
        variant="primary"
        style={{ width: "60px", height: "60px" }}
      ></Spinner>
      <h5 className="mt-3">Loading</h5>
    </div>
  );
};

export default LoadingIndicator;
