import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";
import Header from "./components/layout/Header";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Select_Class from "./components/Select_Class";
import AttendanceHistory from "./components/AttendanceHistory";
import TakeAttendance from "./components/TakeAttendance";

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
    fetch(
      "/authentication"
      // , {
      //   method: "GET",
      //   credentials: "include",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Credentials": true,
      //   },
      // }
    )
      .then((response) => {
        if (response.status === 200) return response.json();
        //throw new Error("failed to authenticate user");
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
              <Login
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
              />
            )}
          </Route>
          <Route exact path="/dashboard">
            {authenticated ? <Dashboard /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/classes">
            {authenticated ? <Select_Class /> : <Redirect to="/" />}
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

          <Route exact path="/history/:classId/:subjectCode/:classType">
            {authenticated ? (
              <AttendanceHistory {...props} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route exact path="/success">
            <h1>Logged in successfully</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
