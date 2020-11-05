import React, { Component } from 'react'
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBIcon,
} from "mdbreact";


export default class Navigation extends Component {

  state = {
    isOpen: false
  };
  
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }
  
  render() {
    return (
      <div className="mt-5" style={{ backgroundColor: '#EC3545' }}>
        <MDBNavbar dark expand="md">
          <MDBNavbarToggler onClick={this.toggleCollapse}/>
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem>
                <MDBNavLink to="/">Home</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/classes">Class</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/instructor">Instructor</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/batch">Batch</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="/form">
              <MDBIcon far icon="user" size="2x"/>
              </MDBNavLink>
            </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </div>
    );
  }
}
