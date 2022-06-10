import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
  const [user, setuser] = useState([]);

  // Here usestate has been used in order
  // to set and get values from the jsx
  const [name, setname] = useState(localStorage.getItem("name"));
  const [phone, setphone] = useState(localStorage.getItem("phone"));
  const [email, setemail] = useState(localStorage.getItem("email"));
  const [address, setaddress] = useState(localStorage.getItem("address"));
  const [gst, setgst] = useState(localStorage.getItem("gst"));
  const [frequency, setfrequency] = useState(localStorage.getItem("frequency"));
  const [id, setid] = useState(localStorage.getItem("id"));

  let history = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/v2/updateUser", {
        user: {
          name: name,
          phone: phone,
          email: email,
          address: address,
          gst: gst,
          frequency: frequency,
        },
        prevEmail: localStorage.getItem("email"),
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    history("/home");
  };

  // Useeffect take care that page will be rendered only once
  useEffect(() => {
    axios
      .get(
        "http://localhost:4000/v2/getUser?email=" +
          localStorage.getItem("email")
      )
      .then((res) => {
        console.log(res);
        console.log("in editr");
        setuser(res.data.users);
      });
  }, []);

  return (
    <div>
      <Form className="d-grid gap-2" style={{ margin: "15rem" }}>
        {/* setting a name from the input textfiled */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            value={name}
            onChange={(e) => setname(e.target.value)}
            type="text"
            placeholder="Enter Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder="Email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            type="text"
            placeholder="Enter Phone"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            type="text"
            placeholder="Enter Address"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            value={gst}
            onChange={(e) => setgst(e.target.value)}
            type="text"
            placeholder="Enter GST"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            value={frequency}
            onChange={(e) => setfrequency(e.target.value)}
            type="text"
            placeholder="Enter Frequency"
          />
        </Form.Group>

        <Button
          onClick={(e) => handelSubmit(e)}
          variant="primary"
          type="submit"
          size="lg"
        >
          Update
        </Button>

        <Link className="d-grid gap-2" to="/">
          <Button variant="warning" size="lg">
            Home
          </Button>
        </Link>
      </Form>
    </div>
  );
}

export default Edit;
