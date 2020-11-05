import React, { Component } from "react";
import Navigation from "./Navigation";
import "mdbreact/dist/css/mdb.css";

export default class Header extends Component {
  j;
  render() {
    const { location } = this.props;
    // if (location.pathname.match('/report'))
    //     return null;
    //else
    return (
      <div className="bg-danger z-depth-2">
        <h1 className="mt-2 p-3 d-flex justify-content-center text-white">
          Institute of Engineering
        </h1>
        <h4 className="mt-2 d-flex justify-content-center text-white">
          Pulchowk Campus
        </h4>
        <Navigation />
      </div>
    );
  }
}
