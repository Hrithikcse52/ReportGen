import React from "react";
import "./styles.css";

const Base = ({
  title = "HomePage",
  description = "Create Patient Report",
  className = "text-white bg-dark p-4",
  children,
}) => {
  return (
    <div>
      <div className="constainer-fluid">
        <div className="jumbotron text-center bg-dark">
          <div className="display-4 text-white">{title}</div>
          <p className="lead text-white"> {description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark mt-auto ">
        <div className="container-fluid text-center bg-success text-white py-1 ">
          <h4>If You Got Any Query Feel Free To Reach Out!</h4>
          <button className="btn btn-sm btn-warning">Contact Us</button>
        </div>
      </footer>
    </div>
  );
};

export default Base;
