import React, { useEffect, useState } from "react";
import "./master.css";
import axios from "./../axios/Axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passChangeHandler = (e) => {
    setPass(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post("/auth/login", {
        email: email,
        password: pass,
      })
      .then((response) => {
        window.localStorage.setItem("adminName", response.data.data.name);
        window.localStorage.setItem("authToken", response.data.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={submitHandler}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              required
              onChange={emailChangeHandler}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              required
              onChange={passChangeHandler}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="google.com">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
