import axios from "./axios/Axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeForm = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [governorates, setGovernorate] = useState([]);
  const [contract, setAllContract] = useState([]);
  const [jopTitle, setAllJopTitle] = useState([]);

  // get countries
  async function getCountries() {
    try {
      const response = await axios.get("/getCountries");
      setCountries(response.data.data);
    } catch (error) {
      console.log("error");
    }
  }

  // get cities
  async function getCities(event) {
    try {
      const response = await axios.get(`/city/${event.target.value}/country`);
      setCities(response.data.data);
    } catch (error) {
      console.log("error");
    }
  }

  // get governorate
  async function getGovernorate(event) {
    try {
      const response = await axios.get(
        `/governorate/${event.target.value}/city`
      );
      setGovernorate(response.data.data);
    } catch (error) {
      console.log("error");
    }
  }

  // get contract
  async function getContract() {
    try {
      const response = await axios.get("/getContracts");
      setAllContract(response.data.data);
    } catch (error) {
      console.log("error");
    }
  }
  // get jobTitle
  async function getJopTitle() {
    try {
      const response = await axios.get("/getJoptitles");
      setAllJopTitle(response.data.data);
    } catch (error) {
      console.log("error");
    }
  }

  const optionsContract = contract.map((cont) => {
    return { value: cont.id, label: cont.name };
  });

  const optionsJop = jopTitle.map((jopTitle) => {
    return { value: jopTitle.id, label: jopTitle.name };
  });

  useEffect(() => {
    getCountries();
    getContract();
    getJopTitle();
  }, []);

  const [enteredId, setId] = useState({});
  const [enteredName, setName] = useState({});
  const [enteredBirthday, setBirthday] = useState({});
  const [enteredHiring, setDateOfHiring] = useState({});
  const [enteredStatus, setStatus] = useState({});
  const [enteredGender, setGender] = useState({});

  const [enteredCountry_id, setCountry_id] = useState({});
  const [enteredCity_id, setCity_id] = useState({});
  const [enteredGovernorate_id, setGovernorate_id] = useState({});

  const [enteredJop_id, setJop_id] = useState([]);
  const [enteredContract_id, setContract_id] = useState([]);

  const [selectedFile, setSelectedFile] = useState("");

  const IdChangeHandler = (event) => {
    setId({
      number: event.target.value,
    });
  };

  const nameChangeHandler = (event) => {
    setName({
      name: event.target.value,
    });
  };

  const birthdayChangeHandler = (event) => {
    setBirthday({
      birthday: event.target.value,
    });
  };

  const hiringChangeHandler = (event) => {
    setDateOfHiring({
      date_hiring: event.target.value,
    });
  };

  const statusChangeHandler = (event) => {
    setStatus({
      status: event.target.value,
    });
  };

  const genderChangeHandler = (event) => {
    setGender({
      gender: event.target.value,
    });
  };

  const countryChangeHandler = (event) => {
    setCountry_id({
      country_id: event.target.value,
    });
  };

  const CityChangeHandler = (event) => {
    setCity_id({
      city_id: event.target.value,
    });
  };

  const GovernorateChangeHandler = (event) => {
    setGovernorate_id({
      governorate_id: event.target.value,
    });
  };

  const notify = (type) => {
    if (type === "success") {
      toast.success("Stored successfully", {
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
      toast.warn("Failed to store successfully", {
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

  // Covert image to base64
  const fileSelectedHandler = (event) => {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      setSelectedFile(e.target.result);
    };
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // To get the value out of the object in array
    const arrContract = enteredContract_id.map((item) => item.value);
    // To get the value out of the object in array
    const arrJop = enteredJop_id.map((item) => item.value);

    const data = {
      name: enteredName.name,
      number: enteredId.number,
      status: enteredStatus.status,
      date_hiring: enteredHiring.date_hiring,
      birthday: enteredBirthday.birthday,
      gender: enteredGender.gender,
      country_id: enteredCountry_id.country_id,
      city_id: enteredCity_id.city_id,
      governorate_id: enteredGovernorate_id.governorate_id,
      contract_id: arrContract,
      jopTitle_id: arrJop,
      image: selectedFile,
    };

    axios
      .post("/addEmployee", data)
      .then((response) => {
        notify("success");
      })
      .catch((error) => {
        notify("fail");
      });

    //reset the values of input fields
    setId({ number: "" });
    setName({ name: "" });
    setBirthday({ birthday: "" });
    setDateOfHiring({ date_hiring: "" });
    setStatus({ status: "" });
    setGender({ gender: "" });
    setCountry_id({ country_id: "" });
    setCity_id({ city_id: "" });
    setGovernorate_id({ governorate_id: "" });
    setJop_id([""]);
    setContract_id([""]);

    setSelectedFile("");
  };

  return (
    <>
      <h1 className="container title">Add Employee</h1>
      <Container>
        <Form onSubmit={submitHandler}>
          <div className="row">
            <Form.Group controlId="form.id" className="mb-3 col-md-6">
              <Form.Label>Employee number</Form.Label>
              <Form.Control
                type="text"
                name="number"
                value={enteredId.number}
                onChange={IdChangeHandler}
                placeholder="Enter Id"
                required
              />
            </Form.Group>

            <Form.Group controlId="form.Name" className="mb-3 col-md-6">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={enteredName.name}
                onChange={nameChangeHandler}
                placeholder="Enter User Name"
                required
              />
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group controlId="form.birthday" className="mb-3 col-md-6">
              <Form.Label>Employee birthday</Form.Label>
              <Form.Control
                type="date"
                name="birthday"
                value={enteredBirthday.birthday}
                onChange={birthdayChangeHandler}
                placeholder="Enter birthday"
                required
              />
            </Form.Group>

            <Form.Group controlId="form.hiring" className="mb-3 col-md-6">
              <Form.Label>Date of hiring</Form.Label>
              <Form.Control
                type="date"
                name="date_hiring"
                value={enteredHiring.date_hiring}
                onChange={hiringChangeHandler}
                placeholder="Enter date of hiring"
                required
              />
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group controlId="form.Role" className="mb-3 col-md-4">
              <Form.Label>employee status</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="status"
                value={enteredStatus.status}
                onChange={statusChangeHandler}
                required
              >
                <option>Open this select menu</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="form.Role" className="mb-3 col-md-4">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="gender"
                value={enteredGender.gender}
                onChange={genderChangeHandler}
                required
              >
                <option>Open this select menu</option>
                <option value="male">Mial</option>
                <option value="female">Femail</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3 col-md-4">
              <Form.Label>File</Form.Label>
              <Form.Control
                type="file"
                onChange={fileSelectedHandler}
                name="image"
                required
                // value={selectedFile}
              />
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group controlId="form.country" className="mb-3 col-md-4">
              <Form.Label>Country</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={enteredCountry_id.country_id}
                name="country_id"
                id="countryID"
                onChange={(e) => {
                  countryChangeHandler(e);
                  getCities(e);
                }}
                required
              >
                <option>Open this select menu</option>
                {countries.map((country) => {
                  return <option value={country.id}>{country.name}</option>;
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="form.city" className="mb-3 col-md-4">
              <Form.Label>City</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={enteredCity_id.city_id}
                onChange={(e) => {
                  CityChangeHandler(e);
                  getGovernorate(e);
                }}
                required
                name="city_id"
              >
                <option>Open this select menu</option>
                {cities.map((city) => {
                  return <option value={city.id}>{city.name}</option>;
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="form.governorate" className="mb-3 col-md-4">
              <Form.Label>Governorate</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={enteredGovernorate_id.governorate_id}
                onChange={GovernorateChangeHandler}
                required
                name="governorate_id"
              >
                <option>Open this select menu</option>
                {governorates.map((governorate) => {
                  return (
                    <option value={governorate.id}>{governorate.name}</option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group controlId="form.Role" className="mb-3 col-md-6">
              <Form.Label>Job title</Form.Label>
              <Select
                options={optionsJop}
                isMulti
                onChange={(e) => setJop_id(e)}
                value={enteredJop_id}
              />
            </Form.Group>

            <Form.Group controlId="form.Role" className="mb-3 col-md-6">
              <Form.Label>Type of Contract</Form.Label>

              <Select
                options={optionsContract}
                isMulti
                onChange={(e) => setContract_id(e)}
                value={enteredContract_id}
              />
            </Form.Group>
          </div>

          <Button type="submit" onClick={notify}>
            Store
          </Button>
          <ToastContainer />
        </Form>
      </Container>
    </>
  );
};
export default EmployeeForm;
