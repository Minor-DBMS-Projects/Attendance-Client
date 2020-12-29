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
import * as Cookies from "js-cookie";

class Navigation extends Component {
    state = {
        isOpen: false,
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    logout = () => {
        this.props.setAuthenticated(false);
        Cookies.remove("attendnace-jwt-token", { path: "" });
        this.props.setloading(true);
        this.props.history.push("/");
        this.props.setloading(false);
    };

    render() {
        if (!this.props.authenticated) {
            return <br />;
        }
        return (
            <div className="" style={{ backgroundColor: "#007bff" }}>
                <MDBNavbar dark expand="md">
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse
                        id="navbarCollapse3"
                        isOpen={this.state.isOpen}
                        navbar
                    >
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
                                    <MDBNavLink to="/online-attendance">
                                        Online Class
                                    </MDBNavLink>
                                </MDBNavItem>
                            </MDBBtn>
                            <MDBBtn color="primary">
                                <MDBNavItem>
                                    <MDBNavLink to="/visualization-details">
                                        Visualization
                                    </MDBNavLink>
                                </MDBNavItem>
                            </MDBBtn>
                            <MDBBtn color="primary">
                                <MDBNavItem>
                                    <MDBNavLink to="/attendance-summary">
                                        Summary
                                    </MDBNavLink>
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
