import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Create() {
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [gst, setgst] = useState("");
  const [frequency, setfrequency] = useState("");

  let history = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/v2/addUser", {
        name: name,
        phone: phone,
        email: email,
        address: address,
        gst: gst,
        frequency: frequency,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });

    history("/home");
  };

  return (
    <div>
      <Form className="d-grid gap-2" style={{ margin: "15rem" }}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control
            onChange={(e) => setname(e.target.value)}
            type="text"
            placeholder="Enter Name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Control
            onChange={(e) => setphone(e.target.value)}
            type="text"
            placeholder="Phone"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Control
            onChange={(e) => setaddress(e.target.value)}
            type="text"
            placeholder="Address"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicGST">
          <Form.Control
            onChange={(e) => setgst(e.target.value)}
            type="text"
            placeholder="GST Number"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicFrequency">
          <Form.Control
            onChange={(e) => setfrequency(e.target.value)}
            type="number"
            placeholder="Frequency"
            required
          />
        </Form.Group>

        <Button
          onClick={(e) => handelSubmit(e)}
          variant="primary"
          type="submit"
        >
          Submit
        </Button>

        <Link className="d-grid gap-2" to="/home">
          <Button variant="info" size="lg">
            Home
          </Button>
        </Link>
      </Form>
    </div>
  );
}

export default Create;
