import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import axios from "axios";
import { MDBContainer, MDBListGroup } from "mdbreact";
import "../App.css";
import ClassList from "./ClassList";

const Dashboard = () => {
    const [attendanceData, setattendanceData] = useState([]);
    useEffect(() => {
        axios
            .get("/backend/attendance/getRecent/30")
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
                {attendanceData.map((attendance, index) => (
                    <ClassList key={index} attendance={attendance} />
                ))}
            </MDBListGroup>
        </MDBContainer>
    );
};

export default withRouter(Dashboard);
