import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import axios from "axios";

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const recordData = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //withCredentials: true,
            body: JSON.stringify({ code: username, password: password }),
        };
        fetch("/backend/login", requestOptions)
            .then((res) => {
                if (res.status == 200) {
                    console.log("Logged in");
                    props.setAuthenticated(true);
                    props.history.push("/dashboard");
                } else {
                    console.log("Failed to log in");
                    alert("Invalid username or password");
                    props.history.push("/");
                }
                // else {
                //   throw new Error("Not logged in");
                // }
            })
            .catch((err) => console.log(err));
        // const login_axios = axios.create({
        //   withCredentials: true,
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "x-www-form-urlencoded",
        //   },
        //   params: {
        //     code: username,
        //     password: password,
        //   },
        // });

        // login_axios
        //   .post("/login")
        //   .then(function (response) {
        //     console.log("RESPONSE");
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log("ERROR");
        //     console.log(error);
        //   });
    };
    return (
        <MDBContainer className="mr-5 mt-5">
            <MDBRow>
                <MDBCol md="6">
                    <form onSubmit={recordData}>
                        <p className="h5 text-center mb-4">Sign in</p>
                        <div className="grey-text">
                            <MDBInput
                                label="Type your email"
                                icon="envelope"
                                group
                                type=""
                                validate
                                error="wrong"
                                success="right"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <MDBInput
                                label="Type your password"
                                icon="lock"
                                group
                                type="password"
                                validate
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="text-center">
                            <MDBBtn color="primary" type="submit">
                                Login
                            </MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default withRouter(Login);
