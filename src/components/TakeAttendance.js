import React, { useState, useEffect } from "react";
import { MDBTable, MDBTableBody, MDBTableHead,MDBBtn} from "mdbreact";
import "../App.css";
import { withRouter, Redirect, Link } from "react-router-dom";
import axios from "axios"
import { findAllByDisplayValue } from "@testing-library/react";


function TakeAttendance(props)
{
  console.log(props.location.state.data)
  const [data,setData]=useState(props.location.state.data)
  const [present,setPresent]=useState(props.location.state.data.students.map(()=>false))

  var classType;
  if(data.classes[0].classType==='L'){
    classType= (<h5>
      Lecture
      </h5>)
  }
  else if(data.classes[0].classType==='P'){
    classType=(<h5>
      Practical
      </h5>)
  }
  else{
    classType=(<div><h2>Class Type:</h2>
    <select id="classType" class="form-control" name="classType" value={data.classes[0].classType}>
    
    <option value="L">Lecture </option>
    <option value="P">Practical </option>
    
    </select></div>)
  }

  function handleChange(event){
      const roll_no=event.target.name
      setPresent(
        data.students.map((eachStudent,index)=> eachStudent.roll_no===roll_no? !present[index] : present[index])
      )

  }

  function handleSubmit(event){
    event.preventDefault()
    
    const details={
      'classType':data.classes[0].classType,
      'class_id':data.classes[0].id,
      'subject_code':data.subjects[0].code,
    }
    data.students.forEach((student,index)=>{
      if(present[index])
      {
        details[student.roll_no.toString()]='present'
        
      }
    })
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    axios.post('/attendance/submit',formBody,{
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        
      }})
      .then(()=>props.history.push(`/history/${data.classes[0].id}/${data.subjects[0].code}/${data.classes[0].classType}`))

  }




  return(
  <form name="theForm" onSubmit={handleSubmit}>
    <br />
    <br />
    <h2>{data.subjects[0].code} {data.subjects[0].subject}</h2>
    {classType}
    <hr />
    
  <MDBTable bordered hover responsive>
                   <MDBTableHead color="primary-color" textWhite>
                     <tr>
                       <th>Roll No</th>
                       <th>Name</th>
                       <th>Present/Absent</th>
                     </tr>
                   </MDBTableHead>
                   <MDBTableBody>
                   {data.students.map((student,index)=>{
                     return(<tr key={student.roll_no} style={{backgroundColor:present[index] ? '#90ee90' : '#ffcccb'}}>
                       <td>{student.roll_no}</td>
                        <td>{student.name}</td>
                        <td><input type="checkbox" name={student.roll_no} value={present[index] ?'present' : 'absent'} checked={present[index]} onChange={handleChange}/></td>
                     </tr>)
                   })}
                   </MDBTableBody>
           </MDBTable>
           
           <MDBBtn  color="primary" type="submit" style={{ color: "white" }}>
            Submit
          </MDBBtn>
          </form>
           
    
  )
}

export default withRouter(TakeAttendance)