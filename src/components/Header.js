import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "./axios/Axios";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const logout = () => {
    axios
      .post("/logout")
      .then((response) => {
        localStorage.clear();
        navigate("/login");
      })
      .catch((err) => {
        console.log("error");
      });
  };

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">LOGO</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="add-employee">Add Employee</Nav.Link>
            <Nav.Link href="employees">View Employee</Nav.Link>
            <Nav.Link href="settings">Settings</Nav.Link>
          </Nav>

          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <span onClick={logout}>Logout</span>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
