import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "./../axios/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCounries = () => {
  const [countries, setCountries] = useState([]);
  const [enteredCountry, setCountry] = useState({ name: "" });

  async function getCountries() {
    try {
      const response = await axios.get("/getCountries");
      setCountries(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCountries();
  }, []);

  const countryChangeHandler = (event) => {
    setCountry({
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
      .post("/addCountry", { name: enteredCountry.name })
      .then((response) => {
        getCountries();
        notify("success");
      })
      .catch((error) => {
        notify("fail");
      });

    //reset the values of input fields
    setCountry({ name: "" });
  };

  return (
    <Container>
      <h1 className="container title">Add Counries</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="form.state" className="mb-3">
          <Form.Label>Counry</Form.Label>
          <Form.Control
            name="name"
            type="text"
            value={enteredCountry.name}
            onChange={countryChangeHandler}
            placeholder="Enter the country"
            required
          />
        </Form.Group>
        <Button type="submit" onClick={notify}>
          Store
        </Button>
        <ToastContainer />
      </Form>
      <br />
      {countries.map((country) => {
        return (
          <ul>
            <li>{country.name}</li>
          </ul>
        );
      })}
    </Container>
  );
};

export default AddCounries;
