import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import axios from "axios";
import { MDBContainer, MDBListGroup } from "mdbreact";
import "../App.css";
import ClassList from "./ClassList";
import * as Cookies from 'js-cookie';

const Dashboard = () => {
    const [attendanceData, setattendanceData] = useState([]);
    useEffect(() => {
        axios
            .get("/backend/attendance/getRecent/30", {headers: { "authorization": Cookies.get('attendnace-jwt-token') }})
            .then((res) => {
                console.log(res.status)
                if (res.status ===401) {
                    this.props.setloading(true);
                    this.props.history.push("/");
                    this.props.setloading(false);
                  }
                setattendanceData(res.data);
            })
            .catch((err) => console.log(err));
     
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
