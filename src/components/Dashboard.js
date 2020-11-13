import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import axios from "axios";
import {
  MDBContainer,
  MDBListGroup,
  MDBListGroupItem,
  MDBCol,
  MDBRow,
  MDBBtn,
} from "mdbreact";
import "../App.css";

const Dashboard = () => {
  const [attendanceData, setattendanceData] = useState([]);
  useEffect(() => {
    axios
      .get("/attendance/getRecent/30")
      .then((res) => {
        console.log(res.data);
        setattendanceData(res.data);
      })
      .catch((err) => console.log(err));
    // fetch("/attendance/getRecent/30")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setattendanceData(data);
    //   });
    return () => console.log("unmounting...");
  }, [setattendanceData]);
  return (
    <MDBContainer>
      <hr />
      <hr />
      <h4>My Classes</h4>
      <hr />
      <MDBListGroup className=" ">
        {attendanceData.map((attendance) => (
          <div className="child">
            <MDBListGroupItem hover href="#">
              <div
                className="d-flex w-100 justify-content-between"
                style={{ color: "#007bff" }}
              >
                <h5 className="mb-1">{attendance.subject}</h5>
                <small>{attendance.program}</small>
              </div>

              <p className="mb-1">
                <strong>Program</strong>: {attendance.program}
                <br />
                <strong>Batch</strong>: {attendance.batch}
                <br />
                <strong>Section</strong>: {attendance.section}
              </p>
              <small>Donec id elit non mi porta.</small>
            </MDBListGroupItem>
          </div>
        ))}
      </MDBListGroup>
    </MDBContainer>
  );
};

export default withRouter(Dashboard);
