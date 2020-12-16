import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import "../App.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
import FadeIn from "react-fade-in";
import * as Cookies from 'js-cookie';

const OnlineAttendance = (props) => {
    const [isClassValid, setIsClassValid] = useState(true);
    const [isSubjectValid, setIsSubjectValid] = useState(true);
    const [isFileValid, setIsFileValid] = useState(true);
    const [subject, setSubject] = useState("");
    const [batch, setBatch] = useState("");
    const [program, setProgram] = useState("");
    const [section, setSection] = useState("");
    const [year, setYear] = useState("");
    const [part, setPart] = useState("");
    const [programOptions, setProgramOptions] = useState([]);
    const [batchOptions, setBatchOptions] = useState([]);
    const [sectionOptions, setSectionOptions] = useState([]);
    const [yearOptions, setYearOptions] = useState([]);
    const [partOptions, setPartOptions] = useState([]);
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [classType, setClassType] = useState("L");
    const [attendanceFile, setAttendanceFile] = useState("");

    useEffect(() => {
        axios
            .get("/backend/program",{headers:{"authorization": Cookies.get('attendnace-jwt-token')}})
            .then((response) => {
                setProgram(response.data[0].id);
                setProgramOptions(
                    response.data.map((eachProgram) => (
                        <option value={eachProgram.id} key={eachProgram.id}>
                            {eachProgram.id}
                        </option>
                    ))
                );
            })
            .catch((err) => alert("Check your network connection"));
    }, []);

    useEffect(() => {
        const details = {
            program: program,
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        axios
            .post("/backend/class/getClass", formBody, {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                        "authorization": Cookies.get('attendnace-jwt-token')
                },
            })

            .then((response) => {
                if (
                    response.data.classes === undefined ||
                    response.data.classes.length === 0
                ) {
                    setIsClassValid(false);
                    setBatch("");
                    setBatchOptions([]);
                } else {
                    setIsClassValid(true);
                    var batches = [
                        ...new Set(
                            response.data.classes.map(
                                (eachClass) => eachClass.batch
                            )
                        ),
                    ].sort((a, b) => a - b);
                    setBatch(batches[0]);
                    setBatchOptions(
                        batches.map((eachBatch) => (
                            <option key={eachBatch} value={eachBatch}>
                                {eachBatch}
                            </option>
                        ))
                    );
                }
            })
            .catch((err) => {
                setIsClassValid(false);
                setBatch("");
                setBatchOptions([]);
            });

        axios
            .post("/backend/subject/getSubject", formBody, {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                         "authorization": Cookies.get('attendnace-jwt-token')
                },
            })
            .then((response) => {
                if (
                    response.data.subjects === undefined ||
                    response.data.subjects.length === 0
                ) {
                    setIsSubjectValid(false);
                    setYear("");
                    setYearOptions([]);
                } else {
                    setIsSubjectValid(true);
                    var years = [
                        ...new Set(
                            response.data.subjects.map(
                                (eachSubject) => eachSubject.year
                            )
                        ),
                    ].sort((a, b) => a - b);
                    setYear(years[0]);
                    setYearOptions(
                        years.map((eachYear) => (
                            <option key={eachYear} value={eachYear}>
                                {eachYear}
                            </option>
                        ))
                    );
                }
            })
            .catch((err) => {
                setIsSubjectValid(false);
                setYear("");
                setYearOptions([]);
            });
    }, [program]);

    useEffect(() => {
        if (batch === "") {
            setSection("");
            setSectionOptions([]);
        } else {
            const details = {
                program: program,
                batch: batch,
            };
            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            axios
                .post("/backend/class/getClass", formBody, {
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded;charset=UTF-8",
                            "authorization": Cookies.get('attendnace-jwt-token')
                    },
                })
                .then((response) => {
                    var class_groups_temp = [
                        ...new Set(
                            response.data.classes.map(
                                (eachClass) => eachClass.class_group
                            )
                        ),
                    ].sort((a, b) => a - b);

                    const class_groups = [];
                    class_groups_temp.forEach((ch, i) => {
                        if (i !== class_groups_temp.length - 1) {
                            if (
                                ch.charCodeAt(0) ===
                                    class_groups_temp[i + 1].charCodeAt(0) -
                                        1 &&
                                ch.charCodeAt(0) % 2 === 1
                            ) {
                                class_groups.push(
                                    ch + class_groups_temp[i + 1]
                                );
                            }
                        }
                    });
                    class_groups_temp.forEach((eachSection) =>
                        class_groups.push(eachSection)
                    );
                    setSection(class_groups[0]);
                    setSectionOptions(
                        class_groups.map((eachclass_group) => (
                            <option
                                key={eachclass_group}
                                value={eachclass_group}
                            >
                                {eachclass_group}
                            </option>
                        ))
                    );
                })
                .catch((err) => {
                    setSection("");
                    setSectionOptions([]);
                });
        }
    }, [program, batch]);

    useEffect(() => {
        if (year === "") {
            setPart("");
            setPartOptions([]);
        } else {
            const details = {
                program: program,
                year: year,
            };
            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            axios
                .post("/backend/subject/getSubject", formBody, {
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded;charset=UTF-8",
                            "authorization": Cookies.get('attendnace-jwt-token') 
                    },
                })
                .then((response) => {
                    var parts = [
                        ...new Set(
                            response.data.subjects.map(
                                (eachSubject) => eachSubject.part
                            )
                        ),
                    ].sort((a, b) => a - b);
                    setPart(parts[0]);
                    setPartOptions(
                        parts.map((eachPart) => (
                            <option key={eachPart} value={eachPart}>
                                {eachPart}
                            </option>
                        ))
                    );
                })
                .catch((err) => {
                    setPart("");
                    setPartOptions([]);
                });
        }
    }, [program, year]);

    useEffect(() => {
        if (year === "" || part === "") {
            setSubject("");
            setSubjectOptions([]);
        } else {
            const details = {
                program: program,
                year: year,
                part: part,
            };
            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            axios
                .post("/backend/subject/getSubject", formBody, {
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded;charset=UTF-8",
                            "authorization": Cookies.get('attendnace-jwt-token')
                    },
                })
                .then((response) => {
                    setSubject(
                        JSON.stringify([
                            response.data.subjects[0].code,
                            response.data.subjects[0].name,
                        ])
                    );
                    setSubjectOptions(
                        response.data.subjects.map((eachSubject) => (
                            <option
                                key={eachSubject.code}
                                value={JSON.stringify([
                                    eachSubject.code,
                                    eachSubject.name,
                                ])}
                            >
                                {eachSubject.code + " " + eachSubject.name}
                            </option>
                        ))
                    );
                })
                .catch((err) => {
                    setSubject("");
                    setSubjectOptions([]);
                });
        }
    }, [program, year, part]);

    useEffect(() => {
        attendanceFile === "" ? setIsFileValid(false) : setIsFileValid(true);
    }, [attendanceFile]);

    function handleSubmit(event) {
        event.preventDefault();
        if (isClassValid && isSubjectValid && isFileValid) {
            const details = {
                batch: batch,
                program: program,
                section: section,
                year: year,
                part: part,
                subject_code: JSON.parse(subject)[0],
                classType: classType,
                atten_file: attendanceFile,
            };
            var formData = new FormData();
            Object.keys(details).map((eachKey) =>
                formData.append(eachKey, details[eachKey])
            );
            axios
                .post("/backend/attendance/takeOnlineNext", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                         "authorization": Cookies.get('attendnace-jwt-token') 
                    },
                })
                .then(() => {
                    props.history.push("/");
                })
                .catch((err) =>
                    alert("Unexpected error while fetching attendance")
                );
        }
    }

    return (
        <FadeIn>
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
                                Program
                            </label>
                            <select
                                id="Program"
                                className="form-control"
                                name="program"
                                value={program}
                                onChange={(event) =>
                                    setProgram(event.target.value)
                                }
                                style={{
                                    borderColor:
                                        isSubjectValid || isClassValid
                                            ? "#ced4da"
                                            : "red",
                                }}
                            >
                                {programOptions}
                            </select>
                            <div className="invalid-feedback d-block">
                                {!isSubjectValid && isClassValid
                                    ? "Couldn't fetch subjects for this program"
                                    : ""}
                                {isSubjectValid && !isClassValid
                                    ? "Couldn't fetch class for this program"
                                    : ""}
                                {!isSubjectValid && !isClassValid
                                    ? "Couldn't fetch subject and class for this program"
                                    : ""}
                            </div>
                        </MDBCol>
                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormCardNameEx"
                                className="grey-text font-weight-light"
                            >
                                Batch
                            </label>
                            <select
                                id="Batch"
                                className="form-control"
                                name="batch"
                                value={batch}
                                onChange={(event) =>
                                    setBatch(event.target.value)
                                }
                            >
                                {batchOptions}
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
                                onChange={(event) =>
                                    setSection(event.target.value)
                                }
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
                                onChange={(event) =>
                                    setYear(event.target.value)
                                }
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
                                onChange={(event) =>
                                    setPart(event.target.value)
                                }
                            >
                                {partOptions}
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
                                onChange={(event) =>
                                    setSubject(event.target.value)
                                }
                            >
                                {subjectOptions}
                            </select>
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
                            Submit <i className="fas fa-clipboard-list"></i>
                        </MDBBtn>
                    </div>
                </form>
            </MDBContainer>
        </FadeIn>
    );
};

export default withRouter(OnlineAttendance);
