import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import axios from "./axios/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalEditEmp = ({ show, setShow, employee }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [enteredId, setId] = useState("");
  const [enteredName, setName] = useState("");
  const [enteredBirthday, setBirthday] = useState("");
  const [enteredHiring, setDateOfHiring] = useState("");
  const [enteredStatus, setStatus] = useState("");
  const [enteredGender, setGender] = useState("");
  const [enteredCountry, setCountry] = useState("");
  const [enteredCity, setCity] = useState("");
  const [enteredGovernorate, setGovernorate] = useState("");
  const [editId, setEditId] = useState("");

  function initValue() {
    setId(employee.number);
    setName(employee.name);
    setBirthday(employee.birthday);
    setDateOfHiring(employee.dateHiring);
    setStatus(employee.status);
    setGender(employee.gender);
    setCountry(employee.country.id);
    setCity(employee.city.id);
    setGovernorate(employee.governorate.id);
    setEditId(employee.id);
  }

  useEffect(() => {
    initValue();
  }, [employee]);

  const [selectCountry, setSelectCountry] = useState([]);
  const [selectCity, setSelectCity] = useState([]);
  const [selectGovernorate, setSelectGovernorate] = useState([]);
  const [selectContract, setSelectContract] = useState([]);
  const [selectJobTitle, setSelectJobTitle] = useState([]);

  // get adderss values
  async function getCountry() {
    try {
      const response = await axios.get("/getCountries");
      setSelectCountry(response.data.data);
    } catch (error) {}
  }

  // get cities from API
  async function getCity() {
    try {
      const response = await axios.get(`/city/${enteredCountry}/country`);
      setSelectCity(response.data.data);
    } catch (error) {}
  }

  // get governorate from API
  async function getGovernorate() {
    try {
      const response = await axios.get(`/governorate/${enteredCity}/city`);
      setSelectGovernorate(response.data.data);
    } catch (error) {}
  }

  async function getContract() {
    try {
      const response = await axios.get("/getContracts");
      setSelectContract(response.data.data);
    } catch (error) {}
  }

  const optionsContract = selectContract.map((contract) => {
    return { value: contract.id, label: contract.name };
  });

  async function getJopTitle() {
    try {
      const response = await axios.get("/getJoptitles");
      setSelectJobTitle(response.data.data);
    } catch (error) {}
  }
  const optionsJobTitle = selectJobTitle.map((job) => {
    return { value: job.id, label: job.name };
  });

  const [contract_id, setContract_id] = useState([]);
  const [JobTitle_id, setJobTitle_id] = useState([]);

  useEffect(() => {
    getCity();
    getGovernorate();
  }, [enteredCountry, enteredCity, enteredGovernorate]);

  useEffect(() => {
    getCountry();
    getContract();
    getJopTitle();
  }, []);

  const IdChangeHandler = (event) => {
    setId(event.target.value);
  };

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const birthdayChangeHandler = (event) => {
    setBirthday(event.target.value);
  };

  const hiringChangeHandler = (event) => {
    setDateOfHiring(event.target.value);
  };

  const statusChangeHandler = (event) => {
    setStatus(event.target.value);
  };

  const genderChangeHandler = (event) => {
    setGender(event.target.value);
  };

  const countryChangeHandler = (event) => {
    setCountry(event.target.value);
    getCity();
  };

  const CityChangeHandler = (event) => {
    setCity(event.target.value);
  };

  const GovernorateChangeHandler = (event) => {
    setGovernorate(event.target.value);
    getGovernorate();
  };

  const notify = (type) => {
    if (type === "success") {
      toast.success("Edited successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (type === "fail") {
      toast.warn("Failed to Edited successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const AllContractId = contract_id.map((contract) => contract.value);
    const AllJobId = JobTitle_id.map((job) => job.value);

    const data = {
      name: enteredName,
      number: enteredId,
      status: enteredStatus,
      date_hiring: enteredHiring,
      birthday: enteredBirthday,
      gender: enteredGender,
      country_id: enteredCountry,
      city_id: enteredCity,
      governorate_id: enteredGovernorate,
      contract_id: AllContractId,
      jopTitle_id: AllJobId,
    };

    axios
      .patch(`/editEmployee/${editId}`, data)
      .then((response) => {
        notify("success");
      })
      .catch((error) => {
        notify("fail");
      });
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} onSubmit={submitHandler}>
        <Modal.Header>
          <Modal.Title>Edit Employee</Modal.Title>
          <img
            width="80px"
            height="80px"
            src={`http://127.0.0.1:8000/storage/images/${employee.image}`}
            alt="employeePhoto"
          />
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Container>
              <div className="row">
                <Form.Group controlId="form.id" className="mb-3 col-sm-6">
                  <Form.Label>Employee number</Form.Label>
                  <Form.Control
                    type="number"
                    value={enteredId}
                    onChange={IdChangeHandler}
                    placeholder="Enter Id"
                    required
                    // name="number"
                  />
                </Form.Group>
                <Form.Group controlId="form.Name" className="mb-3 col-sm-6">
                  <Form.Label>Employee Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={enteredName}
                    onChange={nameChangeHandler}
                    placeholder="Enter User Name"
                    required
                  />
                </Form.Group>
              </div>

              <div className="row">
                <Form.Group controlId="form.birthday" className="mb-3 col-sm-6">
                  <Form.Label>Employee birthday</Form.Label>
                  <Form.Control
                    type="date"
                    value={enteredBirthday}
                    onChange={birthdayChangeHandler}
                    placeholder="Enter birthday"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="form.hiring" className="mb-3 col-sm-6">
                  <Form.Label>Date of hiring</Form.Label>
                  <Form.Control
                    type="date"
                    value={enteredHiring}
                    onChange={hiringChangeHandler}
                    placeholder="Enter date of hiring"
                    required
                  />
                </Form.Group>
              </div>

              <div className="row">
                <Form.Group controlId="form.title" className="mb-3 col-sm-6">
                  <Form.Label>Job title</Form.Label>
                  <Select
                    options={optionsJobTitle}
                    isMulti
                    onChange={(e) => setJobTitle_id(e)}
                  />
                </Form.Group>

                <Form.Group controlId="form.Contract" className="mb-3 col-sm-6">
                  <Form.Label>Type of Contract</Form.Label>
                  <Select
                    options={optionsContract}
                    isMulti
                    onChange={(e) => setContract_id(e)}
                  />
                </Form.Group>
              </div>

              <div className="row">
                <Form.Group controlId="form.Role" className="mb-3 col-sm-6">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    // name="gender"
                    onChange={genderChangeHandler}
                    required
                  >
                    <option
                      selected={enteredGender === "male" ? true : false}
                      value="male"
                    >
                      Mial
                    </option>
                    <option
                      selected={enteredGender === "female" ? true : false}
                      value="female"
                    >
                      Femail
                    </option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="form.Role" className="mb-3 col-sm-6">
                  <Form.Label>employee status</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={statusChangeHandler}
                    required
                  >
                    <option
                      selected={enteredStatus === "active" ? true : false}
                      value="active"
                    >
                      Active
                    </option>
                    <option
                      selected={enteredStatus === "inactive" ? true : false}
                      value="inactive"
                    >
                      Inactive
                    </option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="row">
                <Form.Group controlId="form.Role" className="mb-3 col-sm-4">
                  <Form.Label>Country</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={countryChangeHandler}
                    required
                  >
                    {selectCountry.map((country) => (
                      <option
                        value={country.id}
                        selected={country.id === enteredCountry ? true : false}
                      >
                        {country.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="form.Role" className="mb-3 col-sm-4">
                  <Form.Label>City</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={CityChangeHandler}
                    required
                  >
                    {selectCity.map((city) => (
                      <option
                        selected={city.id === enteredCity ? true : false}
                        value={city.id}
                      >
                        {city.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="form.Role" className="mb-3 col-sm-4">
                  <Form.Label>Governorate</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={GovernorateChangeHandler}
                    required
                  >
                    {selectGovernorate.map((governorate) => (
                      <option
                        selected={
                          governorate.id === enteredGovernorate ? true : false
                        }
                        value={governorate.id}
                      >
                        {governorate.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" onClick={notify}>
              Edit
            </Button>
            <ToastContainer />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalEditEmp;
