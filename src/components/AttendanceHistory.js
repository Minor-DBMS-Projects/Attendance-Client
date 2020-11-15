import React from "react";
import { withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

const AttendanceHistory = (props) => {
  const [counts, setCounts] = useState({});
  const [details, setDetails] = useState({});
  const [records, setRecords] = useState({});
  const [students, setStudents] = useState([]);
  const classId = props.match.params.classId;
  const subjectCode = props.match.params.subjectCode;
  const classType = props.match.params.classType;
  useEffect(() => {
    axios
      .get(`/attendance/all/${classId}/${subjectCode}/${classType}`)
      .then((res) => {
        console.log(res.data);
        setCounts(res.data.counts);
        setDetails(res.data.details);
        setRecords(res.data.records);
        setStudents(res.data.students);
      })
      .catch((err) => console.log(err));
  }, []);
  //console.log(props.match);
  return (
    <MDBTable bordered hover responsive>
      <MDBTableHead color="primary-color" textWhite>
        <tr>
          <th>Roll No</th>
          <th>Name</th>
          {Object.keys(records).map((i) => (
            <th key={i}> {new Date(records[i].date).toDateString()} </th>
          ))}

          <th>Total Present</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {students.map((student, index) => (
          <tr key={student.roll_no}>
            <td>{student.roll_no}</td>
            <td>{student.name}</td>
            {Object.keys(records).map((i) => (
              <td>
                {records[i].students.includes(student.roll_no) ? "P" : "A"}
              </td>
            ))}
            <td>{counts[student.roll_no] ? counts[student.roll_no] : 0}</td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
};

export default withRouter(AttendanceHistory);
