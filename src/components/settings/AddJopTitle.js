import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "./../axios/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddJopTitle = () => {
  const [enteredJob, setJob] = useState({});
  const [allJopTitle, setJopTitle] = useState([]);

  async function getAllJopTitle() {
    try {
      const response = await axios.get("/getJoptitles");
      setJopTitle(response.data.data);
    } catch (error) {
      console.log("error");
    }
  }

  useEffect((_) => {
    getAllJopTitle();
  }, []);

  const JobChangeHandler = (event) => {
    setJob({
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
      .post("/addJoptitle", {
        name: enteredJob.name,
      })
      .then((response) => {
        getAllJopTitle();
        notify("success");
      })
      .catch((error) => {
        notify("fail");
      });
    //reset the values of input fields
    setJob({ name: "" });
  };

  return (
    <Container>
      <h1 className="container title">Add Jop Title</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="form.title" className="mb-3">
          <Form.Label>Job title</Form.Label>
          <Form.Control
            name="name"
            type="text"
            value={enteredJob.name}
            onChange={JobChangeHandler}
            placeholder="Enter job title"
            required
          />
        </Form.Group>

        <Button type="submit" onClick={notify}>
          Store
        </Button>
        <ToastContainer />
      </Form>
      <br />
      {allJopTitle.map((jopTitle) => {
        return (
          <ul>
            <li>{jopTitle.name}</li>
          </ul>
        );
      })}
    </Container>
  );
};

export default AddJopTitle;
