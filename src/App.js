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
import Header from "./components/layout/Header";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Class from "./components/Class";

function App(props) {
  let history = useHistory();
  const [authenticated, setAuthenticated] = useState(false);
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
        } else {
          setAuthenticated(false);
        }
      })
      .catch((error) => {
        setAuthenticated(false);
        console.log(error);
      });
  }, []);

  return (
    <Router>
      <div className="container-fluid">
        <Header />
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
            {authenticated ? <Class /> : <Redirect to="/" />}
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
