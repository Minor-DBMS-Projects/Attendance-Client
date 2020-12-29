import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    Redirect,
} from "react-router-dom";
import ReactLoading from "react-loading";
import FadeIn from "react-fade-in";
import Header from "./components/layout/Header";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AttendanceHistory from "./components/AttendanceHistory";
import TakeAttendance from "./components/TakeAttendance";
import ClassDetails from "./components/ClassDetails";
import OnlineAttendance from "./components/OnlineAttendance";
import Visualization from "./components/Visualization";
import VisualizationDetails from "./components/VisualizationDetails";
import AttendanceSummary from "./components/AttendanceSummary";
import "./App.css";
import * as Cookies from "js-cookie";

function App(props) {
    let history = useHistory();
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setloading] = useState(true);
    const style = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    };

    useEffect(() => {
        console.log(Cookies.get("attendnace-jwt-token"));
        fetch("backend/authentication/authenticate", {
            headers: { authorization: Cookies.get("attendnace-jwt-token") },
        })
            .then((response) => {
                if (response.status === 200) return response.json();
            })
            .then((responseJson) => {
                if (responseJson.authenticated) {
                    setAuthenticated(true);
                    setloading(false);
                } else {
                    setAuthenticated(false);
                    setloading(false);
                }
            })
            .catch((error) => {
                setAuthenticated(false);
                setloading(false);
                console.log(error);
            });
    }, []);

    if (loading) {
        return (
            <div style={style}>
                {" "}
                <ReactLoading type={"bars"} color={"grey"} />
            </div>
        );
    }

    return (
        <Router>
            <div className="container-fluid">
                <Header
                    authenticated={authenticated}
                    setAuthenticated={setAuthenticated}
                    setloading={setloading}
                />
                <Switch>
                    <Route exact path="/">
                        {authenticated ? (
                            <Redirect to="/dashboard" />
                        ) : (
                            <FadeIn>
                                <Login
                                    authenticated={authenticated}
                                    setAuthenticated={setAuthenticated}
                                />{" "}
                            </FadeIn>
                        )}
                    </Route>
                    <Route exact path="/dashboard">
                        {authenticated ? (
                            <FadeIn>
                                <Dashboard />{" "}
                            </FadeIn>
                        ) : (
                            <Redirect to="/" />
                        )}
                    </Route>
                    <Route exact path="/class-details">
                        {authenticated ? <ClassDetails /> : <Redirect to="/" />}
                    </Route>
                    <Route exact path="/visualization-details">
                        {authenticated ? (
                            <VisualizationDetails />
                        ) : (
                            <Redirect to="/" />
                        )}
                    </Route>
                    <Route exact path="/online-attendance">
                        {authenticated ? (
                            <OnlineAttendance />
                        ) : (
                            <Redirect to="/" />
                        )}
                    </Route>
                    <Route exact path="/attendance-summary">
                        {authenticated ? (
                            <AttendanceSummary />
                        ) : (
                            <Redirect to="/" />
                        )}
                    </Route>
                    <Route
                        exact
                        path="/visualization/:classId/:subjectCode/:classType"
                    >
                        {authenticated ? (
                            <Visualization />
                        ) : (
                            <Redirect to="/" />
                        )}
                    </Route>

                    <Route
                        exact
                        path="/new/student/namelist"
                        render={(props) =>
                            authenticated ? (
                                <TakeAttendance {...props} />
                            ) : (
                                <Redirect to="/" />
                            )
                        }
                    />

                    <Route
                        exact
                        path="/history/:classId/:subjectCode/:classType"
                    >
                        {authenticated ? (
                            <AttendanceHistory {...props} />
                        ) : (
                            <Redirect to="/" />
                        )}
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
