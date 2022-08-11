import React from "react";
import { Container } from "react-bootstrap";

function Settings() {
  return (
    <>
      <Container>
        <h1 className="container title">Settings</h1>
        <ul className="list-group">
          <li className="list-group-item">
            <h4>
              <a href="add-counry">Add counries</a>
            </h4>
          </li>

          <li className="list-group-item">
            <h4>
              <a href="add-city">Add Cities</a>
            </h4>
          </li>

          <li className="list-group-item">
            <h4>
              <a href="add-governorate">Add Governorates</a>
            </h4>
          </li>

          <li className="list-group-item">
            <h4>
              <a href="add-contract">Add Contract</a>
            </h4>
          </li>

          <li className="list-group-item">
            <h4>
              <a href="add-jopTitle">Add Jop Title</a>
            </h4>
          </li>
        </ul>
      </Container>
    </>
  );
}

export default Settings;
