import Note from "./Note";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import CreatableSelect from "react-select/creatable";
import Masonry from "@mui/lab/Masonry";
import { useAuth } from "./AuthContext";

import Box from "@mui/material/Box";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const { isLoggedIn } = useAuth();

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      if (tags.length === 0 || tags.every((tag) => note.tags.some((noteTag) => noteTag === tag))) return true;
      else return false;
    });
  }, [tags, notes]);
  const handleCreatedTag = (createdTags) => {
    const newTags = [];
    createdTags.map((tag) => newTags.push(tag.value));
    setTags(newTags);
  };
  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      axios
        .get("http://localhost:3000/notes", { withCredentials: true })
        .then((res) => {
          setNotes(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <h1 style={{ padding: "30px" }}>Please login to see notes</h1>;
  }

  return (
    <>
      <h1 style={{ padding: "30px" }}>Notes:</h1>

      <div style={{ padding: "20px" }}>
        <CreatableSelect
          placeholder="Sort Notes By Tags"
          styles={{ padding: "20px" }}
          isMulti
          onChange={handleCreatedTag}
          value={tags.map((tag) => ({ label: tag, value: tag }))}
        />
      </div>
      {loading && <Spinner animation="border" variant="primary" />}

      <Box sx={{ width: 1200, minHeight: 400, display: "flex", alignItems: "center", padding: "20px" }}>
        <Masonry columns={3} spacing={2} style={{ alignContent: "center" }}>
          {filteredNotes.map((note) => (
            <Note noteData={note} key={note._id} />
          ))}
        </Masonry>
      </Box>
    </>
  );
}
