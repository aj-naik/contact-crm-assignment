import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./sendemails.css";

import axios from "axios";

export default function SendEmails() {
  const [array, setarray] = useState([]);
  const [email_subject, setEmailSubject] = useState("");
  const [email_text, setEmailText] = useState("");

  useEffect(() => {
    axios
      .get(
        "http://localhost:4000/v2/fetchAllEmails?email=" +
          localStorage.getItem("emailToFetch")
      )
      .then((res) => {
        console.log(res);
        console.log("in send Email");
        setarray(res.data.emails);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4000/v2/sendEmail", {
        subject: email_subject,
        text: email_text,
        email: localStorage.getItem("emailToFetch"),
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        alert("Email sent successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const email = localStorage.getItem("emailToFetch");

  return (
    <>
      <div className="EmailTable">
        <h4 className="table-title">Previous Communications for {email}</h4>
        <div className="Table" style={{ margin: "10rem" }}>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Email</th>
                <th>Subject</th>
                <th>Text</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {array.map((item) => {
                return (
                  <tr>
                    <td>{item.email}</td>
                    <td>{item.subject}</td>
                    <td>{item.text}</td>
                    <td>{item.createdAt}</td>

                    {/* getting the id,name, and age for storing these
              value in the jsx with onclick event */}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        <div className="SendEmail">
          <h3 className="email-title">Send New Email</h3>
          <Link className="d-grid gap-2" to="/create"></Link>
        </div>
        <div className="Login">
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="email-subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={email_subject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="email-text">
              <Form.Label>Email Text</Form.Label>
              <Form.Control
                autoFocus
                type="textarea"
                value={email_text}
                onChange={(e) => setEmailText(e.target.value)}
              />
            </Form.Group>

            <Button block="true" size="lg" type="submit">
              Send Email
            </Button>
          </Form>
        </div>
        <Link className="Home" to="/home">
          Go Back to Home Screen
        </Link>
      </div>
    </>
  );
}
