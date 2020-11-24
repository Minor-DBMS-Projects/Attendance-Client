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

export default class Navigation extends Component {
    state = {
        isOpen: false,
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    render() {
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
                                    <MDBNavLink to="/addnewclass" exact>
                                        Add new class
                                    </MDBNavLink>
                                </MDBNavItem>
                            </MDBBtn>
                            <MDBBtn color="primary">
                                <MDBNavItem>
                                    <MDBNavLink to="/classes">
                                        Select Class
                                    </MDBNavLink>
                                </MDBNavItem>
                            </MDBBtn>
                            <MDBBtn color="primary">
                                <MDBNavItem>
                                    <MDBNavLink to="/instructor">
                                        Instructor
                                    </MDBNavLink>
                                </MDBNavItem>
                            </MDBBtn>
                            <MDBBtn color="primary">
                                <MDBNavItem>
                                    <MDBNavLink to="/batch">Batch</MDBNavLink>
                                </MDBNavItem>
                            </MDBBtn>
                        </MDBNavbarNav>
                        <MDBNavbarNav right>
                            <MDBNavItem>
                                <MDBNavLink
                                    className="waves-effect waves-light"
                                    to="/form"
                                >
                                    <MDBIcon far icon="user" size="2x" />
                                </MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </div>
        );
    }
}
