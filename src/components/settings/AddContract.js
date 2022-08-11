import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "./../axios/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddContract = () => {
  const [enteredContract, setContract] = useState({ name: "" });
  const [allContract, setAllContract] = useState([]);

  async function getAllContract() {
    try {
      const response = await axios.get("/getContracts");
      setAllContract(response.data.data);
    } catch (error) {
      console.log("error");
    }
  }

  useEffect(() => {
    getAllContract();
  }, []);

  const ContractChangeHandler = (event) => {
    setContract({
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
      .post("/addContract", {
        name: enteredContract.name,
      })
      .then((response) => {
        getAllContract();
        notify("success");
      })
      .catch((error) => {
        notify("fail");
      });

    //reset the values of input fields
    setContract({ name: "" });
  };

  return (
    <Container>
      <h1 className="container title">Add Contract</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="form.contract" className="mb-3">
          <Form.Label>Type of Contract</Form.Label>
          <Form.Control
            name="name"
            type="text"
            value={enteredContract.name}
            onChange={ContractChangeHandler}
            placeholder="Enter type of Contract"
            required
          />
        </Form.Group>

        <Button type="submit" onClick={notify}>
          Store
        </Button>
        <ToastContainer />
      </Form>
      <br />
      {allContract.map((contract) => {
        return (
          <ul>
            <li>{contract.name}</li>
          </ul>
        );
      })}
    </Container>
  );
};

export default AddContract;
