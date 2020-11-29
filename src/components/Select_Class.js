import React, { useState, useEffect } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBIcon,
} from "mdbreact";
import "../App.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
const Select_Class = (props) => {
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
    const sections = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const years = ["1", "2", "3", "4", "5"];
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
        const details = {
            batch: batch,
            program: program,
            section: section,
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
            .post("/backend/attendance/take", formBody, {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                },
            })

            .then((response) => {
                if (
                    response.data.classes === undefined ||
                    response.data.classes.length === 0
                ) {
                    alert("Couldn't fetch classes");
                } else if (
                    response.data.subjects === undefined ||
                    response.data.subjects.length === 0
                ) {
                    alert("Couldn't fetch subjects");
                } else if (
                    response.data.students === undefined ||
                    response.data.students.length === 0
                ) {
                    alert("Couldn't fetch students");
                } else {
                    props.history.push({
                        pathname: "/new/student/namelist",
                        state: {
                            data: response.data,
                        },
                    });
                }
            })
            .catch((error) => console.log(error));
    }

    return (
        <MDBContainer>
            <br />
            <br />
            <MDBRow>
                <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody>
                            <form onSubmit={handleSubmit}>
                                <p className="h4 text-center py-4">
                                    Select Class
                                </p>
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
                                    onChange={(event) =>
                                        setBatch(event.target.value)
                                    }
                                />
                                <br />
                                <label
                                    htmlFor="defaultFormCardNameEx"
                                    className="grey-text font-weight-light"
                                >
                                    Program
                                </label>
                                <select
                                    id="Program"
                                    class="form-control"
                                    name="program"
                                    value={program}
                                    onChange={(event) =>
                                        setProgram(event.target.value)
                                    }
                                >
                                    {programOptions}
                                </select>
                                <br />
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
                                <br />
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
                                <br />
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
                                    <option selected>1</option>
                                    <option>2</option>
                                </select>
                                <div className="text-center py-4 mt-3">
                                    <MDBBtn
                                        className="btn btn-outline-blue"
                                        type="submit"
                                    >
                                        Submit
                                        <MDBIcon
                                            far
                                            icon="check-circle"
                                            className="ml-2"
                                        />
                                    </MDBBtn>
                                </div>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default withRouter(Select_Class);
