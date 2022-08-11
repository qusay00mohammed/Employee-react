import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import axios from "./axios/Axios";
import ModalEditEmp from "./ModalEditEmp";

function ViewEmp() {
  const [show, setShow] = useState(false);
  const [emp, setEmp] = useState({});

  const [emplouees, setEmplouees] = useState([]);
  async function getEmployees() {
    try {
      const response = await axios.get("/getEmployees");
      setEmplouees(response.data.data);
    } catch (error) {
      console.log("error");
    }
  }

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <>
      {show && <ModalEditEmp show={show} employee={emp} setShow={setShow} />}
      <h1 className="container title">View All Employee</h1>
      <Table striped="columns" className="container">
        <thead>
          <tr>
            <th>#</th>
            <th>number</th>
            <th>name</th>
            <th>birthday</th>
            <th>Date of hiring</th>
            <th>Counry</th>
            <th>City</th>
            <th>Governorate</th>
            <th>Job title</th>
            <th>Gender</th>
            <th>status</th>
            <th>Type of Contract</th>
            <th>Processes</th>
          </tr>
        </thead>
        <tbody>
          {emplouees.length > 0
            ? emplouees.map((emp, x = 0) => (
                <tr>
                  <td>{++x}</td>
                  <td>{emp.number}</td>
                  <td>{emp.name}</td>
                  <td>{emp.birthday}</td>
                  <td>{emp.date_hiring}</td>
                  <td>{emp.country.name}</td>
                  <td>{emp.city.name}</td>
                  <td>{emp.governorate.name}</td>
                  <td>{emp.jop_titles[0].name}</td>
                  <td>{emp.gender}</td>
                  <td>{emp.status}</td>
                  <td>{emp.contracts[0].name}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setShow(true);
                        setEmp({
                          id: emp.id,
                          number: emp.number,
                          name: emp.name,
                          birthday: emp.birthday,
                          dateHiring: emp.date_hiring,
                          gender: emp.gender,
                          status: emp.status,
                          country: emp.country,
                          city: emp.city,
                          governorate: emp.governorate,
                          image: emp.image,
                        });
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    </>
  );
}

export default ViewEmp;
