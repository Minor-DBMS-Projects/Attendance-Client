import React, { useState, useEffect } from "react";
import { MDBListGroupItem, MDBBtn } from "mdbreact";
import "../App.css";
import { withRouter, Redirect, Link } from "react-router-dom";

const ClassList = (props) => {
  const viewAttendance = () => {
    // return (
    //   <Redirect
    //     to={`/history/${props.attendance.class}/${props.attendance.subjectCode}/${props.attendance.classType}`}
    //   />
    // );
    props.history.push(
      `/history/${props.attendance.class}/${props.attendance.subjectCode}/${props.attendance.classType}`
    );
  };
  return (
    <div className="child">
      <MDBListGroupItem hover>
        <div
          className="d-flex w-100 justify-content-between"
          style={{ color: "#007bff" }}
        >
          <h5 className="mb-1">{props.attendance.subject}</h5>
          <small>{props.attendance.program}</small>
        </div>

        <p className="mb-1">
          <strong>Program</strong>: {props.attendance.program}
          <br />
          <strong>Batch</strong>: {props.attendance.batch}
          <br />
          <strong>Section</strong>: {props.attendance.section}
        </p>
        <Link
          to={`/history/${props.attendance.class}/${props.attendance.subjectCode}/${props.attendance.classType}`}
        >
          <MDBBtn color="primary" style={{ color: "white" }}>
            Attendance history
          </MDBBtn>
        </Link>
      </MDBListGroupItem>
    </div>
  );
};

export default withRouter(ClassList);
