import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Notes from "./Notes";
import RegisterUser from "./RegisterUser";
import CreateNote from "./CreateNote";
import LoginUser from "./LoginUser";
import EditNote from "./EditNote";
import ShowNote from "./ShowNote";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { useSnackbar } from "notistack";

function App() {
  const { isLoggedIn, logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = () => {
    axios
      .post("http://localhost:3000/auth/logout", {}, { withCredentials: true })
      .then((res) => {
        enqueueSnackbar("User logged out successfully", { variant: "success" });
        logout();
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Failed to logout", { variant: "error" });
      });
  };

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark" fixed="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <i className="bi bi-card-list"></i> NotesApp
            </Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/notes">
              <Nav.Link>Notes</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/createNote">
              <Nav.Link>Create New Note</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className="ms-auto" style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            {!isLoggedIn ? (
              <>
                <LinkContainer to="/register">
                  <Button variant="outline-light">Register</Button>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Button variant="outline-light">Login</Button>
                </LinkContainer>
              </>
            ) : (
              <Button variant="danger" onClick={() => handleLogout()}>
                Logout
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/register" element={<RegisterUser />}></Route>
        <Route path="/login" element={<LoginUser />}></Route>
        <Route path="/notes" element={<Notes />}></Route>
        <Route path="/createNote" element={<CreateNote />}></Route>
        <Route path="/notes/:id" element={<ShowNote />}></Route>
        <Route path="/notes/:id/editNote" element={<EditNote />}></Route>
        <Route path="*" element={<HomePage />}></Route>
      </Routes>
    </>
  );
}

export default App;
