import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "./../axios/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCities = () => {
  const [enteredCity, setCity] = useState({ name: "" });
  const [allCity, setAllCity] = useState([]);
  const [countries, setCountry] = useState([]);
  const [countryID, setCountryID] = useState({});

  async function getCountries() {
    try {
      const response = await axios.get("/getCountries");
      setCountry(response.data.data);
    } catch (error) {
      console.log("errror");
    }
  }

  async function getCities() {
    try {
      const response = await axios.get("/getCities");
      setAllCity(response.data.data);
    } catch (error) {
      console.log("error");
    }
  }

  useEffect(() => {
    getCountries();
    getCities();
  }, []);

  const CityChangeHandler = (event) => {
    setCity({
      name: event.target.value,
    });
  };

  const CountryIdChangeHandler = (event) => {
    setCountryID({
      country_id: event.target.value,
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
      .post("/addCity", {
        name: enteredCity.name,
        country_id: countryID.country_id,
      })
      .then((response) => {
        getCities();
        notify("success");
      })
      .catch((error) => {
        notify("fail");
      });

    //reset the values of input fields
    setCity({ name: "" });
  };

  return (
    <Container>
      <h1 className="container title">Add Cities</h1>
      <Form onSubmit={submitHandler}>
        <div className="row">
          <Form.Group controlId="form.city" className="mb-3 col-md-6">
            <Form.Label>City</Form.Label>
            <Form.Control
              name="name"
              type="text"
              value={enteredCity.name}
              onChange={CityChangeHandler}
              placeholder="Enter City"
              required
            />
          </Form.Group>
          <Form.Group controlId="form.country" className="mb-3 col-md-6">
            <Form.Label>Counties</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="country_id"
              onChange={CountryIdChangeHandler}
              required
            >
              <option>Open this select menu</option>
              {countries.map((country) => {
                return <option value={country.id}>{country.name}</option>;
              })}
            </Form.Select>
          </Form.Group>
        </div>
        <Button type="submit" onClick={notify}>
          Store
        </Button>
        <ToastContainer />
      </Form>
      <br />
      {allCity.map((city) => {
        return (
          <ul>
            <li>{city.name}</li>
          </ul>
        );
      })}
    </Container>
  );
};

export default AddCities;
