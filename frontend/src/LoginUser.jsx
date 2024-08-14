import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, login, logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleLogin = () => {
    const data = { username: username, password: password };
    axios
      .post("http://localhost:3000/auth/login", data, { withCredentials: true })
      .then((res) => {
        console.log(res);
        enqueueSnackbar("User logged in successfully", { variant: "success" });
        setUsername("");
        setPassword("");
        login();

        navigate("/notes");
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Failed to login", { variant: "error" });
      });
  };

  return (
    <Container>
      <h1> Login</h1>
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
        <Button variant="primary" type="button" onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </Container>
  );
}
