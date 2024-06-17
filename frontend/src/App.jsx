import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./HomePage";
import Notes from "./Notes";
import Note from "./Note";
import CreateNote from "./CreateNote";
import EditNote from "./EditNote";
import ShowNote from "./ShowNote";
import { LinkContainer } from "react-router-bootstrap";

function App() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark" fixed="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <i class="bi-card-list"></i> NotesApp
            </Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer end to="/notes">
              <Nav.Link>Notes</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/createNote">
              <Nav.Link>Create New Note</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
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
