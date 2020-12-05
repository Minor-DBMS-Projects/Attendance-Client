import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import "../App.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
var APICall = require("./utilities/APICall");

const OnlineAttendance = (props) => {
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
    const [isBatchValid, setIsBatchValid] = useState(true);
    const [isSubjectValid, setIsSubjectValid] = useState(true);
    const [isFileValid, setIsFileValid] = useState(true);
    const [sections, setSections] = useState(["AB", "CD", "EF", "GH"]);
    const years = ["1", "2", "3", "4", "5"];
    const [batch, setBatch] = useState("");
    const [program, setProgram] = useState("BCT");
    const [section, setSection] = useState("AB");
    const [year, setYear] = useState("1");
    const [part, setPart] = useState("1");
    const [subject, setSubject] = useState("");
    const [classType, setClassType] = useState("L");
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [attendanceFile, setAttendanceFile] = useState("");
    const [programOptions, setProgramOptions] = useState(
        programs.map((eachProgram) => (
            <option key={eachProgram} value={eachProgram}>
                {eachProgram}
            </option>
        ))
    );
    const [sectionOptions, setSectionOptions] = useState([]);
    const [yearOptions, setYearOptions] = useState(
        years.map((eachYear) => (
            <option key={eachYear} value={eachYear}>
                {eachYear}
            </option>
        ))
    );

    useEffect(() => {
        setSectionOptions(
            sections.map((eachSection) => (
                <option key={eachSection} value={eachSection}>
                    {eachSection}
                </option>
            ))
        );
        APICall.fetchSubjects(program, year, part)
            .then((subjects) => {
                if (subjects === undefined || subjects.length === 0) {
                    setSubject("");
                    setSubjectOptions([]);
                    setIsSubjectValid(false);
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
                    setIsSubjectValid(true);
                }
            })
            .catch((error) => console.log(error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        APICall.fetchSubjects(program, year, part)
            .then((subjects) => {
                if (subjects === undefined || subjects.length === 0) {
                    setSubject("");
                    setSubjectOptions([]);
                    setIsSubjectValid(false);
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
                    setIsSubjectValid(true);
                }
            })
            .catch((error) => console.log(error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [program, year, part]);

    useEffect(() => {
        setIsBatchValid(true);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [batch, sections]);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [program, sections]);

    useEffect(() => {
        classType === "L"
            ? setSections(["AB", "CD", "EF", "GH"])
            : setSections(["A", "B", "C", "D", "E", "F", "G", "H"]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [classType]);

    useEffect(() => {
        attendanceFile === "" ? setIsFileValid(false) : setIsFileValid(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attendanceFile]);

    function handleSubmit(event) {
        event.preventDefault();

        if (isSubjectValid && isFileValid) {
            APICall.fetchStudents(program, batch, section.charAt(0)).then(
                (studentList) => {
                    if (studentList === undefined || studentList.length === 0) {
                        setIsBatchValid(false);
                    } else {
                        const studentDetails = {
                            batch: batch,
                            program: program,
                            section: section.charAt(0),
                            students: JSON.stringify(studentList),
                        };
                        var studentFormBody = [];
                        for (var property in studentDetails) {
                            var encodedKey = encodeURIComponent(property);
                            var encodedValue = encodeURIComponent(
                                studentDetails[property]
                            );
                            studentFormBody.push(
                                encodedKey + "=" + encodedValue
                            );
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
                                if (section.length === 2) {
                                    APICall.fetchStudents(
                                        program,
                                        batch,
                                        section.charAt(1)
                                    ).then((nextStudentList) => {
                                        const nextStudentDetails = {
                                            batch: batch,
                                            program: program,
                                            section: section.charAt(1),
                                            students: JSON.stringify(
                                                nextStudentList
                                            ),
                                        };
                                        var nextStudentFormBody = [];
                                        for (var property in nextStudentDetails) {
                                            var encodedKey = encodeURIComponent(
                                                property
                                            );
                                            var encodedValue = encodeURIComponent(
                                                nextStudentDetails[property]
                                            );
                                            nextStudentFormBody.push(
                                                encodedKey + "=" + encodedValue
                                            );
                                        }
                                        nextStudentFormBody = nextStudentFormBody.join(
                                            "&"
                                        );
                                        axios
                                            .post(
                                                "/backend/class/add-class",
                                                nextStudentFormBody,
                                                {
                                                    headers: {
                                                        "Content-Type":
                                                            "application/x-www-form-urlencoded;charset=UTF-8",
                                                    },
                                                }
                                            )
                                            .catch((err) =>
                                                alert("Error adding class")
                                            );
                                    });
                                }
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
                                    var encodedKey = encodeURIComponent(
                                        property
                                    );
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
                                            subject_code: JSON.parse(
                                                subject
                                            )[0],
                                            classType: classType,
                                            atten_file: attendanceFile,
                                        };
                                        var formData = new FormData();
                                        Object.keys(details).map((eachKey) =>
                                            formData.append(
                                                eachKey,
                                                details[eachKey]
                                            )
                                        );
                                        axios
                                            .post(
                                                "/backend/attendance/takeOnlineNext",
                                                formData,
                                                {
                                                    headers: {
                                                        "Content-Type":
                                                            "multipart/form-data",
                                                    },
                                                }
                                            )
                                            .then(() => {
                                                props.history.push("/");
                                            })
                                            .catch((err) =>
                                                alert(
                                                    "Unexpected error while fetching attendance"
                                                )
                                            );
                                    })
                                    .catch((err) =>
                                        alert(
                                            "Unexpected error while adding subjects"
                                        )
                                    );
                            })
                            .catch((err) =>
                                alert("Unexpected error while adding classes")
                            );
                    }
                }
            );
        }
    }

    return (
        <MDBContainer>
            <br />
            <br />

            <form onSubmit={handleSubmit}>
                <p className="h4 text-center py-4">Online Class Details</p>
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
                            style={{
                                borderColor: isBatchValid ? "#ced4da" : "red",
                            }}
                            onChange={(event) => setBatch(event.target.value)}
                        />
                        <div className="invalid-feedback d-block">
                            {!isBatchValid
                                ? "Please provide a valid batch."
                                : ""}
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
                            style={{
                                borderColor: isSubjectValid ? "#ced4da" : "red",
                            }}
                        >
                            {subjectOptions}
                        </select>
                        <div className="invalid-feedback d-block">
                            {!isSubjectValid
                                ? "Error fetching subjects for the credentials provided"
                                : ""}
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="4" className="mb-3">
                        <label
                            htmlFor="defaultFormCardNameEx"
                            className="grey-text font-weight-light"
                        >
                            Class Type
                        </label>
                        <select
                            id="ClassType"
                            className="form-control"
                            name="classType"
                            value={classType}
                            onChange={(event) =>
                                setClassType(event.target.value)
                            }
                        >
                            <option value="L">Lecture</option>
                            <option value="P">Practical</option>
                        </select>
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                        <label
                            htmlFor="defaultFormCardNameEx"
                            className="grey-text font-weight-light"
                        >
                            Upload attendance file
                        </label>
                        <input
                            type="file"
                            id="attendance"
                            className="form-control-file"
                            name="atten_file"
                            onChange={(event) => {
                                setAttendanceFile(event.target.files[0]);
                            }}
                        />
                        <div className="invalid-feedback d-block">
                            {!isFileValid ? "No file selected" : ""}
                        </div>
                    </MDBCol>
                </MDBRow>
                <div className="text-center py-4 mt-3">
                    <MDBBtn className="btn btn-outline-blue" type="submit">
                        Submit
                        <i
                            className="fas fa-clipboard-list"
                            style={{ paddingLeft: 10, paddingRight: 10 }}
                        ></i>
                    </MDBBtn>
                </div>
            </form>
        </MDBContainer>
    );
};

export default withRouter(OnlineAttendance);
