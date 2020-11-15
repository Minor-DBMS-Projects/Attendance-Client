import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Navigation from "./Navigation";
import "mdbreact/dist/css/mdb.css";

class Header extends Component {
  j;
  render() {
    const { location } = this.props;
    // if (location.pathname.match("/history")) return null;
    // else
    return (
      <div className="bg-primary z-depth-3">
        <h1 className=" p-3 d-flex justify-content-center text-white">
          Institute of Engineering
        </h1>
        <h4 className="mt-1 p-0 d-flex justify-content-center text-white">
          Pulchowk Campus
        </h4>

        <Navigation />
      </div>
    );
  }
}

export default withRouter(Header);
