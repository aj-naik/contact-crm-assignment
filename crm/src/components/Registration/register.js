import React from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useFormFields } from "../FormValidationHook/hooksLib";
import Button from "react-bootstrap/Button";
import "./register.css";
import axios from "axios";

export default function Register() {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  let history = useNavigate();

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4000/v2/register", {
        name: fields.name,
        email: fields.email,
        password: fields.password,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    history("/");
  }

  return (
    <>
    <div className="Register">
      <h3 className="title">Sign-Up</h3>
      <Form onSubmit={handleSubmit}>
      <Form.Group size="lg" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={fields.name}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="password" size="lg">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" size="lg">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </Form.Group>
        <Button block="true" size="lg" type="submit" disabled={!validateForm()}>
          Register
        </Button>
      </Form>
    </div>
    </>

    
  );
}
