import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import "../App.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
var APICall = require("./utilities/APICall");

const ClassDetails = (props) => {
    const programs = [
        "BCT",
        "BEI",
        "BEX",
        "BEL",
        "BCE",
        "BME",
        "BAR",
        "BAS",
        "BCH",
    ];
    const [isValid, setIsValid] = useState(true);
    const sections = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const years = ["1", "2", "3", "4", "5"];
    const [subject, setSubject] = useState("");
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [batch, setBatch] = useState("");
    const [program, setProgram] = useState("BCT");
    const [section, setSection] = useState("A");
    const [year, setYear] = useState("1");
    const [part, setPart] = useState("1");
    const [programOptions, setProgramOptions] = useState(
        programs.map((eachProgram) => (
            <option key={eachProgram} value={eachProgram}>
                {eachProgram}
            </option>
        ))
    );
    const [sectionOptions, setSectionOptions] = useState(
        sections.map((eachSection) => (
            <option key={eachSection} value={eachSection}>
                {eachSection}
            </option>
        ))
    );
    const [yearOptions, setYearOptions] = useState(
        years.map((eachYear) => (
            <option key={eachYear} value={eachYear}>
                {eachYear}
            </option>
        ))
    );

    useEffect(() => {
        APICall.fetchSubjects(program, year, part)
            .then((subjects) => {
                console.log(subjects);
                if (subjects === undefined || subjects.length === 0) {
                    setSubject("");
                    setSubjectOptions([]);
                } else {
                    setSubject(JSON.stringify(subjects[0]));
                    setSubjectOptions(
                        subjects.map((eachSubject) => (
                            <option
                                key={eachSubject[0]}
                                value={JSON.stringify(eachSubject)}
                            >
                                {eachSubject[0]} {eachSubject[1]}
                            </option>
                        ))
                    );
                }
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        APICall.fetchSubjects(program, year, part)
            .then((subjects) => {
                console.log(subjects);
                if (subjects === undefined || subjects.length === 0) {
                    setSubject("");
                    setSubjectOptions([]);
                } else {
                    setSubject(JSON.stringify(subjects[0]));
                    setSubjectOptions(
                        subjects.map((eachSubject) => (
                            <option
                                key={eachSubject[0]}
                                value={JSON.stringify(eachSubject)}
                            >
                                {eachSubject[0]} {eachSubject[1]}
                            </option>
                        ))
                    );
                }
            })
            .catch((error) => console.log(error));
    }, [program, year, part]);

    useEffect(() => {
        setIsValid(true);
        if (batch.length === 3) {
            if (program === "BCT") {
                if (parseInt(batch) < 75) {
                    setSectionOptions(
                        sections
                            .filter(
                                (eachSection) => eachSection.charCodeAt(0) < 67
                            )
                            .map((eachSection) => (
                                <option key={eachSection} value={eachSection}>
                                    {eachSection}
                                </option>
                            ))
                    );
                } else {
                    setSectionOptions(
                        sections
                            .filter(
                                (eachSection) => eachSection.charCodeAt(0) < 69
                            )
                            .map((eachSection) => (
                                <option key={eachSection} value={eachSection}>
                                    {eachSection}
                                </option>
                            ))
                    );
                }
            }

            if (parseInt(batch) < 76) {
                if (parseInt(batch) < 75) {
                    setProgramOptions(
                        programs
                            .filter(
                                (eachProgram) =>
                                    eachProgram !== "BCH" &&
                                    eachProgram !== "BAS" &&
                                    eachProgram !== "BEI"
                            )
                            .map((eachProgram) => (
                                <option key={eachProgram} value={eachProgram}>
                                    {eachProgram}
                                </option>
                            ))
                    );
                } else {
                    setProgramOptions(
                        programs
                            .filter(
                                (eachProgram) =>
                                    eachProgram !== "BCH" &&
                                    eachProgram !== "BEX"
                            )
                            .map((eachProgram) => (
                                <option key={eachProgram} value={eachProgram}>
                                    {eachProgram}
                                </option>
                            ))
                    );
                }
            } else {
                setProgramOptions(
                    programs
                        .filter((eachProgram) => eachProgram !== "BEX")
                        .map((eachProgram) => (
                            <option key={eachProgram} value={eachProgram}>
                                {eachProgram}
                            </option>
                        ))
                );
            }
        } else {
            setProgramOptions(
                programs.map((eachProgram) => (
                    <option key={eachProgram} value={eachProgram}>
                        {eachProgram}
                    </option>
                ))
            );
            setSectionOptions(
                sections.map((eachSection) => (
                    <option key={eachSection} value={eachSection}>
                        {eachSection}
                    </option>
                ))
            );
        }
    }, [batch]);

    useEffect(() => {
        if (program !== "BAR") {
            setYearOptions(
                years
                    .filter((eachYear) => eachYear !== "5")
                    .map((eachYear) => (
                        <option key={eachYear} value={eachYear}>
                            {eachYear}
                        </option>
                    ))
            );
        } else {
            setYearOptions(
                years.map((eachYear) => (
                    <option key={eachYear} value={eachYear}>
                        {eachYear}
                    </option>
                ))
            );
        }
        if (program === "BCE") {
            setSectionOptions(
                sections.map((eachSection) => (
                    <option key={eachSection} value={eachSection}>
                        {eachSection}
                    </option>
                ))
            );
        } else if (
            program === "BCT" &&
            batch.length === 3 &&
            parseInt(batch) > 74
        ) {
            setSectionOptions(
                sections
                    .filter((eachSection) => eachSection.charCodeAt(0) < 69)
                    .map((eachSection) => (
                        <option key={eachSection} value={eachSection}>
                            {eachSection}
                        </option>
                    ))
            );
        } else {
            setSectionOptions(
                sections
                    .filter((eachSection) => eachSection.charCodeAt(0) < 67)
                    .map((eachSection) => (
                        <option key={eachSection} value={eachSection}>
                            {eachSection}
                        </option>
                    ))
            );
        }
    }, [program]);

    function handleSubmit(event) {
        event.preventDefault();
        //event.target.className += " was-validated";

        APICall.fetchStudents(program, batch, section).then((studentList) => {
            if (studentList === undefined || studentList.length === 0) {
                setIsValid(false);
            } else {
                const studentDetails = {
                    batch: batch,
                    program: program,
                    section: section,
                    students: JSON.stringify(studentList),
                };
                var studentFormBody = [];
                for (var property in studentDetails) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(
                        studentDetails[property]
                    );
                    studentFormBody.push(encodedKey + "=" + encodedValue);
                }
                studentFormBody = studentFormBody.join("&");
                axios
                    .post("/backend/class/add-class", studentFormBody, {
                        headers: {
                            "Content-Type":
                                "application/x-www-form-urlencoded;charset=UTF-8",
                        },
                    })

                    .then(() => {
                        const subjectDetails = {
                            program: program,
                            year: year,
                            part: part,
                            subject: subject,
                        };
                        var subjectFormBody = [];
                        for (var property in subjectDetails) {
                            var encodedKey = encodeURIComponent(property);
                            var encodedValue = encodeURIComponent(
                                subjectDetails[property]
                            );
                            subjectFormBody.push(
                                encodedKey + "=" + encodedValue
                            );
                        }
                        subjectFormBody = subjectFormBody.join("&");
                        axios
                            .post(
                                "/backend/subject/add-subject",
                                subjectFormBody,
                                {
                                    headers: {
                                        "Content-Type":
                                            "application/x-www-form-urlencoded;charset=UTF-8",
                                    },
                                }
                            )
                            .then(() => {
                                const details = {
                                    batch: batch,
                                    program: program,
                                    section: section,
                                    year: year,
                                    part: part,
                                    subject: subject,
                                };
                                var formBody = [];
                                for (var property in details) {
                                    var encodedKey = encodeURIComponent(
                                        property
                                    );
                                    var encodedValue = encodeURIComponent(
                                        details[property]
                                    );
                                    formBody.push(
                                        encodedKey + "=" + encodedValue
                                    );
                                }
                                formBody = formBody.join("&");
                                axios
                                    .post(
                                        "/backend/attendance/take",
                                        formBody,
                                        {
                                            headers: {
                                                "Content-Type":
                                                    "application/x-www-form-urlencoded;charset=UTF-8",
                                            },
                                        }
                                    )
                                    .then((response) => {
                                        props.history.push({
                                            pathname: "/new/student/namelist",
                                            state: {
                                                data: response.data,
                                            },
                                        });
                                    })
                                    .catch((err) =>
                                        alert(
                                            "Unexpected error while fetching attendance"
                                        )
                                    );
                            })
                            .catch((err) =>
                                alert("Unexpected error while adding subjects")
                            );
                    })
                    .catch((err) =>
                        alert("Unexpected error while adding classes")
                    );
            }
        });
    }

    return (
        <MDBContainer>
            <br />
            <br />

            <form onSubmit={handleSubmit}>
                <p className="h4 text-center py-4">Class Details</p>
                <MDBRow>
                    <MDBCol md="4" className="mb-3">
                        <label
                            htmlFor="defaultFormCardNameEx"
                            className="grey-text font-weight-light"
                        >
                            Batch
                        </label>
                        <input
                            type="text"
                            id="defaultFormCardNameEx"
                            className="form-control"
                            placeholder="Eg. 074"
                            value={batch}
                            name="batch"
                            style={{ borderColor: isValid ? "#ced4da" : "red" }}
                            onChange={(event) => setBatch(event.target.value)}
                        />
                        <div className="invalid-feedback d-block">
                            {!isValid ? "Please provide a valid batch." : ""}
                        </div>
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                        <label
                            htmlFor="defaultFormCardNameEx"
                            className="grey-text font-weight-light"
                        >
                            Program
                        </label>
                        <select
                            id="Program"
                            className="form-control"
                            name="program"
                            value={program}
                            onChange={(event) => setProgram(event.target.value)}
                        >
                            {programOptions}
                        </select>
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                        <label
                            htmlFor="defaultFormCardNameEx"
                            className="grey-text font-weight-light"
                        >
                            Section
                        </label>
                        <select
                            id="Section"
                            className="form-control"
                            name="section"
                            value={section}
                            onChange={(event) => setSection(event.target.value)}
                        >
                            {sectionOptions}
                        </select>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="4" className="mb-3">
                        <label
                            htmlFor="defaultFormCardNameEx"
                            className="grey-text font-weight-light"
                        >
                            Year
                        </label>
                        <select
                            id="Year"
                            className="form-control"
                            name="year"
                            value={year}
                            onChange={(event) => setYear(event.target.value)}
                        >
                            {yearOptions}
                        </select>
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                        <label
                            htmlFor="defaultFormCardNameEx"
                            className="grey-text font-weight-light"
                        >
                            Part
                        </label>
                        <select
                            id="Part"
                            className="form-control"
                            name="part"
                            value={part}
                            onChange={(event) => setPart(event.target.value)}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                        <label
                            htmlFor="defaultFormCardNameEx"
                            className="grey-text font-weight-light"
                        >
                            Subject
                        </label>
                        <select
                            id="Subject"
                            className="form-control"
                            name="subject"
                            value={subject}
                            onChange={(event) => setSubject(event.target.value)}
                        >
                            {subjectOptions}
                        </select>
                    </MDBCol>
                </MDBRow>
                <div className="text-center py-4 mt-3">
                    <MDBBtn className="btn btn-outline-blue" type="submit">
                        Take Attendance{" "}
                        <i className="fas fa-clipboard-list"></i>
                    </MDBBtn>
                </div>
            </form>
        </MDBContainer>
    );
};

export default withRouter(ClassDetails);
