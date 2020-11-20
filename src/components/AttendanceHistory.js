import React from "react";
import { withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBInput,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBDropdownToggle,
} from "mdbreact";

import DeleteButton from "./DeleteButton";

//var trecords = {};undefined

const AttendanceHistory = (props) => {
  const [counts, setCounts] = useState({});
  const [details, setDetails] = useState({});
  const [records, setRecords] = useState({});
  const [temprecords, setTemprecords] = useState({});
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(false);
  const [present, setPresent] = useState([]);
  const [absent, setAbsent] = useState([]);
  const [visited, setVisited] = useState([]);
  const [beginEdit, setBeginEdit] = useState(false);
  const [beginDelete, setBeginDelete] = useState(false);
  const classId = props.match.params.classId;
  const subjectCode = props.match.params.subjectCode;
  const classType = props.match.params.classType;
  const attendance = props.location.state.attendance;
  useEffect(() => {
    axios
      .get(`/attendance/all/${classId}/${subjectCode}/${classType}`)
      .then((res) => {
        console.log(res.data);
        var recs = res.data.records;
        Object.keys(recs).map((i) => {
          recs[i].editable = false;
        });
        //var recs_copy = { ...recs };
        setCounts(res.data.counts);
        setDetails(res.data.details);
        setRecords(recs);
        console.log(res);
        setStudents(res.data.students);
      })
      .catch((err) => console.log(err));
  }, []);
  //console.log(props.match);

  const changeEditable = (i) => {
    console.log("change editable called");
    var recs = { ...records };
    if (!recs[i].editable && !editing) {
      //setTemprecords(recs[i]);
      recs[i].editable = true;
      setRecords(recs);
      setEditing(true);
    } else if (recs[i].editable) {
      //trecords[i].editable = false;
      recs[i].editable = false;
      //recs[i] = temprecords;
      present.map((n) => {
        if (!recs[i].students.includes(n)) {
          recs[i].students.push(n);
        }
      });
      absent.map((n) => {
        recs[i].students = recs[i].students.filter((r) => r !== n);
      });
      //console.log(recordsstudents);
      //console.log(temprecords);
      setRecords(recs);
      setEditing(false);
    }

    // console.log(recs);
  };

  const handleChange = (i, roll_no) => {
    console.log("handle change called");
    if (!editing) {
      //trecords = { ...records };
      setEditing(true);
    }
    var temp = { ...records };
    if (temp[i].students.includes(roll_no)) {
      temp[i].students = temp[i].students.filter((item) => item !== roll_no);
      if (!visited.includes(roll_no)) {
        var pr = [...present];
        pr.push(roll_no);
        setPresent(pr);
        var v = [...visited];
        v.push(roll_no);
        setVisited(v);
      }
    } else {
      temp[i].students.push(roll_no);
      if (!visited.includes(roll_no)) {
        var ab = [...absent];
        ab.push(roll_no);
        setAbsent(ab);
        var v = [...visited];
        v.push(roll_no);
        setVisited(v);
      }
    }
    setRecords(temp);
    console.log(records);
    //console.log(trecords);
  };

  const updateRecords = (i) => {
    console.log("update records called");
    var recs = { ...records };
    recs[i].editable = false;
    setRecords(recs);
    //setTemprecords(recs);
    setEditing(false);
    setPresent([]);
    setAbsent([]);
    setVisited([]);
    var c = updateCount();
    setCounts(c);
    //setTemprecords(recs);
    console.log(records);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //withCredentials: true,
      body: JSON.stringify({ students: records[i].students.sort() }),
    };

    fetch(`/attendance/edit/${i}`, requestOptions).then((res) => {
      console.log(res);
    });
  };

  var deleteRecord = (i) => {
    //var recs = { ...records };
    const { [i]: remove, ...rest } = records;
    setRecords(rest);
    //recs[i] = undefined;
    //console.log(remove);
    //console.log(rest);
    // const recs = Object.keys(records).reduce((object, key) => {
    //   if (key !== i) {
    //     object[key] = records[key];
    //   }
    //   return object;
    // }, {});

    console.log(rest);
    setRecords(rest);
    console.log(records);
    var c = updateCount();
    setCounts(c);
    // console.log(counts);
    // console.log(records);

    axios
      .get(`/attendance/delete/${i}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const updateCount = () => {
    //console.log(records);
    var count = {};
    students.forEach((student) => {
      var c = 0;
      Object.keys(records).forEach((i) => {
        if (records[i].students.includes(student.roll_no)) {
          c += 1;
        }
      });
      count[student.roll_no] = c;
    });
    return count;
  };
  return (
    <div>
      <br />
      <p>
        <strong>Subject: </strong>
        {attendance.subject}(
        {attendance.classType == "L" ? "Lecture" : "Practical"})
      </p>
      <p>
        <strong>Batch: </strong>
        {attendance.batch}
        {attendance.program}
        (Section {attendance.section})
      </p>
      <MDBBtn
        color="primary"
        style={{ width: "fit-content" }}
        onClick={() => {
          setBeginEdit(!beginEdit);
        }}
      >
        Edit
      </MDBBtn>
      {!beginEdit ? (
        <MDBBtn
          color="danger"
          style={{ width: "fit-content" }}
          onClick={() => setBeginDelete(!beginDelete)}
        >
          Delete
        </MDBBtn>
      ) : null}
      <MDBTable bordered hover responsive>
        <MDBTableHead color="primary-color" textWhite>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            {Object.keys(records).map((i) =>
              beginEdit ? (
                <th key={i}>
                  {" "}
                  <MDBBtn
                    style={{ width: "fit-content" }}
                    color="primary"
                    onClick={() => changeEditable(i)}
                  >
                    {new Date(records[i].date).toDateString()}{" "}
                  </MDBBtn>{" "}
                  {records[i].editable ? (
                    <MDBBtn
                      style={{ width: "fit-content", color: "white" }}
                      onClick={() => updateRecords(i)}
                    >
                      Save
                    </MDBBtn>
                  ) : null}
                </th>
              ) : (
                <th>
                  {new Date(records[i].date).toDateString()}{" "}
                  {beginDelete ? (
                    <DeleteButton id={i} deleteRecord={deleteRecord} />
                  ) : null}{" "}
                </th>
              )
            )}

            {Object.keys(records).length > 0 ? <th>Total Present</th> : null}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {students.map((student, index) => (
            <tr key={student.roll_no}>
              <td>
                <strong style={{ "font-weight": "bold" }}>
                  {student.roll_no}
                </strong>
              </td>
              <td>
                <strong style={{ "font-weight": "bold" }}>
                  {student.name}
                </strong>
              </td>
              {Object.keys(records).length > 0
                ? Object.keys(records).map((i) => (
                    <td>
                      {records[i].editable ? (
                        <input
                          type="checkbox"
                          defaultChecked={
                            records[i].students.includes(student.roll_no)
                              ? true
                              : false
                          }
                          // value={
                          //   records[i].students.includes(student.roll_no)
                          //     ? "present"
                          //     : "absent"
                          // }
                          id={`checkbox${i}_${student.roll_no}`}
                          onChange={() => handleChange(i, student.roll_no)}
                        />
                      ) : records[i].students.includes(student.roll_no) ? (
                        <strong
                          style={{ color: "green", "font-weight": "bold" }}
                        >
                          {" "}
                          P
                        </strong>
                      ) : (
                        <strong style={{ color: "red", "font-weight": "bold" }}>
                          A
                        </strong>
                      )}
                    </td>
                  ))
                : null}
              {Object.keys(records).length > 0 ? (
                <td>
                  <strong style={{ "font-weight": "bold" }}>
                    {counts[student.roll_no] ? counts[student.roll_no] : 0}
                  </strong>
                </td>
              ) : null}
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default withRouter(AttendanceHistory);
