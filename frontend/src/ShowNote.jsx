import Note from "./Note";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, Link, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { useSnackbar } from "notistack";
import Container from "react-bootstrap/Container";

export default function ShowNote() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [noteData, setNoteData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/notes/${id}`, { withCredentials: true })
      .then(() => {
        enqueueSnackbar("Note deleted successfuly", { variant: "default" });
        navigate("/notes");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/notes/${id}`, { withCredentials: true })
      .then((res) => {
        setNoteData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("failedddddd");
        console.log(err);
      });
  }, []);

  return (
    <>
      <Container>
        {loading && <Spinner animation="border" variant="primary" />}
        <div style={{ display: "flex", justifyContent: "center", gap: "30px", padding: "20px" }}>
          <Button variant="secondary" as={Link} to="/notes">
            Back
          </Button>
          <Button varient="primary" as={Link} to={`/notes/${id}/editNote`}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
        <Note noteData={noteData} />
      </Container>
    </>
  );
}
