import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

import axios from "axios";
import { useSnackbar } from "notistack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function RegisterUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmitCreate = (event) => {
    const data = { username, password };

    axios
      .post("http://localhost:3000/auth/register", data, { withCredentials: true })
      .then((res) => {
        enqueueSnackbar("user created successfuly ", { variant: "success" });
        setUsername("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <h1>Register new user:</h1>
      <br />

      <Form style={{ width: "40rem" }}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} value={username} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control type="password" id="inputPassword5" onChange={(e) => setPassword(e.target.value)} value={password} />
          </Col>
        </Row>
        <Button variant="primary" type="button" onClick={handleSubmitCreate}>
          Create New User
        </Button>
      </Form>
    </Container>
  );
}
