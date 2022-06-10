import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useNavigate();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4000/v2/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("loginEmail", email);
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      localStorage.setItem("loginEmail", email);
    history("/home");
  }

  return (
    <>
      <div className="Login">
        <h3 className="title">Login</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            block="true"
            size="lg"
            type="submit"
            disabled={!validateForm()}
          >
            Login
          </Button>
        </Form>
      </div>
      <Link className="Register" to="/register">
        New Here? Sign Up Now!
      </Link>
    </>
  );
}
