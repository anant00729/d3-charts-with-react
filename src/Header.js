import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Navbar bg="light" style={{ marginBottom: "24px" }}>
      <Navbar.Brand>Barcharty</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link>
            <Link to="/">Bar graph</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/dot-plot">Dots graph</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
