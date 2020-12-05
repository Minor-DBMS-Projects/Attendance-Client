import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBIcon,
  MDBBtn,
} from "mdbreact";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Navigation extends Component {
  state = {
    isOpen: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  logout = () => {
    this.props.setloading(true);
    axios
      .get("/backend/logout")
      .then(() => {
        this.props.setAuthenticated(!this.props.authenticated);
        this.props.history.push("/");
        this.props.setloading(false);
      })
      .catch((err) => console.log(err));
  };

  render() {
    if (!this.props.authenticated) {
      return <br />;
    }
    return (
      <div className="" style={{ backgroundColor: "#007bff" }}>
        <MDBNavbar dark expand="md">
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <MDBBtn color="primary">
                <MDBNavItem>
                  <MDBNavLink to="/" exact>
                    Home
                  </MDBNavLink>
                </MDBNavItem>
              </MDBBtn>
              <MDBBtn color="primary">
                <MDBNavItem>
                  <MDBNavLink to="/class-details" exact>
                    Take Attendance
                  </MDBNavLink>
                </MDBNavItem>
              </MDBBtn>
              <MDBBtn color="primary">
                <MDBNavItem>
                  <MDBNavLink to="/online-attendance">Online Class</MDBNavLink>
                </MDBNavItem>
              </MDBBtn>
              <MDBBtn color="primary">
                <MDBNavItem>
                  <MDBNavLink to="/batch">Batch</MDBNavLink>
                </MDBNavItem>
              </MDBBtn>
            </MDBNavbarNav>
            {this.props.authenticated ? (
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBBtn onClick={this.logout}>
                    <MDBNavLink to=""> Logout</MDBNavLink>
                  </MDBBtn>
                </MDBNavItem>
              </MDBNavbarNav>
            ) : null}
          </MDBCollapse>
        </MDBNavbar>
      </div>
    );
  }
}

export default withRouter(Navigation);
