import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "./../axios/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddGovernorates = () => {
  const [enteredGovernorate, setGovernorate] = useState({ name: "" });
  const [cityId, setCityId] = useState({});
  const [allGovernorate, setAllGovernorate] = useState([]);
  const [country, setCountry] = useState([]);
  const [city, setCities] = useState([]);

  async function getAllGovernorate() {
    try {
      const response = await axios.get("/getGovernorates");
      setAllGovernorate(response.data.data);
    } catch (error) {
      console.log("error");
    }
  }

  async function getCountries() {
    try {
      const response = await axios.get("/getCountries");
      setCountry(response.data.data);
    } catch (error) {
      console.log("error");
    }
  }

  async function getCities(event) {
    try {
      const response = await axios.get(`/city/${event.target.value}/country`);
      setCities(response.data.data);
    } catch (error) {
      console.log("error");
    }
  }

  useEffect(() => {
    getCountries();
  }, []);

  const CityIdChangeHandler = (event) => {
    setCityId({
      city_id: event.target.value,
    });
    getAllGovernorate();
  };

  const GovernorateChangeHandler = (event) => {
    setGovernorate({
      name: event.target.value,
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

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("/addGovernorate", {
        name: enteredGovernorate.name,
        city_id: cityId.city_id,
      })
      .then((response) => {
        getAllGovernorate();
        notify("success");
      })
      .catch((error) => {
        notify("fail");
      });

    //reset the values of input fields
    setGovernorate({ name: "" });
  };
  return (
    <Container>
      <h1 className="container title">Add Governorate</h1>
      <Form onSubmit={submitHandler}>
        <div className="row">
          <Form.Group controlId="form.country" className="mb-3 col-md-6">
            <Form.Label>Counties</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="country_id"
              onChange={getCities}
            >
              <option>Open this select menu</option>
              {country.map((country) => {
                return <option value={country.id}>{country.name}</option>;
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="form.country" className="mb-3 col-md-6">
            <Form.Label>City</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="city_id"
              onChange={CityIdChangeHandler}
            >
              <option>Open this select menu</option>
              {city.map((city) => {
                return <option value={city.id}>{city.name}</option>;
              })}
            </Form.Select>
          </Form.Group>
        </div>
        <Form.Group controlId="form.governorate" className="mb-3">
          <Form.Label>Governorate</Form.Label>
          <Form.Control
            type="text"
            value={enteredGovernorate.name}
            onChange={GovernorateChangeHandler}
            placeholder="Enter Governorate"
            required
          />
        </Form.Group>
        <Button type="submit" onClick={notify}>
          Store
        </Button>
        <ToastContainer />
      </Form>
      <br />
      {allGovernorate.map((gover) => {
        return (
          <ul>
            <li>{gover.name}</li>
          </ul>
        );
      })}
    </Container>
  );
};

export default AddGovernorates;
