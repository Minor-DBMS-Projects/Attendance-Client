import React, { useEffect, useState } from "react";
import { withRouter, useParams } from "react-router-dom";
import * as d3 from "d3";
import axios from "axios";
import FadeIn from "react-fade-in";

const Visualization = (props) => {
    const { classId, subjectCode, classType } = useParams();
    const [details, setDetails] = useState({});
    const [records, setRecords] = useState({});
    const [students, setStudents] = useState([]);
    const [presentCount, setPresentCount] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [rendered, setRendered] = useState(false);

    useEffect(() => {
        axios
            .get(
                `/backend/attendance/all/${classId}/${subjectCode}/${classType}`
            )
            .then((response) => {
                console.log(response.data);
                setDetails(response.data.details);
                setRecords(response.data.records);
                setStudents(response.data.students);
                console.log(records, students, presentCount);
                var count = [];
                response.data.students.forEach((student, index) => {
                    var c = 0;
                    Object.keys(response.data.records).forEach((i) => {
                        if (
                            response.data.records[i].students.includes(
                                student.roll_no
                            )
                        ) {
                            c += 1;
                        }
                    });
                    count[index] = c;
                });
                setPresentCount(count);
                setDisplayData(
                    response.data.students.map((eachStudent, index) => {
                        return {
                            name: eachStudent.name,
                            value: count[index],
                        };
                    })
                );
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [classId, subjectCode, classType]);

    useEffect(() => {
        if (!(displayData === undefined || displayData.length === 0)) {
            if (!rendered) {
                drawChart();
                setRendered(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayData]);

    const drawChart = () => {
        var data = displayData.map((eachData) => {
            return { name: eachData.name, value: eachData.value };
        });
        data = data.sort((a, b) => {
            return d3.ascending(a.value, b.value);
        });
        const margin = {
            top: 15,
            right: 25,
            bottom: 15,
            left: 150,
        };

        const width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var svg = d3
            .select("#barChart")
            .classed("container", true)
            .append("svg")
            .attr("id", "1")
            .attr(
                "viewBox",
                `0 0 ${width + margin.left + margin.right} ${
                    height + margin.top + margin.bottom
                }`
            )
            .attr("preserveAspectRatio", "xMinYMin meet")
            .append("g")
            .attr(
                "transform",
                "translate(" + margin.left + "," + margin.top + ")"
            );
        var x = d3
            .scaleLinear()
            .range([0, width])
            .domain([
                0,
                d3.max(data, (d) => {
                    return d.value;
                }),
            ]);

        var y = d3
            .scaleBand()
            .rangeRound([height, 0])
            .padding(0.1)
            .domain(
                data.map((d) => {
                    return d.name;
                })
            );

        var yAxis = d3.axisLeft(y).tickSize(0);

        svg.append("g").attr("class", "y axis").call(yAxis);

        var bars = svg.selectAll(".bar").data(data).enter().append("g");

        bars.append("rect")
            .attr("class", "bar")
            .attr("y", (d) => {
                return y(d.name);
            })
            .attr("height", y.bandwidth())
            .attr("x", 0)
            .attr("fill", "#007bff")
            .attr("width", (d) => {
                return x(d.value);
            });

        bars.append("text")
            .attr("class", "label")

            .attr("y", (d) => {
                return y(d.name) + y.bandwidth() / 2 + 4;
            })

            .attr("x", (d) => {
                return x(d.value) + 3;
            })
            .text((d) => {
                return d.value;
            });
    };

    return (
        <FadeIn>
            <br />
            <br />

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title text-center">
                        {details.subjectName}
                    </h5>

                    <div id="barChart"></div>
                </div>
            </div>
        </FadeIn>
    );
};

export default withRouter(Visualization);
