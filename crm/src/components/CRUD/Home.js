import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [array, setarray] = useState([]);

  axios.get("http://localhost:4000/v2/getAllUsers").then((res) => {
    console.log(res);
    console.log(res.data);
    setarray(res.data.users);
  });
  let history = useNavigate();

  function setID(id, name, email, phone, address, gst, frequency) {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("phone", phone);
    localStorage.setItem("email", email);
    localStorage.setItem("address", address);
    localStorage.setItem("gst", gst);
    localStorage.setItem("frequency", frequency);
  }

  function deleted(email) {
    axios
      .post("http://localhost:4000/v2/deleteUser", {
        email: email,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });

    history("/home");
  }

  return (
    <>
    <h1 className="title" style={{ paddingTop: "40px" }}>Customer Information Screen</h1>
      <div style={{ margin: "10rem" }}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>GST</th>
              <th>Frequency</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapping though every element in the array
  and showing the data in the form of table */}
            {array.map((item) => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{item.gst}</td>
                  <td>{item.frequency}</td>

                  {/* getting the id,name, and email, phone,address, gst no, frequency for storing these
        value in the jsx with onclick event */}
                  <td>
                    <Link to={`/edit`}>
                      <Button
                        onClick={(e) =>
                          setID(
                            "id",
                            item.name,
                            item.email,
                            item.phone,
                            item.address,
                            item.gst,
                            item.frequency
                          )
                        }
                        variant="info"
                      >
                        Update
                      </Button>
                    </Link>
                  </td>

                  {/* Using the deleted function passing
     the id of an entry */}
                  <td>
                    <Button
                      onClick={(e) => deleted(item.email)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </td>

                  {/* Using the localstorage to fetch the email to fetch the data */}
                  <td>
                    <Link to={`/email`}>
                      <Button
                        onClick={(e) =>
                          localStorage.setItem("emailToFetch", item.email)
                        }
                        variant="success"
                      >
                        Communications
                      </Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        {/* Button for redirecting to create page for
 insertion of values */}
        <Link className="d-grid gap-2" to="/create">
          <Button variant="warning" size="lg">
            Create
          </Button>
        </Link>
      </div>
    </>
  );
}

export default Home;
